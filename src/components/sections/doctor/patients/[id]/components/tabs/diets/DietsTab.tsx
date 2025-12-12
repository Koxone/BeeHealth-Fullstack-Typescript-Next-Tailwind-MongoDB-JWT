import SharedAssignDiet from '@/components/shared/diets/SharedAssignDiet';
import DietsHistory from '../diets/components/DietsHistory';
import QuickToggleDiets from './components/QuickToggleDiets';
import AssignDietToPatient from '@/components/shared/diets/AssignDietToPatient';

export default function DietsTab({ patientId, patientRecord, specialty }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickToggleDiets patientId={patientId} />

      {/* Assign Section */}
      <AssignDietToPatient />

      {/* Diets Tab */}
      <DietsHistory />
    </div>
  );
}
