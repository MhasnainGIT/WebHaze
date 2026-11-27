import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useCurrency } from '../contexts/CurrencyContext';
import { PLANS } from '../config/pricing';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  LampContainer,
  ScrollVelocity,
  NumberTicker,
} from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const Pricing = () => {
  const { formatPrice, currency } = useCurrency();

  const comparisonRows = [
    { feature: 'Pages', core: '5 Pages', elite: '15 Pages', max: 'Unlimited' },
    { feature: 'SSL Certificate', core: '✓', elite: '✓', max: '✓' },
    { feature: 'Custom Domain', core: '1 Year Free', elite: '1 Year Free', max: '1 Year Free' },
    { feature: 'SEO Tools', core: 'Basic', elite: 'Advanced', max: 'Elite + AI' },
    { feature: 'E-commerce', core: '—', elite: '✓', max: '✓' },
    { feature: 'Support', core: 'Email', elite: '24/7 Priority', max: 'Dedicated Manager' },
    { feature: 'Backups', core: '—', elite: 'Weekly', max: 'Daily Shadow' },
    { feature: 'API Integrations', core: '—', elite: 'Standard', max: 'Custom' },
    { feature: 'Performance Tuning', core: '—', elite: '—', max: '✓' },
    { feature: 'Uptime SLA', core: '99.9%', elite: '99.9%', max: '99.99%' },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <SEO
        title="Solutions & Pricing | WebHaze"
        description="Transparent pricing for professional web development. Choose the plan that matches your vision."
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'Pricing', url: 'https://www.webhaze.in/pricing' },
        ]}
      />

      {/* Aceternity: BackgroundBeams behind the whole page */}
      <BackgroundBeams className="opacity-50" />

      <div className="container-site relative z-10">
        {/* ─── HERO ─── */}
        <div className="max-w-4xl mb-24 text-center md:text-left">
          <ScrollReveal>
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              INVESTMENT
            </span>
            <h1
              className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-10 tracking-[-0.04em] uppercase"
              style={{ fontFamily: f.h }}
            >
              <WavyText text="THE" />
              <br />
              <WavyText text="VALUATION." delay={0.2} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="Transparent, performance-driven solutions for every scale of digital ambition. No lock-in, no surprises."
              className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium px-4 md:px-0"
            />
          </ScrollReveal>
        </div>

        {/* ─── Pricing Cards (Aceternity SpotlightCard) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {PLANS.map((tier, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index === 0 ? 'right' : index === 2 ? 'left' : 'up'}
            >
              <SpotlightCard
                className={`h-full border transition-all duration-700 ${
                  tier.popular
                    ? 'border-white/20 bg-white/[0.05]'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
                spotlightColor={tier.popular ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}
              >
                <div className="relative flex flex-col h-full p-8 md:p-12">
                  {tier.popular && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black border border-white/30 text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2"
                      style={{ borderRadius: 0, fontFamily: f.l }}
                    >
                      Most Visionary
                    </div>
                  )}
                  <div className="mb-12">
                    <h3
                      className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-white/60"
                      style={{ fontFamily: f.l }}
                    >
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-5xl md:text-6xl font-black text-white"
                        style={{ fontFamily: f.h }}
                      >
                        {formatPrice(tier.prices[currency])}
                      </span>
                      <span className="text-white/40 text-xs" style={{ fontFamily: f.l }}>
                        /ONCE
                      </span>
                    </div>
                    <p
                      className="mt-6 text-white/60 text-sm font-medium leading-relaxed"
                      style={{ fontFamily: f.b }}
                    >
                      {tier.description}
                    </p>
                  </div>
                  <ul className="space-y-4 md:space-y-6 mb-12 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-white/70 gap-4 font-medium"
                        style={{ fontFamily: f.b }}
                      >
                        <div className="w-1.5 h-1.5 bg-white/30" style={{ borderRadius: 0 }} />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block text-center px-8 py-5 text-[10px] font-black tracking-widest uppercase transition-all duration-500 ${
                      tier.popular
                        ? 'bg-white text-black hover:bg-white/90'
                        : 'bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5'
                    }`}
                    style={{
                      borderRadius: 0,
                      fontFamily: f.l,
                      color: tier.popular ? '#000000' : undefined,
                    }}
                  >
                    {tier.popular ? 'Uplink Now' : 'Initialize'}
                  </Link>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* ─── Aceternity: ScrollVelocity divider ─── */}
        <div className="mb-32 border-t border-white/[0.06] overflow-hidden">
          <ScrollVelocity text1="NEXUS CORE · NEXUS ELITE · NEXUS MAX ·" text2="NO LOCK-IN · TRANSPARENT PRICING ·" />
        </div>

        {/* ─── Comparison Table ─── */}
        <div className="mb-32">
          <ScrollReveal className="mb-12">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              COMPARE PLANS
            </span>
            <h2
              className="text-[40px] md:text-[64px] font-black tracking-[-0.03em] uppercase leading-[0.95]"
              style={{ fontFamily: f.h }}
            >
              WHAT'S <span className="text-white">INCLUDED.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/[0.08]">
                  <div
                    className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase"
                    style={{ fontFamily: f.l }}
                  >
                    Feature
                  </div>
                  {PLANS.map((p, i) => (
                    <div
                      key={i}
                      className={`text-[11px] font-black tracking-[0.15em] uppercase text-center ${
                        p.popular ? 'text-white' : 'text-white/40'
                      }`}
                      style={{ fontFamily: f.l }}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>
                {comparisonRows.map((row, i) => (
                  <motion_div_wrapper key={i} delay={i * 0.04}>
                    <div
                      className={`grid grid-cols-4 gap-4 p-5 border-b border-white/[0.04] transition-colors hover:bg-white/[0.02] ${
                        i % 2 === 0 ? 'bg-white/[0.01]' : ''
                      }`}
                    >
                      <div
                        className="text-sm font-medium text-white/60"
                        style={{ fontFamily: f.b }}
                      >
                        {row.feature}
                      </div>
                      {[row.core, row.elite, row.max].map((val, j) => (
                        <div
                          key={j}
                          className={`text-sm text-center font-medium ${
                            val === '—' ? 'text-white/20' : val === '✓' ? 'text-white' : 'text-white/70'
                          }`}
                          style={{ fontFamily: j === 1 ? f.h : f.b }}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  </motion_div_wrapper>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ─── Lamp CTA ─── */}
      </div>

      {/* Aceternity: LampContainer CTA */}
      <LampContainer className="mt-0">
        <ScrollReveal>
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6 text-center"
            style={{ fontFamily: f.l }}
          >
            READY TO START?
          </span>
          <h2
            className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center"
            style={{ fontFamily: f.h }}
          >
            LET'S BUILD
            <br />
            <span className="text-white">YOUR VISION.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            Get a Free Quote
          </Link>
          <Link
            to="/portfolio"
            className="px-14 py-5 bg-transparent text-white border border-white/[0.15] text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all"
            style={{ borderRadius: 0, fontFamily: f.l }}
          >
            See Our Work
          </Link>
        </ScrollReveal>
      </LampContainer>
    </div>
  );
};

// Thin wrapper just for staggered scroll reveal on table rows
const motion_div_wrapper = ({ children, delay }) => (
  <ScrollReveal delay={delay}>{children}</ScrollReveal>
);

export default Pricing;
