import PatientsSearchBar from '@/components/general/patients/components/PatientsSearchBar';
import PatientsList from '@/components/general/patients/components/PatientsList';
import GeneralSectionHeader from '../../shared/sections/GeneralSectionHeader';

export default async function GeneralPatients({ role, currentUser }) {
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <GeneralSectionHeader
        role={role}
        Icon="pacientes"
        title="Pacientes"
        subtitle="Gestiona tu lista de pacientes"
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <PatientsList />
    </div>
  );
}
