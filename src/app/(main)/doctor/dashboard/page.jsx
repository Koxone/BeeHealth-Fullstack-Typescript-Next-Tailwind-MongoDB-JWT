import DoctorDashboard from '@/components/sections/doctor/dashboard/DoctorDashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorDashboard currentUser={currentUser} role={role} specialty={specialty} />
    </div>
  );
}
