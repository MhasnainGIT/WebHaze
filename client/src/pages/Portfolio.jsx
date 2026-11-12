import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

const projects = [
  {
    client: 'UrbanCart',
    industry: 'E-commerce',
    problem: 'Outdated storefront with 8s load times and 1.2% conversion rate.',
    solution: 'Full redesign with optimised checkout flow, mobile-first layout, and edge CDN.',
    result: '+40% conversions, 1.8s load time, 3× mobile revenue in 30 days.',
  },
  {
    client: 'Spice Route',
    industry: 'Food & Beverage',
    problem: 'No online booking system — all reservations handled by phone.',
    solution: 'Custom booking engine integrated with Google Calendar and WhatsApp notifications.',
    result: '2× table bookings, 60% reduction in no-shows, zero missed reservations.',
  },
  {
    client: 'GreenBuild',
    industry: 'Construction',
    problem: 'Zero online presence in a competitive local market.',
    solution: 'SEO-optimised website with local schema markup, project gallery, and lead capture.',
    result: 'Page 1 rankings for 12 target keywords within 60 days, 45 inbound leads/month.',
  },
  {
    client: 'NexaTech',
    industry: 'SaaS',
    problem: 'Landing page converting at 2.1% with high bounce rate.',
    solution: 'Conversion-focused redesign with social proof, pricing clarity, and A/B tested CTAs.',
    result: 'Conversion rate lifted to 6.8%, CAC reduced by 35%.',
  },
  {
    client: 'BoldMedia',
    industry: 'Creative Agency',
    problem: 'Portfolio site not reflecting premium brand positioning.',
    solution: 'Bespoke animated portfolio with case study pages and client testimonial system.',
    result: 'Average project value increased 2.5× within 90 days of launch.',
  },
];

const Portfolio = () => (
  <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
    <SEO
      title="Portfolio & Case Studies | WebHaze"
      description="Real results from real clients. See how WebHaze delivers measurable growth through web design, development, and digital strategy."
      canonical="/portfolio"
    />
    <div className="max-w-[1440px] mx-auto">
      <ScrollReveal className="mb-16 md:mb-24">
        <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6" style={{ fontFamily: f.l }}>CASE STUDIES</span>
        <h1 className="text-[52px] md:text-[100px] font-black leading-[0.9] tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
          THE<br /><span className="text-white">WORK.</span>
        </h1>
      </ScrollReveal>

      <div className="space-y-4">
        {projects.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 hover:border-white/20 transition-all duration-500" style={{ borderRadius: 0 }}>
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="md:w-1/4">
                  <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-2" style={{ fontFamily: f.l }}>{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="text-2xl font-black uppercase tracking-[-0.02em]" style={{ fontFamily: f.h }}>{p.client}</h2>
                  <span className="text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase" style={{ fontFamily: f.l }}>{p.industry}</span>
                </div>
                <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-2" style={{ fontFamily: f.l }}>PROBLEM</span>
                    <p className="text-white text-sm leading-relaxed" style={{ fontFamily: f.b }}>{p.problem}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-2" style={{ fontFamily: f.l }}>SOLUTION</span>
                    <p className="text-white text-sm leading-relaxed" style={{ fontFamily: f.b }}>{p.solution}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-2" style={{ fontFamily: f.l }}>RESULT</span>
                    <p className="text-white font-bold text-sm leading-relaxed" style={{ fontFamily: f.b }}>{p.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3} className="mt-16 text-center">
        <Link to="/contact" className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all" style={{ borderRadius: 0, fontFamily: f.l }}>
          Start Your Project
        </Link>
      </ScrollReveal>
    </div>
  </div>
);

export default Portfolio;
