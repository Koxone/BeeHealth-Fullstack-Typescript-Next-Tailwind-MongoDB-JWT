'use client';

export const runtime = 'nodejs';
import SharedSectionHeader from '../headers/SharedSectionHeader';
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { Loader2 } from 'lucide-react';
import DoctorDietCard from '@/components/sections/doctor/diets/components/DoctorDietCard';
import PatientDietCard from '@/components/sections/patient/diets/components/PatientDietCard';

export default function SharedDiets({ role }) {
  // Fetch all diets
  const { dietsData, isLoading, error } = useGetAllDiets();

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {error ? (
          <p className="text-lg font-medium text-red-600">Error al cargar los datos del paciente</p>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-600">Cargando información...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <SharedSectionHeader
          role={role}
          Icon="diets"
          title={role === 'doctor' ? 'Gestion de Dietas' : 'Mis Dietas'}
          subtitle={
            role === 'doctor'
              ? 'Crea y personaliza planes nutricionales'
              : 'Planes nutricionales personalizados'
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dietsData && dietsData.length > 0 ? (
          dietsData.map((diet) =>
            role === 'doctor' ? (
              <DoctorDietCard diet={diet} key={diet._id} />
            ) : (
              <PatientDietCard diet={diet} key={diet._id} />
            )
          )
        ) : (
          // No diets message
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-semibold text-gray-700">No hay dietas registradas</p>

            {role === 'doctor' && (
              <p className="text-gray-500">Crea un nuevo plan nutricional para comenzar</p>
            )}

            {role === 'patient' && (
              <p className="text-gray-500">Todavía no tienes dietas asignadas</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
