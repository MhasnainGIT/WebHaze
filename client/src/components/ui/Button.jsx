import React from 'react';
import { motion } from 'framer-motion';
import { motionConfig } from '../../utils/motionSystem';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  ...props 
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold
    transition-all duration-300 ease-out overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-primary-500 to-secondary text-white
      hover:shadow-xl hover:shadow-primary-500/25
      focus:ring-primary-500/50 border-0
    `,
    secondary: `
      bg-white text-gray-900 border border-gray-200
      hover:bg-gray-50 hover:shadow-lg
      focus:ring-gray-500/50
    `,
    ghost: `
      bg-transparent text-gray-700 border-0
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-500/50
    `,
    premium: `
      bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white
      hover:shadow-2xl hover:shadow-gray-900/50
      focus:ring-gray-800/50 border-0
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl'
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    hover: { 
      x: '100%',
      transition: {
        duration: 0.6,
        ease: motionConfig.easing.smooth
      }
    }
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: motionConfig.duration.fast }}
      {...props}
    >
      {/* Shimmer effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          whileHover="hover"
        />
      )}
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {loading ? (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        ) : icon}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;