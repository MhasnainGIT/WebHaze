import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import { SpotlightCard, BackgroundBeams, GlowingStarsBackground } from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const inputClass =
  'block w-full border-b border-white/10 px-0 py-4 text-white bg-transparent placeholder:text-white/30 transition-all duration-300 hover:border-white/30 focus:border-white focus:outline-none focus:ring-0 font-medium text-sm tracking-wide';
const labelClass = 'text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2 block';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 pt-32 relative overflow-hidden">
      {/* Aceternity: Backgrounds */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-30" />
      <BackgroundBeams className="opacity-30" />

      <SEO
        title="Secure Login | Access Your WebHaze Dashboard"
        description="Login to your WebHaze account to manage your websites, view analytics, and uplink with support."
        noindex
        canonical="/login"
      />

      <motion.div
        className="max-w-md w-full space-y-12 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-block group">
            <h1
              className="text-3xl font-black tracking-tighter mb-2 group-hover:opacity-50 transition-opacity"
              style={{ fontFamily: f.h }}
            >
              WEBHAZE.
            </h1>
          </Link>
          <h2
            className="mt-8 text-5xl font-black tracking-tighter uppercase"
            style={{ fontFamily: f.h }}
          >
            Nexus <span className="text-white">Login.</span>
          </h2>
          <p
            className="mt-4 text-white/40 font-medium uppercase text-[10px] tracking-[0.2em]"
            style={{ fontFamily: f.l }}
          >
            Access your digital infrastructure dashboard.
          </p>
        </div>

        {/* Aceternity: SpotlightCard form wrapper */}
        <SpotlightCard
          className="border border-white/[0.08] bg-white/[0.02]"
          spotlightColor="rgba(255,255,255,0.05)"
        >
          <form className="space-y-6 p-8 md:p-10" onSubmit={handleSubmit}>
            <div>
              <label className={labelClass} htmlFor="email">Auth Identifier</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClass}
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="password">Access Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputClass}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-white/10 border-white/20 focus:ring-0 accent-white"
                />
                <label
                  htmlFor="remember-me"
                  className="text-[10px] font-black text-white/40 uppercase tracking-widest"
                  style={{ fontFamily: f.l }}
                >
                  Keep Session
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-[10px] text-white/40 hover:text-white transition-colors font-black uppercase tracking-widest"
                style={{ fontFamily: f.l }}
              >
                Reset Access
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-5 bg-white font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 mt-4 ${
                isLoading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'
              }`}
              style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                  AUTHORIZING...
                </div>
              ) : (
                'ESTABLISH CONNECTION'
              )}
            </button>

            {/* Divider */}
            <div className="relative pt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                <span
                  className="px-6 bg-transparent text-white/30"
                  style={{ fontFamily: f.l }}
                >
                  External Gateway
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-4 bg-transparent text-white border border-white/[0.08] hover:border-white/30 text-[10px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all duration-500"
              style={{ borderRadius: 0, fontFamily: f.l }}
              onClick={() => {
                const apiBase = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? 'https://webhaze.onrender.com' : 'http://localhost:4000');
                window.location.href = `${apiBase}/api/auth/google`;
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
        </SpotlightCard>

        <p
          className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40"
          style={{ fontFamily: f.l }}
        >
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
