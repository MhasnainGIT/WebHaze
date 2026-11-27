import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  NumberTicker,
  ScrollVelocity,
  BackgroundBeams,
  LampContainer,
  GlowingStarsBackground,
} from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const projects = [
  {
    client: 'UrbanCart',
    industry: 'E-commerce',
    problem: 'Outdated storefront with 8s load times and 1.2% conversion rate.',
    solution: 'Full redesign with optimised checkout flow, mobile-first layout, and edge CDN.',
    result: '+40% conversions, 1.8s load time, 3× mobile revenue in 30 days.',
    metric: '+40%',
    metricLabel: 'Conversions',
  },
  {
    client: 'Spice Route',
    industry: 'Food & Beverage',
    problem: 'No online booking system — all reservations handled by phone.',
    solution: 'Custom booking engine integrated with Google Calendar and WhatsApp notifications.',
    result: '2× table bookings, 60% reduction in no-shows, zero missed reservations.',
    metric: '2×',
    metricLabel: 'Table Bookings',
  },
  {
    client: 'GreenBuild',
    industry: 'Construction',
    problem: 'Zero online presence in a competitive local market.',
    solution: 'SEO-optimised website with local schema markup, project gallery, and lead capture.',
    result: 'Page 1 rankings for 12 target keywords within 60 days, 45 inbound leads/month.',
    metric: '#1',
    metricLabel: 'Google Rankings',
  },
  {
    client: 'NexaTech',
    industry: 'SaaS',
    problem: 'Landing page converting at 2.1% with high bounce rate.',
    solution: 'Conversion-focused redesign with social proof, pricing clarity, and A/B tested CTAs.',
    result: 'Conversion rate lifted to 6.8%, CAC reduced by 35%.',
    metric: '6.8%',
    metricLabel: 'Conversion Rate',
  },
  {
    client: 'BoldMedia',
    industry: 'Creative Agency',
    problem: 'Portfolio site not reflecting premium brand positioning.',
    solution: 'Bespoke animated portfolio with case study pages and client testimonial system.',
    result: 'Average project value increased 2.5× within 90 days of launch.',
    metric: '2.5×',
    metricLabel: 'Project Value',
  },
];

const Portfolio = () => (
  <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
    <SEO
      title="Portfolio & Case Studies | WebHaze"
      description="Real results from real clients. See how WebHaze delivers measurable growth through web design, development, and digital strategy."
      canonical="/portfolio"
    />

    {/* Aceternity: GlowingStarsBackground */}
    <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-30" />
    {/* Aceternity: BackgroundBeams */}
    <BackgroundBeams className="opacity-30" />

    <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
      {/* ─── HERO ─── */}
      <ScrollReveal className="mb-16 md:mb-24">
        <span
          className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
          style={{ fontFamily: f.l }}
        >
          CASE STUDIES
        </span>
        <h1
          className="text-[52px] md:text-[100px] font-black leading-[0.9] tracking-[-0.04em] uppercase"
          style={{ fontFamily: f.h }}
        >
          <WavyText text="THE" />
          <br />
          <WavyText text="WORK." delay={0.2} />
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="mb-24">
        <TextGenerateEffect
          words="Real results from real clients. Every number below is from a live production project — no estimates, no projections."
          className="text-lg md:text-xl text-white/60 max-w-2xl"
        />
      </ScrollReveal>

      {/* ─── Results Overview Row ─── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-24 py-12 border-t border-b border-white/[0.06]">
        {projects.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="text-center">
              <div
                className="text-[36px] md:text-[48px] font-black tracking-[-0.04em] text-white leading-none mb-2"
                style={{ fontFamily: f.h }}
              >
                {p.metric}
              </div>
              <p
                className="text-[10px] text-white/40 tracking-[0.15em] uppercase"
                style={{ fontFamily: f.l }}
              >
                {p.metricLabel}
              </p>
              <p
                className="text-[10px] text-white/20 tracking-[0.1em] uppercase mt-1"
                style={{ fontFamily: f.l }}
              >
                {p.client}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Aceternity ScrollVelocity divider ─── */}
      <div className="mb-12 overflow-hidden border-t border-white/[0.06]">
        <ScrollVelocity text1="CASE STUDIES · REAL RESULTS · REAL CLIENTS ·" text2="URBANCART · SPICE ROUTE · GREENBUILD · NEXATECH ·" />
      </div>

      {/* ─── Case Study Cards (Aceternity SpotlightCard) ─── */}
      <div className="space-y-4 mb-16">
        {projects.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <SpotlightCard
              className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500"
              spotlightColor="rgba(255,255,255,0.04)"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/4">
                    <span
                      className="text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase block mb-2"
                      style={{ fontFamily: f.l }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2
                      className="text-2xl font-black uppercase tracking-[-0.02em] mb-1"
                      style={{ fontFamily: f.h }}
                    >
                      {p.client}
                    </h2>
                    <span
                      className="text-[10px] font-medium tracking-[0.15em] text-white/30 uppercase"
                      style={{ fontFamily: f.l }}
                    >
                      {p.industry}
                    </span>
                    <div
                      className="mt-6 text-[36px] font-black tracking-[-0.04em] text-white leading-none"
                      style={{ fontFamily: f.h }}
                    >
                      {p.metric}
                    </div>
                    <p
                      className="text-[10px] text-white/30 tracking-[0.1em] uppercase mt-1"
                      style={{ fontFamily: f.l }}
                    >
                      {p.metricLabel}
                    </p>
                  </div>
                  <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <span
                        className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-3"
                        style={{ fontFamily: f.l }}
                      >
                        PROBLEM
                      </span>
                      <p
                        className="text-white/60 text-sm leading-relaxed"
                        style={{ fontFamily: f.b }}
                      >
                        {p.problem}
                      </p>
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-3"
                        style={{ fontFamily: f.l }}
                      >
                        SOLUTION
                      </span>
                      <p
                        className="text-white/60 text-sm leading-relaxed"
                        style={{ fontFamily: f.b }}
                      >
                        {p.solution}
                      </p>
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-3"
                        style={{ fontFamily: f.l }}
                      >
                        RESULT
                      </span>
                      <p
                        className="text-white font-bold text-sm leading-relaxed"
                        style={{ fontFamily: f.b }}
                      >
                        {p.result}
                      </p>
                    </div>
                  </div>
                </div>
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
          READY TO BE NEXT?
        </span>
        <h2
          className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center"
          style={{ fontFamily: f.h }}
        >
          START YOUR
          <br />
          <span className="text-white">PROJECT.</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <Link
          to="/contact"
          className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
          style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
        >
          Start Your Project
        </Link>
      </ScrollReveal>
    </LampContainer>
  </div>
);

export default Portfolio;
