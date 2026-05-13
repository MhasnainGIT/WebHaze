import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Privacy Protocol | WebHaze Studios"
        description="Our commitment to your data security. Read the WebHaze Privacy Protocol to understand how we protect your digital identity and infrastructure."
      />
      
      <div className="container-site">
        <div className="max-w-4xl mb-24">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-10 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PRIVACY <span className="text-white/20">PROTOCOL.</span>
          </motion.h1>
          <p className="text-xl text-white/40 font-medium tracking-tight uppercase text-[10px] tracking-[0.3em]">
            Last updated: May 13, 2024
          </p>
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
              <p className="text-white/50 text-lg leading-relaxed font-medium">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;