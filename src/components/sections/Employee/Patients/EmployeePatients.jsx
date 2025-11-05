import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import EmployeePatientsList from './components/EmployeePatientsList';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';

export default function EmployeePatients({ currentUser, role }) {
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <GeneralSectionHeader
        Icon="pacientes"
        title="Pacientes"
        subtitle="Lista de todos los pacientes de la clínica"
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <EmployeePatientsList currentUser={currentUser} role={role} />
    </div>
  );
}
