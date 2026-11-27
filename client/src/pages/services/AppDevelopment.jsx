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
  NumberTicker,
} from '../../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const AppDevelopment = () => {
  const { currency } = useCurrency();
  const servicePrices = SERVICE_PRICES['app-development'] || {};

  const services = [
    {
      title: 'iOS App Development',
      description: 'Native iOS applications for iPhone and iPad with SwiftUI and native SDK integrations.',
      priceKey: 'iOS App Development',
      tag: 'iOS',
    },
    {
      title: 'Android App Development',
      description: 'Native Android applications for all devices. Kotlin-first with Material Design 3.',
      priceKey: 'Android App Development',
      tag: 'ANDROID',
    },
    {
      title: 'Cross-Platform Apps',
      description: 'React Native apps for both iOS and Android — one codebase, two stores.',
      priceKey: 'Cross-Platform Apps',
      tag: 'CROSS-PLATFORM',
    },
    {
      title: 'Web Applications',
      description: 'Progressive web apps with native-like experience, offline support, and push notifications.',
      priceKey: 'Web Applications',
      tag: 'PWA',
    },
  ];

  const capabilities = [
    { title: 'React Native', desc: 'Cross-platform mobile development' },
    { title: 'Swift / Kotlin', desc: 'Native iOS & Android builds' },
    { title: 'Firebase', desc: 'Real-time backend & auth' },
    { title: 'App Store', desc: 'End-to-end submission support' },
    { title: 'Push Notifications', desc: 'Engage your users anywhere' },
    { title: 'Offline First', desc: 'Works without connectivity' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
      <SEO
        title="App Development | iOS & Android | WebHaze"
        description="Professional mobile app development for iOS, Android, and cross-platform solutions with modern UI/UX design."
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'Services', url: 'https://www.webhaze.in/services/app-development' },
          { name: 'App Development', url: 'https://www.webhaze.in/services/app-development' },
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
              <WavyText text="APP" />
              <br />
              <WavyText text="DEVELOPMENT." delay={0.2} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="Professional mobile app development for iOS, Android, and cross-platform. From concept to App Store in record time."
              className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium"
            />
          </ScrollReveal>
        </div>

        {/* ─── Aceternity ScrollVelocity ─── */}
        <div className="mb-24 overflow-hidden border-t border-white/[0.06]">
          <ScrollVelocity text1="iOS · ANDROID · REACT NATIVE · SWIFT · KOTLIN ·" text2="CROSS-PLATFORM · PWA · FIREBASE · APP STORE ·" />
        </div>

        {/* ─── Services Pricing ─── */}
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

        {/* ─── Capabilities Grid ─── */}
        <ScrollReveal className="mb-12">
          <h2 className="text-[40px] md:text-[64px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>
            OUR <span className="text-white">STACK.</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <SpotlightCard
                className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="p-8 flex items-center gap-4">
                  <div className="w-2 h-2 bg-white/30 flex-shrink-0" style={{ borderRadius: 0 }} />
                  <div>
                    <p className="text-base font-black uppercase tracking-[-0.01em]" style={{ fontFamily: f.h }}>{cap.title}</p>
                    <p className="text-white/40 text-sm" style={{ fontFamily: f.b }}>{cap.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ─── Lamp CTA ─── */}
      <LampContainer className="mt-16">
        <ScrollReveal>
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6 text-center" style={{ fontFamily: f.l }}>
            READY TO BUILD YOUR APP?
          </span>
          <h2 className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center" style={{ fontFamily: f.h }}>
            LET'S BUILD
            <br />
            <span className="text-white">YOUR APP.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            to="/contact"
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            Start App Project
          </Link>
        </ScrollReveal>
      </LampContainer>
    </div>
  );
};

export default AppDevelopment;
