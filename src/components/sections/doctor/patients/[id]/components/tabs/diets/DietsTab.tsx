import DietsHistory from '../diets/components/DietsHistory';
import QuickToggleDiets from './components/modal/quick-toggle-diets/QuickToggleDiets';
import AssignDietToPatient from '@/components/shared/diets/AssignDietToPatient';

export default function DietsTab({ patientId }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickToggleDiets patientId={patientId} />

      {/* Assign Section */}
      <AssignDietToPatient patientId={patientId} />

      {/* Diets Tab */}
      <DietsHistory />
    </div>
  );
}
