'use client';

/* vitals */
export default function VitalsSection({ form, setForm, isReadOnly, icons }) {
  const { Activity } = icons;

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Activity className="h-5 w-5 text-blue-600" />
        Signos Vitales (Opcional)
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* bp */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Presión Arterial</label>
          <input
            type="text"
            disabled={isReadOnly}
            value={form.presionArterial}
            onChange={(e) => setForm({ ...form, presionArterial: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="120/80"
          />
        </div>

        {/* glucose */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Glucosa (mg/dL)</label>
          <input
            type="text"
            disabled={isReadOnly}
            value={form.glucosa}
            onChange={(e) => setForm({ ...form, glucosa: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="90"
          />
        </div>

        {/* cholesterol */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Colesterol (mg/dL)
          </label>
          <input
            type="text"
            disabled={isReadOnly}
            value={form.colesterol}
            onChange={(e) => setForm({ ...form, colesterol: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="180"
          />
        </div>
      </div>
    </div>
  );
}
