import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    websites: 0,
    visits: 0,
    uptime: '100%'
  });

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setStats({
        websites: 3,
        visits: 1240,
        uptime: '99.99%'
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Command Dashboard | WebHaze Infrastructure"
        description="Manage your digital infrastructure, view website analytics, and provision new nodes from your WebHaze command center."
      />
      
      <div className="container-site">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
          <div>
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              COMMAND <span className="text-white/20">CENTER.</span>
            </motion.h1>
            <p className="text-xl text-white/40 font-medium tracking-tight uppercase text-[10px] tracking-[0.3em]">
              Welcome back, {user?.name || 'Administrator'}
            </p>
          </div>
          <Link to="/create-website" className="btn-primary py-4 px-10">
            Provision New Node
          </Link>
        </div>

        <div className="bento-grid mb-12">
          <div className="bento-item md:col-span-2 lg:col-span-2 border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Active Nodes</p>
            <h3 className="text-6xl font-black text-white mb-2">{stats.websites}</h3>
            <p className="text-white/50 text-sm font-medium">Digital properties deployed</p>
          </div>
          <div className="bento-item md:col-span-2 lg:col-span-2 border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Global Telemetry</p>
            <h3 className="text-6xl font-black text-white mb-2">{stats.visits.toLocaleString()}</h3>
            <p className="text-white/50 text-sm font-medium">Total unique visitors</p>
          </div>
          <div className="bento-item md:col-span-2 lg:col-span-2 border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Network Uptime</p>
            <h3 className="text-6xl font-black text-white mb-2">{stats.uptime}</h3>
            <p className="text-white/50 text-sm font-medium">Operational stability</p>
          </div>
        </div>

        <div className="glass-card border-white/5">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-black tracking-tight uppercase">Recent Deployments</h2>
            <Link to="/account" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
              Manage All Nodes
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-tight">Project-Nexus-0{i}.webhaze.in</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Deployed on node HYD-0{i}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.2em] text-white/40 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                    Operational
                  </span>
                  <Link to={`/editor/${i}`} className="text-white hover:opacity-50 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;