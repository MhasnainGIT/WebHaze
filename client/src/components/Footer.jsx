import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-white/5 pt-32 pb-20 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="container-site relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <Link to="/" className="group block mb-8">
                            <span className="text-4xl font-black tracking-tighter font-heading">
                                WEBHAZE<span className="text-white opacity-50">.</span>
                            </span>
                        </Link>
                        <p className="text-text-light text-xl font-medium leading-relaxed max-w-sm mb-12">
                            Empowering visionaries to build and scale the next generation of digital ecosystems.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="w-12 h-12 rounded-2xl glass-morphism flex items-center justify-center hover:bg-white hover:!text-black transition-all group">
                                <span className="font-black text-xl">𝕏</span>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl glass-morphism flex items-center justify-center hover:bg-white hover:!text-black transition-all group">
                                <span className="font-black text-xl text-[14px]">LI</span>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-10">Infrastructure</h4>
                        <ul className="space-y-6">
                            <li><Link to="/services/web-hosting" className="text-text-light hover:text-white font-bold tracking-tight transition-colors">Edge Hosting</Link></li>
                            <li><Link to="/services/website-development" className="text-text-light hover:text-white font-bold tracking-tight transition-colors">Nexus Studio</Link></li>
                            <li><Link to="/services/app-development" className="text-text-light hover:text-white font-bold tracking-tight transition-colors">Core Development</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-10">Platform</h4>
                        <ul className="space-y-6">
                            <li><Link to="/about" className="text-text-light hover:text-white font-bold tracking-tight transition-colors">Our Mission</Link></li>
                            <li><Link to="/contact" className="text-text-light hover:text-white font-bold tracking-tight transition-colors">Get Uplink</Link></li>
                            <li><Link to="/pricing" className="text-text-light hover:text-white font-bold tracking-tight transition-colors">Credit Plans</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light">
                        © 2024 WEBHAZE STUDIOS. ALL PROTOCOLS RESERVED.
                    </p>
                    <div className="flex gap-12">
                        <Link to="/privacy" className="text-text-light hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Privacy Protocol</Link>
                        <Link to="/terms" className="text-text-light hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;