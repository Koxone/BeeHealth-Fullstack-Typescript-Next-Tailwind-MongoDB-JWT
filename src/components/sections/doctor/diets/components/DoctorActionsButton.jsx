'use client';
import { Edit2, Trash2 } from 'lucide-react';
import React from 'react';

function DoctorActionsButton({ onEdit, onDelete }) {
  return (
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
  );
}

export default DoctorActionsButton;
