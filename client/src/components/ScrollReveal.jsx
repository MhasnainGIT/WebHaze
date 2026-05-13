import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({ children, direction = "up", delay = 0, className = "", amount = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: 0.98,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
