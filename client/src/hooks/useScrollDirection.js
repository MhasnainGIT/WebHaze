import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(Date.now());

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const timestamp = Date.now();
      const timeDiff = timestamp - lastTimestamp;
      const scrollDiff = scrollY - lastScrollY;
      
      if (timeDiff > 0) {
        const velocity = Math.abs(scrollDiff) / timeDiff;
        setScrollVelocity(velocity);
      }

      if (Math.abs(scrollDiff) > 5) {
        setScrollDirection(scrollDiff > 0 ? 'down' : 'up');
      }

      setLastScrollY(scrollY);
      setLastTimestamp(timestamp);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, lastTimestamp]);

  return { scrollDirection, scrollVelocity };
};