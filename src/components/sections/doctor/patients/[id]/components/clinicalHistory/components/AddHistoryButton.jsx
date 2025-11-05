import { Plus } from 'lucide-react';
import React from 'react';

function AddHistoryButton({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-(--med-blue) px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 active:scale-95 sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      Agregar
    </button>
  );
}

export default AddHistoryButton;
