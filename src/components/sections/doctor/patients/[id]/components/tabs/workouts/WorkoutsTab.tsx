import SharedAssignDiet from '@/components/shared/diets/SharedAssignDiet';
import DietsHistory from '../diets/components/DietsHistory';
import QuickToggleWorkouts from './components/QuickToggleWorkouts';
import WorkoutsHistory from './components/WorkoutsHistory';
import SharedAssignWorkout from '@/components/shared/workouts/SharedAssignWorkout';

export default function WorkoutsTab({ patientId, patientRecord, specialty }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickToggleWorkouts
        patientId={patientId}
        patientRecord={patientRecord}
        specialty={specialty}
      />

      {/* Assign Section */}
      <SharedAssignWorkout patientId={patientId} />

      {/* Workouts History */}
      <WorkoutsHistory patientId={patientId} />
    </div>
  );
}
