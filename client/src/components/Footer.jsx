import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollVelocity } from './ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/[0.05] relative overflow-hidden">
      {/* Aceternity: ScrollVelocity top divider */}
      <ScrollVelocity
        text1="WEBHAZE · WEB DESIGN · DEVELOPMENT · HOSTING · CLOUD ·"
        text2="HYDERABAD · INDIA · GLOBAL · ENTERPRISE · DIGITAL ·"
        className="border-b border-white/[0.04]"
      />

      {/* Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />

      <div className="container-site relative z-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="group block mb-8">
              <span className="text-4xl font-black tracking-tighter" style={{ fontFamily: f.h }}>
                WEBHAZE<span className="text-white/30 group-hover:text-white transition-colors">.</span>
              </span>
            </Link>
            <p
              className="text-white/40 text-base font-medium leading-relaxed max-w-sm mb-10"
              style={{ fontFamily: f.b }}
            >
              Empowering visionaries to build and scale the next generation of digital ecosystems.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/webhazeStudios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WebHaze on X"
                className="w-10 h-10 border border-white/[0.08] bg-white/[0.02] flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-500 text-white/60"
                style={{ borderRadius: 0 }}
              >
                <span className="font-black text-sm">𝕏</span>
              </a>
              <a
                href="https://www.linkedin.com/in/webhaze-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WebHaze on LinkedIn"
                className="w-10 h-10 border border-white/[0.08] bg-white/[0.02] flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-500 text-white/60"
                style={{ borderRadius: 0 }}
              >
                <span className="font-black text-xs">LI</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8"
              style={{ fontFamily: f.l }}
            >
              Infrastructure
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/services/web-hosting"
                  className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm"
                  style={{ fontFamily: f.b }}
                >
                  Edge Hosting
                </Link>
              </li>
              <li>
                <Link
                  to="/services/website-development"
                  className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm"
                  style={{ fontFamily: f.b }}
                >
                  Nexus Studio
                </Link>
              </li>
              <li>
                <Link
                  to="/services/app-development"
                  className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm"
                  style={{ fontFamily: f.b }}
                >
                  Core Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/cloud-servers"
                  className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm"
                  style={{ fontFamily: f.b }}
                >
                  Cloud Servers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8"
              style={{ fontFamily: f.l }}
            >
              Platform
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm" style={{ fontFamily: f.b }}>
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm" style={{ fontFamily: f.b }}>
                  Get Uplink
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm" style={{ fontFamily: f.b }}>
                  Credit Plans
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm" style={{ fontFamily: f.b }}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm" style={{ fontFamily: f.b }}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/50 hover:text-white font-medium tracking-tight transition-colors text-sm" style={{ fontFamily: f.b }}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20"
            style={{ fontFamily: f.l }}
          >
            © 2024 WEBHAZE STUDIOS. ALL PROTOCOLS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link
              to="/privacy"
              className="text-white/20 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
              style={{ fontFamily: f.l }}
            >
              Privacy Protocol
            </Link>
            <Link
              to="/terms"
              className="text-white/20 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
              style={{ fontFamily: f.l }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
