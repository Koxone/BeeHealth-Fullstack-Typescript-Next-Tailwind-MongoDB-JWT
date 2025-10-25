'use client';

import { useDoctorStatsStore } from '@/Zustand/useDoctorStatsStore';
import { Users, DollarSign, AlertTriangle, Activity } from 'lucide-react';

/* layout */
export default function StatsGrid({
  totalIngresos,
  totalCitas,
  citasActivas,
  promedioPorPaciente,
  inventarioAlertas,
  onClickCitas,
  onClickContabilidad,
  onClickInventario,
}) {
  // Zustand
  const todayAppointments = useDoctorStatsStore((state) => state.todayAppointments);
  const totalAppointmentsThisMonth = useDoctorStatsStore(
    (state) => state.totalAppointmentsThisMonth
  );
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {/* ingresos */}
      <div className="rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <DollarSign className="h-8 w-8 opacity-80" />
          <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
        </div>
        <p className="mb-1 text-2xl font-bold md:text-3xl">
          ${Number(totalIngresos).toLocaleString()}
        </p>
        <p className="text-xs text-blue-100 md:text-sm">Ingresos totales</p>
      </div>

      {/* citas */}
      <button
        onClick={onClickCitas}
        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-green-300 active:scale-95 md:p-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <Users className="h-8 w-8 text-green-500" />
          <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {totalAppointmentsThisMonth} este mes
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">{todayAppointments}</p>
        <p className="text-xs text-gray-600 md:text-sm">Citas de hoy</p>
      </button>

      {/* promedio */}
      <button
        onClick={onClickContabilidad}
        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-purple-300 active:scale-95 md:p-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <Activity className="h-8 w-8 text-purple-500" />
          <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
            +12%
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">${promedioPorPaciente}</p>
        <p className="text-xs text-gray-600 md:text-sm">Promedio/paciente</p>
      </button>

      {/* inventario */}
      <button
        onClick={onClickInventario}
        className={`cursor-pointer rounded-xl border-2 p-4 text-left shadow-sm transition active:scale-95 md:p-6 ${
          inventarioAlertas > 0
            ? 'border-red-200 bg-red-50 hover:border-red-300'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <AlertTriangle
            className={`h-8 w-8 ${inventarioAlertas > 0 ? 'text-red-500' : 'text-gray-400'}`}
          />
          <span
            className={`rounded px-2 py-1 text-xs font-medium ${
              inventarioAlertas > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {inventarioAlertas > 0 ? 'Revisar' : 'Todo bien'}
          </span>
        </div>
        <p
          className={`mb-1 text-2xl font-bold md:text-3xl ${inventarioAlertas > 0 ? 'text-red-600' : 'text-gray-900'}`}
        >
          {inventarioAlertas}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Alertas inventario</p>
      </button>
    </div>
  );
}
