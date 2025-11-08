// Create event (service account)
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function POST(req) {
  try {
    // Body
    const body = await req.json();
    const { patientName, specialty, date, time, phone, email, reason } = body;

    // Auth
    const auth = getGoogleOAuthClient(); // JWT from GOOGLE_SERVICE_ACCOUNT_KEY
    const calendar = google.calendar({ version: 'v3', auth });

    // Calendar id
    const calendarId =
      specialty === 'weight'
        ? process.env.GOOGLE_CALENDAR_ID_WEIGHT
        : process.env.GOOGLE_CALENDAR_ID_DENTAL;

    // Dates
    const start = new Date(`${date}T${time}:00-06:00`);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    // Payload
    const event = {
      summary: `${specialty === 'weight' ? 'Control de peso' : 'Dental'} · ${patientName}`,
      description: `Motivo: ${reason || ''}\nTel: ${phone || ''}\nEmail: ${email || ''}`,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    // Insert
    const { data } = await calendar.events.insert({ calendarId, requestBody: event });

    // Ok
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    // Fail
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
