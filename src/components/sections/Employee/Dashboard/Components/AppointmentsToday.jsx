'use client';

import { Clock, Users, ChevronRight } from 'lucide-react';

// today appointments list
export default function AppointmentsToday({ citas, onConfirm, onViewAll }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition hover:bg-blue-600 active:scale-95"
        >
          Ver todas
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {citas.map((cita) => (
          <div
            key={cita.id}
            className="rounded-xl border-2 border-gray-200 p-4 transition hover:border-blue-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{cita.paciente}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      cita.estado === 'Confirmada'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {cita.estado}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{cita.hora}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{cita.telefono}</span>
                  </div>
                </div>
              </div>
              {cita.estado === 'Pendiente' && (
                <button
                  onClick={() => onConfirm(cita.id)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600 active:scale-95"
                >
                  Confirmar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
