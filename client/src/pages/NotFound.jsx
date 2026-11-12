import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => (
  <div className="min-h-screen bg-black flex items-center justify-center px-6">
    <SEO title="404 — Page Not Found | WebHaze" description="The page you're looking for doesn't exist." />
    <div className="text-center">
      <p className="text-[11px] font-medium tracking-[0.15em] text-white uppercase mb-6" style={{ fontFamily: "'Geist Mono','monospace'" }}>ERROR</p>
      <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-[-0.04em] text-white mb-6" style={{ fontFamily: "'Inter',sans-serif" }}>404</h1>
      <p className="text-white text-lg mb-12" style={{ fontFamily: "'Hanken Grotesk',sans-serif" }}>This page doesn't exist or was moved.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="px-10 py-4 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all" style={{ borderRadius: 0, fontFamily: "'Geist Mono','monospace'" }}>
          Go Home
        </Link>
        <Link to="/contact" className="px-10 py-4 bg-transparent text-white border border-white/20 text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all" style={{ borderRadius: 0, fontFamily: "'Geist Mono','monospace'" }}>
          Contact Us
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
