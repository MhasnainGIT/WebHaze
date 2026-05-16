import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

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
    { 
      name: 'SERVICES', 
      dropdown: [
        { name: 'Web Hosting', path: '/services/web-hosting' },
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'App Development', path: '/services/app-development' },
        { name: 'Cloud Servers', path: '/services/cloud-servers' }
      ]
    },
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
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button className={`text-[10px] font-black tracking-[0.2em] transition-colors ${
                  location.pathname.startsWith('/services') ? 'text-white' : 'text-white/50 group-hover:text-white'
                }`}>
                  {link.name}
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-2 flex flex-col gap-2 min-w-[220px]">
                    {link.dropdown.map(sub => (
                      <Link 
                        key={sub.name}
                        to={sub.path}
                        className={`text-[10px] font-black tracking-[0.15em] uppercase px-4 py-3 hover:bg-white/5 transition-colors whitespace-nowrap text-left ${location.pathname === sub.path ? 'text-white bg-white/5' : 'text-white/50 hover:text-white'}`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-[10px] font-black tracking-[0.2em] transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            )
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
              <Link to="/signup" className="px-6 py-2.5 bg-black text-white border border-white/20 rounded-full text-[10px] font-black tracking-[0.2em] hover:bg-white hover:!text-black hover:border-white transition-all duration-500 uppercase">Join Nexus</Link>
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
              key={user ? 'logged-in' : 'logged-out'}
              className="fixed inset-0 bg-[#000000] z-[1000] flex flex-col items-center overflow-y-auto min-h-screen w-screen px-6 pt-32 pb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-10 text-center w-full max-w-sm mx-auto">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    className="w-full"
                  >
                    {link.dropdown ? (
                      <div className="flex flex-col items-center w-full">
                        <button 
                          onClick={() => toggleDropdown(link.name)}
                          className="flex items-center justify-center gap-3 text-4xl font-black tracking-tighter text-white hover:text-white/50 transition-all uppercase w-full py-2 focus:outline-none"
                        >
                          {link.name}
                          <motion.svg 
                            animate={{ rotate: openDropdown === link.name ? 180 : 0 }} 
                            className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="square" strokeWidth={3} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {openDropdown === link.name && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden w-full flex flex-col gap-4 mt-4"
                            >
                              {link.dropdown.map(sub => (
                                <Link 
                                  key={sub.name} 
                                  to={sub.path} 
                                  className="text-xl font-bold tracking-tight text-white/50 hover:text-white transition-all uppercase block py-2"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link 
                        to={link.path} 
                        className="text-4xl font-black tracking-tighter text-white hover:text-white/50 transition-all uppercase block w-full py-2"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div className="h-px w-16 bg-white/10 my-2" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} />

                <div className="flex flex-col items-center gap-8 w-full mt-4">
                  {user ? (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col gap-8 items-center w-full">
                      <Link to="/dashboard" className="text-xl font-black tracking-[0.2em] text-white/50 hover:text-white uppercase">Dashboard</Link>
                      {(user.role === 'admin' || user.email?.toLowerCase() === 'mohdhasnain1544@gmail.com' || user.email?.toLowerCase() === 'webhaze.in@gmail.com') && (
                        <Link to="/admin-nexus" className="text-xl font-black tracking-[0.2em] text-white/50 hover:text-white uppercase text-red-500">Admin Nexus</Link>
                      )}
                      <button onClick={logout} className="px-12 py-5 bg-white !text-black text-xs font-black tracking-[0.3em] uppercase hover:bg-white/90 transition-all block w-full" style={{ borderRadius: 0 }}>Logout</button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col gap-8 items-center w-full">
                      <Link to="/login" className="text-xl font-black tracking-[0.2em] text-white/50 hover:text-white uppercase">Login</Link>
                      <Link to="/signup" className="px-12 py-5 bg-white !text-black text-xs font-black tracking-[0.3em] uppercase hover:bg-white/90 transition-all block w-full" style={{ borderRadius: 0 }}>
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