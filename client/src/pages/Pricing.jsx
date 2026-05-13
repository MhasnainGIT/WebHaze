import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const Pricing = () => {
  const tiers = [
    {
      name: "Nexus Core",
      price: "₹7,999",
      description: "Everything you need to launch a high-performance business presence.",
      features: ["AI Site Generator", "Free SSL", "99.9% Uptime", "Global CDN", "Custom Domain (1yr)"]
    },
    {
      name: "Nexus Elite",
      price: "₹14,999",
      description: "Scale your revenue with ultra-fast E-commerce and priority nexus support.",
      features: ["Priority Deployment", "E-commerce Engine", "Advanced SEO Tools", "24/7 Expert Support", "Weekly Backups"],
      popular: true
    },
    {
      name: "Nexus Max",
      price: "₹24,999",
      description: "Custom enterprise architecture for industry leaders and high-scale platforms.",
      features: ["Custom API Integrations", "Daily Shadow Backups", "Unlimited Pages", "Dedicated Manager", "Elite Performance Tuning"]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Solutions & Pricing | #1 Web Agency Hyderabad | WebHaze"
        description="Affordable and transparent pricing for professional web development in Hyderabad. Choose the Nexus plan that matches your vision."
        keywords="Web designing price Hyderabad, website cost Hyderabad, affordable web development, WebHaze pricing"
      />
      
      <div className="container-site">
        <div className="max-w-4xl mb-32 text-center md:text-left">
          <ScrollReveal>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.8] uppercase">
              THE <span className="text-white/20">VALUATION.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium px-4 md:px-0">
              Transparent, performance-driven solutions for every scale of digital ambition.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {tiers.map((tier, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction={index === 0 ? "right" : index === 2 ? "left" : "up"}>
              <div className={`glass-card relative flex flex-col h-full p-8 md:p-12 ${tier.popular ? 'border-white/30 bg-white/[0.05]' : 'border-white/5'}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white border border-white/30 text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full">
                    Most Visionary
                  </div>
                )}
                <div className="mb-12">
                  <h3 className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-white/50">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-black text-white">{tier.price}</span>
                    <span className="text-white/30 text-xs">/ONCE</span>
                  </div>
                  <p className="mt-6 text-white/40 text-sm font-medium leading-relaxed">{tier.description}</p>
                </div>
                <ul className="space-y-4 md:space-y-6 mb-12 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-white/50 gap-4 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact" 
                  className="px-8 py-5 bg-black text-white border border-white/20 rounded-full text-center text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
                >
                  {tier.popular ? "Uplink Now" : "Initialize"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;