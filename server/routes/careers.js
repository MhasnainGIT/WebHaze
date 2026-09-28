const express = require('express');
const multer = require('multer');
const path = require('path');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');
const JobApplication = require('../models/JobApplication');
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);
const CAREERS_FROM = 'WebHaze Careers <noreply@webhaze.in>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.RESEND_FROM_EMAIL || 'noreply@webhaze.in';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'resumes'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    cb(null, allowed.includes(file.mimetype));
  }
});

const limiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 3, message: 'Too many applications, try again later.' });

router.post('/apply', limiter, upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, role, about } = req.body;

    if (!name || !email || !phone || !role || !about) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    const application = new JobApplication({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role.trim(),
      about: about.trim(),
      resumeFilename: req.file ? req.file.filename : null
    });
    await application.save();

    try {
      await resend.emails.send({
        from: CAREERS_FROM,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New Application: ${role} — ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:30px;border-radius:8px;">
            <h2 style="color:#fff;border-bottom:1px solid #333;padding-bottom:16px;">New Job Application</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#999;width:120px;">Role</td><td style="padding:10px 0;font-weight:bold;">${role}</td></tr>
              <tr><td style="padding:10px 0;color:#999;">Name</td><td style="padding:10px 0;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#999;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#fff;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#999;">Phone</td><td style="padding:10px 0;">${phone}</td></tr>
            </table>
            <div style="margin-top:20px;padding:20px;background:#111;border-radius:6px;">
              <p style="color:#999;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;">About</p>
              <p style="margin:0;line-height:1.7;">${about}</p>
            </div>
            ${req.file ? `<p style="margin-top:16px;color:#999;font-size:12px;">Resume attached: ${req.file.originalname}</p>` : '<p style="margin-top:16px;color:#666;font-size:12px;">No resume attached.</p>'}
          </div>
        `
      });
    } catch (emailErr) {
      console.error('Email send failed (application still saved):', emailErr.message);
    }

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('Career application error:', err);
    res.status(500).json({ error: 'Failed to submit application. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
});

router.get('/resume/:id', async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application || !application.resumeFilename) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    const filePath = path.join(__dirname, '..', 'uploads', 'resumes', application.resumeFilename);
    res.download(filePath, application.resumeFilename);
  } catch (err) {
    res.status(500).json({ error: 'Failed to download resume' });
  }
});

module.exports = router;
