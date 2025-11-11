import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';

// Magnetic Scroll Component
export const MagneticScroll = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef(null);
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const magneticY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const magneticRotate = useTransform(scrollYProgress, [0, 1], [scrollDirection === 'up' ? 5 : -5, scrollDirection === 'up' ? -5 : 5]);
  const magneticScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: magneticY,
        rotate: magneticRotate,
        scale: magneticScale,
        filter: useTransform(scrollYProgress, [0, 0.5, 1], ['blur(2px)', 'blur(0px)', 'blur(2px)'])
      }}
    >
      {children}
    </motion.div>
  );
};

// Elastic Parallax
export const ElasticParallax = ({ children, intensity = 1, className = '' }) => {
  const ref = useRef(null);
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const elasticY = useSpring(
    useTransform(scrollYProgress, [0, 1], [intensity * 100, intensity * -100]),
    { stiffness: 100, damping: 30, mass: scrollVelocity > 2 ? 0.5 : 1 }
  );
  
  const elasticRotateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [scrollDirection === 'up' ? 15 : -15, scrollDirection === 'up' ? -15 : 15]),
    { stiffness: 200, damping: 20 }
  );
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: elasticY,
        rotateX: elasticRotateX,
        transformPerspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};

// Morphing Reveal
export const MorphingReveal = ({ children, morphType = 'scale', className = '' }) => {
  const ref = useRef(null);
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const morphVariants = {
    scale: {
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]),
      opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    },
    skew: {
      skewY: useTransform(scrollYProgress, [0, 0.5, 1], [scrollDirection === 'up' ? 10 : -10, 0, scrollDirection === 'up' ? -10 : 10]),
      scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
    },
    liquid: {
      borderRadius: useTransform(scrollYProgress, [0, 0.5, 1], ['50%', '10%', '30%']),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.3, 0.6])
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={morphVariants[morphType]}
    >
      {children}
    </motion.div>
  );
};

// Velocity-Based Animations
export const VelocityReactive = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  const { scrollYProgress } = useScroll({ target: ref });
  
  const velocityScale = useTransform(() => 1 + (scrollVelocity * 0.1));
  const velocityBlur = useTransform(() => `blur(${Math.min(scrollVelocity * 2, 10)}px)`);
  const velocityRotate = useTransform(() => scrollDirection === 'up' ? scrollVelocity * -2 : scrollVelocity * 2);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale: velocityScale,
        filter: velocityBlur,
        rotate: velocityRotate
      }}
    >
      {children}
    </motion.div>
  );
};

// 3D Flip Cards
export const FlipCard3D = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollDirection } = useScrollDirection();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [scrollDirection === 'up' ? 180 : -180, 0, scrollDirection === 'up' ? -180 : 180]
  );
  
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateY,
        rotateX,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </motion.div>
  );
};

// Wave Distortion
export const WaveDistortion = ({ children, amplitude = 20, frequency = 2, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollDirection } = useScrollDirection();
  
  const waveY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, amplitude * frequency * (scrollDirection === 'up' ? -1 : 1)]
  );
  
  const waveRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, amplitude/4, 0, -amplitude/4, 0]
  );
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: waveY,
        rotate: waveRotate,
        transformOrigin: 'center'
      }}
    >
      {children}
    </motion.div>
  );
};

// Particle Trail Effect
export const ParticleTrail = ({ children, particleCount = 5, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const delay = i * 0.1;
    const offset = (i + 1) * 20;
    
    return (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white/30 rounded-full"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [offset, -offset]),
          y: useTransform(scrollYProgress, [0, 1], [
            scrollDirection === 'up' ? -offset : offset,
            scrollDirection === 'up' ? offset : -offset
          ]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
          scale: useTransform(() => 1 + (scrollVelocity * 0.2))
        }}
      />
    );
  });
  
  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      {children}
      {particles}
    </motion.div>
  );
};

// Glitch Effect
export const GlitchScroll = ({ children, intensity = 1, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollVelocity } = useScrollDirection();
  
  const glitchX = useTransform(scrollYProgress, [0, 1], [0, intensity * 10]);
  const glitchSkew = useTransform(scrollYProgress, [0, 0.5, 1], [0, intensity * 5, 0]);
  const glitchFilter = useTransform(
    () => scrollVelocity > 3 ? 
      `hue-rotate(${Math.random() * 360}deg) saturate(${1 + Math.random()})` : 
      'none'
  );
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: glitchX,
        skewX: glitchSkew,
        filter: glitchFilter
      }}
    >
      {children}
    </motion.div>
  );
};