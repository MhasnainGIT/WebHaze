import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

/* ─── 3D BACKGROUND ─── */
const Bg3D = () => {
  const sx = useSpring(0, { stiffness: 40, damping: 25 });
  const sy = useSpring(0, { stiffness: 40, damping: 25 });
  useEffect(() => {
    const h = (e) => { sx.set((e.clientX / window.innerWidth - 0.5) * 80); sy.set((e.clientY / window.innerHeight - 0.5) * 80); };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, [sx, sy]);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div style={{ x: sx, y: sy }} className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-white/[0.015] blur-[120px] rounded-full" />
      <motion.div style={{ x: useTransform(sx, v => -v * 1.3), y: useTransform(sy, v => -v * 1.3) }} className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full" />
      <motion.div style={{ x: useTransform(sx, v => v * 0.15), y: useTransform(sy, v => v * 0.15), backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} className="absolute inset-[-120px]" />
    </div>
  );
};

/* ─── GLASS CARD ─── */
const Glass = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-700 overflow-hidden relative group ${className}`} style={{ borderRadius: 0 }}>
    {children}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
  </div>
);

/* ─── HERO ─── */
const Hero = () => {
  const { user } = useAuth();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <motion.div style={{ y, opacity }} className="w-full relative z-10 pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl mb-12" style={{ borderRadius: 0 }}>
              <div className="w-2 h-2 bg-white animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/50" style={{ fontFamily: f.l }}>#1 Web Agency Hyderabad</span>
            </div>
          </ScrollReveal>
          <motion.h1 className="text-[52px] md:text-[100px] lg:text-[140px] font-black leading-[0.9] mb-12 tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
            WE BUILD<br /><span className="text-white/20">WITHOUT LIMITS.</span>
          </motion.h1>
          <ScrollReveal delay={0.3}>
            <p className="text-lg md:text-xl text-white/40 mb-16 max-w-xl leading-relaxed" style={{ fontFamily: f.b }}>
              WebHaze is a premier digital agency providing comprehensive web design, high-performance app development, and enterprise-grade cloud server infrastructure. Scalable digital solutions for global visionaries.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.5} className="flex flex-col sm:flex-row gap-4">
            <Link to={user ? "/contact" : "/signup"} className="px-10 py-4 bg-white !text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all" style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}>Launch Vision</Link>
            <Link to="/pricing" className="px-10 py-4 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all" style={{ borderRadius: 0, fontFamily: f.l }}>View Solutions</Link>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  );
};

/* ─── FEATURES ─── */
const Features = () => {
  const items = [
    { t: "99.9% UPTIME", d: "Enterprise-grade infrastructure with zero downtime guarantee.", span: "md:col-span-7" },
    { t: "GLOBAL SSL", d: "End-to-end encryption across every endpoint.", span: "md:col-span-5" },
    { t: "SSD STORAGE", d: "NVMe-powered edge delivery for sub-second loads.", span: "md:col-span-5" },
    { t: "EXPERT SUPPORT", d: "Real engineers available 24/7 to help you scale.", span: "md:col-span-7" },
  ];
  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>INFRASTRUCTURE</span>
          <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>SCALABLE &<br/><span className="text-white/20">RELIABLE.</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className={item.span}>
              <Glass className="h-full">
                <div className="p-8 md:p-10 flex flex-col justify-between min-h-[200px] md:min-h-[240px]">
                  <span className="text-[11px] font-medium tracking-[0.15em] text-white/20 uppercase mb-6" style={{ fontFamily: f.l }}>0{i + 1}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-[-0.02em] uppercase" style={{ fontFamily: f.h }}>{item.t}</h3>
                    <p className="text-white/35 text-sm md:text-base leading-relaxed" style={{ fontFamily: f.b }}>{item.d}</p>
                  </div>
                </div>
              </Glass>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── THE PROCESS ─── */
const Process = () => {
  const steps = [
    { n: "01", t: "STRATEGY", d: "Precision global infrastructure.", detail: "We analyze your goals and architect the perfect digital foundation." },
    { n: "02", t: "INTEGRATION", d: "Elite security & AI deployment.", detail: "One-click deployment with enterprise-grade security protocols." },
    { n: "03", t: "LAUNCH", d: "Rapid scale with 24/7 support.", detail: "Go live instantly with edge hosting and round-the-clock monitoring." },
  ];
  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>METHODOLOGY</span>
          <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>THE<br/><span className="text-white/20">PROCESS.</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <Glass className="h-full">
                <div className="absolute -top-4 -right-2 text-[140px] md:text-[160px] font-black text-white/[0.03] select-none leading-none pointer-events-none transition-all duration-700 group-hover:text-white/[0.06]" style={{ fontFamily: f.h }}>{s.n}</div>
                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[280px] md:min-h-[360px]">
                  <span className="text-[11px] font-medium tracking-[0.15em] text-white/20 uppercase mb-6" style={{ fontFamily: f.l }}>PHASE {s.n}</span>
                  <div className="w-8 h-px bg-white/25 mb-8 group-hover:w-16 group-hover:bg-white/60 transition-all duration-700" />
                  <h3 className="text-2xl md:text-[36px] font-bold mb-4 tracking-[-0.02em] uppercase leading-none" style={{ fontFamily: f.h }}>{s.t}</h3>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed" style={{ fontFamily: f.b }}>{s.d}</p>
                  <p className="text-white/20 text-sm leading-relaxed mt-auto pt-6 border-t border-white/[0.05]" style={{ fontFamily: f.b }}>{s.detail}</p>
                </div>
              </Glass>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES ─── */
const Services = () => {
  const items = [
    { t: "AI BUILDER", d: "Generate stunning professional sites in seconds with intelligent automation." },
    { t: "ELITE HOSTING", d: "Lightning-fast edge nodes with custom domain and global CDN." },
    { t: "NEXUS SUPPORT", d: "24/7 expert management for enterprise-scale operations." },
  ];
  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>CAPABILITIES</span>
          <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>THE<br/><span className="text-white/20">STUDIO.</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-24">
          {items.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Glass className="h-full">
                <div className="p-8 md:p-10 flex flex-col min-h-[220px] md:min-h-[280px]">
                  <span className="text-[11px] font-medium tracking-[0.15em] text-white/20 uppercase mb-6" style={{ fontFamily: f.l }}>0{i + 1}</span>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-[-0.02em] uppercase" style={{ fontFamily: f.h }}>{s.t}</h3>
                  <p className="text-white/35 text-sm md:text-base leading-relaxed mt-auto" style={{ fontFamily: f.b }}>{s.d}</p>
                </div>
              </Glass>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="flex justify-center">
          <Link to="/pricing" className="px-14 py-5 bg-white !text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all" style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}>Explore Plans</Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ─── PRICING ─── */
const Pricing = () => {
  const plans = [
    { t: "BASIC", p: "₹999", feats: ["Security patching", "Cloud backups", "Standard support"] },
    { t: "PROFESSIONAL", p: "₹2,499", feats: ["SEO Optimization", "Elite Support", "Performance tuning"], pop: true },
    { t: "ENTERPRISE", p: "₹4,999", feats: ["24/7 Response", "Shadow backups", "Custom integration"] },
  ];
  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>INVESTMENT</span>
          <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>CARE<br/><span className="text-white/20">STUDIO.</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`relative flex flex-col h-full p-8 md:p-10 border transition-all duration-700 ${p.pop ? 'border-white/20 bg-white/[0.05]' : 'border-white/[0.08] bg-white/[0.02]'}`} style={{ borderRadius: 0 }}>
                {p.pop && <div className="absolute -top-3.5 left-8 bg-white text-black text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1.5" style={{ borderRadius: 0, fontFamily: f.l }}>Elite Choice</div>}
                <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-8" style={{ fontFamily: f.l }}>{p.t}</span>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-4xl md:text-[56px] font-black text-white tracking-[-0.03em]" style={{ fontFamily: f.h }}>{p.p}</span>
                  <span className="text-white/20 text-[11px] tracking-[0.1em]" style={{ fontFamily: f.l }}>/MO</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {p.feats.map((feat, j) => (
                    <li key={j} className="flex items-center text-white/35 gap-3 text-sm md:text-base" style={{ fontFamily: f.b }}>
                      <div className="w-1 h-1 bg-white/30 flex-shrink-0" />{feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`block text-center px-6 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-all ${p.pop ? 'bg-white !text-black hover:bg-white/90' : 'bg-transparent text-white border border-white/[0.08] hover:border-white'}`} style={{ borderRadius: 0, fontFamily: f.l, color: p.pop ? '#000000' : undefined }}>
                  {p.pop ? "Get Started" : "Initialize"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TESTIMONIALS ─── */
const Testimonials = () => {
  const items = [
    { q: "WebHaze transformed our online presence. 40% growth in organic traffic within weeks.", a: "Sarah M.", r: "CEO, TechFlow", v: "https://i.pravatar.cc/150?u=sarah" },
    { q: "Modern, responsive, and it doubled our online orders. Outstanding support.", a: "Marco R.", r: "Owner, Bella Vista", v: "https://i.pravatar.cc/150?u=marco" },
    { q: "A site that perfectly represents our brand. Worth every rupee invested.", a: "Jennifer C.", r: "Founder, GreenLeaf", v: "https://i.pravatar.cc/150?u=jennifer" },
  ];
  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>TESTIMONIALS</span>
          <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>THE<br/><span className="text-white/20">VOICE.</span></h2>
        </ScrollReveal>
        <div className="flex flex-col gap-6 md:gap-12">
          {items.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className={`w-full md:w-8/12 ${i % 2 === 0 ? 'self-start' : 'self-end'}`}>
              <Glass className="h-full">
                <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[280px]">
                  <div>
                    <div className="flex gap-1 text-white/40 mb-6">{[1,2,3,4,5].map(s => <svg key={s} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                    <p className="text-white/50 text-base md:text-xl leading-relaxed italic" style={{ fontFamily: f.b }}>"{t.q}"</p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/[0.05] pt-6 mt-8">
                    <img src={t.v} alt={t.a} className="w-12 h-12 grayscale border border-white/[0.08]" style={{ borderRadius: 0 }} />
                    <div>
                      <p className="font-bold text-base text-white" style={{ fontFamily: f.h }}>{t.a}</p>
                      <p className="text-white/20 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: f.l }}>{t.r}</p>
                    </div>
                  </div>
                </div>
              </Glass>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Do you offer domain registration?", a: "Yes. Elite global domain management with full DNS control, WHOIS privacy, and auto-renewal included." },
    { q: "How fast can I launch?", a: "Instantly. Our automated pipeline goes live the moment you approve. Zero waiting." },
    { q: "Can I contact support via WhatsApp?", a: "Absolutely. 24/7 direct access to our engineering team via WhatsApp, Phone, and Email." },
  ];
  return (
    <section className="py-24 md:py-40 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-5/12">
          <ScrollReveal className="lg:sticky lg:top-32">
            <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>FAQ</span>
            <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95] mb-6" style={{ fontFamily: f.h }}>THE<br/><span className="text-white/20">INSIGHTS.</span></h2>
            <p className="text-white/25 text-sm leading-relaxed" style={{ fontFamily: f.b }}>Everything you need before launch.</p>
          </ScrollReveal>
        </div>
        <div className="lg:w-7/12 space-y-2">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="left">
              <div>
                <button onClick={() => setOpen(open === i ? null : i)} className={`w-full text-left p-6 md:p-8 flex items-center justify-between transition-all duration-500 border border-white/[0.08] ${open === i ? 'bg-white/[0.05]' : 'bg-white/[0.02] hover:bg-white/[0.04]'}`} style={{ borderRadius: 0 }}>
                  <span className="text-base md:text-lg font-bold tracking-[-0.01em] uppercase pr-4" style={{ fontFamily: f.h }}>{faq.q}</span>
                  <div className={`w-8 h-8 border border-white/[0.08] flex-shrink-0 flex items-center justify-center transition-all duration-500 ${open === i ? 'bg-white text-black rotate-180' : 'text-white'}`} style={{ borderRadius: 0 }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <div className="p-6 md:p-8 text-white/35 text-sm md:text-base leading-relaxed bg-white/[0.02] border-x border-b border-white/[0.08]" style={{ fontFamily: f.b, borderRadius: 0 }}>{faq.a}</div>
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

/* ─── CTA ─── */
const CTA = () => {
  const { user } = useAuth();
  return (
    <section className="py-32 md:py-48 bg-black relative z-10 px-6 md:px-20 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-8" style={{ fontFamily: f.l }}>LET'S WORK TOGETHER</span>
          <h2 className="text-[48px] md:text-[96px] lg:text-[140px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-16" style={{ fontFamily: f.h }}>READY TO<br/><span className="text-white/20">SCALE?</span></h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={user ? "/contact" : "/signup"} className="px-14 py-5 bg-white !text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all" style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}>Launch Vision</Link>
          <Link to="/contact" className="px-14 py-5 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all" style={{ borderRadius: 0, fontFamily: f.l }}>Contact Us</Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ─── HOME ─── */
const Home = () => (
  <div className="relative">
    <SEO title="WebHaze | Premium Web Agency & Enterprise Cloud Solutions" description="WebHaze is a premier web design, development, and cloud hosting agency. We offer enterprise-grade Linux/Windows VPS, Dedicated Servers, and scalable digital solutions." keywords="Web Designing Hyderabad, Enterprise Cloud Servers, Managed VPS Hosting, Dedicated Servers, App Development, WebHaze" canonical="/" />
    <Bg3D />
    <Hero />
    <Features />
    <Process />
    <Services />
    <Pricing />
    <Testimonials />
    <FAQ />
    <CTA />
  </div>
);

export default Home;