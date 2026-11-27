import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  GlowingStarsBackground,
  NumberTicker,
  LampContainer,
  ScrollVelocity,
} from '../../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const features = [
  {
    title: 'Lightning Fast',
    desc: 'NVMe SSD storage with global CDN — sub-second loads for every visitor.',
    tag: 'SPEED',
  },
  {
    title: 'Free SSL',
    desc: 'Automatic SSL certificate provisioning with HTTPS enforcement across all domains.',
    tag: 'SECURITY',
  },
  {
    title: '99.9% Uptime',
    desc: 'Enterprise-grade infrastructure with guaranteed SLA and proactive monitoring.',
    tag: 'RELIABILITY',
  },
  {
    title: 'Daily Backups',
    desc: 'Automated daily snapshots with one-click restore on Elite and Max plans.',
    tag: 'PROTECTION',
  },
  {
    title: 'Global CDN',
    desc: 'Content served from the edge node closest to your visitor. Zero latency.',
    tag: 'GLOBAL',
  },
  {
    title: 'Expert Support',
    desc: 'Real engineers on call 24/7. Average response time under 5 minutes.',
    tag: 'SUPPORT',
  },
];

const stats = [
  { value: 99, suffix: '.9%', label: 'Uptime SLA' },
  { value: 1, suffix: '.8s', label: 'Avg. Load Time' },
  { value: 5, suffix: 'min', label: 'Support Response' },
  { value: 150, suffix: '+', label: 'Sites Hosted' },
];

const WebHosting = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
      <SEO
        title="Web Hosting | 99.9% Uptime | WebHaze"
        description="Professional web hosting services with 99.9% uptime guarantee and lightning-fast performance. SSD storage, free SSL, and 24/7 expert support."
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'Services', url: 'https://www.webhaze.in/services/web-hosting' },
          { name: 'Web Hosting', url: 'https://www.webhaze.in/services/web-hosting' },
        ]}
      />

      {/* Aceternity: Backgrounds */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-30" />
      <BackgroundBeams className="opacity-40" />

      <div className="container-site relative z-10 py-16">
        {/* ─── HERO ─── */}
        <div className="max-w-4xl mb-24">
          <ScrollReveal>
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              SERVICES
            </span>
            <h1
              className="text-[52px] md:text-[100px] font-black leading-[0.9] mb-10 tracking-[-0.04em] uppercase"
              style={{ fontFamily: f.h }}
            >
              <WavyText text="WEB" />
              <br />
              <WavyText text="HOSTING." delay={0.2} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="Professional web hosting with 99.9% uptime guarantee, lightning-fast NVMe storage, and 24/7 engineering support."
              className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium"
            />
          </ScrollReveal>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-12 border-t border-b border-white/[0.06]">
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

        {/* ─── Aceternity ScrollVelocity ─── */}
        <div className="mb-24 overflow-hidden border-t border-white/[0.06]">
          <ScrollVelocity text1="SSD STORAGE · FREE SSL · 99.9% UPTIME · CDN ·" text2="FAST HOSTING · EXPERT SUPPORT · WEBHAZE ·" />
        </div>

        {/* ─── Features Grid (Aceternity SpotlightCard) ─── */}
        <ScrollReveal className="mb-12">
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
            style={{ fontFamily: f.l }}
          >
            WHAT'S INCLUDED
          </span>
          <h2
            className="text-[40px] md:text-[64px] font-black tracking-[-0.03em] uppercase leading-[0.95]"
            style={{ fontFamily: f.h }}
          >
            THE <span className="text-white">FEATURES.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <SpotlightCard
                className="h-full border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500"
                spotlightColor="rgba(255,255,255,0.06)"
              >
                <div className="p-8 md:p-10 flex flex-col min-h-[200px]">
                  <span
                    className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30 border border-white/[0.06] px-2 py-1 w-fit mb-6"
                    style={{ fontFamily: f.l }}
                  >
                    {feature.tag}
                  </span>
                  <h3
                    className="text-xl font-black mb-3 uppercase tracking-[-0.02em]"
                    style={{ fontFamily: f.h }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white/60 text-sm leading-relaxed mt-auto"
                    style={{ fontFamily: f.b }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ─── Lamp CTA ─── */}
      <LampContainer>
        <ScrollReveal>
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6 text-center"
            style={{ fontFamily: f.l }}
          >
            READY TO LAUNCH?
          </span>
          <h2
            className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center"
            style={{ fontFamily: f.h }}
          >
            VIEW HOSTING
            <br />
            <span className="text-white">PLANS.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pricing"
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            View Hosting Plans
          </Link>
          <Link
            to="/contact"
            className="px-14 py-5 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all"
            style={{ borderRadius: 0, fontFamily: f.l }}
          >
            Get a Free Quote
          </Link>
        </ScrollReveal>
      </LampContainer>
    </div>
  );
};

export default WebHosting;
