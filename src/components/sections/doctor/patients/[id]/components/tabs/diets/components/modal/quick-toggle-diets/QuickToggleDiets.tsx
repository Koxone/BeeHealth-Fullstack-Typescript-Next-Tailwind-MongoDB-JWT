'use client';

import { useState } from 'react';
import { Utensils } from 'lucide-react';
import ToggleDietCard from './components/ToggleDietCard';

// Custom hooks
import { useGetAllDietsFromPatient } from '@/hooks/diets/get/useGetAllDietsFromPatient';

// Feedback Components
import DietFeedbackModal from '../DietFeedbackModal';

// Types
import type { IDiet } from '@/models/Diet';

type DietWithId = IDiet & { _id: string };

type ComplianceStatus = 'pending' | 'completed' | 'partial' | 'not_completed';

export default function QuickToggleDiets({ patientId }: { patientId: string }) {
  // Fetch all diets with Custom Hook
  const {
    dietsData,
    isLoading: dietsLoading,
    error: dietsError,
    refetch: refetchDiets,
  } = useGetAllDietsFromPatient(patientId);

  const [selectedDiet, setSelectedDiet] = useState<DietWithId | null>(null);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle diet click
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

  // Loading State
  if (dietsLoading) {
    return <div className="text-sm text-gray-500">Cargando dietas...</div>;
  }

  // Error State
  if (dietsError) {
    return <div className="text-sm text-red-500">Error al cargar las dietas.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Assigned diets */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
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

        {/* Diet Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {dietsData?.map((diet) => (
            <ToggleDietCard
              key={diet?._id}
              diet={diet}
              handleDietClick={handleDietClick}
              patientId={patientId}
            />
          ))}
        </div>
      </div>

      {/* Toggle diet modal */}
      {showToggleModal && selectedDiet && (
        <DietFeedbackModal
          selectedDiet={selectedDiet}
          setShowToggleModal={setShowToggleModal}
          handleToggleDiet={handleToggleDiet}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
