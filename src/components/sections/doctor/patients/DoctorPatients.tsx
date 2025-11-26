import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import DoctorPatientsList from './components/DoctorPatientsList';
import { UserData } from '@/lib/auth/getCurrentUser';

interface DoctorPatientsProps {
  currentUser: UserData | null;
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
      />

      <DoctorPatientsList currentUser={currentUser} role={role} />
    </div>
  );
}
