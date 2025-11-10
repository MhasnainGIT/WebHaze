import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import toast, { Toaster } from 'react-hot-toast';

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [websites, setWebsites] = useState([]);
  const [subscription, setSubscription] = useState({
    plan: 'Professional Plan',
    price: '$29/month',
    status: 'active'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    marketingEmails: true
  });

  useEffect(() => {
    // Load user's websites from localStorage or API
    const savedWebsites = JSON.parse(localStorage.getItem('userWebsites') || '[]');
    setWebsites(savedWebsites);
    
    // Load user profile data
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const savedNotifications = JSON.parse(localStorage.getItem('userNotifications') || '{}');
    
    setFormData({
      name: user?.name || savedProfile.name || '',
      email: user?.email || savedProfile.email || '',
      phone: savedProfile.phone || '',
      company: savedProfile.company || '',
      website: savedProfile.website || ''
    });
    
    setNotifications({
      emailUpdates: savedNotifications.emailUpdates ?? true,
      smsAlerts: savedNotifications.smsAlerts ?? false,
      marketingEmails: savedNotifications.marketingEmails ?? true
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile
    localStorage.setItem('userProfile', JSON.stringify(formData));
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }
    // Update password logic here
    toast.success('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationUpdate = async () => {
    // Request browser notification permission if notifications are enabled
    if (notifications.emailUpdates || notifications.smsAlerts) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('WebHaze Notifications', {
            body: 'You will now receive notifications from WebHaze',
            icon: '/favicon.ico'
          });
        } else if (permission === 'denied') {
          toast.error('Notification permission denied. Please enable in browser settings.');
          return;
        }
      } else {
        toast.error('This browser does not support notifications.');
      }
    }
    
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    toast.success('Notification preferences updated!');
  };

  const handleNotificationToggle = async (type, value) => {
    if (value && (type === 'emailUpdates' || type === 'smsAlerts')) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'denied') {
          toast.error('Please enable notifications in your browser settings to receive alerts.');
          return;
        }
      }
    }
    
    setNotifications({
      ...notifications,
      [type]: value
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Delete account logic
      localStorage.clear();
      logout();
      toast.success('Account deleted successfully!');
    }
  };

  const createWebsite = () => {
    const newWebsite = {
      id: Date.now(),
      name: `Website ${websites.length + 1}`,
      domain: `example${websites.length + 1}.com`,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    const updatedWebsites = [...websites, newWebsite];
    setWebsites(updatedWebsites);
    localStorage.setItem('userWebsites', JSON.stringify(updatedWebsites));
    toast.success('Website created successfully!');
  };

  const deleteWebsite = (id) => {
    const updatedWebsites = websites.filter(site => site.id !== id);
    setWebsites(updatedWebsites);
    localStorage.setItem('userWebsites', JSON.stringify(updatedWebsites));
    toast.success('Website deleted successfully!');
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
            <div className="glass-card p-6 mb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {(formData.name || user?.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <h3 className="text-xl font-semibold">{formData.name || user?.name || 'User'}</h3>
                <p className="text-gray-400 text-sm">{formData.email || user?.email || 'No email'}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-white/20 border-white/30 text-white' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
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
            <div className="glass-card p-8">
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
                          className="glass-input w-full"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="glass-input w-full"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="glass-input w-full"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="glass-input w-full"
                          placeholder="Enter your company name"
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
                        className="glass-input w-full"
                        placeholder="Enter your website URL"
                      />
                    </div>
                    <div>
                      <button type="submit" className="glass-button ripple-effect">
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
                    <button 
                      onClick={createWebsite}
                      className="glass-button ripple-effect"
                    >
                      Create New Website
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {websites.length === 0 ? (
                      <div className="col-span-2 text-center py-12">
                        <p className="text-gray-400 mb-4">No websites created yet</p>
                        <button 
                          onClick={createWebsite}
                          className="glass-button ripple-effect"
                        >
                          Create Your First Website
                        </button>
                      </div>
                    ) : (
                      websites.map((site) => (
                        <div
                          key={site.id}
                          className="glass-card p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">{site.name}</h3>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                              {site.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-4">
                            {site.domain}
                          </p>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => toast.success('Edit feature coming soon!')}
                              className="glass-button text-xs px-3 py-1"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => window.open(`https://${site.domain}`, '_blank')}
                              className="glass-button text-xs px-3 py-1"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => deleteWebsite(site.id)}
                              className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs hover:bg-red-500/30 transition-all duration-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h3 className="font-semibold mb-2">Current Plan</h3>
                      <p className="text-gray-400 mb-4">{subscription.plan} - {subscription.price}</p>
                      <button 
                        onClick={() => toast.success('Redirecting to upgrade page...')}
                        className="glass-button"
                      >
                        Upgrade Plan
                      </button>
                    </div>
                    <div className="glass-card p-6">
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-gray-400 mb-4">**** **** **** 1234</p>
                      <button 
                        onClick={() => toast.success('Payment update feature coming soon!')}
                        className="glass-button"
                      >
                        Update Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h3 className="font-semibold mb-4">Change Password</h3>
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="glass-input w-full"
                          required
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="glass-input w-full"
                          required
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="glass-input w-full"
                          required
                        />
                        <button 
                          type="submit"
                          className="glass-button"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                    <div className="glass-card p-6">
                      <h3 className="font-semibold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span>Email Updates</span>
                          <input
                            type="checkbox"
                            checked={notifications.emailUpdates}
                            onChange={(e) => handleNotificationToggle('emailUpdates', e.target.checked)}
                            className="w-4 h-4"
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>SMS Alerts</span>
                          <input
                            type="checkbox"
                            checked={notifications.smsAlerts}
                            onChange={(e) => handleNotificationToggle('smsAlerts', e.target.checked)}
                            className="w-4 h-4"
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>Marketing Emails</span>
                          <input
                            type="checkbox"
                            checked={notifications.marketingEmails}
                            onChange={(e) => handleNotificationToggle('marketingEmails', e.target.checked)}
                            className="w-4 h-4"
                          />
                        </label>
                        <button 
                          onClick={handleNotificationUpdate}
                          className="glass-button"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                    <div className="glass-card p-6 border-red-500/20 bg-red-500/10">
                      <h3 className="font-semibold mb-2 text-red-400">Danger Zone</h3>
                      <p className="text-gray-400 mb-4">Permanently delete your account and all data</p>
                      <button 
                        onClick={handleDeleteAccount}
                        className="glass-button bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                      >
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
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
    </div>
  );
};

export default Account;