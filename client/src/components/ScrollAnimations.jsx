import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';

export const ReverseParallaxSection = ({ children, speed = -0.4, reverseSpeed = 0.6, className = "" }) => {
  const ref = useRef(null);
  const { scrollDirection } = useScrollDirection();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const currentSpeed = scrollDirection === 'up' ? reverseSpeed : speed;
  const y = useTransform(scrollYProgress, [0, 1], [0, currentSpeed * 100]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ReverseParallaxSection;

export const ReverseScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  blur = false, 
  scale = false, 
  rotate = false 
}) => {
  const ref = useRef(null);
  const { scrollDirection, scrollVelocity } = useScrollDirection();
  
  const getVariants = (isReverse) => ({
    hidden: {
      opacity: 0,
      y: direction === "up" ? (isReverse ? -30 : 50) : direction === "down" ? (isReverse ? 30 : -50) : 0,
      x: direction === "left" ? (isReverse ? -30 : 50) : direction === "right" ? (isReverse ? 30 : -50) : 0,
      scale: scale ? (isReverse ? 1.05 : 0.9) : 1,
      rotateY: rotate ? (isReverse ? -5 : 5) : 0,
      filter: blur ? 'blur(4px)' : 'none'
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: scrollVelocity > 2 ? 
        { type: 'spring', stiffness: 300, damping: 20, delay: isReverse ? delay * 0.5 : delay } :
        { duration: 0.8, delay: isReverse ? delay * 0.5 : delay, ease: [0.16, 1, 0.3, 1] }
    }
  });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={getVariants(scrollDirection === 'up')}
      key={scrollDirection}
    >
      {children}
    </motion.div>
  );
};

export const ScrollReveal = ReverseScrollReveal;

export const ReverseStaggeredReveal = ({ children, staggerDelay = 0.1 }) => {
  const { scrollDirection } = useScrollDirection();
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: scrollDirection === 'up' ? staggerDelay * 0.3 : staggerDelay,
            delayChildren: scrollDirection === 'up' ? 0.05 : 0
          }
        }
      }}
      key={scrollDirection}
    >
      {childrenArray.map((child, index) => {
        const reverseIndex = scrollDirection === 'up' ? childrenArray.length - 1 - index : index;
        return (
          <ReverseStaggeredItem key={index} index={reverseIndex}>
            {child}
          </ReverseStaggeredItem>
        );
      })}
    </motion.div>
  );
};

export const StaggeredReveal = ReverseStaggeredReveal;

export const ReverseStaggeredItem = ({ children, direction = "up", index = 0 }) => {
  const { scrollDirection } = useScrollDirection();
  const isReverse = scrollDirection === 'up';
  
  const getVariants = () => ({
    hidden: {
      opacity: 0,
      y: direction === "up" ? (isReverse ? -20 : 30) : direction === "down" ? (isReverse ? 20 : -30) : 0,
      x: direction === "left" ? (isReverse ? -20 : 30) : direction === "right" ? (isReverse ? 20 : -30) : 0,
      scale: isReverse ? 1.02 : 0.95,
      rotateX: isReverse ? 3 : -8,
      rotateY: isReverse ? -2 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: isReverse ? 0.5 : 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  });
  
  return (
    <motion.div 
      variants={getVariants()}
      key={`${scrollDirection}-${index}`}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ReverseStaggeredItem;