const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, default: 'WebHaze Team', trim: true },
  tags: [{ type: String, trim: true }],
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ published: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
