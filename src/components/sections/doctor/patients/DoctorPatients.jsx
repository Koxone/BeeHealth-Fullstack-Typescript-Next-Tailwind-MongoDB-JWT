import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';
import DoctorPatientsList from './components/DoctorPatientsList';

export default function DoctorPatients({ currentUser, role }) {
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <GeneralSectionHeader
        Icon="pacientes"
        title="Mis Pacientes"
        subtitle="Gestiona tu lista de pacientes"
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <DoctorPatientsList currentUser={currentUser} role={role} />
    </div>
  );
}
