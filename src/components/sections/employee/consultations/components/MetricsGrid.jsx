'use client';

/* metrics */
export default function MetricsGrid({ icons, totals, porcentajeCobrado }) {
  const { TrendingUp, CheckCircle, AlertCircle, Users } = icons;

  // prevent NaN
  const total = Number(totals?.total ?? 0);
  const cobradas = Number(totals?.cobradas ?? 0);
  const totalIngresos = Number(totals?.totalIngresos ?? 0);
  const totalPagado = Number(totals?.totalPagado ?? 0);
  const totalPendiente = Number(totals?.totalPendiente ?? 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* total ingresos */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-700 p-5 text-white shadow-lg">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-white/10" />
        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Total</span>
          </div>
          <p className="mb-1 text-3xl font-bold">${totalIngresos.toLocaleString()}</p>
          <p className="text-sm text-indigo-100">Ingresos totales</p>
        </div>
      </div>

      {/* cobrado */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-emerald-100 p-2">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
            {cobradas}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">${totalPagado.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-600">Cobrado</p>
        <div className="mt-2 flex items-center gap-1">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-600"
              style={{ width: `${porcentajeCobrado}%` }}
            />
          </div>
          <span className="text-xs font-bold text-emerald-600">{porcentajeCobrado}%</span>
        </div>
      </div>

      {/* pendiente */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-amber-100 p-2">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
            {total - cobradas}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">${totalPendiente.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-600">Pendiente</p>
      </div>

      {/* promedio */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-blue-100 p-2">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
            {total}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">
          ${total > 0 ? Math.round(totalIngresos / total).toLocaleString() : 0}
        </p>
        <p className="text-sm font-medium text-gray-600">Promedio</p>
      </div>
    </div>
  );
}
