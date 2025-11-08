import { google } from 'googleapis';

// @route    POST /api/google/calendar/create
// @desc     Create Appointment
// @access   Private
export async function POST(req) {
  try {
    const body = await req.json();
    const { patientId, patientName, specialty, date, time, phone, email, reason } = body;

    // Load service account credentials
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'));

    // Authenticate with service account
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Select calendar based on specialty
    const calendarId =
      specialty === 'weight'
        ? process.env.GOOGLE_CALENDAR_ID_WEIGHT
        : process.env.GOOGLE_CALENDAR_ID_DENTAL;

    // Build event details
    const startDateTime = new Date(`${date}T${time}:00-06:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const summary = specialty === 'weight' ? 'Control de peso' : 'Odontología';
    const description = `
      Paciente: ${patientName}
      Paciente ID: ${patientId}
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

    // Create event
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
