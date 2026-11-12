const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  googleMeetLink: { type: String, trim: true },
  calendarEventId: { type: String },
  calendarEventLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

bookingSchema.index({ email: 1, status: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ preferredDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
