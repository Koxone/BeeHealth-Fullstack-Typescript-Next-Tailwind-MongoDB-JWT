'use client';

/* modal */
export default function HistoryModal({ editingHistory, form, setForm, onClose, onSubmit, icons }) {
  const { X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope } = icons;
  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-6">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingHistory ? 'Editar Historial Clínico' : 'Nuevo Historial Clínico'}
                  </h2>
                  <p className="text-sm text-blue-100">Registro médico del paciente</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30 active:scale-95"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="max-h-[calc(90vh-100px)] overflow-y-auto p-6">
            <div className="space-y-6">
              {/* basic */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  Información Básica
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Fecha <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={form.fecha}
                      onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Peso (kg) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Scale className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={form.peso}
                        onChange={(e) => setForm({ ...form, peso: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="75.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      IMC <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Heart className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={form.imc}
                        onChange={(e) => setForm({ ...form, imc: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="25.8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* vitals */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Signos Vitales (Opcional)
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Presión Arterial
                    </label>
                    <input
                      type="text"
                      value={form.presionArterial}
                      onChange={(e) => setForm({ ...form, presionArterial: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="120/80"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Glucosa (mg/dL)
                    </label>
                    <input
                      type="text"
                      value={form.glucosa}
                      onChange={(e) => setForm({ ...form, glucosa: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="90"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Colesterol (mg/dL)
                    </label>
                    <input
                      type="text"
                      value={form.colesterol}
                      onChange={(e) => setForm({ ...form, colesterol: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="180"
                    />
                  </div>
                </div>
              </div>

              {/* diag and treatment */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  Diagnóstico y Tratamiento
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Diagnóstico
                    </label>
                    <textarea
                      rows="2"
                      value={form.diagnostico}
                      onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="Ingrese el diagnóstico..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Tratamiento
                    </label>
                    <textarea
                      rows="2"
                      value={form.tratamiento}
                      onChange={(e) => setForm({ ...form, tratamiento: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="Ingrese el tratamiento recomendado..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Notas Adicionales
                    </label>
                    <textarea
                      rows="3"
                      value={form.notas}
                      onChange={(e) => setForm({ ...form, notas: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="Observaciones adicionales, recomendaciones, etc..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                {editingHistory ? 'Actualizar Registro' : 'Guardar Registro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
