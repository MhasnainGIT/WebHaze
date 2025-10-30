const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
