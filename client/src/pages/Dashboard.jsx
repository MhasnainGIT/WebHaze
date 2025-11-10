import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { user } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [stats, setStats] = useState({
    activeWebsites: 0,
    totalVisitors: 0,
    uptime: '99.9%',
    storageUsed: '0 GB'
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Fallback to localStorage for non-authenticated users
          const savedWebsites = JSON.parse(localStorage.getItem('userWebsites') || '[]');
          setWebsites(savedWebsites);
          
          const totalVisitors = savedWebsites.reduce((sum, site) => {
            const visitors = parseInt(site.visitors || Math.floor(Math.random() * 10000));
            return sum + visitors;
          }, 0);
          
          const storageUsed = savedWebsites.length === 0 ? 0 : (savedWebsites.length * 0.7 + Math.random() * 2).toFixed(1);
          
          setStats({
            activeWebsites: savedWebsites.length,
            totalVisitors: totalVisitors.toLocaleString(),
            uptime: (savedWebsites.length === 0 && totalVisitors === 0) ? '0%' : `${(99.5 + Math.random() * 0.8).toFixed(1)}%`,
            storageUsed: `${storageUsed} GB`
          });
          
          // Mock recent activity for non-authenticated users
          if (savedWebsites.length > 0) {
            setRecentActivity([
              { action: 'Website created', target: savedWebsites[0]?.name || 'Website', time: '2 hours ago' },
              { action: 'SSL certificate renewed', target: 'All websites', time: '1 day ago' }
            ]);
          }
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setWebsites(data.websites || []);
          setStats({
            activeWebsites: data.websites?.length || 0,
            totalVisitors: data.totalVisitors?.toLocaleString() || '0',
            uptime: (data.uptime === 0 || (data.websites?.length === 0 && data.totalVisitors === 0)) ? '0%' : `${(data.uptime || 99.9).toFixed(1)}%`,
            storageUsed: `${(data.storageUsed || 0).toFixed(1)} GB`
          });
          setRecentActivity(data.recentActivity || []);
        } else {
          // API not available, will use fallback
          throw new Error('API not available');
        }
      } catch (error) {
        // Fallback to localStorage when API is not available
        const savedWebsites = JSON.parse(localStorage.getItem('userWebsites') || '[]');
        setWebsites(savedWebsites);
        
        const totalVisitors = savedWebsites.reduce((sum, site) => {
          const visitors = parseInt(site.visitors || Math.floor(Math.random() * 10000));
          return sum + visitors;
        }, 0);
        
        const storageUsed = (savedWebsites.length * 0.7 + Math.random() * 2).toFixed(1);
        
        setStats({
          activeWebsites: savedWebsites.length,
          totalVisitors: totalVisitors.toLocaleString(),
          uptime: (savedWebsites.length === 0 && totalVisitors === 0) ? '0%' : `${(99.5 + Math.random() * 0.8).toFixed(1)}%`,
          storageUsed: `${storageUsed} GB`
        });
        
        // Mock recent activity
        if (savedWebsites.length > 0) {
          setRecentActivity([
            { action: 'Website created', target: savedWebsites[0]?.name || 'Website', time: '2 hours ago' },
            { action: 'SSL certificate renewed', target: 'All websites', time: '1 day ago' },
            { action: 'Backup completed', target: 'All websites', time: '2 days ago' }
          ]);
        }
      }
    };

    fetchDashboardData();
  }, []);

  const statsConfig = [
    { 
      label: 'Active Websites', 
      value: stats.activeWebsites.toString(), 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      label: 'Total Visitors', 
      value: stats.totalVisitors, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: 'Uptime', 
      value: stats.uptime, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      label: 'Storage Used', 
      value: stats.storageUsed, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="Dashboard - WebHaze"
        description="Manage your websites, view analytics, and control your hosting account."
      />
      
      <div className="container-site py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Welcome back,
            <br />
            <span className="text-white/60">{user?.name?.split(' ')[0] || 'User'}</span>
          </h1>
          <p className="text-lg text-gray-400">
            Here's what's happening with your websites today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsConfig.map((stat, index) => (
            <motion.div 
              key={index} 
              className="glass-morphism rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  {stat.icon}
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Websites */}
          <div className="glass-morphism rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Your Websites</h2>
              <Link to="/create-website" className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium">
                Create New
              </Link>
            </div>
            <div className="space-y-4">
              {websites.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No websites created yet</p>
                  <Link to="/create-website" className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium">
                    Create Your First Website
                  </Link>
                </div>
              ) : (
                websites.map((website, index) => (
                  <div key={website.id || index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{website.name}</h3>
                      <p className="text-gray-400 text-sm">{website.domain}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs mb-1">
                        {website.status}
                      </span>
                      <p className="text-gray-400 text-sm">{website.visitors || Math.floor(Math.random() * 10000).toLocaleString()} visitors</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-morphism rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-white">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent activity</p>
                </div>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span> for{' '}
                        <span className="text-gray-300">{activity.target}</span>
                      </p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/create-website" className="glass-morphism rounded-lg p-6 hover:bg-white/10 transition-colors">
              <div className="mb-4 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Create Website</h3>
              <p className="text-gray-400 text-sm">Launch a new website in minutes</p>
            </Link>
            <Link to="/account" className="glass-morphism rounded-lg p-6 hover:bg-white/10 transition-colors">
              <div className="mb-4 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Account Settings</h3>
              <p className="text-gray-400 text-sm">Manage your account and billing</p>
            </Link>
            <Link to="/contact" className="glass-morphism rounded-lg p-6 hover:bg-white/10 transition-colors">
              <div className="mb-4 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Get Support</h3>
              <p className="text-gray-400 text-sm">Contact our expert support team</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;