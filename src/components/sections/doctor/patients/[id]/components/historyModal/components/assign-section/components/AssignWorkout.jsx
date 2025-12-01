'use client';

import { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { useGetAllWorkouts } from '@/hooks/workouts/useGetAllWorkouts';

export default function AssignWorkout() {
  // Fetch workouts with Custom Hook
  const { workoutData, isLoading, error, refetch: fetchWorkouts } = useGetAllWorkouts();

  /* State */
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  /* Toggle */
  const toggleItem = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  /* Assign */
  const handleAssign = () => {
    const assignedItems = workoutData?.filter((w) => selected.includes(w.id)) || [];
    setAssigned((prev) => [...prev, ...assignedItems]);
    setSelected([]);
    setOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  /* Remove */
  const removeAssigned = (id) => {
    setAssigned((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Title */}
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar ejercicio
      </label>

      {/* Dropdown */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-400"
      >
        <span>
          {selected.length === 0 && 'Seleccionar ejercicio'}
          {selected.length === 1 && '1 seleccionado'}
          {selected.length > 1 && `${selected.length} seleccionados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </div>

      {/* Dropdown content */}
      {open && (
        <div className="bg-beehealth-body-main mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {workoutData?.map((item) => (
              <li
                key={item._id}
                className="hover:bg-beehealth-body-main flex cursor-pointer items-center gap-3 px-3 py-2"
                onClick={() => toggleItem(item.id)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                  className="text-beehealth-blue-primary-solid h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assign button */}
      <button
        onClick={handleAssign}
        disabled={selected.length === 0}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        Asignar ejercicio
      </button>

      {/* Success */}
      {showSuccess && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span>Asignación completada</span>
        </div>
      )}

      {/* Assigned */}
      {assigned.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-semibold text-gray-600">Asignados:</p>

          <div className="flex flex-wrap gap-2">
            {assigned.map((item) => (
              <div
                key={item.id}
                className="bg-beehealth-blue-secondary-solid flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-medium text-white"
              >
                {item.name}

                <button onClick={() => removeAssigned(item.id)} className="hover:text-red-300">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
