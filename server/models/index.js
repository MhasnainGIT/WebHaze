const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  settings: {
    template: { type: String, required: true },
    customization: {
      colors: {
        primary: String,
        secondary: String,
        background: String
      },
      fonts: {
        heading: String,
        body: String
      }
    },
    analytics: {
      clarity: {
        enabled: { type: Boolean, default: true },
        projectId: String
      }
    }
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const pageSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: Object, required: true },
  seo: {
    metaTitle: String,
    metaDescription: String,
    canonical: String
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

// Compound index for tenant-specific page slugs
pageSchema.index({ tenant: 1, slug: 1 }, { unique: true });

const userSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'contributor'], default: 'contributor' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

// Compound index for tenant-specific user emails
userSchema.index({ tenant: 1, email: 1 }, { unique: true });

module.exports = {
  Tenant: mongoose.model('Tenant', tenantSchema),
  Page: mongoose.model('Page', pageSchema),
  User: mongoose.model('User', userSchema)
};