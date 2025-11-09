import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Account = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Mohammed Hasnain',
    email: 'mohdhasnain1544@gmail.com',
    phone: '+91-8919019679',
    company: 'WebHaze',
    website: 'https://webhaze.com'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  const tabs = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'websites', 
      label: 'Websites', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="Account - WebHaze"
        description="Manage your WebHaze account, websites, and billing information."
      />
      
      <div className="container-site py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Account
            <span className="text-white/60"> Dashboard</span>
          </h1>
          <p className="text-lg text-gray-400">
            Manage your WebHaze account and digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold mx-auto mb-4">
                  MH
                </div>
                <h3 className="text-xl font-semibold">Mohammed Hasnain</h3>
                <p className="text-gray-400 text-sm">mohdhasnain1544@gmail.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-lg p-8">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input bg-white/5"
                          placeholder="Mohammed Hasnain"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input bg-white/5"
                          placeholder="mohdhasnain1544@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input bg-white/5"
                          placeholder="+91-8919019679"
                        />
                      </div>
                      <div>
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="form-input bg-white/5"
                          placeholder="WebHaze"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="form-input bg-white/5"
                        placeholder="https://webhaze.com"
                      />
                    </div>
                    <div>
                      <button type="submit" className="btn-primary">
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'websites' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Websites</h2>
                    <button className="btn-primary">
                      Create New Website
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3].map((site) => (
                      <div
                        key={site}
                        className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Website {site}</h3>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Active
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                          example{site}.com
                        </p>
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-xs px-3 py-1">
                            Edit
                          </button>
                          <button className="btn-secondary text-xs px-3 py-1">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="font-semibold mb-2">Current Plan</h3>
                      <p className="text-gray-400 mb-4">Professional Plan - $29/month</p>
                      <button className="btn-secondary">Upgrade Plan</button>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-gray-400 mb-4">**** **** **** 1234</p>
                      <button className="btn-secondary">Update Payment</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="font-semibold mb-2">Security</h3>
                      <p className="text-gray-400 mb-4">Manage your password and security settings</p>
                      <button className="btn-secondary">Change Password</button>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="font-semibold mb-2">Notifications</h3>
                      <p className="text-gray-400 mb-4">Configure your notification preferences</p>
                      <button className="btn-secondary">Manage Notifications</button>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="font-semibold mb-2 text-red-400">Danger Zone</h3>
                      <p className="text-gray-400 mb-4">Permanently delete your account and all data</p>
                      <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;