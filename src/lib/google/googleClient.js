import { google } from 'googleapis';

/* Detect environment and choose correct auth */
export function getGoogleAuthClient() {
  const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';

  if (isProd) {
    // Service Account (Vercel)
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    return new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
  } else {
    // Local OAuth (dev)
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    return oauth2Client;
  }
}
