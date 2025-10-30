import UserProfile from '@/components/general/profile/UserProfile';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function PatientProfilePage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <UserProfile role={role} currentUser={currentUser} />
    </div>
  );
}
