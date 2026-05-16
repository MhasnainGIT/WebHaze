import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // We'll add a way to set token manually or just refresh user

  useEffect(() => {
    // Google redirect uses hash: /auth/callback#token=...
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      console.error('OAuth error:', error);
      toast.error('Authentication failed.');
      navigate('/login');
      return;
    }

    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // The simplest way to update the global state is to reload or 
      // call a method in AuthContext that re-fetches the user.
      // Since AuthContext already has fetchUser in useEffect, 
      // we can just redirect to dashboard and let it handle it,
      // but to be safe, we'll force a state update if possible.
      window.location.href = '/dashboard';
    } else {
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