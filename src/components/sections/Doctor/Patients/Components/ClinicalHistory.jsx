'use client';

/* history list */
export default function ClinicalHistory({ records, onAdd, onEdit, icons }) {
  const { ClipboardList, Plus, Edit2, Scale, Heart, Activity, Droplet } = icons;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Historial Clínico</h2>
            <p className="text-sm text-gray-500">Registros médicos del paciente</p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          Agregar
        </button>
      </div>

      {records.length > 0 ? (
        <div className="space-y-3">
          {records.map((r, index) => (
            <div
              key={r._id}
              className="group rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 transition hover:border-blue-300 hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideIn 0.3s ease-out forwards',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <span className="text-xs font-medium">
                      {new Date(r.fechaRegistro)
                        .toLocaleDateString('es-MX', { month: 'short' })
                        .toUpperCase()}
                    </span>
                    <span className="text-xl font-bold">{new Date(r.fechaRegistro).getDate()}</span>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {new Date(r.fechaRegistro).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                        Consulta
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2">
                        <Scale className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600">Peso</p>
                          <p className="text-sm font-bold text-blue-900">{r.pesoActual} kg</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-2">
                        <Heart className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-purple-600">IMC</p>
                          <p className="text-sm font-bold text-purple-900">
                            {r.indiceMasaCorporal?.toFixed(1)}
                          </p>
                        </div>
                      </div>

                      {r.presionArterial && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2">
                          <Activity className="h-4 w-4 text-red-600" />
                          <div>
                            <p className="text-xs text-red-600">Presión</p>
                            <p className="text-sm font-bold text-red-900">{r.presionArterial}</p>
                          </div>
                        </div>
                      )}

                      {r.glucosa && (
                        <div className="flex items-center gap-2 rounded-lg bg-orange-50 p-2">
                          <Droplet className="h-4 w-4 text-orange-600" />
                          <div>
                            <p className="text-xs text-orange-600">Glucosa</p>
                            <p className="text-sm font-bold text-orange-900">{r.glucosa}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {r.motivoConsulta && (
                      <div className="mt-3 rounded-lg bg-gray-50 p-3">
                        <p className="text-xs font-medium text-gray-600">Motivo de consulta:</p>
                        <p className="mt-1 text-sm text-gray-900">{r.motivoConsulta}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onEdit(r)}
                  className="rounded-lg bg-blue-50 p-2.5 transition hover:scale-110 hover:bg-blue-100 active:scale-95"
                  title="Editar registro"
                >
                  <Edit2 className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
          <ClipboardList className="mb-3 h-12 w-12 text-gray-300" />
          <p className="mb-1 font-medium text-gray-600">Sin registros clínicos</p>
          <p className="mb-4 text-sm text-gray-500">Comienza agregando el primer registro</p>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Agregar Registro
          </button>
        </div>
      )}
    </div>
  );
}
