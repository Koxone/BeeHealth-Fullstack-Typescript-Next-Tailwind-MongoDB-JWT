'use client';

import { Edit2, Trash2, Users } from 'lucide-react';

export default function DietHeader({ title, duration, assignedCount, onEdit, onDelete }) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Duración: {duration}</span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {assignedCount} paciente{assignedCount === 1 ? '' : 's'} asignado
            {assignedCount === 1 ? '' : 's'}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Edit2 className="h-4 w-4" />
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 active:scale-95"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
}
