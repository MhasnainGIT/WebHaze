import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Privacy Protocol | WebHaze Studios"
        description="Our commitment to your data security. Read the WebHaze Privacy Protocol to understand how we protect your digital identity and infrastructure."
        breadcrumb={[
          { name: "Home", url: "https://www.webhaze.in/" },
          { name: "Privacy", url: "https://www.webhaze.in/privacy" }
        ]}
      />
      
      <div className="container-site">
        <div className="max-w-4xl mb-24">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-10 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PRIVACY <span className="text-white">PROTOCOL.</span>
          </motion.h1>
          <p className="text-xl text-white font-medium tracking-tight uppercase text-[10px] tracking-[0.3em]">
            Last updated: May 13, 2024
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="https://www.webhaze.in/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-white transition-colors">About WebHaze</a>
            <a href="https://www.webhaze.in/contact" className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-white transition-colors">Contact Us</a>
            <a href="https://www.webhaze.in/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="space-y-12 max-w-4xl">
          {[
            { title: "Data Collection", content: "We only collect the absolute minimum telemetry required to maintain your digital infrastructure and ensure secure nexus uplink connections." },
            { title: "Infrastructure Security", content: "Your data is encrypted across our global edge nodes using industry-standard protocols. No unauthorized access is permitted." },
            { title: "Third-Party Integrity", content: "We do not sell your data. We only uplink with verified security partners necessary for platform stability." },
            { title: "Rights of the User", content: "You maintain full sovereignty over your identity. You may terminate your account and wipe all associated data at any time." }
          ].map((section, index) => (
            <motion.div 
              key={index} 
              className="glass-card border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black mb-6 tracking-tight uppercase">{section.title}</h2>
              <p className="text-white text-lg leading-relaxed font-medium">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
