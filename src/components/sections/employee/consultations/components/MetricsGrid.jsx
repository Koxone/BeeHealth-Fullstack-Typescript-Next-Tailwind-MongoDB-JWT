'use client';

import { Pill, TrendingUp, CheckCircle, AlertCircle, Users } from 'lucide-react';

/* metrics */
export default function MetricsGrid({ totals }) {
  // prevent NaN
  const total = Number(totals?.total ?? 0);
  const cobradas = Number(totals?.cobradas ?? 0);
  const totalIngresos = Number(totals?.totalIngresos ?? 0);
  const totalPagado = Number(totals?.totalPagado ?? 0);
  const totalPendiente = Number(totals?.totalPendiente ?? 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* total ingresos */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-white/10" />
        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-medtrack-blue-solid rounded-xl p-2">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="bg-medtrack-blue-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
              Total
            </span>
          </div>
          <p className="mb-1 text-3xl font-bold">${totalIngresos.toLocaleString()}</p>
          <p className="text-sm">Ingresos del Dia</p>
        </div>
      </div>

      {/* cobrado */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="bg-medtrack-blue-solid rounded-xl p-2">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="bg-medtrack-blue-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
            {cobradas}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">${totalPagado.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-600">Consultas</p>
      </div>

      {/* pendiente */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="bg-medtrack-blue-solid rounded-xl p-2">
            <Pill className="h-6 w-6 text-white" />
          </div>
          <span className="bg-medtrack-blue-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
            {total - cobradas}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">${totalPendiente.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-600">Medicamentos</p>
      </div>
    </div>
  );
}
