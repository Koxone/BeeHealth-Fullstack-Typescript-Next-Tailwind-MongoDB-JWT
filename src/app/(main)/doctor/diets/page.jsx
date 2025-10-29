import React from 'react';
import GeneralDiets from '@/components/general/diets/GeneralDiets';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorDietsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <GeneralDiets role={role} />
    </div>
  );
}
