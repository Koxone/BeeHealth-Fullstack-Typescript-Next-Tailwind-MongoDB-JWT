'use client';

/* header */
export default function HeaderWelcome({ currentUser }) {
  /* date */
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  console.log(currentUser);
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-900 md:mb-2 md:text-3xl">Dashboard</h1>
      <p className="text-sm text-gray-600 md:text-base">
        Bienvenido de vuelta{' '}
        <span className="text-asana-blue text-base font-medium">{currentUser?.fullName}</span>
      </p>
    </div>
  );
}
