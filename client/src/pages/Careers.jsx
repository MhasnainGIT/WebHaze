import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

const Glass = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-700 relative ${className}`}>
    {children}
  </div>
);

const roles = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Build stunning, performant UIs using React, Tailwind, and Framer Motion.",
    skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Design and maintain scalable Node.js APIs, MongoDB schemas, and cloud infrastructure.",
    skills: ["Node.js", "MongoDB", "Express", "AWS"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Create world-class design systems and user experiences for our clients and platform.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    slug: "sales-business-development",
    title: "Sales & Business Development",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Drive client acquisition and build long-term relationships with businesses across India.",
    skills: ["B2B Sales", "CRM", "Communication", "Lead Generation"],
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <SEO
        title="Careers | Join WebHaze | Build the Future of the Web"
        description="Join the WebHaze team. We're hiring developers, designers, and sales professionals to help build the future of digital experiences."
        keywords="WebHaze careers, web developer jobs Hyderabad, remote developer jobs India, join WebHaze"
        breadcrumb={[
          { name: "Home", url: "https://www.webhaze.in/" },
          { name: "Careers", url: "https://www.webhaze.in/careers" }
        ]}
      />

      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="mb-24">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>JOIN THE TEAM</span>
            <h1 className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-8 tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
              BUILD WITH<br /><span className="text-white/20">US.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/40 max-w-xl leading-relaxed" style={{ fontFamily: f.b }}>
              We're a small, ambitious team building the future of web services in India. If you're passionate about craft and want to grow fast — this is your place.
            </p>
          </ScrollReveal>
        </div>

        {/* Open Roles */}
        <ScrollReveal className="mb-6">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase" style={{ fontFamily: f.l }}>OPEN ROLES</span>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          {roles.map((role, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Glass className="h-full">
                <div className="p-8 md:p-10 flex flex-col h-full min-h-[260px]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] mb-1" style={{ fontFamily: f.h }}>{role.title}</h3>
                      <span className="text-[11px] text-white/30 tracking-[0.1em] uppercase" style={{ fontFamily: f.l }}>{role.type}</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-6" style={{ fontFamily: f.b }}>{role.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {role.skills.map((s, j) => (
                      <span key={j} className="text-[10px] px-3 py-1 border border-white/[0.08] text-white/30 uppercase tracking-[0.1em]" style={{ fontFamily: f.l }}>{s}</span>
                    ))}
                  </div>
                  <Link
                    to={`/careers/${role.slug}`}
                    className="mt-auto px-6 py-3 bg-white !text-black text-[11px] font-black tracking-[0.15em] uppercase hover:bg-white/90 transition-all w-fit"
                    style={{ fontFamily: f.l, color: '#000000' }}
                  >
                    Apply Now
                  </Link>
                </div>
              </Glass>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;