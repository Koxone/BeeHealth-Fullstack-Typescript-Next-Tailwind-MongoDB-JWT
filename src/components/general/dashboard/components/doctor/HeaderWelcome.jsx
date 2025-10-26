'use client';

import { usePathname } from 'next/navigation';

export default function HeaderWelcome({ fullName }) {
  const pathname = usePathname();

  const dashboardType = pathname.startsWith('/doctor')
    ? 'doctor'
    : pathname.startsWith('/patient')
      ? 'patient'
      : 'employee';

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      {dashboardType === 'doctor' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Bienvenido, Dr. {fullName}
        </h1>
      )}
      {dashboardType === 'patient' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Bienvenido, {fullName}
        </h1>
      )}
      {dashboardType === 'employee' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Bienvenido, {fullName}
        </h1>
      )}
      <p className="text-sm text-gray-600 md:text-base">{today}</p>
    </div>
  );
}
