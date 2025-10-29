'use client';

import { Edit2, Trash2, Users, User, Clock, Calendar } from 'lucide-react';

export default function DietHeader({ title, duration, assignedCount, onEdit, onDelete, role }) {
  return (
    <div className="mb-6 flex items-start justify-between">
      {/* Doctor Diet Info */}
      {role === 'doctor' && (
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
      )}

      {/* Patient Diet Info */}
      {role === 'patient' && (
        <div className="mb-6 flex flex-col">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>30 días</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              <span>Dra. Martínez</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Inicio: 01 Oct 2024</span>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Actions */}
      {role === 'doctor' && (
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
      )}
    </div>
  );
}
