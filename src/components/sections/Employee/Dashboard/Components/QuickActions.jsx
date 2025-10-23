'use client';

import { Calendar, FileText, Package, Users } from 'lucide-react';

// shortcuts
export default function QuickActions({
  onGoAppointments,
  onGoConsultations,
  onGoInventory,
  onGoPatients,
}) {
  return (
    <div className="rounded-xl bg-linear-to-br from-purple-500 to-pink-600 p-4 text-white shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold md:text-xl">Acciones Rápidas</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <button
          onClick={onGoAppointments}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <Calendar className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Agendar Cita</p>
        </button>
        <button
          onClick={onGoConsultations}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <FileText className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Registrar Consulta</p>
        </button>
        <button
          onClick={onGoInventory}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <Package className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Ver Inventario</p>
        </button>
        <button
          onClick={onGoPatients}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <Users className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Buscar Paciente</p>
        </button>
      </div>
    </div>
  );
}
