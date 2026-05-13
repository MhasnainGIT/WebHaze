import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <SEO 
        title="Secure Login | Access Your WebHaze Dashboard"
        description="Login to your WebHaze account to manage your websites, view analytics, and uplink with support. Secure, encrypted, and fast access."
        keywords="WebHaze Login, manage website, hosting dashboard login, secure web portal"
      />
      
      <motion.div 
        className="max-w-md w-full space-y-12 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center">
          <Link to="/" className="inline-block group">
            <h1 className="text-3xl font-black tracking-tighter mb-2 group-hover:opacity-50 transition-opacity">WEBHAZE.</h1>
          </Link>
          <h2 className="mt-8 text-5xl font-black tracking-tighter uppercase">Nexus <span className="text-white/20">Login.</span></h2>
          <p className="mt-4 text-white/40 font-medium tracking-tight uppercase text-[10px] tracking-[0.2em]">Access your digital infrastructure dashboard.</p>
        </div>

        <form className="space-y-6 glass-card border-white/5" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 block px-1">
                Auth Identifier
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input py-4 px-6"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 block px-1">
                Access Token
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input py-4 px-6"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-white/10 border-white/20 rounded focus:ring-0 accent-white"
              />
              <label htmlFor="remember-me" className="ml-3 block text-[10px] font-black text-white/40 uppercase tracking-widest">
                Keep Session
              </label>
            </div>

            <div className="text-[10px]">
              <Link to="/forgot-password" stroke="1" className="text-white/60 hover:text-white transition-colors font-black uppercase tracking-widest">
                Reset Access
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-6 text-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-3"></div>
                AUTHORIZING...
              </div>
            ) : (
              'ESTABLISH CONNECTION'
            )}
          </button>

          <div className="relative pt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="px-6 bg-[#0A0A0A] text-white/20">External Gateway</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary w-full py-5 text-[10px] flex items-center justify-center gap-4"
            onClick={() => {
              window.location.href = `${process.env.REACT_APP_API_URL || 'https://webhaze.onrender.com'}/api/auth/google`;
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            IDENTITY SYNC
          </button>
        </form>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          No Terminal ID?{' '}
          <Link to="/signup" className="text-white hover:opacity-50 transition-all underline underline-offset-8">
            Request Provisioning
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;