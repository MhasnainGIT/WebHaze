import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <SEO title="Authenticating | WebHaze" description="Completing your secure authentication with WebHaze." noindex />
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <h1 className="text-2xl font-black tracking-tighter uppercase mb-2">Authenticating</h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Synchronizing Nexus...</p>
        <nav className="mt-12 space-x-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <a href="https://www.webhaze.in/" className="hover:text-white transition-colors">Home</a>
          <a href="https://www.webhaze.in/about" className="hover:text-white transition-colors">About</a>
          <a href="https://www.webhaze.in/pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="https://www.webhaze.in/contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default AuthCallback;