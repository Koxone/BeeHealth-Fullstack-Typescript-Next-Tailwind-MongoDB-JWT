import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import DoctorPatientsList from './components/DoctorPatientsList';
import { UserData } from '@/lib/auth/getCurrentUser';

interface DoctorPatientsProps {
  currentUser: UserData | null;
  role?: string;
}

export const runtime = 'nodejs';

export default function DoctorPatients({ currentUser, role }: DoctorPatientsProps) {
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <GeneralSectionHeader
        Icon="pacientes"
        title="Mis Pacientes"
        subtitle="Gestiona tu lista de pacientes"
      />

      <DoctorPatientsList currentUser={currentUser} role={role} />
    </div>
  );
}
