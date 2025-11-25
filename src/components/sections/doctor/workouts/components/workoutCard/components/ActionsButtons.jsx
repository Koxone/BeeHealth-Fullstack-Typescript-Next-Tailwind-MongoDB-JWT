import { Edit2, Trash2 } from 'lucide-react';
import React from 'react';

function ActionsButtons({ handleEdit, workout, setWorkoutToDelete, setShowDeleteModal }) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="mt-4 flex gap-2">
      {/* Edit Workout */}
      <button
        onClick={(e) => handleEdit(workout)}
        className="bg-beehealth-blue-light hover:bg-beehealth-blue-light-hover text-beehealth-blue-dark hover:text-beehealth-blue-dark-hover flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition active:scale-95"
      >
        <Edit2 className="h-4 w-4" />
        Editar
      </button>

      {/* Delete Workout */}
      <button
        onClick={(e) => {
          setWorkoutToDelete(workout);
          setShowDeleteModal(true);
        }}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
      >
        <Trash2 className="h-4 w-4" />
        Eliminar
      </button>
    </div>
  );
}

export default ActionsButtons;
