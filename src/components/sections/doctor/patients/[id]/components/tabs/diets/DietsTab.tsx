import { useState } from 'react';

import DietsHistory from '../diets/components/DietsHistory';
import QuickToggleDiets from './components/modal/quick-toggle-diets/QuickToggleDiets';
import AssignDietToPatient from '@/components/shared/diets/AssignDietToPatient';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';

export default function DietsTab({ patientId }) {
  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickToggleDiets patientId={patientId} />

      {/* Assign Section */}
      <AssignDietToPatient patientId={patientId} setShowSuccessModal={setShowSuccessModal} />

      {/* Diets Tab */}
      <DietsHistory patientId={patientId} />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          message="La dieta ha sido asignada exitosamente al paciente."
          title="Dieta asignada correctamente"
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
        />
      )}
    </div>
  );
}
