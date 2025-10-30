# WebHaze

WebHaze is a scalable, config-driven Website-as-a-Service (WaaS) platform that enables non-technical users to build, customize, and deploy professional websites rapidly.

## 🚀 Features

- **Lightning-fast hosting** with 99.9% uptime guarantee
- **Custom website development** with modern frameworks
- **Mobile app development** for iOS and Android
- **Professional templates** for various industries
- **SEO optimization** built-in
- **E-commerce integration** ready
- **24/7 expert support**
- **Enterprise-grade security**

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone and setup:**
```powershell
git clone <repository-url>
cd startup
npm run setup
```

2. **Configure environment:**
```powershell
cd server
copy .env.example .env
# Edit .env with your configuration
```

3. **Start development servers:**
```powershell
npm run dev
```

4. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Health check: http://localhost:4000/health

## 📁 Project Structure

```
startup/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS and design system
│   │   └── contexts/      # React contexts
│   └── public/            # Static assets
├── server/                # Node.js backend API
│   ├── routes/           # API route handlers
│   ├── models/           # Database models
│   ├── middleware/       # Express middleware
│   └── logs/            # Application logs
├── config/               # Configuration files
└── docs/                # Documentation
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start both client and server in development mode
- `npm run client:dev` - Start only the frontend
- `npm run server:dev` - Start only the backend

### Production
- `npm run build` - Build both client and server for production
- `npm run start:prod` - Start production server
- `npm run logs` - View application logs

### Maintenance
- `npm run test` - Run all tests
- `npm run lint` - Run linting on all code
- `npm run clean` - Clean all dependencies and build files
- `npm run reset` - Clean and reinstall everything

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Pages
- `GET /api/pages` - List all pages
- `GET /api/pages/:slug` - Get page by slug
- `POST /api/pages` - Create new page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

### Templates
- `GET /api/templates` - List available templates
- `GET /api/templates/:id` - Get template details

### Media
- `POST /api/media/upload` - Upload media files
- `GET /api/media/:id` - Get media file

## 🔒 Security Features

- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **JWT authentication** with secure tokens
- **Password hashing** with bcrypt
- **CORS protection** with configurable origins
- **Input validation** and sanitization
- **Error handling** without information leakage

## 📊 Monitoring & Logging

- **Winston logging** with file rotation
- **Health check endpoint** for monitoring
- **Request logging** with IP and user agent
- **Error tracking** with stack traces
- **Performance metrics** collection

## 🚀 Deployment

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
MONGO_URI=mongodb://localhost:27017/webhaze

# Security
JWT_SECRET=your-super-secure-secret-key
NODE_ENV=production

# Server
PORT=4000
CORS_ORIGINS=https://yourdomain.com
```

### Production Deployment

1. **Build the application:**
```bash
npm run build
```

2. **Set environment variables:**
```bash
export NODE_ENV=production
export MONGO_URI=your-production-mongodb-uri
export JWT_SECRET=your-production-jwt-secret
```

3. **Start the production server:**
```bash
npm run start:prod
```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
```

## 🧪 Testing

- **Unit tests** with Jest
- **Integration tests** for API endpoints
- **E2E tests** for critical user flows
- **Coverage reports** for code quality

Run tests:
```bash
npm run test
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create an issue on GitHub
- **Email**: support@webhaze.com
- **Live Chat**: Available 24/7 on our website

## 🗺️ Roadmap

- [ ] Advanced WYSIWYG editor
- [ ] Multi-tenant architecture
- [ ] Advanced analytics dashboard
- [ ] Mobile app for site management
- [ ] AI-powered design suggestions
- [ ] Advanced e-commerce features
- [ ] Multi-language support
- [ ] Advanced SEO tools

---

**WebHaze** - Build. Scale. Succeed. 🚀
