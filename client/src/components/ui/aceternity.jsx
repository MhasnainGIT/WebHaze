/**
 * Aceternity UI — Hand-crafted components built on Framer Motion + Tailwind
 * All components live in this single file to avoid module resolution issues.
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  AnimatePresence,
  useInView,
} from 'framer-motion';

/* ─────────────────────────────────────────────────────
   SPOTLIGHT CARD
   Magnetic gradient that follows cursor inside the card
───────────────────────────────────────────────────── */
export const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255,255,255,0.08)' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   PARALLAX TEXT  (infinite scrolling ticker)
───────────────────────────────────────────────────── */
function ParallaxTextInner({ children, speed = 5, direction = 'left' }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(direction === 'left' ? 1 : -1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * speed * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = direction === 'left' ? 1 : -1;
    else if (velocityFactor.get() > 0) directionFactor.current = direction === 'left' ? 1 : -1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="block mr-6">{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export const ParallaxText = ({ children, speed = 5, direction = 'left', className = '' }) => (
  <div className={`relative ${className}`}>
    <ParallaxTextInner speed={speed} direction={direction}>{children}</ParallaxTextInner>
  </div>
);

/* ─────────────────────────────────────────────────────
   TEXT GENERATE EFFECT  (char-by-char reveal)
───────────────────────────────────────────────────── */
export const TextGenerateEffect = ({ words, className = '', once = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const wordsArray = words.split(' ');

  return (
    <div ref={ref} className={className}>
      {wordsArray.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   SPOTLIGHT  (full-section spotlight beam)
───────────────────────────────────────────────────── */
export const Spotlight = ({ fill = 'white', className = '' }) => (
  <svg
    className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-0 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 3787 2842"
    fill="none"
  >
    <g filter="url(#filter)">
      <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill} fillOpacity="0.21" />
    </g>
    <defs>
      <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
      </filter>
    </defs>
  </svg>
);

/* ─────────────────────────────────────────────────────
   GRID BEAM  (animated diagonal beams background)
───────────────────────────────────────────────────── */
export const GridBeam = ({ children, className = '' }) => (
  <div className={`relative h-full w-full overflow-hidden ${className}`}>
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
    {children}
  </div>
);

/* ─────────────────────────────────────────────────────
   HOVER BORDER GRADIENT  (animated rainbow border on hover)
───────────────────────────────────────────────────── */
export const HoverBorderGradient = ({ children, className = '', containerClassName = '', as: Tag = 'button', ...rest }) => {
  const [hovered, setHovered] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!hovered) return;
    let frame;
    const animate = () => {
      setAngle((a) => (a + 1) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-[1px] overflow-hidden ${containerClassName}`}
      {...rest}
    >
      {hovered && (
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from ${angle}deg at 50% 50%, #fff 0deg, transparent 60deg, transparent 300deg, #fff 360deg)`,
          }}
        />
      )}
      <div className={`relative z-10 ${className}`}>{children}</div>
    </Tag>
  );
};

/* ─────────────────────────────────────────────────────
   STICKY SCROLL REVEAL  (Aceternity-style sticky scroll)
───────────────────────────────────────────────────── */
export const StickyScrollReveal = ({ content }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref, offset: ['start start', 'end start'] });

  const cardLength = content.length;
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const idx = Math.min(Math.floor(latest * cardLength), cardLength - 1);
      setActiveCard(idx);
    });
    return unsubscribe;
  }, [scrollYProgress, cardLength]);

  return (
    <motion.div
      ref={ref}
      className="h-[30rem] overflow-y-auto flex justify-around relative rounded-md"
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, i) => (
            <div key={i} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                className="text-2xl font-black uppercase tracking-tight"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                className="text-sm text-white/60 mt-4 max-w-sm"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block h-60 w-96 rounded-md sticky top-10 overflow-hidden">
        {content[activeCard]?.content}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────
   CARD HOVER EFFECT  (3D tilt on hover)
───────────────────────────────────────────────────── */
export const CardHoverEffect = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
    {items.map((item, i) => (
      <TiltCard key={i} item={item} />
    ))}
  </div>
);

const TiltCard = ({ item }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }}
      className="relative bg-white/[0.03] border border-white/[0.08] p-8 hover:border-white/20 transition-colors duration-500 cursor-default"
    >
      <div style={{ transform: 'translateZ(30px)' }}>
        {item.icon && <div className="mb-4 text-2xl">{item.icon}</div>}
        <h3 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────
   LAMP EFFECT  (conic gradient lamp reveal on hero)
───────────────────────────────────────────────────── */
export const LampContainer = ({ children, className = '' }) => (
  <div className={`relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-black w-full ${className}`}>
    <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
      <motion.div
        initial={{ opacity: 0.5, width: '10rem' }}
        whileInView={{ opacity: 1, width: '30rem' }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-white/20 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
      >
        <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0.5, width: '10rem' }}
        whileInView={{ opacity: 1, width: '30rem' }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-white/20 text-white [--conic-position:from_290deg_at_center_top]"
      >
        <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>
      <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl" />
      <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
      <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-white/10 opacity-50 blur-3xl" />
      <motion.div
        initial={{ width: '8rem' }}
        whileInView={{ width: '16rem' }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-white/40 blur-2xl"
      />
      <motion.div
        initial={{ width: '15rem' }}
        whileInView={{ width: '30rem' }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-white/70"
      />
      <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black" />
    </div>
    <div className="relative z-50 flex flex-col items-center px-5 -translate-y-20">
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────
   MOVING BORDER  (animated border that moves around)
───────────────────────────────────────────────────── */
export const MovingBorder = ({ children, duration = 2000, className = '', containerClassName = '', as: Tag = 'div', ...rest }) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val).x;
  });
  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val).y;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <Tag className={`relative p-[1px] overflow-hidden ${containerClassName}`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
      >
        <rect fill="none" width="100%" height="100%" rx="0" ry="0" ref={pathRef} />
      </svg>
      <motion.div
        style={{ position: 'absolute', top: 0, left: 0, display: 'inline-block', transform }}
        className="h-20 w-20 opacity-[0.8]"
      >
        <div className="h-full w-full bg-gradient-radial from-white to-transparent rounded-full blur-sm" />
      </motion.div>
      <div className={`relative z-10 ${className}`}>{children}</div>
    </Tag>
  );
};

/* ─────────────────────────────────────────────────────
   BACKGROUND BEAMS  (diagonal laser beams)
───────────────────────────────────────────────────── */
export const BackgroundBeams = ({ className = '' }) => {
  const paths = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
    'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
    'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843',
    'M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835',
    'M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827',
    'M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819',
    'M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811',
    'M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803',
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={`rgba(255,255,255,0.03)`}
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.1, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   AURORA BACKGROUND  (animated gradient aurora)
───────────────────────────────────────────────────── */
export const AuroraBackground = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div
      className="absolute inset-0 opacity-30 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255,255,255,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)
        `,
        animation: 'aurora 8s ease-in-out infinite alternate',
      }}
    />
    {children}
  </div>
);

/* ─────────────────────────────────────────────────────
   TIMELINE  (vertical animated timeline)
───────────────────────────────────────────────────── */
export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      <div ref={ref}>
        {data.map((item, i) => (
          <div key={i} className="flex justify-start pt-10 md:pt-20 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black border border-white/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white/40 border border-white/50 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-black uppercase text-white">
                {item.title}
              </h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-black uppercase text-white">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + 'px' }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-white via-white/50 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   COMPARE  (before/after slider) — decorative use
───────────────────────────────────────────────────── */
export const Compare = ({ firstContent, secondContent, className = '' }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const ref = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!ref.current || !isDragging.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden select-none ${className}`}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={() => { isDragging.current = false; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={() => { isDragging.current = false; }}
    >
      <div className="absolute inset-0">{firstContent}</div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        {secondContent}
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={() => { isDragging.current = true; }}
        onTouchStart={() => { isDragging.current = true; }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   NUMBER TICKER  (animated number count-up)
───────────────────────────────────────────────────── */
export const NumberTicker = ({ value, suffix = '', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}{suffix}
    </span>
  );
};

/* ─────────────────────────────────────────────────────
   GLOWING STARS BACKGROUND  (subtle star field)
───────────────────────────────────────────────────── */
export const GlowingStarsBackground = ({ children, className = '' }) => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   HORIZONTAL SCROLL  (pin-scroll horizontal section)
───────────────────────────────────────────────────── */
export const HorizontalScroll = ({ items, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(items.length - 1) * 100 / items.length}%`]);

  return (
    <div ref={ref} className={`relative h-[${items.length * 100}vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex h-full" style={{ x, width: `${items.length * 100}vw` }}>
          {items.map((item, i) => (
            <div key={i} className="w-screen h-full flex items-center justify-center px-20">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   SCROLL VELOCITY  (velocity-based scroll text)
───────────────────────────────────────────────────── */
export const ScrollVelocity = ({ text1, text2, className = '' }) => (
  <section className={`relative overflow-hidden py-8 ${className}`}>
    <ParallaxText speed={4} direction="left" className="text-[80px] md:text-[120px] font-black uppercase tracking-[-0.04em] text-white/[0.06] select-none">
      {text1} &nbsp;&nbsp;&nbsp;
    </ParallaxText>
    <ParallaxText speed={4} direction="right" className="text-[80px] md:text-[120px] font-black uppercase tracking-[-0.04em] text-white/[0.04] select-none mt-[-30px]">
      {text2} &nbsp;&nbsp;&nbsp;
    </ParallaxText>
  </section>
);

/* ─────────────────────────────────────────────────────
   CARD STACK  (stacked layered cards)
───────────────────────────────────────────────────── */
export const CardStack = ({ items, offset = 10, scaleFactor = 0.06 }) => {
  const [cards, setCards] = useState(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const newArr = [...prev];
        newArr.unshift(newArr.pop());
        return newArr;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 w-60 md:h-72 md:w-96">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          className="absolute bg-white/[0.03] border border-white/[0.08] p-6 shadow-xl flex flex-col justify-between w-full h-full"
          style={{ transformOrigin: 'top center' }}
          animate={{
            top: i * -offset,
            scale: 1 - i * scaleFactor,
            zIndex: cards.length - i,
          }}
        >
          <div className="text-sm text-white/70 italic">"{card.content}"</div>
          <div>
            <p className="text-white font-black text-sm">{card.name}</p>
            <p className="text-white/40 text-xs">{card.designation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   WAVY TEXT  (wavy hover text effect)
───────────────────────────────────────────────────── */
export const WavyText = ({ text, className = '', delay = 0 }) => {
  const letters = text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={`inline-flex ${className}`} aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

/* ─────────────────────────────────────────────────────
   FLIP WORDS  (rotating word carousel)
───────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────
   VORTEX  (swirling particle background)
───────────────────────────────────────────────────── */
export const Vortex = ({ children, className = '', particleCount = 400 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.05,
      size: Math.random() * 1.2 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    draw();
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [particleCount]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   MACBOOK SCROLL  (device scroll reveal mockup)
   Lightweight version — just an animated frame
───────────────────────────────────────────────────── */
export const DeviceScrollReveal = ({ src, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, rotateX, transformPerspective: '1200px' }}
      className={`w-full max-w-4xl mx-auto ${className}`}
    >
      <div className="relative bg-white/[0.03] border border-white/[0.08] p-2 aspect-video">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/10 rounded-full" />
        {src ? (
          <img src={src} alt="Preview" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent flex items-center justify-center">
            <span className="text-white/20 text-sm font-mono">PREVIEW</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────
   INFINITE MOVING CARDS  (testimonials scroller)
───────────────────────────────────────────────────── */
export const InfiniteMovingCards = ({ items, direction = 'left', speed = 'fast', className = '' }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const dup = item.cloneNode(true);
      scrollerRef.current.appendChild(dup);
    });
    containerRef.current.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse');
    const dur = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
    containerRef.current.style.setProperty('--animation-duration', dur);
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ${start ? 'animate-scroll' : ''}`}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="w-[350px] max-w-full relative flex-shrink-0 border border-white/[0.08] bg-white/[0.02] px-8 py-6"
          >
            <blockquote>
              <p className="text-sm text-white/70 italic leading-relaxed mb-6">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white font-black text-sm">
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-wider">{item.name}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider">{item.title}</p>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   BACKGROUND LINES  (animated SVG wave paths — Aceternity style)
   Renders a set of SVG paths that animate in a sinusoidal wave
───────────────────────────────────────────────────── */
export const BackgroundLines = ({ children, className = '', svgOptions = {} }) => {
  const pathCount = svgOptions.pathCount || 20;
  const paths = Array.from({ length: pathCount }, (_, i) => {
    const yBase = (i / pathCount) * 100;
    const amplitude = 8 + Math.random() * 12;
    const freq = 0.015 + Math.random() * 0.01;
    const phase = Math.random() * Math.PI * 2;
    const points = Array.from({ length: 50 }, (__, j) => {
      const x = (j / 49) * 100;
      const y = yBase + Math.sin(j * freq * 100 + phase) * amplitude;
      return `${x}%,${y}%`;
    });
    return `M ${points.join(' L ')}`;
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3 + i * 0.1, ease: 'easeInOut', delay: i * 0.05 },
              opacity: { duration: 1, delay: i * 0.05 },
            }}
          />
        ))}
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   BACKGROUND BOXES RIPPLE  (grid of cells that ripple when clicked/hovered)
───────────────────────────────────────────────────── */
export const BackgroundBoxes = ({ className = '' }) => {
  const [hovered, setHovered] = useState(null);
  const rows = 10;
  const cols = 15;

  const getColor = (row, col, hoveredCell) => {
    if (!hoveredCell) return 'rgba(255,255,255,0)';
    const dist = Math.sqrt(
      Math.pow(row - hoveredCell.row, 2) + Math.pow(col - hoveredCell.col, 2)
    );
    const maxDist = 4;
    if (dist > maxDist) return 'rgba(255,255,255,0)';
    const intensity = (1 - dist / maxDist) * 0.08;
    return `rgba(255,255,255,${intensity})`;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }, (_, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        return (
          <motion.div
            key={idx}
            className="border border-white/[0.03] cursor-crosshair"
            animate={{ backgroundColor: getColor(row, col, hovered) }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   FEATURE ICON CARD  ("Damn good card" style)
   Dark card with a row of tool/service icons, title, description
───────────────────────────────────────────────────── */
export const FeatureIconCard = ({ title, description, icons = [], badge = '', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden group ${className}`}
    >
      {/* Spotlight on hover */}
      <SpotlightInner />
      {badge && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] px-3 py-1.5 text-[10px] font-black tracking-[0.12em] uppercase text-white/60">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          {badge}
        </div>
      )}
      {/* Icon row */}
      {icons.length > 0 && (
        <div className="flex items-center justify-center gap-4 pt-16 pb-8 px-6">
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              className="w-10 h-10 bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              style={{ borderRadius: 0 }}
            >
              <Icon size={18} />
            </motion.div>
          ))}
        </div>
      )}
      {/* Content */}
      <div className="px-6 pb-8">
        <h3 className="text-lg font-black uppercase tracking-[-0.02em] mb-2 text-white">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

/* Inner spotlight helper (used by FeatureIconCard) */
const SpotlightInner = () => {
  const divRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [op, setOp] = useState(0);

  return (
    <div
      ref={divRef}
      className="pointer-events-none absolute inset-0"
      onMouseMove={(e) => {
        if (!divRef.current?.parentElement) return;
        const rect = divRef.current.parentElement.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOp(1)}
      onMouseLeave={() => setOp(0)}
      style={{
        opacity: op,
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.05), transparent 40%)`,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }}
    />
  );
};

/* ─────────────────────────────────────────────────────
   3D GLOBE  (CSS-based rotating globe with location pins)
   Pure CSS + Framer Motion — no WebGL dependency
───────────────────────────────────────────────────── */
export const Globe = ({ locations = [], className = '' }) => {
  const globeRef = useRef(null);
  const rotateY = useMotionValue(0);
  const smoothRotate = useSpring(rotateY, { stiffness: 20, damping: 30 });
  const [hoveredPin, setHoveredPin] = useState(null);

  useAnimationFrame((_, delta) => {
    rotateY.set(rotateY.get() + delta * 0.008);
  });

  // Convert lat/lng to x/y/z on a unit sphere then to CSS 2D position
  const latLngToXY = (lat, lng, rotOffset) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + rotOffset) * Math.PI) / 180;
    const x = Math.sin(phi) * Math.cos(theta);
    const z = Math.sin(phi) * Math.sin(theta);
    const y = Math.cos(phi);
    // Only show if on front hemisphere (z > -0.1)
    return { x, y, z, visible: z > -0.1 };
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Globe sphere */}
      <motion.div
        ref={globeRef}
        className="relative"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.6) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.03)',
        }}
      >
        {/* Grid lines — latitude */}
        {[0, 30, 60, 120, 150, 180].map((angle) => (
          <div
            key={angle}
            className="absolute inset-0 rounded-full border border-white/[0.04]"
            style={{ transform: `rotateX(${angle}deg)` }}
          />
        ))}
        {/* Grid lines — longitude (rotates with globe) */}
        <motion.div
          className="absolute inset-0"
          style={{ rotateY: smoothRotate }}
        >
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <div
              key={angle}
              className="absolute inset-0 rounded-full border border-white/[0.04]"
              style={{ transform: `rotateY(${angle}deg)` }}
            />
          ))}
        </motion.div>

        {/* Location pins */}
        {locations.map((loc, i) => {
          const rot = (smoothRotate.get() * 180) / Math.PI;
          return (
            <GlobePin
              key={i}
              location={loc}
              rotateOffset={rot}
              onHover={setHoveredPin}
              isHovered={hoveredPin === i}
              index={i}
              smoothRotate={smoothRotate}
            />
          );
        })}
      </motion.div>

      {/* Tooltip */}
      {hoveredPin !== null && locations[hoveredPin] && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-white whitespace-nowrap"
          style={{ borderRadius: 0 }}
        >
          {locations[hoveredPin].label}
        </motion.div>
      )}
    </div>
  );
};

const GlobePin = ({ location, smoothRotate, onHover, isHovered, index }) => {
  const [xy, setXY] = useState({ left: '50%', top: '50%', visible: true });

  useAnimationFrame(() => {
    const rotDeg = (smoothRotate.get() * 180) / Math.PI;
    const phi = ((90 - location.lat) * Math.PI) / 180;
    const thetaDeg = location.lng + rotDeg;
    const theta = (thetaDeg * Math.PI) / 180;
    const x = Math.sin(phi) * Math.cos(theta);
    const z = Math.sin(phi) * Math.sin(theta);
    const y = Math.cos(phi);
    const visible = z > 0;
    // Map -1..1 to 0..100% (160px = half of 320px sphere)
    setXY({
      left: `${((x + 1) / 2) * 100}%`,
      top: `${((-y + 1) / 2) * 100}%`,
      visible,
      depth: z,
    });
  });

  if (!xy.visible) return null;
  const scale = 0.6 + xy.depth * 0.4;

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: xy.left, top: xy.top, scale, zIndex: Math.round(xy.depth * 100) }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Ping animation */}
      <motion.div
        className="absolute -inset-2 rounded-full bg-white/20"
        animate={{ scale: [1, 2], opacity: [0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Pin dot */}
      <div
        className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
          isHovered ? 'bg-white border-white scale-125' : 'bg-white/60 border-white/40'
        }`}
      />
      {/* Label on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: -8 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black border border-white/20 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap"
          style={{ borderRadius: 0 }}
        >
          {location.label}
        </motion.div>
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────
   TRACING BEAM  (left-side animated progress beam)
───────────────────────────────────────────────────── */
export const TracingBeam = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight * 0.8]), {
    stiffness: 500, damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight * 0.9]), {
    stiffness: 500, damping: 90,
  });

  return (
    <motion.div ref={ref} className={`relative mx-auto max-w-4xl ${className}`}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: scrollYProgress.get() > 0 ? 'none' : 'rgba(255,255,255,0.3) 0px 0px 0px 1px' }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-white/30 shadow-sm"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{ backgroundColor: scrollYProgress.get() > 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)' }}
            className="h-2 w-2 rounded-full border border-white/40 bg-white/10"
          />
        </motion.div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeOpacity="0.16"
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="rgba(255,255,255,0)" stopOpacity="0" />
              <stop stopColor="rgba(255,255,255,0.8)" />
              <stop offset="0.325" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
