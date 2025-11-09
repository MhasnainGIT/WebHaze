import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        container.appendChild(particle);
        particlesRef.current.push(particle);

        // Animate particles
        gsap.to(particle, {
          y: -100 - Math.random() * 200,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power2.out"
        });
      }
    };

    // Create gradient orbs
    const createOrbs = () => {
      for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'absolute rounded-full blur-3xl opacity-20';
        orb.style.width = 200 + Math.random() * 300 + 'px';
        orb.style.height = 200 + Math.random() * 300 + 'px';
        orb.style.background = i % 2 === 0 
          ? 'radial-gradient(circle, rgba(11,97,255,0.3) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(11,155,255,0.2) 0%, transparent 70%)';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        container.appendChild(orb);

        // Animate orbs
        gsap.to(orb, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    createParticles();
    createOrbs();

    return () => {
      // Cleanup
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ zIndex: -1 }}
    />
  );
};

export default AnimatedBackground;