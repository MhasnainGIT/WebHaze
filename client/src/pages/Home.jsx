import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import {
  SpotlightCard,
  TextGenerateEffect,
  BackgroundBeams,
  BackgroundLines,
  BackgroundBoxes,
  LampContainer,
  NumberTicker,
  WavyText,
  GlowingStarsBackground,
  ScrollVelocity,
  Vortex,
  Timeline,
} from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const loadGlobe = () => import('../components/ui/3d-globe');
const Globe3D = React.lazy(loadGlobe);

/* ─── 3D Mouse-parallax background ─── */
const Bg3D = () => {
  const sx = useSpring(0, { stiffness: 40, damping: 25 });
  const sy = useSpring(0, { stiffness: 40, damping: 25 });
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const h = (e) => {
      sx.set((e.clientX / window.innerWidth - 0.5) * 80);
      sy.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, [sx, sy]);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-white/[0.015] blur-[120px] rounded-full"
      />
      <motion.div
        style={{ x: useTransform(sx, (v) => -v * 1.3), y: useTransform(sy, (v) => -v * 1.3) }}
        className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full"
      />
      <motion.div
        style={{
          x: useTransform(sx, (v) => v * 0.15),
          y: useTransform(sy, (v) => v * 0.15),
          backgroundImage:
            'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        className="absolute inset-[-120px]"
      />
    </div>
  );
};

/* ─── Hero ─── */
const Hero = () => {
  const { user } = useAuth();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const mx = useSpring(0, { stiffness: 120, damping: 18 });
  const my = useSpring(0, { stiffness: 120, damping: 18 });
  const tx = useTransform(mx, [-0.5, 0.5], ['-20px', '20px']);
  const ty = useTransform(my, [-0.5, 0.5], ['-14px', '14px']);

  useEffect(() => {
    const onMouse = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Aceternity: BackgroundBeams */}
      <BackgroundBeams />
      {/* Aceternity: BackgroundLines — SVG wave paths */}
      <BackgroundLines className="absolute inset-0 opacity-60" />
      {/* Aceternity: GlowingStarsBackground wraps the whole hero */}
      <GlowingStarsBackground className="absolute inset-0" />

      <motion.div style={{ y, opacity }} className="w-full relative z-10 pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl mb-12"
              style={{ borderRadius: 0 }}
            >
              <div className="w-2 h-2 bg-white animate-pulse" />
              <span
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-white"
                style={{ fontFamily: f.l }}
              >
                Web design in Hyderabad · 2027
              </span>
            </div>
          </ScrollReveal>

          <div className="mb-12">
            <motion.h1
              className="text-[52px] md:text-[100px] lg:text-[140px] font-black leading-[0.9] tracking-[-0.04em] uppercase"
              style={{ fontFamily: f.h, x: tx, y: ty }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              WE BUILD<br />
              <span className="text-white">WITHOUT LIMITS.</span>
            </motion.h1>
          </div>

          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="We build fast websites, online stores, and apps for businesses. We also make web hosting simple."
              className="text-lg md:text-xl text-white/70 mb-16 max-w-xl leading-relaxed"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.5} className="flex flex-col sm:flex-row gap-4">
            <Link
              to={user ? '/contact' : '/signup'}
              className="px-10 py-4 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
              style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
            >
              Start a project
            </Link>
            <Link
              to="/pricing"
              className="px-10 py-4 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all"
              style={{ borderRadius: 0, fontFamily: f.l }}
            >
              See our plans
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-10">
              <span
                className="text-[11px] text-white/40 tracking-[0.1em] uppercase"
                style={{ fontFamily: f.l }}
              >
                Trusted by
              </span>
              {['UrbanCart', 'Spice Route', 'GreenBuild', 'NexaTech', 'BoldMedia'].map((name, i) => (
                <span
                  key={i}
                  className="text-[12px] font-bold text-white/30 tracking-[0.08em] uppercase hover:text-white/60 transition-colors"
                  style={{ fontFamily: f.h }}
                >
                  {name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white" />
        <span className="text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: f.l }}>
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};

/* ─── Stats Banner (Aceternity NumberTicker) ─── */
const StatsBanner = () => {
  const stats = [
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 99, suffix: '.9%', label: 'Website uptime' },
    { value: 40, suffix: '%', label: 'More conversions' },
    { value: 5, suffix: 'min', label: 'Support reply' },
  ];

  return (
    <section className="border-t border-b border-white/[0.06] bg-black relative z-10 py-12 px-6 md:px-20 overflow-hidden">
      {/* Aceternity: ScrollVelocity ticker behind the stats */}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <ScrollVelocity text1="WEBHAZE" text2="DIGITAL AGENCY" />
      </div>
      <div className="max-w-[1440px] mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div
              className="text-[48px] md:text-[64px] font-black tracking-[-0.04em] text-white leading-none"
              style={{ fontFamily: f.h }}
            >
              <NumberTicker value={s.value} suffix={s.suffix} />
            </div>
            <p
              className="text-[11px] text-white/40 tracking-[0.15em] uppercase mt-2"
              style={{ fontFamily: f.l }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Features (Aceternity SpotlightCard) ─── */
const Features = () => {
  const items = [
    {
      t: '99.9% UPTIME',
      d: 'Fast, reliable hosting to keep your website online.',
      span: 'md:col-span-7',
    },
    {
      t: 'GLOBAL SSL',
      d: 'SSL security to help protect your website and its visitors.',
      span: 'md:col-span-5',
    },
    {
      t: 'SSD STORAGE',
      d: 'Fast storage helps your pages load quickly.',
      span: 'md:col-span-5',
    },
    {
      t: 'EXPERT SUPPORT',
      d: 'Our team is here day and night when you need help.',
      span: 'md:col-span-7',
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6"
            style={{ fontFamily: f.l }}
          >
            WEB HOSTING
          </span>
          <h2
            className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]"
            style={{ fontFamily: f.h }}
          >
            <WavyText text="FAST &" />
            <br />
            <WavyText text="RELIABLE." delay={0.3} />
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className={item.span}>
              {/* Aceternity: SpotlightCard for magnetic hover glow */}
              <SpotlightCard
                className="h-full border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
                spotlightColor="rgba(255,255,255,0.06)"
              >
                <div className="p-8 md:p-10 flex flex-col justify-between min-h-[200px] md:min-h-[240px]">
                  <span
                    className="text-[11px] font-medium tracking-[0.15em] text-white uppercase mb-6"
                    style={{ fontFamily: f.l }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3 tracking-[-0.02em] uppercase"
                      style={{ fontFamily: f.h }}
                    >
                      {item.t}
                    </h3>
                    <p
                      className="text-white/60 text-sm md:text-base leading-relaxed"
                      style={{ fontFamily: f.b }}
                    >
                      {item.d}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Process (Aceternity Timeline) ─── */
const Process = () => {
  const timelineData = [
    {
      title: 'STRATEGY',
      content: (
        <SpotlightCard
          className="border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
          spotlightColor="rgba(255,255,255,0.05)"
        >
          <div className="p-8 md:p-10">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-4"
              style={{ fontFamily: f.l }}
            >
              PHASE 01
            </span>
            <h3
              className="text-2xl md:text-[36px] font-bold mb-4 tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: f.h }}
            >
              A clear plan
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed" style={{ fontFamily: f.b }}>
              We learn what you need, then make a clear plan for your website.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
    {
      title: 'INTEGRATION',
      content: (
        <SpotlightCard
          className="border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
          spotlightColor="rgba(255,255,255,0.05)"
        >
          <div className="p-8 md:p-10">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-4"
              style={{ fontFamily: f.l }}
            >
              PHASE 02
            </span>
            <h3
              className="text-2xl md:text-[36px] font-bold mb-4 tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: f.h }}
            >
              Build and test
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed" style={{ fontFamily: f.b }}>
              We build your website, check that it works, and make it ready to go live.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
    {
      title: 'LAUNCH',
      content: (
        <SpotlightCard
          className="border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
          spotlightColor="rgba(255,255,255,0.05)"
        >
          <div className="p-8 md:p-10">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-4"
              style={{ fontFamily: f.l }}
            >
              PHASE 03
            </span>
            <h3
              className="text-2xl md:text-[36px] font-bold mb-4 tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: f.h }}
            >
              Go live
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed" style={{ fontFamily: f.b }}>
              We help you launch and keep your site running. Our team is here when you need help.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6"
            style={{ fontFamily: f.l }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]"
            style={{ fontFamily: f.h }}
          >
            THREE STEPS
          </h2>
        </ScrollReveal>
        {/* Aceternity: Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

/* ─── Services (FeatureIconCard style + Vortex bg) ─── */
const Services = () => {
  const capabilities = [
    { label: 'React', title: 'React' },
    { label: 'Node.js', title: 'Node' },
    { label: 'AWS', title: 'AWS' },
    { label: 'MongoDB', title: 'DB' },
    { label: 'Next.js', title: 'Next' },
  ];

  const cards = [
    {
      num: '01',
      badge: 'Easy to use',
      title: 'AI BUILDER',
      description:
        'Tell our site builder what you need and get a website draft to edit.',
      tools: capabilities.slice(0, 3),
    },
    {
      num: '02',
      badge: 'Fast hosting',
      title: 'ELITE HOSTING',
      description:
        'Fast hosting, custom domains, and a worldwide content network help your site load quickly.',
      tools: capabilities.slice(1, 4),
    },
    {
      num: '03',
      badge: 'Help any time',
      title: 'NEXUS SUPPORT',
      description:
        'Get help from our team any time, day or night.',
      tools: capabilities.slice(2, 5),
    },
  ];

  return (
    <section className="py-24 md:py-40 relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Aceternity: Vortex particle background */}
      <Vortex className="absolute inset-0 opacity-40" particleCount={300} />
      {/* Aceternity: BackgroundLines overlay */}
      <BackgroundLines className="absolute inset-0 opacity-30" />

      <div className="max-w-[1440px] mx-auto relative z-10 px-6 md:px-20">
        <ScrollReveal className="mb-16 md:mb-24">
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6"
            style={{ fontFamily: f.l }}
          >
            WHAT WE DO
          </span>
          <h2
            className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]"
            style={{ fontFamily: f.h }}
          >
            THE
            <br />
            <span className="text-white">STUDIO.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-24">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <SpotlightCard
                className="h-full border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.03] backdrop-blur-xl"
                spotlightColor="rgba(255,255,255,0.08)"
              >
                <div className="relative overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] px-3 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span
                      className="text-[10px] font-black tracking-[0.12em] uppercase text-white/60"
                      style={{ fontFamily: f.l }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  {/* Tool chips row */}
                  <div className="flex items-center justify-center gap-3 pt-16 pb-8 px-6">
                    {card.tools.map((tool, j) => (
                      <motion.div
                        key={j}
                        className="w-10 h-10 bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        style={{ borderRadius: 0 }}
                      >
                        <span
                          className="text-[9px] font-black tracking-widest uppercase"
                          style={{ fontFamily: f.l }}
                        >
                          {tool.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  {/* Content */}
                  <div className="px-6 pb-8">
                    <span
                      className="text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase block mb-3"
                      style={{ fontFamily: f.l }}
                    >
                      {card.num}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-black mb-3 tracking-[-0.02em] uppercase"
                      style={{ fontFamily: f.h }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-white/60 text-sm leading-relaxed"
                      style={{ fontFamily: f.b }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-center gap-4">
          <Link
            to="/pricing"
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            Explore Plans
          </Link>
          <Link
            to="/portfolio"
            className="px-14 py-5 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all"
            style={{ borderRadius: 0, fontFamily: f.l }}
          >
            Our Work
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

const locations = [
  { lat: 17.385, lng: 78.4867, city: 'Hyderabad', country: 'India', avatar: 1 },
  { lat: 25.2048, lng: 55.2708, city: 'Dubai', country: 'UAE', avatar: 10 },
  { lat: 51.5072, lng: -0.1276, city: 'London', country: 'UK', avatar: 2 },
  { lat: 40.7128, lng: -74.006, city: 'New York', country: 'USA', avatar: 1 },
  { lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'SG', avatar: 12 },
  { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', avatar: 5 },
];

const globeMarkers = locations.map(({ lat, lng, city, avatar }) => ({
  lat,
  lng,
  label: city,
  src: `https://assets.aceternity.com/avatars/${avatar}.webp`,
}));

/* ─── Global Reach (Aceternity 3D Globe) ─── */
const GlobalReach = () => {
  const globeRef = useRef(null);
  useEffect(() => {
    const preloadGlobe = () => {
      loadGlobe().catch((error) => {
        console.error('Unable to preload the globe.', error);
      });
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(preloadGlobe, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preloadGlobe, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const showGlobe = useInView(globeRef, {
    once: true,
    amount: 0.1,
    margin: '1200px 0px',
  });

  return (
    <section className="py-24 md:py-32 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text side */}
          <div className="lg:w-1/2">
            <ScrollReveal>
              <span
                className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                style={{ fontFamily: f.l }}
              >
                WHERE CLIENTS ARE
              </span>
              <h2
                className="text-[40px] md:text-[64px] font-black tracking-[-0.03em] uppercase leading-[0.95] mb-8"
                style={{ fontFamily: f.h }}
              >
                CLIENTS AROUND
                <br />
                <span className="text-white">THE WORLD.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
                We work with businesses in Hyderabad, Dubai, London, New York, Singapore, and Paris.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {locations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2 border-b border-white/[0.05]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                    <span
                      className="text-[11px] text-white/50 uppercase tracking-[0.1em] ml-auto"
                      style={{ fontFamily: f.l }}
                    >
                      {loc.city}, {loc.country}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
          {/* Globe side */}
          <div className="lg:w-1/2 flex justify-center">
            <ScrollReveal delay={0.3}>
              <div ref={globeRef} className="w-full max-w-[520px]">
                {showGlobe ? (
                  <React.Suspense
                    fallback={
                      <div className="flex h-[380px] w-full items-center justify-center text-sm text-white/40 md:h-[500px]">
                        Loading globe…
                      </div>
                    }
                  >
                    <Globe3D
                      markers={globeMarkers}
                      config={{
                        atmosphereColor: '#4da6ff',
                        atmosphereIntensity: 0.1,
                        bumpScale: 5,
                        autoRotateSpeed: 0.3,
                      }}
                      className="max-w-[520px]"
                    />
                  </React.Suspense>
                ) : (
                  <div className="h-[380px] w-full md:h-[500px]" aria-hidden="true" />
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Pricing link ─── */
const PricingLink = () => (
  <section className="py-12 md:py-16 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <span
          className="text-[11px] font-medium tracking-[0.15em] text-white/50 uppercase block mb-3"
          style={{ fontFamily: f.l }}
        >
          PRICING
        </span>
        <h2 className="text-2xl md:text-3xl font-black uppercase" style={{ fontFamily: f.h }}>
          See all plans and prices
        </h2>
      </div>
      <Link
        to="/pricing"
        className="px-8 py-4 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
        style={{ fontFamily: f.l, color: '#000000' }}
      >
        View pricing
      </Link>
    </div>
  </section>
);

/* ─── Testimonials — clean staggered layout, no CardStack overlap ─── */
const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const items = [
    {
      quote: 'Our conversion rate rose 40% in the first month.',
      name: 'Ravi K.',
      role: 'Founder, UrbanCart',
      metric: '+40%',
      metricLabel: 'Conversions',
    },
    {
      quote: 'Our bookings doubled after the new site launched.',
      name: 'Priya S.',
      role: 'Owner, Spice Route',
      metric: '2×',
      metricLabel: 'Bookings',
    },
    {
      quote: 'Our site reached Google’s first page in 60 days.',
      name: 'Arjun M.',
      role: 'CEO, GreenBuild',
      metric: '#1',
      metricLabel: 'Google',
    },
    {
      quote: 'Our demo requests tripled after our new site went live.',
      name: 'Kiran T.',
      role: 'CTO, NexaTech',
      metric: '3×',
      metricLabel: 'Demo Requests',
    },
    {
      quote: 'Our new site makes our brand look its best.',
      name: 'Sneha R.',
      role: 'Creative Director, BoldMedia',
      metric: '2.5×',
      metricLabel: 'Project Value',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-10">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6" style={{ fontFamily: f.l }}>
            CLIENT RESULTS
          </span>
          <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>
            WHAT CLIENTS SAY
          </h2>
        </ScrollReveal>

        <div
          id="client-reviews"
          className={`grid gap-4 ${showAll ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        >
          {(showAll ? items : items.slice(0, 1)).map((t, i) => (
            <ScrollReveal
              key={t.name}
              delay={i * 0.05}
              className={showAll ? 'h-full' : 'h-full sm:col-span-2 lg:col-span-3'}
            >
              <SpotlightCard
                className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-700"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="h-full p-5">
                  <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 mb-4">
                    <span className="text-lg font-black text-white" style={{ fontFamily: f.h }}>{t.metric}</span>
                    <span className="text-[10px] font-medium text-white/40 uppercase tracking-[0.1em]" style={{ fontFamily: f.l }}>{t.metricLabel}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-5" style={{ fontFamily: f.b }}>
                    "{t.quote}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                    <div className="w-8 h-8 bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ fontFamily: f.h }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-sm text-white uppercase tracking-tight" style={{ fontFamily: f.h }}>{t.name}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: f.l }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="client-reviews"
            onClick={() => setShowAll((current) => !current)}
            className="px-6 py-3 border border-white/20 text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white transition-colors"
            style={{ fontFamily: f.l }}
          >
            {showAll ? 'Show less' : 'Show more reviews'}
          </button>
        </div>

        {/* CTA row */}
        <ScrollReveal delay={0.2} className="mt-8 flex justify-center">
          <Link
            to="/portfolio"
            className="px-10 py-4 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            See All Case Studies
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: 'Can you help me get a domain name?',
      a: 'Yes. We can help you choose and manage a domain name for your website.',
    },
    {
      q: 'How fast can I launch?',
      a: 'We will agree on a launch date with you before we start.',
    },
    {
      q: 'Can I contact support via WhatsApp?',
      a: 'Yes. You can reach us by WhatsApp, phone, or email.',
    },
    {
      q: 'What technologies do you use?',
      a: 'We choose the tools that fit your website and what you need it to do.',
    },
    {
      q: 'Do you offer ongoing maintenance?',
      a: 'Yes. We can help keep your website up to date after launch.',
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-5/12">
          <ScrollReveal className="lg:sticky lg:top-32">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              FAQ
            </span>
            <h2
              className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95] mb-6"
              style={{ fontFamily: f.h }}
            >
              COMMON
              <br />
              <span className="text-white">QUESTIONS.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: f.b }}>
              Answers to common questions.
            </p>
          </ScrollReveal>
        </div>
        <div className="lg:w-7/12 space-y-2">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="left">
              <div>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`w-full text-left p-6 md:p-8 flex items-center justify-between transition-all duration-500 border border-white/[0.08] ${
                    open === i ? 'bg-white/[0.05]' : 'bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <span
                    className="text-base md:text-lg font-bold tracking-[-0.01em] uppercase pr-4"
                    style={{ fontFamily: f.h }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 border border-white/[0.08] flex-shrink-0 flex items-center justify-center transition-all duration-500 ${
                      open === i ? 'bg-white text-black rotate-180' : 'text-white'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="p-6 md:p-8 text-white/60 text-sm md:text-base leading-relaxed bg-white/[0.02] border-x border-b border-white/[0.08]"
                        style={{ fontFamily: f.b, borderRadius: 0 }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA (Aceternity LampContainer + BackgroundBoxes ripple) ─── */
const CTA = () => {
  const { user } = useAuth();

  return (
    <section className="relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Aceternity: BackgroundBoxes ripple grid fills the section */}
      <BackgroundBoxes className="absolute inset-0 w-full h-full" />
      {/* Gradient mask over boxes so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 pointer-events-none" />
      {/* Aceternity: LampContainer */}
      <LampContainer className="relative z-10">
        <ScrollReveal>
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-8 text-center"
            style={{ fontFamily: f.l }}
          >
            LET'S WORK TOGETHER
          </span>
          <h2
            className="text-[48px] md:text-[96px] lg:text-[120px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-16 text-center"
            style={{ fontFamily: f.h }}
          >
            READY TO
            <br />
            <span className="text-white">SCALE?</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={user ? '/contact' : '/signup'}
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            Start a project
          </Link>
          <Link
            to="/contact"
            className="px-14 py-5 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all"
            style={{ borderRadius: 0, fontFamily: f.l }}
          >
            Contact Us
          </Link>
        </ScrollReveal>
      </LampContainer>
    </section>
  );
};

/* ─── Page ─── */
const Home = () => (
  <div className="relative">
    <SEO
      title="Web Design & Hosting in Hyderabad 2027 | WebHaze"
      description="WebHaze builds fast websites, online stores, apps, and secure hosting for businesses in Hyderabad and around the world. Start your 2027 project with us."
      keywords="web design Hyderabad, website development Hyderabad, website hosting, online store design, app development, WebHaze"
      canonical="/"
      faq={[
        {
          question: 'Can you help me get a domain name?',
          answer: 'Yes. We can help you choose and manage a domain name for your website.',
        },
        {
          question: 'How fast can I launch?',
          answer: 'We will agree on a launch date with you before we start.',
        },
        {
          question: 'Can I contact support via WhatsApp?',
          answer: 'Yes. You can reach us by WhatsApp, phone, or email.',
        },
      ]}
    />
    <Bg3D />
    <Hero />
    <StatsBanner />
    <Features />
    <Process />
    <Services />
    <GlobalReach />
    <PricingLink />
    <Testimonials />
    <FAQ />
    <CTA />
  </div>
);

export default Home;
