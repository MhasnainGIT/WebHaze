import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import {
  SpotlightCard,
  TextGenerateEffect,
  WavyText,
  NumberTicker,
  GlowingStarsBackground,
  BackgroundBeams,
  ScrollVelocity,
  LampContainer,
} from '../components/ui/aceternity';
import { Link } from 'react-router-dom';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const About = () => {
  const stats = [
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 99, suffix: '%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      title: 'Precision',
      desc: 'Every pixel, every line of code — crafted with surgical precision. We don\'t ship anything we wouldn\'t be proud to show.',
    },
    {
      title: 'Velocity',
      desc: 'Speed without sacrificing quality. We move fast because we have the systems, the experience, and the drive.',
    },
    {
      title: 'Integrity',
      desc: 'No lock-in. No hidden fees. We tell you exactly what we\'re building, why, and what it will cost.',
    },
    {
      title: 'Impact',
      desc: 'We measure success in your metrics — conversions, rankings, revenue. If it doesn\'t move the needle, we iterate.',
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 relative overflow-hidden">
      <SEO
        title="About Us | Leading Web Development Agency in Hyderabad | WebHaze"
        description="Learn how WebHaze Studios became the #1 website designing company in Hyderabad. Our mission is to empower local businesses with global digital infrastructure."
        keywords="WebHaze Hyderabad, best web agency Hyderabad, website designers near me, Hyderabad IT solutions, professional web development"
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'About', url: 'https://www.webhaze.in/about' },
        ]}
      />

      {/* Aceternity: GlowingStarsBackground behind the whole page */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-50" />

      {/* ─── HERO ─── */}
      <div className="relative z-10 px-6 md:px-20 py-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl mb-24">
            <ScrollReveal>
              <span
                className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                style={{ fontFamily: f.l }}
              >
                ABOUT US
              </span>
              <h1
                className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-12 tracking-[-0.04em] uppercase"
                style={{ fontFamily: f.h }}
              >
                <WavyText text="OUR" />
                <br />
                <WavyText text="MISSION." delay={0.2} />
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              {/* Aceternity: TextGenerateEffect */}
              <TextGenerateEffect
                words="A Hyderabad-based collective of engineers building digital ecosystems that empower visionaries across India and beyond."
                className="text-xl md:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed"
              />
            </ScrollReveal>
          </div>

          {/* ─── Stats Row (Aceternity NumberTicker) ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 py-16 border-t border-b border-white/[0.06]">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
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
              </ScrollReveal>
            ))}
          </div>

          {/* ─── Innovation Node (Aceternity SpotlightCard) ─── */}
          <ScrollReveal className="mb-16">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              ABOUT THE STUDIO
            </span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
            <ScrollReveal className="md:col-span-2">
              <SpotlightCard
                className="border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
                spotlightColor="rgba(255,255,255,0.06)"
              >
                <div className="p-8 md:p-12">
                  <h2
                    className="text-3xl md:text-4xl font-black mb-8 tracking-tight uppercase"
                    style={{ fontFamily: f.h }}
                  >
                    The Innovation Node
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    <p
                      className="text-white/70 text-lg md:text-xl font-medium leading-relaxed"
                      style={{ fontFamily: f.b }}
                    >
                      Proudly part of Hyderabad's tech hub. We leverage global standards to deliver unmatched
                      web solutions for businesses that want to grow fast.
                    </p>
                    <p
                      className="text-white/70 text-lg md:text-xl font-medium leading-relaxed"
                      style={{ fontFamily: f.b }}
                    >
                      Innovative technology met with minimalist design. Ensuring every business — from local
                      restaurants to SaaS startups — has a seat at the digital table.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <SpotlightCard
                className="h-full border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="p-8 md:p-12 h-full">
                  <span
                    className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                    style={{ fontFamily: f.l }}
                  >
                    01
                  </span>
                  <h3
                    className="text-2xl font-black mb-6 tracking-tight uppercase text-white"
                    style={{ fontFamily: f.h }}
                  >
                    Vision
                  </h3>
                  <p
                    className="text-white/60 text-lg font-medium leading-relaxed"
                    style={{ fontFamily: f.b }}
                  >
                    Leading India's Website-as-a-Service frontier, starting from our home in Hyderabad and
                    scaling to serve visionaries across the globe.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <SpotlightCard
                className="h-full border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="p-8 md:p-12 h-full">
                  <span
                    className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                    style={{ fontFamily: f.l }}
                  >
                    02
                  </span>
                  <h3
                    className="text-2xl font-black mb-6 tracking-tight uppercase text-white"
                    style={{ fontFamily: f.h }}
                  >
                    Values
                  </h3>
                  <p
                    className="text-white/60 text-lg font-medium leading-relaxed"
                    style={{ fontFamily: f.b }}
                  >
                    Integrity and hard work drive every line of code we write and every node we deploy. We
                    believe in transparent pricing and results-first partnerships.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* ─── Aceternity: ScrollVelocity divider ─── */}
          <div className="mb-32 border-t border-white/[0.06] overflow-hidden">
            <ScrollVelocity text1="PRECISION · VELOCITY · INTEGRITY · IMPACT ·" text2="WEBHAZE · HYDERABAD · INDIA ·" />
          </div>

          {/* ─── Core Values Grid ─── */}
          <div className="mb-32">
            <ScrollReveal className="mb-16">
              <span
                className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                style={{ fontFamily: f.l }}
              >
                WHAT DRIVES US
              </span>
              <h2
                className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]"
                style={{ fontFamily: f.h }}
              >
                CORE <span className="text-white">VALUES.</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <SpotlightCard
                    className="h-full border border-white/[0.08] hover:border-white/20 transition-all duration-700 bg-white/[0.02]"
                    spotlightColor="rgba(255,255,255,0.05)"
                  >
                    <div className="p-8 md:p-10">
                      <span
                        className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-4"
                        style={{ fontFamily: f.l }}
                      >
                        0{i + 1}
                      </span>
                      <h3
                        className="text-2xl font-black mb-4 tracking-tight uppercase"
                        style={{ fontFamily: f.h }}
                      >
                        {v.title}
                      </h3>
                      <p
                        className="text-white/60 text-base leading-relaxed"
                        style={{ fontFamily: f.b }}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── Team Section ─── */}
          <div className="mb-24">
            <ScrollReveal className="mb-16">
              <span
                className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                style={{ fontFamily: f.l }}
              >
                THE TEAM
              </span>
              <h2
                className="text-[40px] md:text-[72px] font-black tracking-tight uppercase leading-[0.95]"
                style={{ fontFamily: f.h }}
              >
                THE <span className="text-white">TEAM.</span>
              </h2>
              <p className="text-white/40 text-lg mt-4 max-w-xl" style={{ fontFamily: f.b }}>
                The people behind every pixel and every deployment.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: 'Mohd Hasnain',
                  role: 'Founder & Lead Engineer',
                  bio: 'Full-stack engineer and product architect. Built WebHaze from the ground up to serve Hyderabad businesses with global-grade digital infrastructure.',
                  linkedin: 'https://linkedin.com',
                },
                {
                  name: 'Design Lead',
                  role: 'UI/UX & Brand',
                  bio: 'Crafts every interface with precision — from wireframe to pixel-perfect production. Obsessed with conversion-focused design.',
                  linkedin: 'https://linkedin.com',
                },
                {
                  name: 'Growth Lead',
                  role: 'SEO & Digital Strategy',
                  bio: 'Drives organic growth through technical SEO, content strategy, and data-driven campaigns for clients across India.',
                  linkedin: 'https://linkedin.com',
                },
              ].map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <SpotlightCard
                    className="h-full border border-white/[0.08] hover:border-white/20 transition-all duration-500 bg-white/[0.02]"
                    spotlightColor="rgba(255,255,255,0.07)"
                  >
                    <div className="p-8">
                      <div
                        className="w-16 h-16 bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white font-black text-2xl mb-6"
                        style={{ borderRadius: 0 }}
                      >
                        {member.name[0]}
                      </div>
                      <h3
                        className="text-xl font-black uppercase tracking-[-0.02em] mb-1"
                        style={{ fontFamily: f.h }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase mb-4"
                        style={{ fontFamily: f.l }}
                      >
                        {member.role}
                      </p>
                      <p
                        className="text-white/60 text-sm leading-relaxed mb-6"
                        style={{ fontFamily: f.b }}
                      >
                        {member.bio}
                      </p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase hover:text-white transition-colors"
                        style={{ fontFamily: f.l }}
                      >
                        LinkedIn →
                      </a>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── CTA ─── */}
          <ScrollReveal>
            <div className="border border-white/[0.08] p-12 md:p-20 text-center relative overflow-hidden bg-white/[0.01]">
              <BackgroundBeams />
              <div className="relative z-10">
                <span
                  className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
                  style={{ fontFamily: f.l }}
                >
                  READY TO BUILD?
                </span>
                <h2
                  className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10"
                  style={{ fontFamily: f.h }}
                >
                  LET'S BUILD
                  <br />
                  <span className="text-white">TOGETHER.</span>
                </h2>
                <Link
                  to="/contact"
                  className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
                  style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default About;
