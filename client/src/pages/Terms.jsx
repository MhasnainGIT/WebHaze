import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Terms of Service | WebHaze Infrastructure"
        description="Review the terms and conditions for using the WebHaze Website-as-a-Service platform. Professional service agreements for global digital deployment."
      />
      
      <div className="container-site">
        <div className="max-w-4xl mb-24">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-10 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SERVICE <span className="text-white/20">TERMS.</span>
          </motion.h1>
          <p className="text-xl text-white/40 font-medium tracking-tight uppercase text-[10px] tracking-[0.3em]">
            Operational Agreement Version 2.4
          </p>
        </div>

        <div className="space-y-12 max-w-4xl">
          {[
            { title: "Acceptance", content: "By establishing a connection to the WebHaze platform, you agree to abide by our operational protocols and security guidelines." },
            { title: "Usage Limits", content: "Platform resources must be used for legitimate business purposes. Any attempt to compromise network stability will result in immediate termination." },
            { title: "Financial Obligation", content: "Subscription credits are billed monthly. Failure to maintain positive credit will result in node suspension." },
            { title: "Liability", content: "WebHaze provides the infrastructure; however, we are not liable for user-generated content or external security breaches at the node level." }
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

export default Terms;