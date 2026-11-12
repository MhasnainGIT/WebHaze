// Cache middleware — skips gracefully if Redis is unavailable
const cache = (ttlSeconds = 300) => async (req, res, next) => {
  let redisClient;
  try { redisClient = require('../index').redisClient; } catch { return next(); }
  if (!redisClient) return next();

  const key = `cache:${req.originalUrl}`;
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(JSON.parse(cached));
    }
  } catch { return next(); }

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode === 200 && redisClient) {
      redisClient.setex(key, ttlSeconds, JSON.stringify(data)).catch(() => {});
    }
    res.setHeader('X-Cache', 'MISS');
    return originalJson(data);
  };
  next();
};

const invalidateCache = async (pattern) => {
  let redisClient;
  try { redisClient = require('../index').redisClient; } catch { return; }
  if (!redisClient) return;
  try {
    const keys = await redisClient.keys(`cache:${pattern}*`);
    if (keys.length) await redisClient.del(...keys);
  } catch {}
};

module.exports = { cache, invalidateCache };
