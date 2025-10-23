'use client';
import { Scale, Activity, Stethoscope, Pill, Ruler, HeartPulse, Droplet } from 'lucide-react';

/* Clinical history */
export default function ClinicalHistory({ records, onAdd, onEdit, icons }) {
  const { ClipboardList, Plus, Edit2 } = icons;

  return (
    <div className="rounded-2xl border border-(--med-gray-border) bg-(--med-gray) p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-blue-light)">
            <ClipboardList className="h-6 w-6 text-(--med-blue)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-(--med-text-dark)">Historial Clínico</h2>
            <p className="text-sm text-(--med-text-muted)">Registros médicos del paciente</p>
          </div>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-(--med-blue) px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>

      {/* Records */}
      {records.length > 0 ? (
        <div className="space-y-4">
          {records.map((r, index) => (
            <div
              key={r._id}
              className="rounded-xl border border-(--med-gray-border) bg-white p-4 shadow-sm transition hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.3s ease-out forwards',
              }}
            >
              <div className="flex justify-between gap-4">
                {/* Date */}
                <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-(--med-blue-light) text-(--med-blue)">
                  <span className="text-xs font-medium uppercase">
                    {new Date(r.createdAt).toLocaleDateString('es-MX', { month: 'short' })}
                  </span>
                  <span className="text-lg font-bold">
                    {new Date(r.fechaRegistro).toLocaleDateString('es-MX', { day: '2-digit' })}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {/* Peso */}
                    <div className="rounded-lg bg-(--med-blue-light) p-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-(--med-blue)">
                        <Scale className="h-4 w-4" /> Peso
                      </div>
                      <p className="text-sm font-bold text-(--med-text-dark)">{r.pesoActual} kg</p>
                    </div>

                    {/* IMC */}
                    <div className="rounded-lg bg-(--med-purple)/10 p-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-(--med-purple)">
                        <Activity className="h-4 w-4" /> IMC
                      </div>
                      <p className="text-sm font-bold text-(--med-text-dark)">
                        {r.indiceMasaCorporal?.toFixed(1)}
                      </p>
                    </div>

                    {/* Enfermedades */}
                    <div className="rounded-lg bg-(--med-red)/10 p-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-(--med-red)">
                        <Stethoscope className="h-4 w-4" /> Enfermedades
                      </div>
                      <p className="text-sm font-bold text-(--med-text-dark)">
                        {r.enfermedadesCronicas || '—'}
                      </p>
                    </div>

                    {/* Medicamentos */}
                    <div className="rounded-lg bg-(--med-purple)/10 p-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-(--med-purple)">
                        <Pill className="h-4 w-4" /> Medicamentos
                      </div>
                      <p className="text-sm font-bold text-(--med-text-dark)">
                        {r.medicamentosActuales || '—'}
                      </p>
                    </div>

                    {/* Talla */}
                    <div className="rounded-lg bg-(--med-cyan)/10 p-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-(--med-cyan)">
                        <Ruler className="h-4 w-4" /> Talla
                      </div>
                      <p className="text-sm font-bold text-(--med-text-dark)">
                        {r.talla ? `${r.talla} cm` : '—'}
                      </p>
                    </div>

                    {/* Glucosa */}
                    {r.glucosa && (
                      <div className="rounded-lg bg-(--med-green)/10 p-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-(--med-green)">
                          <Droplet className="h-4 w-4" /> Glucosa
                        </div>
                        <p className="text-sm font-bold text-(--med-text-dark)">{r.glucosa}</p>
                      </div>
                    )}
                  </div>

                  {/* Motivo */}
                  {r.motivoConsulta && (
                    <div className="mt-3 rounded-lg bg-(--med-gray) p-3">
                      <p className="text-xs font-medium text-(--med-text-muted)">
                        Motivo de consulta:
                      </p>
                      <p className="mt-1 text-sm text-(--med-text-dark)">{r.motivoConsulta}</p>
                    </div>
                  )}
                </div>

                {/* Edit */}
                <button
                  onClick={() => onEdit(r)}
                  className="rounded-lg bg-(--med-blue-light) p-2.5 transition hover:bg-(--med-blue) hover:text-white active:scale-95"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-(--med-gray-border) bg-white py-16 text-center">
          <ClipboardList className="mb-3 h-12 w-12 text-gray-400" />
          <p className="mb-1 font-medium text-(--med-text-dark)">Sin registros clínicos</p>
          <p className="mb-4 text-sm text-(--med-text-muted)">
            Comienza agregando el primer registro
          </p>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-(--med-blue) px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Agregar Registro
          </button>
        </div>
      )}
    </div>
  );
}
