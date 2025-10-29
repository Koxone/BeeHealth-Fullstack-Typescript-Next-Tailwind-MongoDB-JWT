'use client';

import { Activity } from 'lucide-react';

export default function Header({ total }) {
  return (
    <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 p-3 shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Historial Clínico
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Registro completo de tus mediciones y progreso ({total} registros)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
