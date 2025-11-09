import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileServices, setShowMobileServices] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowMobileServices(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="relative group">
            <motion.div 
              className="text-2xl font-bold text-white tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              WEBHAZE
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide relative group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            
            <div className="relative group">
              <span className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide cursor-pointer">
                SERVICES
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </span>
              <div className="absolute top-8 left-0 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/services/web-hosting" className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors rounded-t-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Web Hosting
                </Link>
                <Link to="/services/website-development" className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Website Development
                </Link>
                <Link to="/services/app-development" className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors rounded-b-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  App Development
                </Link>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide relative group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            {user && (
              <Link 
                to="/account" 
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide relative group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ACCOUNT
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="w-6 h-0.5 bg-white block transition-all duration-300"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white block mt-1 transition-all duration-300"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white block mt-1 transition-all duration-300"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold cursor-pointer">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="absolute right-0 top-12 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/dashboard" className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors rounded-t-lg">
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      console.log('Logout clicked');
                      logout();
                      window.location.href = '/';
                    }} 
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/signup"
                className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
              >
                GET STARTED
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <motion.button
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Back</span>
                </motion.button>
                <span className="text-white font-medium">Menu</span>
                <div className="w-12"></div>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 space-y-6 px-6">
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="text-white text-2xl font-medium tracking-wide hover:text-gray-300 transition-colors duration-300"
                >
                  HOME
                </Link>
                <div className="text-center">
                  <button
                    onClick={() => setShowMobileServices(!showMobileServices)}
                    className="text-white text-2xl font-medium tracking-wide mb-4 flex items-center justify-center gap-2 mx-auto hover:text-gray-300 transition-colors duration-300"
                  >
                    SERVICES
                    <svg className={`w-5 h-5 transition-transform duration-200 ${showMobileServices ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showMobileServices && (
                    <motion.div 
                      className="flex flex-col space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        to="/services/web-hosting" 
                        onClick={closeMobileMenu}
                        className="text-white/70 text-lg hover:text-white transition-colors duration-300"
                      >
                        Web Hosting
                      </Link>
                      <Link 
                        to="/services/website-development" 
                        onClick={closeMobileMenu}
                        className="text-white/70 text-lg hover:text-white transition-colors duration-300"
                      >
                        Website Development
                      </Link>
                      <Link 
                        to="/services/app-development" 
                        onClick={closeMobileMenu}
                        className="text-white/70 text-lg hover:text-white transition-colors duration-300"
                      >
                        App Development
                      </Link>
                    </motion.div>
                  )}
                </div>
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu}
                  className="text-white text-2xl font-medium tracking-wide hover:text-gray-300 transition-colors duration-300"
                >
                  CONTACT
                </Link>
                {user && (
                  <Link 
                    to="/account" 
                    onClick={closeMobileMenu}
                    className="text-white text-2xl font-medium tracking-wide hover:text-gray-300 transition-colors duration-300"
                  >
                    ACCOUNT
                  </Link>
                )}
              </div>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {user ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <span className="text-white/70 text-lg">{user.name}</span>
                    <div className="flex flex-col space-y-2">
                      <Link 
                        to="/dashboard" 
                        onClick={closeMobileMenu}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                          window.location.href = '/';
                        }} 
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center mb-8">
                    <Link 
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="inline-block px-8 py-3 bg-white text-black text-lg font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
                    >
                      GET STARTED
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default PremiumNavbar;