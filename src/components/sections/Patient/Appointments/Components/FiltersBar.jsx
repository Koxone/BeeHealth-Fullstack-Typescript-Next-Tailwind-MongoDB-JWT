'use client';

/* imports */
import { Filter } from 'lucide-react'; // icon

/* filters */
export default function FiltersBar({ filters, active, onChange }) {
  return (
    <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto pb-2">
      <Filter className="h-5 w-5 shrink-0 text-gray-400" />
      {filters.map((f) => (
        <button
          key={f.label}
          onClick={() => onChange(f.label)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            active === f.label
              ? 'scale-105 bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'border-2 border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 active:scale-95'
          }`}
        >
          <span>{f.label}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${active === f.label ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}
