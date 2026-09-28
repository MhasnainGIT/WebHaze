const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'WebHaze <noreply@webhaze.in>';

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

module.exports = { sendWelcomeEmail, sendPasswordResetEmail };
