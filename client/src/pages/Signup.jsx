import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
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
        title="Create an Account | Join WebHaze Studios"
        description="Join WebHaze Studios and start building your digital vision today. Provision your professional website with our elite Website-as-a-Service platform."
        keywords="WebHaze Signup, create website account, join web development platform, register webhaze"
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
          <h2 className="mt-8 text-5xl font-black tracking-tighter uppercase">Nexus <span className="text-white/20">Registry.</span></h2>
          <p className="mt-4 text-white/40 font-medium tracking-tight uppercase text-[10px] tracking-[0.2em]">Provision your digital infrastructure account.</p>
        </div>

        <form className="space-y-6 glass-card border-white/5" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 block px-1">
                Full Identity
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-input py-4 px-6"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 block px-1">
                Digital Mail
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
                required
                className="form-input py-4 px-6"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 block px-1">
                Verify Token
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="form-input py-4 px-6"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
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
                PROVISIONING...
              </div>
            ) : (
              'REQUEST PROVISIONING'
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
          Already Provisioned?{' '}
          <Link to="/login" className="text-white hover:opacity-50 transition-all underline underline-offset-8">
            Establish Connection
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;