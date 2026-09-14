const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
      from: `"WebHaze Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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
          ${req.file ? '<p style="margin-top:16px;color:#999;font-size:12px;">Resume attached.</p>' : '<p style="margin-top:16px;color:#666;font-size:12px;">No resume attached.</p>'}
        </div>
      `,
      attachments: req.file ? [{
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype
      }] : []
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('Career application error:', err);
    res.status(500).json({ error: 'Failed to submit application. Please try again.' });
  }
});

module.exports = router;
