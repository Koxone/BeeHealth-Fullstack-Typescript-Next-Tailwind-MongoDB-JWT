'use client';

import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { Loader2 } from 'lucide-react';
import DoctorDietCard from '@/components/sections/doctor/diets/components/DoctorDietCard';
import LoadingState from '@/components/shared/feedback/LoadingState';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import { useEffect } from 'react';

export default function DoctorDiets({ role }) {
  // Fetch all diets
  const { dietsData, isLoading, error, refetch } = useGetAllDiets();

  // Loading
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 md:space-y-6">
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
          dietsData.map((diet) => <DoctorDietCard diet={diet} key={diet._id} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-semibold text-gray-700">No hay dietas registradas</p>

            <p className="text-gray-500">Crea un nuevo plan nutricional para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}
