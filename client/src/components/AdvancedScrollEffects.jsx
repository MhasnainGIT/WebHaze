import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimationControls } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';

// Scroll-Triggered Morphing Background
export const MorphingBackground = ({ children, colors = ['#000', '#111', '#222'], className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollDirection } = useScrollDirection();
  
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      `linear-gradient(${scrollDirection === 'up' ? '180deg' : '0deg'}, ${colors[0]}, ${colors[1]})`,
      `radial-gradient(circle, ${colors[1]}, ${colors[2]})`,
      `linear-gradient(${scrollDirection === 'up' ? '0deg' : '180deg'}, ${colors[2]}, ${colors[0]})`
    ]
  );
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ background: backgroundGradient }}
    >
      {children}
    </motion.div>
  );
};

// Text Scramble Effect
export const ScrambleText = ({ text, className = '' }) => {
  const ref = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollVelocity } = useScrollDirection();
  
  useEffect(() => {
    if (scrollVelocity > 2) {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split('').map((char, i) => {
            if (iterations < text.length && i <= iterations) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        iterations++;
        if (iterations > text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scrollVelocity, text]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        filter: useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(2px)']),
        scale: useTransform(() => 1 + (scrollVelocity * 0.05))
      }}
    >
      {displayText}
    </motion.div>
  );
};

// Floating Elements
export const FloatingElements = ({ children, count = 3, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  
  const floatingElements = Array.from({ length: count }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-white/10 rounded-full"
      style={{
        x: useTransform(scrollYProgress, [0, 1], [
          Math.sin(i * 2) * 50,
          Math.sin(i * 2 + Math.PI) * 50
        ]),
        y: useTransform(scrollYProgress, [0, 1], [
          Math.cos(i * 2) * 30 * (scrollDirection === 'up' ? -1 : 1),
          Math.cos(i * 2 + Math.PI) * 30 * (scrollDirection === 'up' ? -1 : 1)
        ]),
        opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2])
      }}
    />
  ));
  
  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      {children}
      {floatingElements}
    </motion.div>
  );
};

// Depth Layers
export const DepthLayers = ({ layers = [], className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollDirection } = useScrollDirection();
  
  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [
              (i + 1) * 20 * (scrollDirection === 'up' ? -1 : 1),
              (i + 1) * -20 * (scrollDirection === 'up' ? -1 : 1)
            ]),
            scale: useTransform(scrollYProgress, [0, 1], [1 - (i * 0.1), 1 + (i * 0.1)]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
            zIndex: layers.length - i
          }}
        >
          {layer}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Spiral Animation
export const SpiralScroll = ({ children, radius = 100, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollDirection } = useScrollDirection();
  
  const spiralX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, radius * Math.cos(scrollDirection === 'up' ? -Math.PI * 4 : Math.PI * 4)]
  );
  
  const spiralY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, radius * Math.sin(scrollDirection === 'up' ? -Math.PI * 4 : Math.PI * 4)]
  );
  
  const spiralRotate = useTransform(scrollYProgress, [0, 1], [0, scrollDirection === 'up' ? -720 : 720]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: spiralX,
        y: spiralY,
        rotate: spiralRotate
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Cursor Follow
export const MagneticCursor = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollVelocity } = useScrollDirection();
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        
        x.set(deltaX * (1 + scrollVelocity * 0.1));
        y.set(deltaY * (1 + scrollVelocity * 0.1));
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, strength, scrollVelocity]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

// Ripple Effect
export const RippleScroll = ({ children, intensity = 1, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollVelocity } = useScrollDirection();
  
  const rippleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1 + (intensity * 0.5), 1]
  );
  
  const rippleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  const ripples = Array.from({ length: 3 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute inset-0 border-2 border-white/20 rounded-full"
      style={{
        scale: useTransform(scrollYProgress, [0, 1], [1 + (i * 0.2), 2 + (i * 0.5)]),
        opacity: useTransform(scrollYProgress, [0, 1], [0.5, 0]),
        animationDelay: `${i * 0.2}s`
      }}
    />
  ));
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        scale: rippleScale,
        opacity: rippleOpacity,
        filter: useTransform(() => `blur(${scrollVelocity * 0.5}px)`)
      }}
    >
      {children}
      {ripples}
    </motion.div>
  );
};