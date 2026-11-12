const express = require('express');
const router = express.Router();
const { authenticate, admin } = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Dashboard = require('../models/Dashboard');
const Page = require('../models/Page');
const Plan = require('../models/Plan');
const Transaction = require('../models/Transaction');
const Website = require('../models/Website');
const Booking = require('../models/Booking');
const memoryStore = require('../utils/memoryStore');

// Middleware: All routes here require admin privileges
router.use(authenticate, admin);

const paginate = (query, page, limit) => ({
  skip: (page - 1) * limit,
  limit,
});

// --- USERS ---
router.get('/users', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    let users, total;
    if (process.env.SKIP_DB === 'true') {
      const all = memoryStore.getAllUsers();
      total = all.length;
      users = all.slice((page - 1) * limit, page * limit);
    } else {
      const { skip } = paginate({}, page, limit);
      [users, total] = await Promise.all([
        User.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
        User.countDocuments()
      ]);
    }
    res.json({ data: users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    if (process.env.SKIP_DB === 'true') {
      await memoryStore.deleteUser(req.params.id);
    } else {
      await User.findByIdAndDelete(req.params.id);
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// --- CONTACTS ---
router.get('/contacts', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments()
    ]);
    res.json({ data: contacts, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact purged' });
  } catch (error) {
    res.status(500).json({ error: 'Purge failed' });
  }
});

// --- DASHBOARDS ---
router.get('/dashboards', async (req, res) => {
  try {
    const dashboards = await Dashboard.find().populate('userId', 'name email').sort({ updatedAt: -1 });
    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboards' });
  }
});

// --- PAGES ---
router.get('/pages', async (req, res) => {
  try {
    const pages = await Page.find().sort({ title: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.post('/pages', async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(400).json({ error: 'Creation failed' });
  }
});

router.put('/pages/:id', async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(page);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

router.delete('/pages/:id', async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// --- PLANS ---
router.get('/plans', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ basePrice: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

router.post('/plans', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: 'Creation failed' });
  }
});

router.put('/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

router.delete('/plans/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// --- TRANSACTIONS ---
router.get('/transactions', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
      Transaction.find().populate('userId', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Transaction.countDocuments()
    ]);
    res.json({ data: transactions, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// --- BOOKINGS ---
router.get('/bookings', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Booking.countDocuments()
    ]);
    res.json({ data: bookings, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// --- WEBSITES ---
router.get('/websites', async (req, res) => {
  try {
    const websites = await Website.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch websites' });
  }
});

router.delete('/websites/:id', async (req, res) => {
  try {
    await Website.findByIdAndDelete(req.params.id);
    res.json({ message: 'Website deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

module.exports = router;
