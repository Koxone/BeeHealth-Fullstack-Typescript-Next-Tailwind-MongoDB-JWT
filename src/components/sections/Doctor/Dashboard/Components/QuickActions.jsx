'use client';

/* imports */
import { Users, Calendar, DollarSign, Package } from 'lucide-react';

/* grid */
export default function QuickActions({ onPacientes, onCalendario, onContabilidad, onInventario }) {
  return (
    <div className="rounded-xl bg-linear-to-br from-blue-500 to-purple-600 p-4 text-white shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold md:text-xl">Acciones Rápidas</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <button
          onClick={onPacientes}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <Users className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Ver Pacientes</p>
        </button>
        <button
          onClick={onCalendario}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <Calendar className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Calendario</p>
        </button>
        <button
          onClick={onContabilidad}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <DollarSign className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Contabilidad</p>
        </button>
        <button
          onClick={onInventario}
          className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          <Package className="mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Inventario</p>
        </button>
      </div>
    </div>
  );
}
