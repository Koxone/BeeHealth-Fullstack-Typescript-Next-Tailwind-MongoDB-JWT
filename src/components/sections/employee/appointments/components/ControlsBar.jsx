'use client';
import { Search, Plus } from 'lucide-react';

export default function ControlsBar({ searchTerm, setSearchTerm, onCreate }) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCreate}
            className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 active:scale-95"
          >
            <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
            <span className="hidden sm:inline">Agendar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
