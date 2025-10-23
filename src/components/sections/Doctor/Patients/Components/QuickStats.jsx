'use client';

/* quick stats */
export default function QuickStats({ stats, icons }) {
  const { FileText, Scale, Heart, Activity, TrendingUp } = icons;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Consultas Totales */}
      <div className="rounded-2xl border border-(--med-gray-border) bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-green)/10">
              <FileText className="h-6 w-6 text-(--med-green)" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">{stats.totalConsultas}</p>
              <p className="text-sm text-(--med-text-muted)">Consultas Totales</p>
            </div>
          </div>
          <TrendingUp className="h-5 w-5 text-(--med-green)" />
        </div>
      </div>

      {/* Peso Actual */}
      <div className="rounded-2xl border border-(--med-gray-border) bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-blue-light)">
              <Scale className="h-6 w-6 text-(--med-blue)" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">{stats.ultimoPeso}</p>
              <p className="text-sm text-(--med-text-muted)">Peso Actual (kg)</p>
            </div>
          </div>
          <Activity className="h-5 w-5 text-(--med-blue)" />
        </div>
      </div>

      {/* IMC Actual */}
      <div className="rounded-2xl border border-(--med-gray-border) bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-purple)/10">
              <Heart className="h-6 w-6 text-(--med-purple)" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">{stats.ultimoIMC}</p>
              <p className="text-sm text-(--med-text-muted)">IMC Actual</p>
            </div>
          </div>
          <Activity className="h-5 w-5 text-(--med-purple)" />
        </div>
      </div>
    </div>
  );
}
