import { useState } from 'react';

import DietsHistory from '../diets/components/DietsHistory';
import QuickToggleDiets from './components/modal/quick-toggle-diets/QuickToggleDiets';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';

export default function DietsTab({
  patientId,
  userData,
  refetchDiets,
  dietsData,
  dietsLoading,
  dietsError,
  events,
  timelineLoading,
  timelineError,
}: {
  patientId: string;
  userData: any;
  refetchDiets: () => void;
  dietsData: any;
  dietsLoading: boolean;
  dietsError: any;
  events: any;
  timelineLoading: boolean;
  timelineError: any;
}) {
  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successTitle, setSuccessTitle] = useState<string>('Dieta asignada correctamente');
  const [successMessage, setSuccessMessage] = useState<string>(
    'La dieta ha sido asignada exitosamente al paciente.'
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickToggleDiets
        patientId={patientId}
        userData={userData}
        setShowSuccessModal={setShowSuccessModal}
        setSuccessTitle={setSuccessTitle}
        setSuccessMessage={setSuccessMessage}
        refetchDiets={refetchDiets}
        dietsData={dietsData}
        dietsLoading={dietsLoading}
        dietsError={dietsError}
      />

      {/* Assign Section */}
      {/* <AssignDietToPatient patientId={patientId} setShowSuccessModal={setShowSuccessModal} /> */}

      {/* Diets Tab */}
      <DietsHistory
        events={events}
        timelineLoading={timelineLoading}
        timelineError={timelineError}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title={successTitle}
          message={successMessage}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
