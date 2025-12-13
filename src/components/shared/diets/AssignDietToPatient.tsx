'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Custom Hooks
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { useGetUserById } from '@/hooks/users/useGetUserById';
import { useAssignDiet } from '@/hooks/diets/assign/useAssignDiet';

// Feedback Components
import LoadingState from '../feedback/LoadingState';
import ErrorState from '../feedback/ErrorState';

export default function AssignDietToPatient({
  onSuccess,
  patientId,
  setShowSuccessModal,
  refetchTimeline,
}: {
  onSuccess?: () => void;
  patientId: string;
  setShowSuccessModal?: (show: boolean) => void;
  refetchTimeline?: () => void;
}) {
  // Local States
  const [openDropdown, setDropdownOpen] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  // Fetch all diets with Custom Hook
  const { dietsData, isLoading: loadingDiets } = useGetAllDiets();

  // Get Patient Data with Custom Hook
  const {
    userData,
    isLoading: loadingUser,
    error: userError,
    refetch: refetchUser,
  } = useGetUserById(patientId);

  // Assign Diet with Custom Hook
  const { assignDiet, isLoading: assigning, error: assignError } = useAssignDiet();

  const filteredList =
    dietsData?.filter((diet) => diet.name.toLowerCase().includes(search.toLowerCase())) || [];

  const toggleDiet = (id: string) => {
    setSelectedDiets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAssign = async () => {
    try {
      for (const dietId of selectedDiets) {
        await assignDiet({ patientId, dietId });
      }
      onSuccess?.();
      refetchTimeline?.();
      setShowSuccessModal(true);
      setDropdownOpen(false);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1500);
    } catch (err) {
      console.error('Error assigning diets:', err);
    }
  };

  // Autofill input check boxes with assigned diets
  useEffect(() => {
    if (dietsData && dietsData.length > 0 && userData?.diets) {
      const assignedDietIds = userData.diets.map((assignment) => assignment.diet);
      setSelectedDiets(assignedDietIds);
    }
  }, [dietsData, userData]);

  // Loading State
  if (loadingDiets) {
    return <LoadingState />;
  }

  // Error State
  if (userError) {
    return <ErrorState />;
  }

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
        Asignar dietas al paciente
      </label>
      <label className="mb-2 text-xs tracking-wide text-gray-500">
        Selecciona las dietas que deseas asignar al paciente y guarda los cambios.
      </label>

      {/* Dropdown button */}
      <button
        onClick={() => setDropdownOpen(!openDropdown)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:border-gray-400"
      >
        <span>
          {selectedDiets.length === 0 && 'Seleccionar dietas'}
          {selectedDiets.length === 1 && '1 dieta seleccionada'}
          {selectedDiets.length > 1 && `${selectedDiets.length} dietas asignadas`}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`mt-2 w-full overflow-hidden transition-all duration-300 ease-out ${
          openDropdown ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-beehealth-body-main h-56 overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar dieta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-beehealth-blue-primary-solid w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:outline-none"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {filteredList.map((diet) => {
              const isSelected = selectedDiets.includes(diet._id);

              return (
                <li
                  key={diet._id}
                  onClick={() => {
                    if (isSelected) return;
                    toggleDiet(diet._id);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 ${
                    isSelected ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isSelected}
                    readOnly
                    className="text-beehealth-blue-primary-solid pointer-events-none h-4 w-4 rounded border-gray-300"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{diet.name}</span>
                    {diet.category && (
                      <span className="text-xs text-gray-500">{diet.category}</span>
                    )}
                  </div>
                </li>
              );
            })}

            {filteredList.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No se encontraron dietas
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Error message */}
      {assignError && <p className="mt-2 text-xs text-red-500">{assignError}</p>}

      {/* Assign button */}
      <button
        onClick={handleAssign}
        disabled={assigning}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-3 rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {assigning ? 'Asignando...' : 'Guardar asignación'}
      </button>
    </div>
  );
}
