const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  about: { type: String, required: true, trim: true },
  resumeFilename: { type: String },
  status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
