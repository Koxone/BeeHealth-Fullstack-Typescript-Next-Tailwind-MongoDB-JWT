import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { summary, description, start, end, specialty } = body;

    const oauth2Client = getGoogleOAuthClient();

    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const calendarId =
      specialty === 'weight'
        ? process.env.GOOGLE_CALENDAR_ID_WEIGHT
        : process.env.GOOGLE_CALENDAR_ID_DENTAL;

    const event = {
      summary,
      description,
      start: { dateTime: start, timeZone: 'America/Mexico_City' },
      end: { dateTime: end, timeZone: 'America/Mexico_City' },
    };

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    return Response.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
