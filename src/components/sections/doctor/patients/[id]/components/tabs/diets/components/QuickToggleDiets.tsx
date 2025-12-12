'use client';

import { useState } from 'react';
import { Utensils, Calendar, Clock, Power } from 'lucide-react';

// Custom hooks
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';

// Modal
import DietFeedbackModal from './modal/DietFeedbackModal';

// Types
import type { IDiet } from '@/models/Diet';

type DietWithId = IDiet & { _id: string };

type ComplianceStatus = 'pending' | 'completed' | 'partial' | 'not_completed';

export default function QuickToggleDiets({ patientId }: { patientId: string }) {
  const {
    dietsData,
    isLoading: dietsLoading,
    error: dietsError,
    refetch: refetchDiets,
  } = useGetAllDiets();

  // Filter diets by patient
  const dietsFiltered: DietWithId[] =
    (dietsData?.filter((diet) =>
      diet.patients?.some((p) => (p.patient as any)?._id === patientId)
    ) as unknown as DietWithId[]) || [];

  const [selectedDiet, setSelectedDiet] = useState<DietWithId | null>(null);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDietClick = (diet: DietWithId) => {
    setSelectedDiet(diet);
    setShowToggleModal(true);
  };

  const handleToggleDiet = async (_complianceData?: {
    status: ComplianceStatus;
    rating: number;
    doctorNotes: string;
  }) => {
    // Future: call API to toggle diet and save compliance
    // Example:
    // setIsProcessing(true);
    // await toggleDietMutation(selectedDiet?._id, _complianceData);
    // await refetchDiets();
    // setIsProcessing(false);

    setShowToggleModal(false);
    await refetchDiets();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (dietsLoading) {
    return <div className="text-sm text-gray-500">Cargando dietas...</div>;
  }

  if (dietsError) {
    return <div className="text-sm text-red-500">Error al cargar las dietas.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Assigned diets */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Dietas Activas</h3>
            <p className="text-sm text-gray-500">
              Click en una dieta para activar o desactivar del plan nutricional de este paciente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {dietsFiltered.map((diet) => (
            <div
              key={diet._id}
              className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
                diet.isActive
                  ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Diet info */}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 italic">{diet.name}</h4>
                  <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {diet.category}
                  </span>

                  {/* Meta info */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>
                        Asignada: {formatDate(diet.patients?.[0]?.assignedAt as unknown as string)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>
                        Tiempo activa:{' '}
                        {Math.floor(
                          (Date.now() -
                            new Date(
                              diet.patients?.[0]?.assignedAt as unknown as string
                            ).getTime()) /
                            86400000
                        )}{' '}
                        Días
                      </span>
                    </div>
                  </div>
                </div>

                {/* Power button */}
                <button
                  onClick={() => handleDietClick(diet)}
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                    diet.isActive
                      ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)]'
                      : 'bg-gray-300 shadow-md hover:bg-gray-400'
                  }`}
                >
                  <Power
                    className={`h-10 w-10 ${diet.isActive ? 'text-white' : 'text-gray-500'}`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle diet modal */}
      {showToggleModal && selectedDiet && (
        <DietFeedbackModal
          selectedDiet={selectedDiet}
          setShowToggleModal={setShowToggleModal}
          handleToggleDiet={handleToggleDiet}
          formatDate={formatDate}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
