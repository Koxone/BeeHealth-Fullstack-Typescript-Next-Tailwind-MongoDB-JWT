'use client';

import { Calendar } from 'lucide-react';

/* empty */
export default function EmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-emerald-50 p-12 text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <Calendar className="h-10 w-10 text-emerald-600" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">No se encontraron citas</h3>
      <p className="mb-6 text-gray-600">Intenta con otros filtros o agenda una nueva cita</p>
    </div>
  );
}
