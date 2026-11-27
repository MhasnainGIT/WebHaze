import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import CurrencySelector from '../../components/CurrencySelector';
import { useCurrency } from '../../contexts/CurrencyContext';
import { SERVICE_PRICES, formatPriceWithLabel } from '../../config/pricing';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  GlowingStarsBackground,
  LampContainer,
  ScrollVelocity,
  Timeline,
} from '../../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const WebsiteDevelopment = () => {
  const { currency } = useCurrency();
  const servicePrices = SERVICE_PRICES['website-development'] || {};

  const services = [
    {
      title: 'Custom Website Design',
      description: 'Unique, responsive designs tailored to your brand identity and conversion goals.',
      priceKey: 'Custom Website Design',
      tag: 'DESIGN',
    },
    {
      title: 'E-commerce Development',
      description: 'Full-featured online stores with payment integration and inventory management.',
      priceKey: 'E-commerce Development',
      tag: 'E-COMMERCE',
    },
    {
      title: 'CMS Development',
      description: 'Easy-to-manage content systems. Update your site without touching code.',
      priceKey: 'CMS Development',
      tag: 'CMS',
    },
    {
      title: 'Website Redesign',
      description: 'Modernize your existing site with a performance-first, conversion-focused redesign.',
      priceKey: 'Website Redesign',
      tag: 'REDESIGN',
    },
  ];

  const processData = [
    {
      title: 'Discovery',
      content: (
        <SpotlightCard className="border border-white/[0.08] bg-white/[0.02]" spotlightColor="rgba(255,255,255,0.04)">
          <div className="p-8">
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: f.b }}>
              We start with a deep-dive into your brand, goals, and target audience. This shapes the entire design and
              technical direction of your project.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
    {
      title: 'Design',
      content: (
        <SpotlightCard className="border border-white/[0.08] bg-white/[0.02]" spotlightColor="rgba(255,255,255,0.04)">
          <div className="p-8">
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: f.b }}>
              Wireframes, mockups, and interactive prototypes. You see the final design before a single line of code
              is written.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
    {
      title: 'Development',
      content: (
        <SpotlightCard className="border border-white/[0.08] bg-white/[0.02]" spotlightColor="rgba(255,255,255,0.04)">
          <div className="p-8">
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: f.b }}>
              Pixel-perfect React implementation with performance optimisation, SEO foundation, and mobile-first
              responsiveness baked in from day one.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
    {
      title: 'Launch',
      content: (
        <SpotlightCard className="border border-white/[0.08] bg-white/[0.02]" spotlightColor="rgba(255,255,255,0.04)">
          <div className="p-8">
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: f.b }}>
              Deployment, DNS configuration, SSL setup, and a full handover session. Post-launch monitoring and
              support included.
            </p>
          </div>
        </SpotlightCard>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
      <SEO
        title="Website Development | Custom Design & Build | WebHaze"
        description="Professional website development services. Custom designs, e-commerce solutions, and modern web applications built in Hyderabad."
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'Services', url: 'https://www.webhaze.in/services/website-development' },
          { name: 'Website Development', url: 'https://www.webhaze.in/services/website-development' },
        ]}
      />

      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-30" />
      <BackgroundBeams className="opacity-40" />

      <div className="container-site relative z-10 py-16">
        {/* Currency Selector */}
        <div className="flex justify-end mb-8">
          <CurrencySelector />
        </div>

        {/* ─── HERO ─── */}
        <div className="max-w-4xl mb-24">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6" style={{ fontFamily: f.l }}>
              SERVICES
            </span>
            <h1 className="text-[52px] md:text-[100px] font-black leading-[0.9] mb-10 tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
              <WavyText text="WEBSITE" />
              <br />
              <WavyText text="DEVELOPMENT." delay={0.2} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="Professional website development with modern designs, responsive layouts, and cutting-edge technology."
              className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium"
            />
          </ScrollReveal>
        </div>

        {/* ─── Aceternity ScrollVelocity ─── */}
        <div className="mb-24 overflow-hidden border-t border-white/[0.06]">
          <ScrollVelocity text1="CUSTOM DESIGN · E-COMMERCE · CMS · REDESIGN ·" text2="REACT · NEXT.JS · TAILWIND · FRAMER MOTION ·" />
        </div>

        {/* ─── Services Pricing (Aceternity SpotlightCard) ─── */}
        <ScrollReveal className="mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6" style={{ fontFamily: f.l }}>
            SERVICES & PRICING
          </span>
          <h2 className="text-[40px] md:text-[64px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>
            WHAT WE <span className="text-white">BUILD.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          {services.map((service, index) => {
            const basePrice = servicePrices[service.priceKey]?.[currency] || servicePrices[service.priceKey]?.USD || 0;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard
                  className="h-full border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500"
                  spotlightColor="rgba(255,255,255,0.06)"
                >
                  <div className="p-8 md:p-10 flex flex-col h-full">
                    <span
                      className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30 border border-white/[0.06] px-2 py-1 w-fit mb-6"
                      style={{ fontFamily: f.l }}
                    >
                      {service.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-[-0.02em]" style={{ fontFamily: f.h }}>
                      {service.title}
                    </h3>
                    <p className="text-white/60 mb-6 leading-relaxed text-sm" style={{ fontFamily: f.b }}>
                      {service.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/[0.06]">
                      <span className="text-xl font-black text-white" style={{ fontFamily: f.h }}>
                        {formatPriceWithLabel(basePrice, currency)}
                      </span>
                      <Link
                        to="/contact"
                        className="px-6 py-3 bg-white text-[11px] font-black tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
                        style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ─── Process (Aceternity Timeline) ─── */}
        <ScrollReveal className="mb-16">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6" style={{ fontFamily: f.l }}>
            HOW WE WORK
          </span>
          <h2 className="text-[40px] md:text-[64px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>
            THE <span className="text-white">PROCESS.</span>
          </h2>
        </ScrollReveal>
        <Timeline data={processData} />
      </div>

      {/* ─── Lamp CTA ─── */}
      <LampContainer className="mt-16">
        <ScrollReveal>
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6 text-center" style={{ fontFamily: f.l }}>
            READY TO BUILD?
          </span>
          <h2 className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center" style={{ fontFamily: f.h }}>
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
};

export default WebsiteDevelopment;
