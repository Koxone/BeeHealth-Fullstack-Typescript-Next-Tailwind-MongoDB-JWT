'use client';

import Sidebar from '../../components/General/Nav/Sidebar';
import Header from '../../components/General/Nav/Header';
import useAuthStore from '@/Zustand/useAuthStore';
import RoleGuard from '@/components/General/Auth/RoleGuard';

export default function DoctorLayout({ children }) {
  const { currentUser } = useAuthStore();

  return (
    <RoleGuard allowedRoles={['medic', 'admin']}>
      <div className="min-h-screen bg-gray-50">
        <Header role={currentUser?.role} />
        <div className="flex">
          <Sidebar role={currentUser?.role} />
          <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
