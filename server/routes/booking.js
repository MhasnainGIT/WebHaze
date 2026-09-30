const express = require('express');
const rateLimit = require('express-rate-limit');
const Booking = require('../models/Booking');
const { authenticate, admin } = require('../middleware/auth');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../utils/emailService');
const router = express.Router();

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many booking requests, please try again later.'
});

router.post('/submit', bookingLimiter, async (req, res) => {
  try {
    const { name, email, phone, preferredDate, preferredTime, subject, message } = req.body;

    if (!name || !email || !phone || !preferredDate || !preferredTime || !subject || !message) {
      return res.status(400).json({
        error: 'All fields are required',
        required: ['name', 'email', 'phone', 'preferredDate', 'preferredTime', 'subject', 'message']
      });
    }

    const bookingData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredDate: new Date(preferredDate),
      preferredTime: preferredTime.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'pending'
    };

    let booking;
    if (process.env.SKIP_DB === 'true') {
      booking = {
        _id: Date.now().toString(),
        ...bookingData,
        createdAt: new Date()
      };
      console.log('Booking submission (memory):', booking);
    } else {
      booking = new Booking(bookingData);
      await booking.save();
    }

    res.status(201).json({
      message: 'Booking request submitted successfully. Admin will confirm and send a Google Meet link shortly.',
      id: booking._id
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({
      error: 'Failed to submit booking request',
      message: 'Internal server error'
    });
  }
});

router.get('/', authenticate, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.get('/:id', authenticate, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

router.put('/:id', authenticate, admin, async (req, res) => {
  try {
    const { status, googleMeetLink } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (status) booking.status = status;
    if (googleMeetLink !== undefined) booking.googleMeetLink = googleMeetLink;

    await booking.save();

    res.json({
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    console.error('Booking update error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

router.delete('/:id', authenticate, admin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
