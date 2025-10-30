const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Website title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  domain: {
    type: String,
    required: [true, 'Domain is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  template: {
    type: String,
    required: [true, 'Template is required'],
    enum: ['business', 'ecommerce', 'portfolio', 'restaurant', 'blog', 'landing']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'maintenance'],
    default: 'draft'
  },
  content: {
    hero: {
      title: String,
      subtitle: String,
      ctaText: String,
      ctaLink: String,
      backgroundImage: String
    },
    about: {
      title: String,
      description: String,
      image: String
    },
    services: [{
      title: String,
      description: String,
      icon: String,
      price: Number
    }],
    contact: {
      email: String,
      phone: String,
      address: String,
      socialLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String
      }
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String
  },
  customCSS: String,
  customJS: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
websiteSchema.index({ owner: 1, status: 1 });
websiteSchema.index({ domain: 1 });

module.exports = mongoose.model('Website', websiteSchema);