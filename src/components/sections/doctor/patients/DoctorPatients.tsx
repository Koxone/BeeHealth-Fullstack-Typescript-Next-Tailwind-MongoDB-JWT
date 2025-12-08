import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import DoctorPatientsList from './components/DoctorPatientsList';
import { CurrentUserData } from '@/types/user/user.types'; 

interface DoctorPatientsProps {
  currentUser: CurrentUserData | null;
  role?: 'doctor' | 'patient' | 'employee' | 'admin';
}

export const runtime = 'nodejs';

export default function DoctorPatients({ currentUser, role }: DoctorPatientsProps) {
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <SharedSectionHeader
        Icon="pacientes"
        newPatient={true}
        role={role}
        title="Mis Pacientes"
        subtitle="Gestiona tu lista de pacientes"
        specialty={currentUser?.specialty}
      />

      <DoctorPatientsList currentUser={currentUser} role={role} />
    </div>
  );
}
