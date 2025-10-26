'use client';

import { Users, DollarSign, AlertTriangle, Activity } from 'lucide-react';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {/* Income */}
      <div className="rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <DollarSign className="h-8 w-8 opacity-80" />
          <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
        </div>
        <p className="mb-1 text-2xl font-bold md:text-3xl">$0</p>
        <p className="text-xs text-blue-100 md:text-sm">Ingresos totales</p>
      </div>

      {/* Appointments */}
      <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-green-300 active:scale-95 md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Users className="h-8 w-8 text-green-500" />
          <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            0 este mes
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">0</p>
        <p className="text-xs text-gray-600 md:text-sm">Citas de hoy</p>
      </div>

      {/* Average */}
      <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-purple-300 active:scale-95 md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Activity className="h-8 w-8 text-purple-500" />
          <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
            +12%
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">$0</p>
        <p className="text-xs text-gray-600 md:text-sm">Promedio/paciente</p>
      </div>

      {/* Inventory */}
      <div className="cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-gray-300 active:scale-95 md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <AlertTriangle className="h-8 w-8 text-gray-400" />
          <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            Todo bien
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">0</p>
        <p className="text-xs text-gray-600 md:text-sm">Alertas inventario</p>
      </div>
    </div>
  );
}
