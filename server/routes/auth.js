const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const memoryStore = require('../utils/memoryStore');
const { sendWelcomeEmail } = require('../utils/emailService');
const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true,
});

// Register endpoint
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password', 'name']
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists and create user
    let user;
    if (process.env.SKIP_DB === 'true') {
      const existingUser = await memoryStore.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          error: 'User already exists with this email'
        });
      }
      user = await memoryStore.createUser({ name, email, password });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          error: 'User already exists with this email'
        });
      }
      user = new User({ name, email, password });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    // Send welcome email (don't wait for it to complete)
    sendWelcomeEmail(user.email, user.name).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        websites: user.websites,
        storageLimit: user.storageLimit,
        storageUsed: user.storageUsed
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: 'Internal server error'
    });
  }
});

// Login endpoint
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user and verify password
    let user, isValidPassword;
    if (process.env.SKIP_DB === 'true') {
      user = await memoryStore.findUserByEmail(email);
      if (!user || !user.isActive) {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }
      isValidPassword = await memoryStore.comparePassword(password, user.password);
    } else {
      user = await User.findOne({ email, isActive: true }).select('+password');
      if (!user) {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }
      isValidPassword = await user.comparePassword(password);
    }
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        websites: user.websites,
        storageLimit: user.storageLimit,
        storageUsed: user.storageUsed
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'Internal server error'
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    let user;
    if (process.env.SKIP_DB === 'true') {
      user = await memoryStore.findUserById(decoded.userId);
    } else {
      user = await User.findById(decoded.userId);
    }

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        websites: user.websites,
        storageLimit: user.storageLimit,
        storageUsed: user.storageUsed
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      error: 'Invalid token'
    });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    message: 'Logout successful'
  });
});

module.exports = router;