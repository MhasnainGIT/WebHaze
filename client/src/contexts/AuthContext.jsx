import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

// Configure axios base URL and credentials
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

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
      // token invalid or expired — clear it
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user, token } = response.data;
      setToken(token);
      setUser(user);
      clarityAnalytics?.identify(user.id, null, null, user.name);
      clarityAnalytics?.trackEvent('user_login');
      clarityAnalytics?.setTag('user_plan', user.plan);
      toast.success(`Welcome back, ${user.name}!`);
      return user;
    } catch (error) {
      const msg = error.response?.data?.error || 'Login failed. Please check your credentials.';
      toast.error(msg);
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password, name });
      const { user, token } = response.data;
      setToken(token);
      setUser(user);
      clarityAnalytics?.identify(user.id, null, null, user.name);
      clarityAnalytics?.trackEvent('user_registration');
      clarityAnalytics?.setTag('user_plan', user.plan);
      clarityAnalytics?.upgradeSession('new_user_registration');
      toast.success(`Account created successfully! Welcome to WebHaze, ${user.name}!`);
      return user;
    } catch (error) {
      const msg = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(msg);
      throw error;
    }
  };

  const logout = async () => {
    clarityAnalytics?.trackEvent('user_logout');
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      toast.success('Logged out successfully!');
    }
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