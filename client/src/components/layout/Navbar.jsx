import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-morphism border-none bg-black/20">
      <div className="container-site">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-black text-white tracking-tighter font-heading">
              WEB<span className="text-primary">HAZE</span>
            </Link>
            
            {user && (
              <div className="hidden md:flex space-x-8 items-center">
                <Link to="/" className="text-sm font-bold text-text-light hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/templates" className="text-sm font-bold text-text-light hover:text-white transition-colors">
                  Templates
                </Link>
                <Link to="/settings" className="text-sm font-bold text-text-light hover:text-white transition-colors">
                  Settings
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-text-light hidden sm:inline">{user.email}</span>
                <button
                  onClick={logout}
                  className="btn-secondary py-2 px-6"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-sm font-bold text-text-light hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary py-2 px-6 text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;