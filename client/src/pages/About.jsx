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
      />
      
      <div className="container-site py-20 relative z-10">
        <div className="max-w-4xl mb-32">
          <ScrollReveal>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.8] uppercase">
              OUR <span className="text-white/20">MISSION.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium leading-relaxed px-4 md:px-0">
              A Hyderabad-based collective of engineers building digital ecosystems that empower visionaries across India.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          <ScrollReveal className="md:col-span-2">
            <div className="glass-card border-white/5 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight uppercase">The Innovation Node</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed">
                  Proudly part of Hyderabad's tech hub. We leverage global standards to deliver unmatched web solutions.
                </p>
                <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed">
                  Innovative technology met with minimalist design. Ensuring every business has a seat at the digital table.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="left">
            <div className="glass-card border-white/5 p-8 md:p-12 h-full">
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase text-white/50">Vision</h3>
              <p className="text-white/40 text-lg font-medium leading-relaxed">
                Leading India's Website-as-a-Service frontier, starting from our home in Hyderabad.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="right">
            <div className="glass-card border-white/5 p-8 md:p-12 h-full">
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase text-white/50">Values</h3>
              <p className="text-white/40 text-lg font-medium leading-relaxed">
                Integrity and hard work drive every line of code we write and every node we deploy.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default About;