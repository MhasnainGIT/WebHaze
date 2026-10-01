const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'WebHaze <noreply@webhaze.in>';
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'info.webhaze@gmail.com,mohdhasnain1544@gmail.com').split(',').map((email) => email.trim()).filter(Boolean);

const sendWelcomeEmail = async (email, name) => {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Welcome to WebHaze!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:40px;">
          <h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin-bottom:8px;">WEBHAZE.</h1>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <h2 style="font-size:22px;font-weight:700;">Welcome, ${name}!</h2>
          <p style="color:#999;line-height:1.7;">Your account is live. Start building your digital presence with WebHaze — fast, professional, and built to scale.</p>
          <a href="${process.env.FRONTEND_URL || 'https://www.webhaze.in'}/dashboard"
             style="display:inline-block;margin-top:32px;padding:14px 32px;background:#fff;color:#000;font-weight:900;font-size:12px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;">
            GO TO DASHBOARD
          </a>
          <p style="margin-top:48px;color:#444;font-size:12px;">© 2026 WebHaze. All rights reserved.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
    return false;
  }
};

const sendPasswordResetEmail = async (email, name, resetUrl) => {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Reset Your WebHaze Password',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:40px;">
          <h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin-bottom:8px;">WEBHAZE.</h1>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <h2 style="font-size:22px;font-weight:700;">Password Reset</h2>
          <p style="color:#999;line-height:1.7;">Hi ${name}, we received a request to reset your password. Click the button below — this link expires in 1 hour.</p>
          <a href="${resetUrl}"
             style="display:inline-block;margin-top:32px;padding:14px 32px;background:#fff;color:#000;font-weight:900;font-size:12px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;">
            RESET PASSWORD
          </a>
          <p style="margin-top:32px;color:#555;font-size:12px;word-break:break-all;">Or copy this link: ${resetUrl}</p>
          <p style="margin-top:48px;color:#444;font-size:12px;">If you didn't request this, ignore this email. © 2026 WebHaze.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending reset email:', error.message);
    return false;
  }
};

const sendBookingConfirmationEmail = async (email, name, preferredDate, preferredTime, meetLink, subject, icsBuffer) => {
  try {
    const meetSection = meetLink
      ? `<a href="${meetLink}" style="display:inline-block;margin-top:32px;padding:14px 32px;background:#fff;color:#000;font-weight:900;font-size:12px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;">JOIN GOOGLE MEET</a>
         <p style="margin-top:32px;color:#555;font-size:12px;word-break:break-all;">Or copy this link: ${meetLink}</p>`
      : `<p style="margin-top:32px;color:#999;font-size:12px;">Your appointment request has been received. We will send you the Google Meet link shortly.</p>`;

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: meetLink ? 'Your Google Meet appointment is confirmed | WebHaze' : 'Your appointment request has been received | WebHaze',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:40px;">
          <h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin-bottom:8px;">WEBHAZE.</h1>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <h2 style="font-size:22px;font-weight:700;">${meetLink ? 'Meeting Confirmed' : 'Appointment Request Received'}</h2>
          <p style="color:#999;line-height:1.7;">Hi ${name}, ${meetLink ? 'your appointment has been confirmed. Join the meeting using the link below.' : 'we have received your appointment request. We will get back to you shortly with the Google Meet link.'}</p>
          <p style="color:#ccc;line-height:1.7;margin-top:16px;"><strong>Subject:</strong> ${subject}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Date:</strong> ${preferredDate}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Time:</strong> ${preferredTime}</p>
          ${meetSection}
          <p style="margin-top:32px;color:#777;font-size:12px;">We've also attached a calendar invite (.ics) to this email. Open it to add this meeting to your calendar with reminders.</p>
          <p style="margin-top:48px;color:#444;font-size:12px;">© 2026 WebHaze. All rights reserved.</p>
        </div>
      `,
      attachments: icsBuffer
        ? [
            {
              filename: 'meeting-invite.ics',
              content: Buffer.from(icsBuffer),
            },
          ]
        : []
    });
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error.message);
    return false;
  }
};

const sendBookingAdminNotification = async ({ name, email, phone, preferredDate, preferredTime, subject, message, meetLink, icsBuffer }) => {
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAILS,
      subject: meetLink ? 'New Appointment Booking Received | WebHaze' : 'New Appointment Booking Request Received | WebHaze',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:40px;">
          <h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin-bottom:8px;">WEBHAZE.</h1>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <h2 style="font-size:22px;font-weight:700;">New Appointment Booking</h2>
          <p style="color:#999;line-height:1.7;">A new meeting request has been booked. Details below:</p>
          <p style="color:#ccc;line-height:1.7;margin-top:16px;"><strong>Name:</strong> ${name}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Email:</strong> ${email}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Phone:</strong> ${phone}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Subject:</strong> ${subject}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Preferred Time:</strong> ${preferredTime}</p>
          <p style="color:#ccc;line-height:1.7;"><strong>Message:</strong> ${message}</p>
          <p style="color:#ccc;line-height:1.7;margin-top:16px;"><strong>Google Meet Link:</strong> ${meetLink ? `<a href="${meetLink}" style="color:#fff;text-decoration:underline;">${meetLink}</a>` : 'Not yet created - please create manually and send to user'}</p>
          <p style="margin-top:32px;color:#777;font-size:12px;">We've also attached a calendar invite (.ics) to this email. Open it to add this meeting to your calendar with reminders.</p>
          <p style="margin-top:48px;color:#444;font-size:12px;">© 2026 WebHaze. All rights reserved.</p>
        </div>
      `,
      attachments: icsBuffer
        ? [
            {
              filename: 'meeting-invite.ics',
              content: Buffer.from(icsBuffer),
            },
          ]
        : []
    });
    return true;
  } catch (error) {
    console.error('Error sending booking admin notification:', error.message);
    return false;
  }
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail, sendBookingConfirmationEmail, sendBookingAdminNotification, ADMIN_EMAILS };
