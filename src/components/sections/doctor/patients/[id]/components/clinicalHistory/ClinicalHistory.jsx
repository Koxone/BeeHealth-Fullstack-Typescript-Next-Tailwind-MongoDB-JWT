import { Plus, ClipboardList } from 'lucide-react';
import AddHistoryButton from './components/AddHistoryButton';
import HistoryCard from './components/HistoryCard';

/* Clinical history */
export default function ClinicalHistory({ onAdd, onEdit, patientRecord, specialty }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
            <ClipboardList className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-(--med-text-dark) sm:text-xl">
              Historial Clínico
            </h2>
            <p className="text-xs text-(--med-text-muted) sm:text-sm">
              Registros médicos del paciente
            </p>
          </div>
        </div>

        {/* Add History Button */}
        <AddHistoryButton onAdd={onAdd} />
      </div>

      {/* Records */}
      {patientRecord?.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {patientRecord?.map((r, index) => (
            <div
              key={r._id}
              className="bg-beehealth-body-main border-beehealth-green-secondary-solid rounded-xl border p-3 shadow-sm transition hover:shadow-md sm:p-4"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.3s ease-out forwards',
              }}
            >
              {/* History Card */}
              <HistoryCard
                specialty={specialty}
                r={r}
                onEdit={(record, readOnly) => onEdit(record, readOnly)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-beehealth-body-main flex flex-col items-center justify-center rounded-xl border border-(--med-gray-border) py-12 text-center sm:py-16">
          <ClipboardList className="mb-3 h-10 w-10 text-gray-400 sm:h-12 sm:w-12" />
          <p className="mb-1 text-sm font-medium text-(--med-text-dark) sm:text-base">
            Sin registros clínicos
          </p>
          <p className="mb-4 text-xs text-(--med-text-muted) sm:text-sm">
            Comienza agregando el primer registro
          </p>
          <button
            onClick={onAdd}
            className="bg-beehealth-green-primary-dark flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Agregar Registro
          </button>
        </div>
      )}
    </div>
  );
}
