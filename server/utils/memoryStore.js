// Simple in-memory store for development without MongoDB
const bcrypt = require('bcryptjs');

class MemoryStore {
  constructor() {
    this.users = new Map();
    this.pages = new Map();
    this.nextUserId = 1;
    this.nextPageId = 1;
    
    // Seed some sample data
    this.seedData();
  }

  async seedData() {
    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 12);
    this.users.set('1', {
      _id: '1',
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      plan: 'Professional',
      websites: 3,
      storageLimit: 25,
      storageUsed: 12,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create sample pages
    const samplePages = [
      {
        _id: '1',
        slug: 'web-hosting',
        title: 'Web Hosting Services',
        summary: 'Reliable hosting optimized for speed, security, and scalability.',
        content: '<p>Our hosting ensures 99.9% uptime and fast load times.</p>'
      },
      {
        _id: '2',
        slug: 'website-development',
        title: 'Website Development',
        summary: 'Custom websites built to convert visitors into customers.',
        content: '<p>Full-service development from design to deployment.</p>'
      },
      {
        _id: '3',
        slug: 'app-development',
        title: 'App Development',
        summary: 'High-performance mobile and web apps to grow your business.',
        content: '<p>We build scalable apps with great UX.</p>'
      }
    ];

    samplePages.forEach(page => {
      this.pages.set(page._id, page);
    });
  }

  // User methods
  async findUserByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findUserById(id) {
    return this.users.get(id.toString()) || null;
  }

  async createUser(userData) {
    const id = this.nextUserId.toString();
    this.nextUserId++;
    
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = {
      _id: id,
      id,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      plan: 'Free',
      websites: 0,
      storageLimit: 5,
      storageUsed: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.set(id, user);
    return user;
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Page methods
  async findPageBySlug(slug) {
    for (const page of this.pages.values()) {
      if (page.slug === slug) {
        return page;
      }
    }
    return null;
  }

  async getAllPages() {
    return Array.from(this.pages.values());
  }
}

module.exports = new MemoryStore();