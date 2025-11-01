'use client';

import { Clock, Edit2, Trash2 } from 'lucide-react';
import ActionsButtons from './components/ActionsButtons';

const getNivelColor = (nivel) => {
  const map = {
    Principiante: 'bg-green-100 text-green-800',
    Intermedio: 'bg-yellow-100 text-yellow-800',
    Avanzado: 'bg-red-100 text-red-800',
  };
  return map[nivel] || 'bg-gray-100 text-gray-800';
};

export default function WorkoutCard({
  workout,
  onOpen,
  role,
  setShowDeleteModal,
  handleEdit,
  setWorkoutToDelete,
}) {
  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-lg active:scale-95"
    >
      {/* Main Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={workout.imagenPrincipal}
          alt={workout.nombre}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-full bg-white/80 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${getNivelColor(workout.nivel)}`}
          >
            {workout.nivel}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
            {workout.categoria}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
          {workout.nombre}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{workout.duracion}</span>
        </div>

        {/* Patient Actions */}
        {role === 'patient' && (
          <p className="mt-3 text-sm font-medium text-blue-600 opacity-90 transition-opacity group-hover:opacity-100">
            Click para ver detalles →
          </p>
        )}

        {/* Doctor Actions */}
        {role === 'doctor' && (
          <ActionsButtons
            handleEdit={handleEdit}
            setShowDeleteModal={setShowDeleteModal}
            setWorkoutToDelete={setWorkoutToDelete}
            workout={workout}
          />
        )}
      </div>
    </div>
  );
}
