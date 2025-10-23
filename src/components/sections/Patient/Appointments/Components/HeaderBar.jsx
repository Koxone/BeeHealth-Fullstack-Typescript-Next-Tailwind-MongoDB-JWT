'use client';

/* imports */
import { Plus } from 'lucide-react'; // icon

/* header */
export default function HeaderBar({ onNew }) {
  return (
    <div className="-mx-4 -mt-4 mb-6 w-full bg-linear-to-br from-blue-50 to-indigo-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Mis Citas Médicas
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Gestiona y programa tus consultas médicas
            </p>
          </div>
          <button
            onClick={onNew}
            className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
          >
            <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>
    </div>
  );
}
