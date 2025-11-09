import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/motionSystem';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    glass: 'bg-white/60 backdrop-blur-xl border border-white/20',
    premium: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100',
    dark: 'bg-gray-900 border border-gray-800 text-white'
  };

  return (
    <motion.div
      className={`
        rounded-2xl p-6 shadow-lg transition-all duration-300
        ${variants[variant]} ${className}
      `}
      variants={hover ? cardHover : {}}
      initial="rest"
      whileHover="hover"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;