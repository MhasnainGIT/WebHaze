import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = '/dashboard';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Synchronizing Nexus...</p>
      </div>
    </div>
  );
};

export default AuthCallback;