import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  return (
    <div className="min-h-screen bg-black pt-32 relative overflow-hidden">
      <SEO 
        title="About Us | Leading Web Development Agency in Hyderabad | WebHaze"
        description="Learn how WebHaze Studios became the #1 website designing company in Hyderabad. Our mission is to empower local businesses with global digital infrastructure."
        keywords="WebHaze Hyderabad, best web agency Hyderabad, website designers near me, Hyderabad IT solutions, professional web development"
        breadcrumb={[
          { name: "Home", url: "https://www.webhaze.in/" },
          { name: "About", url: "https://www.webhaze.in/about" }
        ]}
      />
      
      <div className="container-site py-20 relative z-10">
        <div className="max-w-4xl mb-32">
          <ScrollReveal>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.8] uppercase">
              OUR <span className="text-white">MISSION.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white max-w-2xl font-medium leading-relaxed px-4 md:px-0">
              A Hyderabad-based collective of engineers building digital ecosystems that empower visionaries across India.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          <ScrollReveal className="md:col-span-2">
            <div className="glass-card border-white/5 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight uppercase">The Innovation Node</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                  Proudly part of Hyderabad's tech hub. We leverage global standards to deliver unmatched web solutions.
                </p>
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                  Innovative technology met with minimalist design. Ensuring every business has a seat at the digital table.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="left">
            <div className="glass-card border-white/5 p-8 md:p-12 h-full">
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase text-white">Vision</h3>
              <p className="text-white text-lg font-medium leading-relaxed">
                Leading India's Website-as-a-Service frontier, starting from our home in Hyderabad.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="right">
            <div className="glass-card border-white/5 p-8 md:p-12 h-full">
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase text-white">Values</h3>
              <p className="text-white text-lg font-medium leading-relaxed">
                Integrity and hard work drive every line of code we write and every node we deploy.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Team Section — TICKET-014 */}
        <div className="mb-40">
          <ScrollReveal className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">THE <span className="text-white">TEAM.</span></h2>
            <p className="text-white/60 text-lg mt-4 max-w-xl">The people behind every pixel and every deployment.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Mohd Hasnain', role: 'Founder & Lead Engineer', bio: 'Full-stack engineer and product architect. Built WebHaze from the ground up to serve Hyderabad businesses with global-grade digital infrastructure.', linkedin: 'https://linkedin.com' },
              { name: 'Design Lead', role: 'UI/UX & Brand', bio: 'Crafts every interface with precision — from wireframe to pixel-perfect production. Obsessed with conversion-focused design.', linkedin: 'https://linkedin.com' },
              { name: 'Growth Lead', role: 'SEO & Digital Strategy', bio: 'Drives organic growth through technical SEO, content strategy, and data-driven campaigns for clients across India.', linkedin: 'https://linkedin.com' },
            ].map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-white/[0.08] bg-white/[0.02] p-8 hover:border-white/20 transition-all duration-500" style={{ borderRadius: 0 }}>
                  <div className="w-16 h-16 bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white font-black text-2xl mb-6" style={{ borderRadius: 0 }}>
                    {member.name[0]}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-[-0.02em] mb-1">{member.name}</h3>
                  <p className="text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase mb-4">{member.role}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{member.bio}</p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase hover:text-white transition-colors">LinkedIn →</a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

