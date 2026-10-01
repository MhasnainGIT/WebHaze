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

const formatICSDateTime = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
};

const buildICS = ({ summary, description, start, end, location, attendeeEmails = [] }) => {
  const uid = `webhaze-${Date.now()}@webhaze.in`;
  const dtstamp = formatICSDateTime(new Date());
  const dtstart = formatICSDateTime(start);
  const dtend = formatICSDateTime(end);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WebHaze//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Asia/Kolkata:${dtstart}`,
    `DTEND;TZID=Asia/Kolkata:${dtend}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${summary}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${summary}`,
    'END:VALARM',
  ];

  for (const email of attendeeEmails) {
    lines.push(`ATTENDEE;CN=${email};RSVP=TRUE:mailto:${email}`);
  }

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
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
    sendUpdates: 'none',
  });

  const meetLink = response.data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === 'video')?.uri || response.data.hangoutLink;

  const descriptionWithLink = `${response.data.description || ''}\n\nGoogle Meet Link: ${meetLink}`;
  const updatedEvent = {
    ...response.data,
    description: descriptionWithLink,
  };

  try {
    await calendar.events.update({
      calendarId,
      eventId: response.data.id,
      requestBody: updatedEvent,
      sendUpdates: 'none',
    });
  } catch (updateError) {
    console.error('Failed to update event with Meet link:', updateError.message);
  }

  return {
    meetLink,
    eventId: response.data.id,
    eventLink: response.data.htmlLink,
    start,
    end,
  };
};

module.exports = { createMeetingEvent, buildICS };
