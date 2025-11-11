import React from 'react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';

export const ScrollDirectionIndicator = ({ className = '' }) => {
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  
  return (
    <motion.div
      className={`fixed top-6 right-6 z-50 w-8 h-8 glass-morphism rounded-full flex items-center justify-center ${className}`}
      animate={{
        scale: scrollVelocity > 1 ? 1.2 : 1,
        rotateX: scrollDirection === 'up' ? 180 : 0
      }}
      transition={{
        type: scrollVelocity > 2 ? 'spring' : 'tween',
        stiffness: 300,
        damping: 20,
        duration: scrollVelocity > 2 ? undefined : 0.3
      }}
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white"
        animate={{
          y: scrollDirection === 'up' ? -1 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        <path
          d="M7 14L12 9L17 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
};