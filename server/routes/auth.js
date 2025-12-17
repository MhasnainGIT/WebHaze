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

// Update password endpoint
router.put('/password', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    let user;
    if (process.env.SKIP_DB === 'true') {
      user = await memoryStore.findUserById(decoded.userId);
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found' });
      }
      const isValidPassword = await memoryStore.comparePassword(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      await memoryStore.updateUserPassword(decoded.userId, newPassword);
    } else {
      user = await User.findById(decoded.userId).select('+password');
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found' });
      }
      const isValidPassword = await user.comparePassword(currentPassword);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      user.password = newPassword;
      await user.save();
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ error: 'Password update failed' });
  }
});

// Google OAuth routes
router.get('/google', (req, res) => {
  // Check if Google OAuth is configured
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(500).json({
      error: 'Google OAuth not configured',
      message: 'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET'
    });
  }
  
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('openid profile email')}&` +
    `access_type=offline`;
  
  res.redirect(googleAuthURL);
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI
      })
    });
    
    const tokenData = await tokenResponse.json();
    
    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    
    const googleUser = await userResponse.json();
    
    // Find or create user
    let user;
    if (process.env.SKIP_DB === 'true') {
      user = await memoryStore.findUserByEmail(googleUser.email);
      if (!user) {
        user = await memoryStore.createUser({
          name: googleUser.name,
          email: googleUser.email,
          password: 'google-oauth-' + Date.now() // Random password for OAuth users
        });
      }
    } else {
      user = await User.findOne({ email: googleUser.email });
      if (!user) {
        user = new User({
          name: googleUser.name,
          email: googleUser.email,
          password: 'google-oauth-' + Date.now() // Random password for OAuth users
        });
        await user.save();
      }
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    // Redirect to frontend with token in URL hash (works without routing)
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/#token=${token}`);
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/#error=oauth_failed`);
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    message: 'Logout successful'
  });
});

module.exports = router;