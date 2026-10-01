const { google } = require('googleapis');

const getCalendarClient = () => {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!serviceAccountKey && !credentialsPath) {
    throw new Error('Missing Google credentials: set GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS');
  }

  let credentials;
  if (serviceAccountKey) {
    credentials = JSON.parse(serviceAccountKey);
  } else {
    credentials = require(credentialsPath);
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
};

const createMeetingEvent = async ({ name, email, phone, subject, message, preferredDate, preferredTime }) => {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error('Missing GOOGLE_CALENDAR_ID');
  }

  const calendar = getCalendarClient();

  const [year, month, day] = preferredDate.split('-').map(Number);
  const [hours, minutes] = preferredTime.split(':').map(Number);

  const start = new Date(year, month - 1, day, hours, minutes, 0);
  const end = new Date(year, month - 1, day, hours + 1, minutes, 0);

  const event = {
    summary: subject || 'WebHaze Consultation',
    description: `Booking request from ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    start: {
      dateTime: start.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    conferenceData: {
      createRequest: {
        requestId: `webhaze-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });

  const meetLink = response.data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === 'video')?.uri || response.data.hangoutLink;

  return {
    meetLink,
    eventId: response.data.id,
    eventLink: response.data.htmlLink,
  };
};

module.exports = { createMeetingEvent };
