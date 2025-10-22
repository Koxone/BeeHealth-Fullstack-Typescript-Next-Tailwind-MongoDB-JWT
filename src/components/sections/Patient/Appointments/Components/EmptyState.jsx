'use client';

/* imports */
import { Calendar, Plus } from 'lucide-react'; // icons

/* empty */
export default function EmptyState({ activeFilter, onNew }) {
  const isAll = activeFilter === 'Todas';
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-blue-50 p-12 text-center shadow-sm md:p-16">
      <div className="mx-auto max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Calendar className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-gray-900">
          {isAll ? 'No tienes citas programadas' : `No hay citas ${activeFilter.toLowerCase()}`}
        </h3>
        <p className="mb-8 text-lg text-gray-600">
          {isAll
            ? 'Agenda tu primera consulta con nuestros especialistas'
            : `Actualmente no tienes citas con el estado "${activeFilter}"`}
        </p>
        {isAll && (
          <button
            onClick={onNew}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Agendar Primera Cita
          </button>
        )}
      </div>
    </div>
  );
}
