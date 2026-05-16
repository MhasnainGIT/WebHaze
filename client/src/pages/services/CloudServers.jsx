import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';

const MARGIN = 1.30; // 30% commission markup
const applyMargin = (price) => Math.ceil((price * MARGIN) / 10) * 10;
const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(applyMargin(price));

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
    <div className="min-h-screen bg-black text-white pt-32 pb-20 overflow-hidden">
      <SEO 
        title="Managed Cloud & Dedicated Servers | WebHaze"
        description="Experience WebHaze high-performance, fully customizable servers with 99.999% SLA. Enterprise cloud architecture for your mission-critical workloads."
        keywords="Managed VPS, Dedicated Servers, Cloud Hosting, Windows VPS, Linux VPS, WebHaze Cloud"
      />

      <div className="container-site">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
              ENTERPRISE <br/><span className="text-white/20">CLOUD ARCHITECTURE.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
              Experience our high-performance, fully customizable servers. Tailor your configuration with no lock-in, fixed monthly billing, and 24/7 legendary support with a 5-minute response time.
            </p>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <div className="mb-32">
          <ScrollReveal>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-12">THE WEBHAZE ADVANTAGE</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.05} direction="up">
                <div className="p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 h-full flex items-center gap-4 group">
                  <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{feature}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Pricing Tables */}
        <div className="mb-32" id="pricing">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">SERVER VALUATION</h2>
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
                        : 'text-white/50 hover:text-white hover:bg-white/5'
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
                <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
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
                        <div className="text-white/70">{row.cores} vCore{row.cores > 1 ? 's' : ''}</div>
                        <div className="text-white/70">{row.ram}</div>
                        <div className="text-white/70">{row.storage}</div>
                        <div className="font-bold text-lg text-white">{formatPrice(row.price)}</div>
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
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-12">AVAILABLE CONTROL PANELS</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(isWindows ? panelsWindows : panelsLinux).map((panel, i) => (
                <div key={i} className="p-8 bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-all duration-300">
                  <h3 className="font-bold text-white mb-2">{panel.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{panel.limit}</p>
                  <div className="text-[10px] font-black tracking-[0.2em] text-white/80 bg-white/5 px-4 py-1 rounded-full uppercase">{panel.price}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        
        {/* CTA */}
        <div className="mt-32 border border-white/10 p-12 md:p-24 relative overflow-hidden bg-white/[0.01]">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase relative z-10">
              NEED A CUSTOM <br/><span className="text-white/30">CONFIGURATION?</span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl mb-10 relative z-10">
              Our enterprise architects can design a custom bare-metal or cloud infrastructure strictly tailored to your high-scale workload.
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-10 py-5 bg-white !text-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white/90 transition-all relative z-10"
              style={{ borderRadius: 0 }}
            >
              Contact Sales
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default CloudServers;
