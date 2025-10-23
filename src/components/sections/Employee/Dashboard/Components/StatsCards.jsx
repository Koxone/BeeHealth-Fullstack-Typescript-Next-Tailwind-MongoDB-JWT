'use client';

import { Calendar, Clock, FileText, AlertTriangle } from 'lucide-react';

// simple: uses props only
export default function StatsCards({
  citasHoy,
  alertasInventario,
  onGoAppointments,
  onGoConsultations,
  onGoInventory,
}) {
  // computed
  const pendientes = citasHoy.filter((c) => c.estado === 'Pendiente').length;

  // ui
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {/* citas hoy */}
      <div
        onClick={onGoAppointments}
        className="cursor-pointer rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm transition hover:from-blue-600 hover:to-blue-700 active:scale-95 md:p-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <Calendar className="h-8 w-8 opacity-80" />
          <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
        </div>
        <p className="mb-1 text-2xl font-bold md:text-3xl">{citasHoy.length}</p>
        <p className="text-xs text-blue-100 md:text-sm">Citas programadas</p>
      </div>

      {/* pendientes */}
      <div
        onClick={onGoAppointments}
        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-yellow-300 active:scale-95 md:p-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <Clock className="h-8 w-8 text-yellow-500" />
          <span className="rounded bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
            {pendientes}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">{pendientes}</p>
        <p className="text-xs text-gray-600 md:text-sm">Pendientes confirmar</p>
      </div>

      {/* consultas hoy */}
      <div
        onClick={onGoConsultations}
        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-green-300 active:scale-95 md:p-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <FileText className="h-8 w-8 text-green-500" />
          <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            5
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">$3,800</p>
        <p className="text-xs text-gray-600 md:text-sm">Consultas hoy</p>
      </div>

      {/* alertas inventario */}
      <div
        onClick={onGoInventory}
        className={`cursor-pointer rounded-xl border-2 p-4 shadow-sm transition active:scale-95 md:p-6 ${
          alertasInventario.length > 0
            ? 'border-red-200 bg-red-50 hover:border-red-300'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <AlertTriangle
            className={`h-8 w-8 ${alertasInventario.length > 0 ? 'text-red-500' : 'text-gray-400'}`}
          />
          <span
            className={`rounded px-2 py-1 text-xs font-medium ${
              alertasInventario.length > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {alertasInventario.length > 0 ? 'Revisar' : 'OK'}
          </span>
        </div>
        <p
          className={`mb-1 text-2xl font-bold md:text-3xl ${
            alertasInventario.length > 0 ? 'text-red-600' : 'text-gray-900'
          }`}
        >
          {alertasInventario.length}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Alertas inventario</p>
      </div>
    </div>
  );
}
