const { google } = require('googleapis');

const getCalendarClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Google OAuth credentials: set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN');
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);

  auth.setCredentials({
    refresh_token: refreshToken,
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
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
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
    lines.push(`ATTENDEE;CN=${email}:mailto:${email}`);
  }

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
};

const createMeetingEvent = async ({ name, email, phone, subject, message, preferredDate, preferredTime }) => {
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
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
    attendees: [
      { email, displayName: name },
    ],
    conferenceData: {
      createRequest: {
        requestId: `webhaze-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: true,
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
    start,
    end,
  };
};

const getAvailableSlots = async (date, slotDurationMinutes = 60) => {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  const [year, month, day] = date.split('-').map(Number);
  const dayStart = new Date(year, month - 1, day, 9, 0, 0);
  const dayEnd = new Date(year, month - 1, day, 18, 0, 0);

  const freeBusyResponse = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  });

  const busy = freeBusyResponse.data.calendars?.[calendarId]?.busy || [];

  const slots = [];
  for (let t = dayStart.getTime(); t < dayEnd.getTime(); t += slotDurationMinutes * 60 * 1000) {
    const slotStart = new Date(t);
    const slotEnd = new Date(t + slotDurationMinutes * 60 * 1000);

    const isClash = busy.some((b) => {
      const busyStart = new Date(b.start);
      const busyEnd = new Date(b.end);
      return slotStart < busyEnd && slotEnd > busyStart;
    });

    if (!isClash && slotStart > new Date()) {
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
      });
    }
  }

  return slots;
};

module.exports = { createMeetingEvent, buildICS, getAvailableSlots };
