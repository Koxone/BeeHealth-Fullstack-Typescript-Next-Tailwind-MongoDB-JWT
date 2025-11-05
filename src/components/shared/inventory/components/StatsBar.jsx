export default function StatsBar({ valorTotalMedicamentos, valorTotalSuministros, counts }) {
  const items = [
    {
      label: 'Valor medicamentos',
      value: `$${valorTotalMedicamentos.toLocaleString()}`,
      tone: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Valor suministros',
      value: `$${valorTotalSuministros.toLocaleString()}`,
      tone: 'from-indigo-500 to-purple-600',
    },
    {
      label: 'Items totales',
      value: counts.meds + counts.recs + counts.sums,
      tone: 'from-blue-500 to-cyan-600',
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {items.map((s, i) => (
        <div
          key={s.label}
          style={{ animationDelay: `${i * 80}ms` }}
          className="animate-[fadeIn_.25s_ease-out] rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm"
        >
          <div
            className={`mb-2 inline-block rounded-lg bg-linear-to-r ${s.tone} px-2 py-1 text-xs font-bold text-white`}
          >
            {s.label}
          </div>
          <p className="text-2xl font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
