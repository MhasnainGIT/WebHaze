import { useEffect } from 'react';
import Lenis from 'lenis';

const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Disable Lenis on mobile — native scroll is better on touch devices
    if (isMobile()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync to window so Framer Motion useScroll works
    lenis.on('scroll', ({ scroll }) => {
      document.documentElement.scrollTop = scroll;
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return children;
};

export default SmoothScroll;