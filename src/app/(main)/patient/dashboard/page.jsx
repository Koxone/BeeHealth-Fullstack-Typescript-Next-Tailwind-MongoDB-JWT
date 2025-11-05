import PatientDashboard from '@/components/sections/patient/dashboard/PatientDashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div>
      <PatientDashboard currentUser={currentUser} />
    </div>
  );
}
