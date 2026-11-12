// Email queue using Bull + Redis
// Falls back to direct send if Redis is unavailable
const emailService = require('./emailService');

let emailQueue = null;

const initEmailQueue = (redisUrl) => {
  if (!redisUrl) return;
  try {
    const Bull = require('bull');
    emailQueue = new Bull('email', redisUrl, {
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    });

    emailQueue.process(async (job) => {
      const { type, data } = job.data;
      switch (type) {
        case 'welcome':
          return emailService.sendWelcomeEmail(data.email, data.name);
        case 'passwordReset':
          return emailService.sendPasswordResetEmail(data.email, data.name, data.resetUrl);
        case 'bookingConfirmation':
          return emailService.sendBookingConfirmationEmail(
            data.email, data.name, data.preferredDate, data.preferredTime,
            data.meetLink, data.subject, data.icsBuffer
          );
        case 'bookingAdminNotification':
          return emailService.sendBookingAdminNotification(data);
        default:
          throw new Error(`Unknown email type: ${type}`);
      }
    });

    emailQueue.on('failed', (job, err) => {
      console.error(`Email job ${job.id} (${job.data.type}) failed after ${job.attemptsMade} attempts:`, err.message);
    });

    console.log('Email queue initialized');
  } catch (err) {
    console.warn('Email queue init failed — falling back to direct send:', err.message);
    emailQueue = null;
  }
};

const enqueue = async (type, data) => {
  if (emailQueue) {
    await emailQueue.add({ type, data });
    return;
  }
  // Direct fallback
  switch (type) {
    case 'welcome':
      emailService.sendWelcomeEmail(data.email, data.name).catch(console.error);
      break;
    case 'passwordReset':
      emailService.sendPasswordResetEmail(data.email, data.name, data.resetUrl).catch(console.error);
      break;
    case 'bookingConfirmation':
      emailService.sendBookingConfirmationEmail(
        data.email, data.name, data.preferredDate, data.preferredTime,
        data.meetLink, data.subject, data.icsBuffer
      ).catch(console.error);
      break;
    case 'bookingAdminNotification':
      emailService.sendBookingAdminNotification(data).catch(console.error);
      break;
  }
};

module.exports = { initEmailQueue, enqueue };
