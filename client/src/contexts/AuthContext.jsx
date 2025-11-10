import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

// Configure axios base URL
axios.defaults.baseURL = API_BASE_URL;

// Optional clarity analytics
let clarityAnalytics = null;
try {
  clarityAnalytics = require('../utils/clarity').default;
  clarityAnalytics?.init();
} catch (error) {
  console.log('Clarity analytics not available');
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      // Track user login with Clarity
      clarityAnalytics?.identify(user.id, null, null, user.name);
      clarityAnalytics?.trackEvent('user_login');
      clarityAnalytics?.setTag('user_plan', user.plan);
      
      toast.success(`Welcome back, ${user.name}!`);
      return user;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password, name });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      // Track user registration with Clarity
      clarityAnalytics?.identify(user.id, null, null, user.name);
      clarityAnalytics?.trackEvent('user_registration');
      clarityAnalytics?.setTag('user_plan', user.plan);
      clarityAnalytics?.upgradeSession('new_user_registration');
      
      toast.success(`Account created successfully! Welcome to WebHaze, ${user.name}!`);
      return user;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    // Track user logout
    clarityAnalytics?.trackEvent('user_logout');
    
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;