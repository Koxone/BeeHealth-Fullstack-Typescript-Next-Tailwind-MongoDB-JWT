import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  const oauth2Client = getGoogleOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);

  console.log('Google Calendar Tokens:', tokens);

  return new Response('Authorization complete. Check your console for tokens.');
}
