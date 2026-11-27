import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import CurrencySelector from '../../components/CurrencySelector';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatPrice } from '../../config/pricing';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  GlowingStarsBackground,
  LampContainer,
  ScrollVelocity,
} from '../../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const MARGIN = 1.30; // 30% commission markup
const applyMargin = (price) => Math.ceil((price * MARGIN) / 10) * 10;

const linuxVpsData = [
  { plan: 'VPS 01', cores: 1, ram: '1 GB', storage: '30 GB', price: 890 },
  { plan: 'VPS 02', cores: 1, ram: '2 GB', storage: '50 GB', price: 1250 },
  { plan: 'VPS 03', cores: 2, ram: '2 GB', storage: '100 GB', price: 1700 },
  { plan: 'VPS 04', cores: 2, ram: '4 GB', storage: '100 GB', price: 2300 },
  { plan: 'VPS 05', cores: 2, ram: '6 GB', storage: '200 GB', price: 3200 },
  { plan: 'VPS 06', cores: 4, ram: '8 GB', storage: '200 GB', price: 4400 },
  { plan: 'VPS 07', cores: 4, ram: '16 GB', storage: '250 GB', price: 6950 },
  { plan: 'VPS 08', cores: 4, ram: '32 GB', storage: '500 GB', price: 12500 },
  { plan: 'VPS 09', cores: 8, ram: '16 GB', storage: '500 GB', price: 8900 },
  { plan: 'VPS 10', cores: 8, ram: '32 GB', storage: '500 GB', price: 13700 },
  { plan: 'VPS 11', cores: 8, ram: '16 GB', storage: '1 TB', price: 10400 },
  { plan: 'VPS 12', cores: 8, ram: '32 GB', storage: '1 TB', price: 15200 },
  { plan: 'VPS 13', cores: 8, ram: '64 GB', storage: '1 TB', price: 24800 },
  { plan: 'VPS 14', cores: 12, ram: '64 GB', storage: '1 TB', price: 26000 },
  { plan: 'VPS 15', cores: 12, ram: '128 GB', storage: '1 TB', price: 32400 },
];

const windowsVpsData = [
  { plan: 'VPS 01', cores: 1, ram: '1 GB', storage: '30 GB', price: 1390 },
  { plan: 'VPS 02', cores: 1, ram: '2 GB', storage: '50 GB', price: 1750 },
  { plan: 'VPS 03', cores: 2, ram: '2 GB', storage: '100 GB', price: 2200 },
  { plan: 'VPS 04', cores: 2, ram: '4 GB', storage: '100 GB', price: 2800 },
  { plan: 'VPS 05', cores: 2, ram: '6 GB', storage: '200 GB', price: 3700 },
  { plan: 'VPS 06', cores: 4, ram: '8 GB', storage: '200 GB', price: 4900 },
  { plan: 'VPS 07', cores: 4, ram: '16 GB', storage: '250 GB', price: 7450 },
  { plan: 'VPS 08', cores: 4, ram: '32 GB', storage: '500 GB', price: 13000 },
  { plan: 'VPS 09', cores: 8, ram: '16 GB', storage: '500 GB', price: 9400 },
  { plan: 'VPS 10', cores: 8, ram: '32 GB', storage: '500 GB', price: 14200 },
  { plan: 'VPS 11', cores: 8, ram: '16 GB', storage: '1 TB', price: 10900 },
  { plan: 'VPS 12', cores: 8, ram: '32 GB', storage: '1 TB', price: 15700 },
  { plan: 'VPS 13', cores: 8, ram: '64 GB', storage: '1 TB', price: 25300 },
  { plan: 'VPS 14', cores: 12, ram: '64 GB', storage: '1 TB', price: 26500 },
  { plan: 'VPS 15', cores: 12, ram: '128 GB', storage: '1 TB', price: 32900 },
];

const linuxDedicatedData = [
  { plan: 'DS 01', cores: 2, ram: '4 GB', storage: '100 GB', price: 2500 },
  { plan: 'DS 02', cores: 2, ram: '6 GB', storage: '200 GB', price: 3400 },
  { plan: 'DS 03', cores: 4, ram: '8 GB', storage: '200 GB', price: 4800 },
  { plan: 'DS 04', cores: 4, ram: '16 GB', storage: '250 GB', price: 7350 },
  { plan: 'DS 05', cores: 4, ram: '32 GB', storage: '500 GB', price: 12900 },
  { plan: 'DS 06', cores: 8, ram: '16 GB', storage: '500 GB', price: 9700 },
  { plan: 'DS 07', cores: 8, ram: '32 GB', storage: '500 GB', price: 14500 },
  { plan: 'DS 08', cores: 8, ram: '16 GB', storage: '1 TB', price: 11200 },
  { plan: 'DS 09', cores: 8, ram: '32 GB', storage: '1 TB', price: 16000 },
  { plan: 'DS 10', cores: 8, ram: '64 GB', storage: '1 TB', price: 25600 },
  { plan: 'DS 11', cores: 12, ram: '64 GB', storage: '1 TB', price: 27200 },
  { plan: 'DS 12', cores: 12, ram: '128 GB', storage: '1 TB', price: 32400 },
  { plan: 'DS 13', cores: 12, ram: '256 GB', storage: '1 TB', price: 58000 },
  { plan: 'DS 14', cores: 16, ram: '128 GB', storage: '1 TB', price: 33600 },
  { plan: 'DS 15', cores: 16, ram: '256 GB', storage: '1 TB', price: 59200 },
];

const windowsDedicatedData = [
  { plan: 'DS 01', cores: 2, ram: '4 GB', storage: '100 GB', price: 3000 },
  { plan: 'DS 02', cores: 2, ram: '6 GB', storage: '200 GB', price: 3900 },
  { plan: 'DS 03', cores: 4, ram: '8 GB', storage: '200 GB', price: 5300 },
  { plan: 'DS 04', cores: 4, ram: '16 GB', storage: '250 GB', price: 7850 },
  { plan: 'DS 05', cores: 4, ram: '32 GB', storage: '500 GB', price: 13400 },
  { plan: 'DS 06', cores: 8, ram: '16 GB', storage: '500 GB', price: 10200 },
  { plan: 'DS 07', cores: 8, ram: '32 GB', storage: '500 GB', price: 15000 },
  { plan: 'DS 08', cores: 8, ram: '16 GB', storage: '1 TB', price: 11700 },
  { plan: 'DS 09', cores: 8, ram: '32 GB', storage: '1 TB', price: 16500 },
  { plan: 'DS 10', cores: 8, ram: '64 GB', storage: '1 TB', price: 26100 },
  { plan: 'DS 11', cores: 12, ram: '64 GB', storage: '1 TB', price: 27700 },
  { plan: 'DS 12', cores: 12, ram: '128 GB', storage: '1 TB', price: 32900 },
  { plan: 'DS 13', cores: 12, ram: '256 GB', storage: '1 TB', price: 58500 },
  { plan: 'DS 14', cores: 16, ram: '128 GB', storage: '1 TB', price: 34100 },
  { plan: 'DS 15', cores: 16, ram: '256 GB', storage: '1 TB', price: 59700 },
];

const features = [
  "Gig Port Network Speed",
  "Unlimited Bandwidth*",
  "99.999% Uptime",
  "Managed Server",
  "24*7 Legendary Support",
  "SPOC (Single Point of Contact)",
  "Support Response Time 5 Minutes",
  "Intrusion Detection & Protection Firewall",
  "Country Wise IP Block Feature",
  "24*7 Server Monitoring",
  "Dedicated Resource (CPU, RAM, Storage)",
  "Customization & Scalability",
  "Full Admin Access",
  "1 Static IP",
  "Free SSL",
  "Server Location India, USA, UK",
  "Fixed Monthly Billing",
  "No Contract Binding",
  "7 Days money back Guarantee"
];

const panelsLinux = [
  { name: 'CWP Free', limit: '10 Accounts', price: 'FREE' },
  { name: 'CWP Pro', limit: 'Unlimited', price: '₹170/mo' },
  { name: 'cPanel Solo', limit: '1 Account', price: '₹4,050/mo' },
  { name: 'cPanel Admin', limit: '5 Accounts', price: '₹4,790/mo' },
  { name: 'cPanel Pro', limit: '30 Accounts', price: '₹7,000/mo' },
  { name: 'cPanel Premier', limit: '100 Accounts', price: '₹8,960/mo' },
  { name: 'Plesk Web Admin', limit: '10 Domains', price: '₹2,460/mo' },
  { name: 'Plesk Web Pro', limit: '30 Domains', price: '₹4,050/mo' },
  { name: 'Plesk Web Host', limit: 'Unlimited', price: '₹8,110/mo' },
];

const panelsWindows = [
  { name: 'Solid CP', limit: 'Unlimited', price: 'FREE' },
  { name: 'Plesk Web Admin', limit: '10 Domains', price: '₹2,460/mo' },
  { name: 'Plesk Web Pro', limit: '30 Domains', price: '₹4,050/mo' },
  { name: 'Plesk Web Host', limit: 'Unlimited', price: '₹8,110/mo' },
];

const CloudServers = () => {
  const [activeTab, setActiveTab] = useState('linux-vps');
  const { currency } = useCurrency();

  const getTableData = () => {
    switch (activeTab) {
      case 'linux-vps': return linuxVpsData;
      case 'windows-vps': return windowsVpsData;
      case 'linux-dedicated': return linuxDedicatedData;
      case 'windows-dedicated': return windowsDedicatedData;
      default: return linuxVpsData;
    }
  };

  const isWindows = activeTab.includes('windows');

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 overflow-hidden relative">
      <SEO 
        title="Managed Cloud & Dedicated Servers | WebHaze"
        description="Experience WebHaze high-performance, fully customizable servers with 99.999% SLA. Enterprise cloud architecture for your mission-critical workloads."
        keywords="Managed VPS, Dedicated Servers, Cloud Hosting, Windows VPS, Linux VPS, WebHaze Cloud"
        breadcrumb={[
          { name: "Home", url: "https://www.webhaze.in/" },
          { name: "Services", url: "https://www.webhaze.in/services/cloud-servers" },
          { name: "Cloud Servers", url: "https://www.webhaze.in/services/cloud-servers" }
        ]}
      />

      {/* Aceternity: Backgrounds */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-25" />
      <BackgroundBeams className="opacity-30" />

      <div className="container-site relative z-10">
        <div className="flex justify-end mb-8">
          <CurrencySelector />
        </div>
        
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6" style={{ fontFamily: f.l }}>SERVICES</span>
            <h1 className="text-[52px] md:text-[90px] font-black leading-[0.9] mb-10 tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
              <WavyText text="ENTERPRISE" /><br/>
              <WavyText text="CLOUD." delay={0.2} />

            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <TextGenerateEffect
              words="High-performance, fully customizable servers. No lock-in, fixed monthly billing, and 24/7 legendary support with a 5-minute response time."
              className="text-lg md:text-xl text-white/60 max-w-2xl font-medium leading-relaxed"
            />
          </ScrollReveal>
        </div>

        {/* Aceternity ScrollVelocity */}
        <div className="mb-24 overflow-hidden border-t border-white/[0.06]">
          <ScrollVelocity text1="LINUX VPS · WINDOWS VPS · DEDICATED SERVERS ·" text2="99.999% UPTIME · 5-MIN SUPPORT · WEBHAZE ·" />
        </div>

        {/* Features Grid */}
        <div className="mb-32">
          <ScrollReveal>
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-12">THE WEBHAZE ADVANTAGE</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.04} direction="up">
                <SpotlightCard
                  className="border border-white/[0.06] bg-white/[0.02] hover:border-white/20 transition-all duration-300 h-full"
                  spotlightColor="rgba(255,255,255,0.04)"
                >
                  <div className="p-5 flex items-center gap-4 h-full">
                    <div className="w-1.5 h-1.5 bg-white/30 flex-shrink-0" style={{ borderRadius: 0 }} />
                    <span className="text-sm font-medium text-white/70">{feature}</span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Pricing Tables */}
        <div className="mb-32" id="pricing">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">SERVER VALUATION</h2>
              <div className="flex flex-wrap gap-2 p-1 bg-white/[0.03] border border-white/10 rounded-full w-full md:w-auto">
                {[
                  { id: 'linux-vps', label: 'Linux VPS' },
                  { id: 'windows-vps', label: 'Windows VPS' },
                  { id: 'linux-dedicated', label: 'Linux Dedicated' },
                  { id: 'windows-dedicated', label: 'Windows Dedicated' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-white !text-black' 
                         : 'text-white hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[800px]">
                         <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  <div>Plan</div>
                  <div>Cores</div>
                  <div>RAM</div>
                  <div>Storage</div>
                  <div>Monthly Rate</div>
                  <div></div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getTableData().map((row, i) => (
                      <div 
                        key={i} 
                        className="grid grid-cols-6 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center group"
                      >
                        <div className="font-bold text-white group-hover:text-white transition-colors">{row.plan}</div>
                        <div className="text-white">{row.cores} vCore{row.cores > 1 ? 's' : ''}</div>
                        <div className="text-white">{row.ram}</div>
                        <div className="text-white">{row.storage}</div>
                        <div className="font-bold text-lg text-white">{formatPrice(applyMargin(row.price), currency)}</div>
                        <div className="text-right">
                          <Link 
                            to="/contact" 
                            className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white hover:!text-black transition-all duration-300"
                          >
                            Deploy
                          </Link>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Control Panels */}
        <div className="mb-20">
          <ScrollReveal>
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-12">AVAILABLE CONTROL PANELS</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(isWindows ? panelsWindows : panelsLinux).map((panel, i) => (
                <SpotlightCard
                  key={i}
                  className="border border-white/[0.06] bg-white/[0.02] hover:border-white/20 transition-all duration-300"
                  spotlightColor="rgba(255,255,255,0.04)"
                >
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <h3 className="font-black text-white mb-2 uppercase tracking-tight text-sm">{panel.name}</h3>
                    <p className="text-white/50 text-sm mb-4">{panel.limit}</p>
                    <div className="text-[10px] font-black tracking-[0.2em] text-white/70 bg-white/5 border border-white/[0.08] px-4 py-1.5 uppercase">{panel.price}</div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Aceternity: LampContainer CTA */}
      <LampContainer className="mt-0">
        <ScrollReveal>
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6 text-center" style={{ fontFamily: f.l }}>
            NEED SOMETHING CUSTOM?
          </span>
          <h2 className="text-[40px] md:text-[80px] font-black tracking-[-0.04em] leading-[0.85] uppercase mb-10 text-center" style={{ fontFamily: f.h }}>
            CUSTOM
            <br />
            <span className="text-white">CONFIGURATION.</span>
          </h2>
          <p className="text-white/60 text-center max-w-xl mx-auto mb-10" style={{ fontFamily: f.b }}>
            Our enterprise architects can design a custom bare-metal or cloud infrastructure strictly tailored to your high-scale workload.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            to="/contact"
            className="px-14 py-5 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
          >
            Contact Sales
          </Link>
        </ScrollReveal>
      </LampContainer>
    </div>
  );
};

export default CloudServers;
