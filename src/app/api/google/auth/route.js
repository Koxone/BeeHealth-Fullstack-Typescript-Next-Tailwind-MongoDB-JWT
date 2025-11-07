import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function GET() {
  const oauth2Client = getGoogleOAuthClient();

  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });

  return Response.redirect(url);
}
