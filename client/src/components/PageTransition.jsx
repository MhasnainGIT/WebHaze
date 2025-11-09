import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    // Page enter animation
    const tl = gsap.timeline();
    
    tl.set(overlay, { scaleX: 0, transformOrigin: 'left center' })
      .set(content, { opacity: 0, y: 50 })
      .to(overlay, { 
        scaleX: 1, 
        duration: 0.6, 
        ease: 'power2.inOut' 
      })
      .to(overlay, { 
        scaleX: 0, 
        transformOrigin: 'right center',
        duration: 0.6, 
        ease: 'power2.inOut' 
      }, 0.3)
      .to(content, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, 0.6);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-gradient-to-r from-primary to-secondary z-50 pointer-events-none"
      />
      
      {/* Page content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default PageTransition;