'use client';

/* diagnosis */
export default function DiagnosisSection({ form, setForm, isReadOnly, icons }) {
  const { Stethoscope } = icons;

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Stethoscope className="h-5 w-5 text-blue-600" />
        Diagnóstico y Tratamiento
      </h3>

      <div className="space-y-4">
        {/* dx */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Diagnóstico</label>
          <textarea
            rows="2"
            disabled={isReadOnly}
            value={form.diagnostico}
            onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Ingrese el diagnóstico..."
          />
        </div>

        {/* treatment */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Tratamiento</label>
          <textarea
            rows="2"
            disabled={isReadOnly}
            value={form.tratamiento}
            onChange={(e) => setForm({ ...form, tratamiento: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Ingrese el tratamiento recomendado..."
          />
        </div>

        {/* notes */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Notas Adicionales
          </label>
          <textarea
            rows="3"
            disabled={isReadOnly}
            value={form.notas}
            onChange={(e) => setForm({ ...form, notas: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Observaciones adicionales, recomendaciones, etc..."
          />
        </div>
      </div>
    </div>
  );
}
