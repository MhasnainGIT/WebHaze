const express = require('express');
const rateLimit = require('express-rate-limit');
const Booking = require('../models/Booking');
const { authenticate, admin } = require('../middleware/auth');
const { sendBookingConfirmationEmail, sendBookingAdminNotification } = require('../utils/emailService');
const { buildICS } = require('../services/googleCalendar');
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

    const [year, month, day] = preferredDate.split('-').map(Number);
    const [hours, minutes] = preferredTime.split(':').map(Number);
    const start = new Date(year, month - 1, day, hours, minutes, 0);
    const end = new Date(year, month - 1, day, hours + 1, minutes, 0);

    const bookingData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredDate: start,
      preferredTime: preferredTime.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'pending',
      googleMeetLink: '',
      calendarEventId: '',
      calendarEventLink: ''
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

    const description = `Booking request from ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}`;

    const userICS = buildICS({
      summary: subject || 'WebHaze Consultation',
      description,
      start,
      end,
      location: 'Google Meet - link to be shared',
      attendeeEmails: [email],
    });

    const adminICS = buildICS({
      summary: subject || 'WebHaze Consultation',
      description: `Booking request from ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}`,
      start,
      end,
      location: 'Google Meet - link to be shared',
      attendeeEmails: ADMIN_EMAILS,
    });

    sendBookingConfirmationEmail(email, name, preferredDate, preferredTime, '', subject, userICS).catch((err) => console.error('Booking confirmation email error:', err));

    sendBookingAdminNotification({
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      subject,
      message,
      meetLink: '',
      icsBuffer: adminICS
    }).catch((err) => console.error('Booking admin notification error:', err));

    res.status(201).json({
      message: 'Booking request received successfully. We will send you the Google Meet link shortly.',
      meetLink: '',
      bookingId: booking._id
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

    const previousMeetLink = booking.googleMeetLink;

    if (status) booking.status = status;
    if (googleMeetLink !== undefined) booking.googleMeetLink = googleMeetLink;

    await booking.save();

    if (!previousMeetLink && googleMeetLink) {
      const dateObj = new Date(booking.preferredDate);
      const preferredDateStr = dateObj.toISOString().split('T')[0];
      const [year, month, day] = preferredDateStr.split('-').map(Number);
      const [hours, minutes] = booking.preferredTime.split(':').map(Number);
      const start = new Date(year, month - 1, day, hours, minutes, 0);
      const end = new Date(year, month - 1, day, hours + 1, minutes, 0);

      const description = `Meeting with WebHaze\n\nGoogle Meet Link: ${googleMeetLink}`;

      const userICS = buildICS({
        summary: booking.subject || 'WebHaze Consultation',
        description,
        start,
        end,
        location: googleMeetLink,
        attendeeEmails: [booking.email],
      });

      sendBookingConfirmationEmail(booking.email, booking.name, preferredDateStr, booking.preferredTime, googleMeetLink, booking.subject, userICS).catch((err) => console.error('Booking Meet link notification error:', err));
    }

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
