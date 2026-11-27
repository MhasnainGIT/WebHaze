import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  GlowingStarsBackground,
  ScrollVelocity,
  LampContainer,
  NumberTicker,
} from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const roles = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Build stunning, performant UIs using React, Tailwind, and Framer Motion.',
    skills: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Design and maintain scalable Node.js APIs, MongoDB schemas, and cloud infrastructure.',
    skills: ['Node.js', 'MongoDB', 'Express', 'AWS'],
  },
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Own features end-to-end, from React frontends to Node.js/Express backends and database design.',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Automate deployments, manage CI/CD pipelines, and keep our cloud infrastructure secure and scalable.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Create world-class design systems and user experiences for our clients and platform.',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
  },
  {
    slug: 'mobile-app-developer',
    title: 'Mobile App Developer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Build cross-platform mobile experiences with React Native and native SDK integrations.',
    skills: ['React Native', 'iOS', 'Android', 'Firebase', 'App Store'],
  },
  {
    slug: 'project-manager',
    title: 'Project Manager',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Run delivery timelines, coordinate teams, and keep clients aligned across web and mobile projects.',
    skills: ['Agile', 'Jira', 'Client Management', 'Risk Management'],
  },
  {
    slug: 'qa-engineer',
    title: 'QA Engineer',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Design test strategies, automate regression suites, and ensure product quality before release.',
    skills: ['Playwright', 'Cypress', 'API Testing', 'Test Automation'],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing Manager',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Lead SEO, paid media, and growth experiments to scale WebHaze inbound pipeline.',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content Marketing', 'CRO'],
  },
  {
    slug: 'sales-business-development',
    title: 'Sales & Business Development',
    type: 'Full-time · Remote',
    location: 'Remote — Worldwide',
    desc: 'Drive client acquisition and build long-term relationships with businesses across India.',
    skills: ['B2B Sales', 'CRM', 'Communication', 'Lead Generation'],
  },
];

const perks = [
  { title: 'Remote First', desc: 'Work from anywhere on earth. We\'re fully async-friendly.' },
  { title: 'Fast Growth', desc: 'Small team = huge ownership. Your work ships and ships fast.' },
  { title: 'Competitive Pay', desc: 'Market-rate compensation with performance bonuses.' },
  { title: 'Latest Stack', desc: 'React, Node.js, AWS, Framer Motion — always on the cutting edge.' },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <SEO
        title="Careers | Join WebHaze | Build the Future of the Web"
        description="Join the WebHaze team. We're hiring developers, designers, and sales professionals to help build the future of digital experiences."
        keywords="WebHaze careers, web developer jobs Hyderabad, remote developer jobs India, join WebHaze"
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'Careers', url: 'https://www.webhaze.in/careers' },
        ]}
      />

      {/* Aceternity: backgrounds */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-25" />
      <BackgroundBeams className="opacity-30" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
        {/* ─── HERO ─── */}
        <div className="mb-24">
          <ScrollReveal>
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              JOIN THE TEAM
            </span>
            <h1
              className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-8 tracking-[-0.04em] uppercase"
              style={{ fontFamily: f.h }}
            >
              <WavyText text="BUILD WITH" />
              <br />
              <WavyText text="US." delay={0.2} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="We're a small, ambitious team building the future of web services in India. If you're passionate about craft and want to grow fast — this is your place."
              className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed"
            />
          </ScrollReveal>
        </div>

        {/* ─── Perks (Aceternity SpotlightCard) ─── */}
        <div className="mb-32">
          <ScrollReveal className="mb-12">
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase"
              style={{ fontFamily: f.l }}
            >
              WHY WEBHAZE
            </span>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {perks.map((perk, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <SpotlightCard
                  className="h-full border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500"
                  spotlightColor="rgba(255,255,255,0.05)"
                >
                  <div className="p-8">
                    <span
                      className="text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase block mb-4"
                      style={{ fontFamily: f.l }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="text-lg font-black uppercase tracking-[-0.02em] mb-3"
                      style={{ fontFamily: f.h }}
                    >
                      {perk.title}
                    </h3>
                    <p
                      className="text-white/60 text-sm leading-relaxed"
                      style={{ fontFamily: f.b }}
                    >
                      {perk.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── Aceternity ScrollVelocity ─── */}
        <div className="mb-20 overflow-hidden border-t border-white/[0.06]">
          <ScrollVelocity
            text1="FRONTEND · BACKEND · DEVOPS · UI/UX · MOBILE ·"
            text2="REMOTE · WORLDWIDE · FAST GROWTH · WEBHAZE ·"
          />
        </div>

        {/* ─── Open Roles ─── */}
        <ScrollReveal className="mb-6">
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase"
            style={{ fontFamily: f.l }}
          >
            OPEN ROLES — {roles.length} POSITIONS
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          {roles.map((role, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <SpotlightCard
                className="h-full border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-700"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="p-8 md:p-10 flex flex-col h-full min-h-[260px]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] mb-1"
                        style={{ fontFamily: f.h }}
                      >
                        {role.title}
                      </h3>
                      <span
                        className="text-[11px] text-white/40 tracking-[0.1em] uppercase"
                        style={{ fontFamily: f.l }}
                      >
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-white/60 text-sm leading-relaxed mb-6"
                    style={{ fontFamily: f.b }}
                  >
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {role.skills.map((s, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-3 py-1 border border-white/[0.08] text-white/50 uppercase tracking-[0.1em]"
                        style={{ fontFamily: f.l }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/careers/${role.slug}`}
                    className="mt-auto px-6 py-3 bg-white text-[11px] font-black tracking-[0.15em] uppercase hover:bg-white/90 transition-all w-fit"
                    style={{ fontFamily: f.l, borderRadius: 0, color: '#000000' }}
                  >
                    Apply Now
                  </Link>
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
            DON'T SEE YOUR ROLE?
          </span>
          <h2
            className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center"
            style={{ fontFamily: f.h }}
          >
            REACH OUT
            <br />
            <span className="text-white">ANYWAY.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <a
            href="mailto:info.webhaze@gmail.com"
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            Send an Intro
          </a>
        </ScrollReveal>
      </LampContainer>
    </div>
  );
};

export default Careers;
