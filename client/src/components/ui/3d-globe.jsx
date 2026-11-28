import React, { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const EARTH_TEXTURE =
  'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg';
const BUMP_TEXTURE =
  'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png';

useTexture.preload([EARTH_TEXTURE, BUMP_TEXTURE]);

const DEFAULT_CONFIG = {
  radius: 2,
  textureUrl: EARTH_TEXTURE,
  bumpMapUrl: BUMP_TEXTURE,
  showAtmosphere: true,
  atmosphereColor: '#4da6ff',
  atmosphereIntensity: 0.1,
  atmosphereBlur: 3,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 3,
  maxDistance: 15,
  initialRotation: { x: -0.3, y: -1.92 },
  showWireframe: false,
  wireframeColor: '#4a9eff',
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
};

const toVector = (lat, lng, radius) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};

function GlobeMarkerPin({ marker, radius, onClick, onHover }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const markerRef = useRef(null);
  const frameCount = useRef(0);
  const { camera } = useThree();

  const surface = useMemo(
    () => toVector(marker.lat, marker.lng, radius * 1.001),
    [marker.lat, marker.lng, radius],
  );
  const poleTip = useMemo(
    () => toVector(marker.lat, marker.lng, radius * 1.13),
    [marker.lat, marker.lng, radius],
  );
  const tip = useMemo(
    () => toVector(marker.lat, marker.lng, radius * 1.18),
    [marker.lat, marker.lng, radius],
  );
  const lineHeight = surface.distanceTo(poleTip);
  const lineRotation = useMemo(() => {
    const direction = poleTip.clone().sub(surface).normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction,
    );
  }, [surface, poleTip]);
  const lineCenter = useMemo(
    () => surface.clone().lerp(poleTip, 0.5),
    [surface, poleTip],
  );

  useFrame(() => {
    frameCount.current += 1;
    if (frameCount.current % 6 !== 0 || !markerRef.current) return;

    const worldPosition = markerRef.current.getWorldPosition(new THREE.Vector3());
    const cameraPosition = camera.getWorldPosition(new THREE.Vector3());
    const visibilityThreshold = radius / cameraPosition.length();
    const facingCamera =
      worldPosition.normalize().dot(cameraPosition.normalize()) > visibilityThreshold;
    if (facingCamera !== visible) setVisible(facingCamera);
  });

  const handleEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);
  const handleLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  return (
    <group visible={visible}>
      <mesh position={lineCenter} quaternion={lineRotation}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={hovered ? '#ffffff' : '#9ecbff'}
          transparent
          opacity={hovered ? 0.9 : 0.65}
        />
      </mesh>
      <mesh position={surface} quaternion={lineRotation}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : '#4da6ff'} />
      </mesh>
      <group ref={markerRef} position={tip}>
        {visible && (
          <Html transform center sprite distanceFactor={2.5}>
            <div
              className="relative cursor-pointer"
              style={{ width: 40, height: 40 }}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onClick={() => onClick?.(marker)}
            >
              <img
                src={marker.src}
                alt={marker.label || 'Client location'}
                draggable="false"
                className="h-full w-full rounded-full border border-sky-200/80 object-cover shadow-[0_0_8px_rgba(77,166,255,0.4)] transition-transform duration-200"
                style={{ transform: hovered ? 'scale(1.25)' : 'scale(1)' }}
              />
              {hovered && marker.label && (
                <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-[11px] text-white">
                  {marker.label}
                </span>
              )}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

function EarthSurface({ config }) {
  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl,
  ]);
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  earthTexture.anisotropy = 8;
  bumpTexture.anisotropy = 8;

  return (
    <>
      <mesh>
        <sphereGeometry args={[config.radius, 48, 48]} />
        <meshStandardMaterial
          map={earthTexture}
          emissiveMap={earthTexture}
          emissive="#ffffff"
          emissiveIntensity={0.35}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.8}
        />
      </mesh>
      {config.showWireframe && (
        <mesh>
          <sphereGeometry args={[config.radius * 1.002, 24, 24]} />
          <meshBasicMaterial
            color={config.wireframeColor}
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      )}
    </>
  );
}

function Atmosphere({ radius, color, intensity, blur }) {
  const material = useMemo(() => {
    const fresnelPower = Math.max(0.5, 5 - blur);
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [color, intensity, blur]);

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 48, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function GlobeScene({ markers, config, onMarkerClick, onMarkerHover }) {
  const { camera, size } = useThree();

  React.useEffect(() => {
    const aspectRatio = size.width / size.height;
    const horizontalFitDistance =
      (config.radius * 1.12 * 1.04) /
      (Math.tan(THREE.MathUtils.degToRad(45 / 2)) * aspectRatio);
    const cameraDistance = Math.max(config.radius * 3.35, horizontalFitDistance);
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius, size.width, size.height]);

  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[config.radius * 4, config.radius * 4, config.radius * 3]}
        intensity={config.pointLightIntensity}
      />
      <directionalLight
        position={[-config.radius * 3, config.radius * 0.5, config.radius * 2]}
        intensity={config.pointLightIntensity * 0.45}
        color="#6aa9ff"
      />
      <group rotation={[config.initialRotation.x, config.initialRotation.y, 0]}>
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[config.radius, 32, 32]} />
              <meshStandardMaterial color="#15334d" roughness={0.9} />
            </mesh>
          }
        >
          <EarthSurface config={config} />
        </Suspense>
        {markers.map((marker) => (
          <GlobeMarkerPin
            key={`${marker.lat}-${marker.lng}`}
            marker={marker}
            radius={config.radius}
            onClick={onMarkerClick}
            onHover={onMarkerHover}
          />
        ))}
      </group>
      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur}
        />
      )}
      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

export function Globe3D({
  markers = [],
  config: userConfig = {},
  className = '',
  onMarkerClick,
  onMarkerHover,
}) {
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...userConfig }),
    [userConfig],
  );

  return (
    <div className={`relative h-[380px] w-full md:h-[500px] ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, config.radius * 3.35],
        }}
        style={{ background: config.backgroundColor || 'transparent' }}
      >
        <GlobeScene
          markers={markers}
          config={config}
          onMarkerClick={onMarkerClick}
          onMarkerHover={onMarkerHover}
        />
      </Canvas>
    </div>
  );
}

export default Globe3D;
