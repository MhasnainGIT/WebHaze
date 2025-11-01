const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
require('dotenv').config();

const clarityInjector = require('./middleware/clarityInjector');
const demoSiteRouter = require('./routes/demoSite');
const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const mediaRouter = require('./routes/media');
const templatesRouter = require('./routes/templates');
const websitesRouter = require('./routes/websites');
const contactRouter = require('./routes/contact');
const healthRouter = require('./routes/health');
const Page = require('./models/Page');

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const ALLOWED_ORIGINS = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

if (NODE_ENV === 'production') {
  // Add production domains to allowed origins
  ALLOWED_ORIGINS.push('https://webhaze.in', 'https://www.webhaze.in');
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'webhaze-server' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration - read allowed origins from env for flexibility in production
const parseOrigins = (val) => {
  if (!val) return [];
  return val.split(',').map(s => s.trim()).filter(Boolean);
};

const defaultLocalOrigins = ['http://localhost:3000', 'http://localhost:5173'];

// *** NEW: production fallback origins ***
const defaultProdOrigins = ['https://webhaze.in', 'https://www.webhaze.in'];

const envOrigins = parseOrigins(process.env.CORS_ORIGINS || process.env.CORS_ORIGIN);

const allowedOrigins = NODE_ENV === 'production' && envOrigins.length > 0
  ? envOrigins
  : (NODE_ENV === 'production' ? defaultProdOrigins : defaultLocalOrigins);

const corsOptions = {
  origin: function(origin, cb) {
    // allow non-browser requests (e.g. server-to-server, curl)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS policy: origin not allowed - ' + origin));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Inject Clarity and other tracking scripts at render time
app.use(clarityInjector());

// API routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/media', mediaRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/websites', websitesRouter);
app.use('/api/contact', contactRouter);

// Demo site route
app.use('/site', demoSiteRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

app.get('/', (req, res) => {
  res.json({
    status: 'WebHaze server running',
    port: PORT,
    environment: NODE_ENV,
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  
  if (NODE_ENV === 'production') {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong'
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`WebHaze server listening on http://localhost:${PORT}`);
  logger.info('Server started successfully');
});

// Connect to MongoDB (optional for development)
// Accept either MONGODB_URI (common name) or MONGO_URI
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/webhaze';

if (process.env.SKIP_DB !== 'true') {
  mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
    .then(async () => {
      console.log('Connected to MongoDB');
      logger.info('Database connected successfully');

      // Seed sample pages if not present
      const count = await Page.countDocuments();
      if (count === 0) {
        console.log('Seeding sample pages...');
        await Page.create([
          {
            slug: 'web-hosting',
            title: 'Web Hosting Services',
            summary: 'Reliable hosting optimized for speed, security, and scalability.',
            content: '<p>Our hosting ensures 99.9% uptime and fast load times.</p>'
          },
          {
            slug: 'website-development',
            title: 'Website Development',
            summary: 'Custom websites built to convert visitors into customers.',
            content: '<p>Full-service development from design to deployment.</p>'
          },
          {
            slug: 'app-development',
            title: 'App Development',
            summary: 'High-performance mobile and web apps to grow your business.',
            content: '<p>We build scalable apps with great UX.</p>'
          }
        ]);
        logger.info('Sample pages seeded successfully');
      }
    })
    .catch(err => {
      console.log('MongoDB not available - running without database');
      logger.warn('Database connection failed, continuing without DB:', err.message);
    });
} else {
  console.log('Skipping database connection (SKIP_DB=true)');
}