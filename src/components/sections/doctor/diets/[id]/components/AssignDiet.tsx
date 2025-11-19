'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGetAllPatients } from '@/hooks/patients/useGetAllPatients';

export default function AssignDiet({ specialty }: { specialty: string }) {
  // Fetch patients
  const { patients, isLoading, error, setPatients } = useGetAllPatients();
  const [patientsData, setPatientsData] = useState(patients || []);

  // Update local state when patients data changes
  useEffect(() => {
    if (patients && patients.length > 0) {
      const filteredPatients = patients.filter((patient) => patient.specialty.includes(specialty));
      setPatientsData(filteredPatients);
    }
  }, [patients, specialty]);

  /* State: Dropdown control */
  const [open, setOpen] = useState(false);

  // Selected patients
  const [selected, setSelected] = useState<string[]>([]);

  // Toggle patient selection
  const togglePatient = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-400 bg-white p-4">
      {/* Label */}
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar dieta a pacientes{' '}
        <span className="text-[10px] normal-case">
          (Esta funcion solo es visible para Doctores)
        </span>
      </label>

      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:border-gray-400"
      >
        <span>
          {selected.length === 0 && 'Seleccionar pacientes'}
          {selected.length === 1 && '1 paciente seleccionado'}
          {selected.length > 1 && `${selected.length} pacientes seleccionados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 bg-white shadow-md">
          {/* Block comment: Search input */}
          <div className="sticky top-0 bg-white p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* List */}
          <ul className="divide-y divide-gray-100">
            {patientsData.map((patient) => (
              <li
                key={patient._id}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-50"
                onClick={() => togglePatient(patient._id)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(patient._id)}
                  onChange={() => togglePatient(patient._id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{patient.fullName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info */}
      <p className="mt-2 text-xs text-gray-500">Selecciona uno o varios pacientes del listado.</p>
    </div>
  );
}
