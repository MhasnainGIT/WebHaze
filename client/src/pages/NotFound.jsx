import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { BackgroundBeams, GlowingStarsBackground } from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const NotFound = () => (
  <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
    <SEO title="404 — Page Not Found | WebHaze" description="The page you're looking for doesn't exist." />

    {/* Aceternity: Backgrounds */}
    <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-40" />
    <BackgroundBeams className="opacity-40" />

    <div className="text-center relative z-10">
      <motion.p
        className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase mb-6"
        style={{ fontFamily: f.l }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ERROR
      </motion.p>
      <motion.h1
        className="text-[120px] md:text-[200px] font-black leading-none tracking-[-0.04em] text-white mb-6"
        style={{ fontFamily: f.h }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-white/60 text-lg mb-12"
        style={{ fontFamily: f.b }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        This page doesn't exist or was moved.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link
          to="/"
          className="px-10 py-4 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
          style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
        >
          Go Home
        </Link>
        <Link
          to="/contact"
          className="px-10 py-4 bg-transparent text-white border border-white/20 text-[12px] font-bold tracking-[0.15em] uppercase hover:border-white transition-all"
          style={{ borderRadius: 0, fontFamily: f.l }}
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  </div>
);

export default NotFound;
