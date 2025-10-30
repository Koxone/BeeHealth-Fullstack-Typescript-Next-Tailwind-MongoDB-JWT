import GeneralDashboard from '@/components/general/dashboard/GeneralDashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <GeneralDashboard role={role} currentUser={currentUser} />
    </div>
  );
}
