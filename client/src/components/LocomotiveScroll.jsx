import { useEffect, useRef } from 'react';

const LocomotiveScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    let LocomotiveScroll;
    
    const initScroll = async () => {
      try {
        const LocomotiveScrollModule = await import('locomotive-scroll');
        LocomotiveScroll = LocomotiveScrollModule.default;
        
        if (!scrollRef.current || !LocomotiveScroll) return;

        locomotiveScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 0.8,
          class: 'is-inview',
          scrollbarContainer: false,
          lerp: 0.08,
          smartphone: {
            smooth: false,
          },
          tablet: {
            smooth: false,
          },
        });

        // Update scroll on window resize
        const handleResize = () => {
          if (locomotiveScrollRef.current) {
            locomotiveScrollRef.current.update();
          }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.warn('Locomotive Scroll failed to load:', error);
      }
    };

    initScroll();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default LocomotiveScrollProvider;