import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/services/web-hosting' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container-site relative flex items-center justify-between h-12 px-6">
        {/* Logo - High Z-Index */}
        <Link to="/" className="group relative z-[1001] flex-shrink-0">
          <span className="text-2xl font-black tracking-tighter font-heading flex items-center">
            WEBHAZE<span className="text-white group-hover:opacity-50 transition-opacity">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-[10px] font-black tracking-[0.2em] transition-colors ${
                location.pathname === link.path ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-[10px] font-black tracking-[0.2em] text-white/50 hover:text-white uppercase">Dashboard</Link>
              <button onClick={logout} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] transition-all uppercase">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-[10px] font-black tracking-[0.2em] text-white/50 hover:text-white uppercase">Login</Link>
              <Link to="/signup" className="px-6 py-2.5 bg-black text-white border border-white/20 rounded-full text-[10px] font-black tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 uppercase">Join Nexus</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle - High Z-Index */}
        <button 
          className="lg:hidden relative z-[1001] w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span className="w-8 h-0.5 bg-white rounded-full" animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
          <motion.span className="w-8 h-0.5 bg-white rounded-full" animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span className="w-8 h-0.5 bg-white rounded-full" animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
        </button>

        {/* Mobile Menu - Aggressive Blackout */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-[#000000] z-[1000] flex flex-col items-center justify-center min-h-screen w-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-12 text-center w-full max-w-xs mx-auto">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-4xl font-black tracking-tighter text-white hover:text-white/50 transition-all uppercase block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div className="h-px w-20 bg-white/10 my-4" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} />

                <div className="flex flex-col items-center gap-8 w-full">
                  {user ? (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col gap-6">
                      <Link to="/dashboard" className="text-xl font-black tracking-[0.2em] text-white/50 uppercase">Dashboard</Link>
                      <button onClick={logout} className="text-xl font-black tracking-[0.2em] text-white uppercase">Logout</button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col gap-10 items-center">
                      <Link to="/login" className="text-xl font-black tracking-[0.2em] text-white/50 uppercase">Login</Link>
                      <Link to="/signup" className="px-12 py-5 bg-white text-black text-xs font-black tracking-[0.3em] rounded-full uppercase hover:bg-white/80 transition-all">
                        Join Nexus
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default PremiumNavbar;