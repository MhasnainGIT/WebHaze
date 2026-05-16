import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SEO from '../components/SEO';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Identity email required.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSubmitted(true);
      toast.success('Recovery link transmitted.');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transmission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32 pb-20">
      <SEO title="Password Recovery | WebHaze Nexus" description="Recover your access credentials for the WebHaze infrastructure." />
      
      <motion.div 
        className="w-full max-w-md glass-card border-white/5 p-10 md:p-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
            RECOVER <span className="text-white/20">ACCESS.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Initialize Security Override
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Identity Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/10 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className={`w-full py-6 bg-white !text-black font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 rounded-full mt-6 ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
              disabled={loading}
            >
              {loading ? 'Transmitting...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <p className="text-white/60 mb-8 font-medium italic">
              "If an account is associated with that identity, a recovery link has been transmitted to your digital mail."
            </p>
            <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-white/70 transition-colors">
              Return to Uplink
            </Link>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
            Remembered your access?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
