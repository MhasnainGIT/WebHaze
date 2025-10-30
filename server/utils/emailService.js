const nodemailer = require('nodemailer');

// Create transporter (using Gmail as example - configure based on your email provider)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    debug: true,
    logger: true
  });
};

// Welcome email template
const getWelcomeEmailTemplate = (name) => {
  return {
    subject: 'Welcome to WebHaze - Your Journey Starts Now!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #0b61ff, #0b9bff); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to WebHaze!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your digital journey starts here</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-top: 0;">Hi ${name}! 👋</h2>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining WebHaze! We're excited to help you build and scale your dream website with our lightning-fast hosting and expert development services.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
              <li>Explore our hosting plans and find the perfect fit for your needs</li>
              <li>Browse our professional templates and development services</li>
              <li>Contact our expert team for personalized assistance</li>
              <li>Start building your online presence today!</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/contact" 
               style="background: linear-gradient(135deg, #0b61ff, #0b9bff); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              Get Started Now
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Need help? Our support team is available 24/7 at 
            <a href="mailto:support@webhaze.com" style="color: #0b61ff;">support@webhaze.com</a>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 12px;">
          <p>© 2024 WebHaze. All rights reserved.</p>
        </div>
      </div>
    `
  };
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    console.log('Attempting to send email to:', email);
    console.log('Using email user:', process.env.EMAIL_USER);
    console.log('Email pass configured:', !!process.env.EMAIL_PASS);
    
    const transporter = createTransporter();
    
    // Test connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    
    const emailTemplate = getWelcomeEmailTemplate(name);
    
    const result = await transporter.sendMail({
      from: `"WebHaze Team" <${process.env.EMAIL_USER || 'noreply@webhaze.com'}>`,
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    });
    
    console.log(`Welcome email sent successfully to ${email}:`, result.messageId);
    return true;
  } catch (error) {
    console.error('Detailed error sending welcome email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return false;
  }
};

module.exports = {
  sendWelcomeEmail
};