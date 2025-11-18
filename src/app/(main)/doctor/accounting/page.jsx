import DoctorAccounting from '@/components/sections/doctor/accounting/DoctorAccounting';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorAccountingPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorAccounting role={role} specialty={specialty} />
    </div>
  );
}
