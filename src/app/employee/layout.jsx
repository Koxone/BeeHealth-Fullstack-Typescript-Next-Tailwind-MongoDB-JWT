'use client';

import RoleGuard from '@/components/General/Auth/RoleGuard';
import Header from '../../components/General/Nav/Header';
import Sidebar from '../../components/General/Nav/Sidebar';
import useAuthStore from '@/Zustand/useAuthStore';

export default function EmployeeLayout({ children }) {
  const { currentUser, logout } = useAuthStore();
  return (
    <RoleGuard allowedRoles={['employee', 'medic']}>
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
