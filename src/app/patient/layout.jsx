'use client';

import Sidebar from '../sections/global/Sidebar';
import Header from '../sections/global/Header';
import { useAuthStore } from '@/Zustand/useAuthStore';

export default function PatientLayout({ children }) {
  const { currentUser, logout } = useAuthStore();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={currentUser?.role} />
      <div className="flex flex-1 flex-col">
        <Header userName={currentUser?.fullName} role={currentUser?.role} />
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">{children}</main>
      </div>
    </div>
  );
}
