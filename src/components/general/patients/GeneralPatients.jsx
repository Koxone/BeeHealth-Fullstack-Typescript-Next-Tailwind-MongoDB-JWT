import PatientsSearchBar from '@/components/general/patients/components/PatientsSearchBar';
import PatientsHeader from '@/components/general/patients/components/PatientsHeader';
import PatientsList from '@/components/general/patients/components/PatientsList';

export default function GeneralPatients() {
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <PatientsHeader />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <PatientsList />
    </div>
  );
}
