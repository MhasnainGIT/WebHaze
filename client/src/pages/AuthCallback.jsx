import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // We'll add a way to set token manually or just refresh user

  useEffect(() => {
    // Check both hash (#token=) and query (?token=) for mobile compatibility
    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const queryParams = new URLSearchParams(window.location.search);
    
    const token = hashParams.get('token') || queryParams.get('token');
    const error = hashParams.get('error') || queryParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      toast.error('Authentication failed.');
      navigate('/login');
      return;
    }

    if (token) {
      console.log('Token synchronized successfully.');
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Force a full reload to /dashboard to ensure AuthContext re-initializes
      window.location.href = '/dashboard';
    } else {
      console.warn('No token found in callback URL.');
      navigate('/login');
    }
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