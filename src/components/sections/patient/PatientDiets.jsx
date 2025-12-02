'use client';

import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { Loader2 } from 'lucide-react';
import PatientDietCard from '@/components/sections/patient/diets/components/PatientDietCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

export default function PatientDiets({ role, currentUser }) {
  // Fetch diets
  const { dietsData, isLoading, error } = useGetAllDiets();

  const filteredDiets = dietsData?.filter((diet) =>
    diet?.patients?.some((p) => p?.patient?._id === currentUser?.id)
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {error ? (
          <p className="text-lg font-medium text-red-600">Error al cargar tus dietas</p>
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
      {/* Header block */}
      <SharedSectionHeader
        role="patient"
        Icon="diets"
        title="Mis Dietas"
        subtitle="Planes nutricionales personalizados"
      />

      {/* Content block */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDiets && filteredDiets.length > 0 ? (
          filteredDiets.map((diet) => <PatientDietCard diet={diet} key={diet._id} />)
        ) : (
          // Empty state block
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Todavía no tienes dietas asignadas
            </p>
            <p className="text-gray-500">Tu médico añadirá tus planes cuando estén listos</p>
          </div>
        )}
      </div>
    </div>
  );
}
