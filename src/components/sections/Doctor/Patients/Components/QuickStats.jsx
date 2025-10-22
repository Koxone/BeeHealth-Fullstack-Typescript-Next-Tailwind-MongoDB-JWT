'use client';

/* quick stats */
export default function QuickStats({ stats, icons }) {
  const { FileText, Scale, Heart, Activity, TrendingUp } = icons;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="group rounded-2xl border-2 border-green-200 bg-linear-to-br from-green-50 to-emerald-100 p-6 shadow-lg transition hover:scale-105">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-green-200 p-3 transition group-hover:scale-110">
            <FileText className="h-6 w-6 text-green-700" />
          </div>
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">{stats.totalConsultas}</p>
        <p className="text-sm text-gray-700">Consultas Totales</p>
      </div>

      <div className="group rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-cyan-100 p-6 shadow-lg transition hover:scale-105">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-blue-200 p-3 transition group-hover:scale-110">
            <Scale className="h-6 w-6 text-blue-700" />
          </div>
          <Activity className="h-5 w-5 text-blue-600" />
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">{stats.ultimoPeso}</p>
        <p className="text-sm text-gray-700">Peso Actual (kg)</p>
      </div>

      <div className="group rounded-2xl border-2 border-purple-200 bg-linear-to-br from-purple-50 to-pink-100 p-6 shadow-lg transition hover:scale-105">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-purple-200 p-3 transition group-hover:scale-110">
            <Heart className="h-6 w-6 text-purple-700" />
          </div>
          <Activity className="h-5 w-5 text-purple-600" />
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">{stats.ultimoIMC}</p>
        <p className="text-sm text-gray-700">IMC Actual</p>
      </div>
    </div>
  );
}
