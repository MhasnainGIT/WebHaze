const jwt = require('jsonwebtoken');
const User = require('../models/User');
const memoryStore = require('../utils/memoryStore');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists and is active
    let user;
    if (process.env.SKIP_DB === 'true') {
      user = await memoryStore.findUserById(decoded.userId);
    } else {
      user = await User.findById(decoded.userId);
    }
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Invalid token. User not found or inactive.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired.'
      });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Server error during authentication.'
    });
  }
};

const admin = (req, res, next) => {
  const isOwner = req.user && (req.user.email === 'mohdhasnain1544@gmail.com' || req.user.email === 'webhaze.in@gmail.com');
  if ((req.user && req.user.role === 'admin') || isOwner) {
    next();
  } else {
    res.status(403).json({
      error: 'Access denied. Administrator privileges required.'
    });
  }
};

module.exports = { authenticate, admin };