'use client';

export default function MetricsGrid({
  totalDia,
  totalConsultas,
  totalMedicamentos,
  consultasCount,
  medsCount,
  promedio,
  consultasPagadas,
  icons,
}) {
  /* icons */
  const { DollarSign, Users, Pill, TrendingUp } = icons;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {/* total día */}
      <div className="rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <DollarSign className="h-8 w-8 opacity-80" />
          <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
        </div>
        <p className="mb-1 text-2xl font-bold md:text-3xl">${totalDia.toLocaleString()}</p>
        <p className="text-xs text-blue-100 md:text-sm">Total del día</p>
      </div>

      {/* consultas */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Users className="h-8 w-8 text-green-500" />
          <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {consultasCount}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
          ${totalConsultas.toLocaleString()}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Consultas</p>
      </div>

      {/* medicamentos */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Pill className="h-8 w-8 text-purple-500" />
          <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
            {medsCount}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
          ${totalMedicamentos.toLocaleString()}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Medicamentos</p>
      </div>

      {/* promedio */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <span className="rounded bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
            +12%
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">${promedio}</p>
        <p className="text-xs text-gray-600 md:text-sm">Promedio/paciente</p>
        <p className="text-xs md:text-gray-500">{consultasPagadas}</p>
      </div>
    </div>
  );
}
