import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { patientName, specialty, date, time, phone, email, reason } = body;

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

    const startDateTime = new Date(`${date}T${time}:00-06:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const summary = `${specialty === 'weight' ? 'Control de peso' : 'Odontologia'}`;
    const description = `
      Paciente: ${patientName}
      Motivo de consulta: ${reason}
      Teléfono: ${phone}
      Correo: ${email}
      Fecha: ${date}
      Hora: ${time}
      Especialidad: ${specialty}
    `.trim();

    const event = {
      summary,
      description,
      start: { dateTime: startDateTime.toISOString(), timeZone: 'America/Mexico_City' },
      end: { dateTime: endDateTime.toISOString(), timeZone: 'America/Mexico_City' },
      attendees: email ? [{ email }] : [],
    };

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    return Response.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error creating event:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
