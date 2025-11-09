import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

import Sidebar from '@/components/shared/nav/sidebar/SideBar';
import Header from '@/components/shared/nav/header/Header';
import ServerRoleGuard from '@/components/sections/auth/ServerRoleGuard';

export const runtime = 'nodejs';

export const metadata = {
  title: 'MedTrack',
  description: 'Medical management platform',
};

export default async function MainRootLayout({ children }) {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;
  console.log(role);

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let type = 'guest';

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      type = decoded.role || 'guest';
    } catch (error) {
      console.error('JWT verify error:', error);
      type = 'guest';
    }
  }
  return (
    <ServerRoleGuard allowedRoles={['doctor', 'employee', 'patient']}>
      <div>
        <div className="grid grid-rows-[auto_1fr]">
          <Header type={type} />
          <main className="grid grid-cols-[auto_1fr]">
            <Sidebar currentUser={currentUser} role={role} specialty={specialty} />
            <div className="mx-auto min-h-screen w-full max-w-7xl overflow-y-auto p-6 pb-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ServerRoleGuard>
  );
}
