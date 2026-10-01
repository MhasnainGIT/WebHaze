const express = require('express');
const rateLimit = require('express-rate-limit');
const Booking = require('../models/Booking');
const { authenticate, admin } = require('../middleware/auth');
const { sendBookingConfirmationEmail, sendBookingAdminNotification } = require('../utils/emailService');
const { createMeetingEvent, buildICS } = require('../services/googleCalendar');
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

    let meetLink = null;
    let eventId = null;
    let eventLink = null;

    try {
      const meeting = await createMeetingEvent({
        name,
        email,
        phone,
        subject,
        message,
        preferredDate,
        preferredTime
      });
      meetLink = meeting.meetLink;
      eventId = meeting.eventId;
      eventLink = meeting.eventLink;
    } catch (calendarError) {
      console.error('Google Meet creation failed:', calendarError.message);
    }

    const bookingData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredDate: new Date(preferredDate),
      preferredTime: preferredTime.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'confirmed',
      googleMeetLink: meetLink,
      calendarEventId: eventId,
      calendarEventLink: eventLink
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

    if (meetLink) {
      const [year, month, day] = preferredDate.split('-').map(Number);
      const [hours, minutes] = preferredTime.split(':').map(Number);
      const start = new Date(year, month - 1, day, hours, minutes, 0);
      const end = new Date(year, month - 1, day, hours + 1, minutes, 0);

      const description = `Meeting with WebHaze\n\nGoogle Meet Link: ${meetLink}`;

      const userICS = buildICS({
        summary: subject || 'WebHaze Consultation',
        description,
        start,
        end,
        location: meetLink,
        attendeeEmails: [email],
      });

      const adminICS = buildICS({
        summary: subject || 'WebHaze Consultation',
        description: `Booking request from ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nGoogle Meet Link: ${meetLink}`,
        start,
        end,
        location: meetLink,
        attendeeEmails: ADMIN_EMAILS,
      });

      sendBookingConfirmationEmail(email, name, preferredDate, preferredTime, meetLink, subject, userICS).catch((err) => console.error('Booking confirmation email error:', err));

      sendBookingAdminNotification({
        name,
        email,
        phone,
        preferredDate,
        preferredTime,
        subject,
        message,
        meetLink,
        icsBuffer: adminICS
      }).catch((err) => console.error('Booking admin notification error:', err));
    }

    res.status(201).json({
      message: meetLink
        ? 'Appointment booked successfully. A Google Meet link has been sent to your email.'
        : 'Booking request received. We will confirm and send a Google Meet link shortly.',
      meetLink,
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
