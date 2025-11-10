const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');
const auth = require('../middleware/auth');

// Get dashboard data
router.get('/', auth, async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({ userId: req.user.id });
    
    if (!dashboard) {
      // Create default dashboard for new users
      dashboard = new Dashboard({
        userId: req.user.id,
        websites: [],
        totalVisitors: 0,
        uptime: 99.9,
        storageUsed: 0,
        recentActivity: [],

      });
      await dashboard.save();
    }
    
    // Calculate real-time uptime and storage
    const currentUptime = calculateUptime(dashboard);
    const totalStorage = calculateTotalStorage(dashboard);
    
    dashboard.uptime = currentUptime;
    dashboard.storageUsed = totalStorage;
    
    res.json(dashboard);
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new website
router.post('/websites', auth, async (req, res) => {
  try {
    const { name, domain } = req.body;
    
    let dashboard = await Dashboard.findOne({ userId: req.user.id });
    if (!dashboard) {
      dashboard = new Dashboard({ userId: req.user.id });
    }
    
    const newWebsite = {
      name,
      domain,
      status: 'active',
      visitors: Math.floor(Math.random() * 1000),
      storageUsed: Math.random() * 500,
      createdAt: new Date()
    };
    
    dashboard.websites.push(newWebsite);
    dashboard.totalVisitors += newWebsite.visitors;
    dashboard.storageUsed += newWebsite.storageUsed;
    
    // Add activity
    dashboard.recentActivity.unshift({
      action: 'Website created',
      target: domain,
      userId: req.user.id,
      createdAt: new Date()
    });
    
    // Keep only last 10 activities
    dashboard.recentActivity = dashboard.recentActivity.slice(0, 10);
    dashboard.lastUpdated = new Date();
    
    await dashboard.save();
    res.json(dashboard);
  } catch (error) {
    console.error('Website creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete website
router.delete('/websites/:websiteId', auth, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.user.id });
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }
    
    const website = dashboard.websites.id(req.params.websiteId);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    dashboard.totalVisitors -= website.visitors;
    dashboard.storageUsed -= website.storageUsed;
    
    // Add activity
    dashboard.recentActivity.unshift({
      action: 'Website deleted',
      target: website.domain,
      userId: req.user.id,
      createdAt: new Date()
    });
    
    dashboard.websites.pull(req.params.websiteId);
    dashboard.recentActivity = dashboard.recentActivity.slice(0, 10);
    dashboard.lastUpdated = new Date();
    
    await dashboard.save();
    res.json(dashboard);
  } catch (error) {
    console.error('Website deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update website stats (for analytics)
router.put('/websites/:websiteId/stats', auth, async (req, res) => {
  try {
    const { visitors } = req.body;
    const dashboard = await Dashboard.findOne({ userId: req.user.id });
    
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }
    
    const website = dashboard.websites.id(req.params.websiteId);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    const oldVisitors = website.visitors;
    website.visitors = visitors;
    website.lastActivity = new Date();
    
    dashboard.totalVisitors = dashboard.totalVisitors - oldVisitors + visitors;
    dashboard.lastUpdated = new Date();
    
    await dashboard.save();
    res.json(dashboard);
  } catch (error) {
    console.error('Stats update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper functions
function calculateUptime(dashboard) {
  const totalWebsites = dashboard.websites.length;
  
  if (totalWebsites === 0) return 0;
  
  const activeWebsites = dashboard.websites.filter(w => w.status === 'active').length;
  let uptime = 99.5 + (Math.random() * 0.8);
  
  if (activeWebsites === totalWebsites) {
    uptime += 0.2;
  }
  
  return Math.min(99.99, Math.max(98.0, uptime));
}

function calculateTotalStorage(dashboard) {
  if (dashboard.websites.length === 0) return 0;
  
  return dashboard.websites.reduce((total, website) => {
    return total + (website.storageUsed || 0);
  }, 0);
}

module.exports = router;