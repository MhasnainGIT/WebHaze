// Motion System - Enterprise-grade animations
export const motionConfig = {
  // Easing curves
  easing: {
    smooth: [0.16, 1, 0.3, 1],
    snappy: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275]
  },
  
  // Duration presets
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8
  },
  
  // Stagger configurations
  stagger: {
    items: 0.1,
    cards: 0.15,
    sections: 0.2
  }
};

// Scroll-triggered reveal animations
export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.easing.smooth
    }
  }
};

// Staggered children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionConfig.stagger.items,
      delayChildren: 0.1
    }
  }
};

// Hero section animations
export const heroVariants = {
  title: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionConfig.duration.slower,
        ease: motionConfig.easing.smooth
      }
    }
  },
  subtitle: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionConfig.duration.slow,
        ease: motionConfig.easing.smooth,
        delay: 0.2
      }
    }
  },
  cta: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: motionConfig.duration.normal,
        ease: motionConfig.easing.bounce,
        delay: 0.4
      }
    }
  }
};

// Card hover animations
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.easing.smooth
    }
  }
};

// Navigation animations
export const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.easing.smooth
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.easing.smooth
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: motionConfig.duration.fast,
      ease: motionConfig.easing.snappy
    }
  }
};

// Utility function for scroll-triggered animations
export const useScrollReveal = () => {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" }
  };
};