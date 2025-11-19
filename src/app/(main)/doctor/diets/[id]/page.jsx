import DoctorDietDetail from '@/components/sections/doctor/diets/[id]/DoctorDietDetail';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import React from 'react';
export const runtime = 'nodejs';

export default async function DoctorDietsIDPage({ params }) {
  // Get current User info
  const currentUser = await getCurrentUser();
  const specialty = currentUser?.specialty;
  const role = currentUser?.role;
  const newParams = await params;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorDietDetail params={newParams} role={role} specialty={specialty} />
    </div>
  );
}
