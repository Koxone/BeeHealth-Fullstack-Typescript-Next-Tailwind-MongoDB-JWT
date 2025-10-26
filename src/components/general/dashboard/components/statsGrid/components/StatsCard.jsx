import React from 'react';

function StatsCard({ Icon }) {
  return (
    <div className="rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
      <div className="mb-2 flex items-center justify-between">
        <DollarSign className="h-8 w-8 opacity-80" />
        <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
      </div>
      <p className="mb-1 text-2xl font-bold md:text-3xl">$0</p>
      <p className="text-xs text-blue-100 md:text-sm">Ingresos totales</p>
    </div>
  );
}

export default StatsCard;
