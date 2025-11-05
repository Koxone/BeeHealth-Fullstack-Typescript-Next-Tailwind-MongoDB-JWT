'use client';

import { Search } from 'lucide-react';

export default function PatientsSearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar por nombre, teléfono o email..."
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
