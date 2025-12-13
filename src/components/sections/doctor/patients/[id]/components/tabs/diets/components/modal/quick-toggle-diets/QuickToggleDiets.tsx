import { useState } from 'react';
import { Utensils } from 'lucide-react';
import ToggleDietCard from './components/ToggleDietCard';

// Feedback Components
import DietFeedbackModal from '../DietFeedbackModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

// Types
import { UserDiet } from '@/types/diet/diet.types';
import { ComplianceStatus } from '@/types/diet/diet.types';

export default function QuickToggleDiets({
  patientId,
  userData,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  refetchDiets,
  dietsData,
  dietsLoading,
  dietsError,
}: {
  patientId: string;
  userData: any;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  refetchDiets: () => void;
  dietsData: UserDiet[];
  dietsLoading: boolean;
  dietsError: any;
}) {
  const [selectedDiet, setSelectedDiet] = useState<UserDiet | null>(null);
  const [showToggleModal, setShowToggleModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Handle diet click
  const handleDietClick = (diet: UserDiet) => {
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
    return <LoadingState />;
  }

  // Error State
  if (dietsError) {
    return <ErrorState />;
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
          userData={userData}
          setShowToggleModal={setShowToggleModal}
          handleToggleDiet={handleToggleDiet}
          isProcessing={isProcessing}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessTitle={setSuccessTitle}
          setSuccessMessage={setSuccessMessage}
          refetchDiets={refetchDiets}
        />
      )}
    </div>
  );
}
