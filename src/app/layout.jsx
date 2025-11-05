import './globals.css';

export const metadata = {
  title: 'MedTrack',
  description: 'Aplicación médica moderna',
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen overflow-hidden">{children}</body>
    </html>
  );
}
