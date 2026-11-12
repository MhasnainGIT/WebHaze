const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
  const mem = process.memoryUsage();
  const dbState = mongoose.connection.readyState;
  const dbStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbState] || 'unknown';

  let redisStatus = 'disabled';
  try {
    const { redisClient } = require('../index');
    if (redisClient) {
      await redisClient.ping();
      redisStatus = 'connected';
    }
  } catch { redisStatus = 'error'; }

  const healthy = dbStatus === 'connected' || process.env.SKIP_DB === 'true';
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV,
    database: dbStatus,
    redis: redisStatus,
    memory: {
      heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
      rssMB: Math.round(mem.rss / 1024 / 1024),
    },
  });
});

module.exports = router;