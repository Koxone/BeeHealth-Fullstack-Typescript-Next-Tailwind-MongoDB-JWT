import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const specialty = searchParams.get('specialty') || 'weight';

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

    // Get events for the next 30 days
    const now = new Date();
    const monthFromNow = new Date();
    monthFromNow.setDate(now.getDate() + 30);

    const response = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: monthFromNow.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return Response.json({
      success: true,
      events: response.data.items || [],
    });
  } catch (error) {
    console.error('Error listing events:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
