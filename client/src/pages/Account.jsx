import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Account = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('identity');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('Identity profile updated.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Identity Management | WebHaze Account"
        description="Manage your personal identity, security protocols, and billing preferences for your WebHaze account."
      />
      
      <div className="container-site">
        <div className="max-w-4xl mb-24">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            IDENTITY <span className="text-white/20">UPLINK.</span>
          </motion.h1>
          <p className="text-xl text-white/40 font-medium tracking-tight uppercase text-[10px] tracking-[0.3em]">
            Manage your global infrastructure permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-4">
            {['identity', 'security', 'billing', 'nodes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                  activeTab === tab 
                    ? 'bg-white !text-black border-white' 
                    : 'text-white/40 border-white/5 hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card border-white/5"
            >
              {activeTab === 'identity' && (
                <div>
                  <h2 className="text-3xl font-black mb-12 tracking-tight uppercase">Identity Profile</h2>
                  <form onSubmit={handleUpdate} className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Legal Identity</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Digital Mail</label>
                      <input 
                        type="email" 
                        className="form-input opacity-50 cursor-not-allowed"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                    <button type="submit" className="btn-primary px-12">
                      Update Profile
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-3xl font-black mb-12 tracking-tight uppercase">Security Protocols</h2>
                  <div className="space-y-8">
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg text-white mb-1">Two-Factor Authentication</p>
                        <p className="text-sm text-white/40">Enhanced security for nexus uplink access.</p>
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 border border-white/10 px-6 py-2 rounded-full hover:text-white transition-all">
                        Configure
                      </button>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg text-white mb-1">Session Management</p>
                        <p className="text-sm text-white/40">Terminate all active connections globally.</p>
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 border border-white/10 px-6 py-2 rounded-full hover:text-white transition-all">
                        Wipe Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {['billing', 'nodes'].includes(activeTab) && (
                <div className="py-20 text-center">
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Protocol data pending...</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;