import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      label: 'Active Websites', 
      value: '3', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      label: 'Total Visitors', 
      value: '12,543', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: 'Uptime', 
      value: '99.9%', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      label: 'Storage Used', 
      value: '2.1 GB', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    }
  ];

  const websites = [
    {
      name: 'Personal Portfolio',
      domain: 'mohdhasnain.com',
      status: 'Active',
      visitors: '1,234'
    },
    {
      name: 'Business Website',
      domain: 'webhaze.com',
      status: 'Active',
      visitors: '8,901'
    },
    {
      name: 'E-commerce Store',
      domain: 'mystore.com',
      status: 'Active',
      visitors: '2,408'
    }
  ];

  const recentActivity = [
    { action: 'Website deployed', target: 'mohdhasnain.com', time: '2 hours ago' },
    { action: 'SSL certificate renewed', target: 'webhaze.com', time: '1 day ago' },
    { action: 'Backup completed', target: 'mystore.com', time: '2 days ago' },
    { action: 'Domain renewed', target: 'mohdhasnain.com', time: '1 week ago' }
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
            <span className="text-white/60">Mohammed</span>
          </h1>
          <p className="text-lg text-gray-400">
            Here's what's happening with your websites today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
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
              <h2 className="text-xl font-bold">Your Websites</h2>
              <Link to="/create-website" className="btn-primary text-sm px-4 py-2">
                Create New
              </Link>
            </div>
            <div className="space-y-4">
              {websites.map((website, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{website.name}</h3>
                    <p className="text-gray-400 text-sm">{website.domain}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs mb-1">
                      {website.status}
                    </span>
                    <p className="text-gray-400 text-sm">{website.visitors} visitors</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-morphism rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> for{' '}
                      <span className="text-white">{activity.target}</span>
                    </p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
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