import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SEO from '../components/SEO';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Identity mismatch: Passwords do not align.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      toast.success('Access protocol restored.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Security override failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32 pb-20">
      <SEO title="Reset Access | WebHaze Nexus" description="Establish new access credentials for the WebHaze infrastructure." />
      
      <motion.div 
        className="w-full max-w-md glass-card border-white/5 p-10 md:p-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
            NEW <span className="text-white/20">ACCESS.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Establish Secure Protocol
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">New Access Code</label>
            <input 
              type="password" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/10 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Verify Access Code</label>
            <input 
              type="password" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/10 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`w-full py-6 bg-white !text-black font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 rounded-full mt-6 ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
            disabled={loading}
          >
            {loading ? 'Updating Protocol...' : 'Reset Access'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
            Cancel Override?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
