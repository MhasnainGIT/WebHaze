/**
 * Aceternity UI — 3D Globe
 * Powered by cobe (WebGL canvas globe by @shuding)
 * Styled to match Aceternity's dark aesthetic
 */
import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';
import { useSpring } from 'framer-motion';

// City markers — [lat, lng]
const DEFAULT_MARKERS = [
  { location: [17.4, 78.5], size: 0.08 },   // Hyderabad (HQ)
  { location: [25.2, 55.3], size: 0.06 },   // Dubai
  { location: [51.5, -0.1], size: 0.06 },   // London
  { location: [40.7, -74.0], size: 0.06 },  // New York
  { location: [1.3, 103.8], size: 0.05 },   // Singapore
  { location: [48.9, 2.3], size: 0.05 },    // Paris
];

export default function Globe({ markers = DEFAULT_MARKERS, className = '' }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  const r = useSpring(0, { stiffness: 100, damping: 30, mass: 0.5 });

  const updatePointerInteraction = useCallback((value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  }, []);

  const updateMovement = useCallback((clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(delta / 200);
    }
  }, [r]);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    let phi = 0;
    let currentPhi = 0;
    let currentTheta = 0.3;

    if (!canvasRef.current) return;

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [1, 1, 1],
      glowColor: [0.2, 0.2, 0.2],
      markers,
      onRender(state) {
        // Auto-rotate
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        state.phi = phi + r.get();
        state.theta = currentTheta;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    // Fade in
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    }, 0);

    return () => {
      if (globeRef.current) globeRef.current.destroy();
    };
  }, [markers, r]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: '100%', maxWidth: 500, aspectRatio: '1' }}
    >
      {/* Soft outer glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) updateMovement(e.touches[0].clientX);
        }}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
          cursor: 'grab',
        }}
      />
    </div>
  );
}
