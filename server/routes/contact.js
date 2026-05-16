const express = require('express');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { authenticate, admin } = require('../middleware/auth');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: 'Too many contact form submissions, please try again later.',
});

// Submit contact form
router.post('/submit', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        error: 'All fields are required',
        required: ['name', 'email', 'phone', 'subject', 'message']
      });
    }

    // Create contact entry
    let contact;
    if (process.env.SKIP_DB === 'true') {
      // Store in memory for development
      contact = {
        _id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date()
      };
      console.log('Contact form submission (memory):', contact);
    } else {
      contact = new Contact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim()
      });
      await contact.save();
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: contact._id
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle duplicate submission
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate submission',
        message: 'You have already submitted a contact form with this email and subject.'
      });
    }
    
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: 'Internal server error'
    });
  }
});

// Admin: Get all contact messages
router.get('/', authenticate, admin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Admin: Delete a contact message
router.delete('/:id', authenticate, admin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;