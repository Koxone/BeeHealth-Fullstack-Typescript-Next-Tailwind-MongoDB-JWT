'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/Zustand/useAuthStore';

export default function RoleGuard({ allowedRoles = [], children }) {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // evita ejecutar lógica antes de que Zustand haya cargado datos del storage
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return; // espera a que termine la hidratación

    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      if (currentUser.role === 'patient') router.push('/patient/dashboard');
      else if (currentUser.role === 'medic') router.push('/doctor/dashboard');
      else if (currentUser.role === 'employee') router.push('/employee/dashboard');
      else router.push('/');
    }
  }, [isHydrated, currentUser, router, allowedRoles]);

  if (!isHydrated) return null; // no renderiza nada hasta hidratarse
  if (!currentUser) return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) return null;

  return children;
}
