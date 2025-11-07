import DoctorDietDetail from '@/components/sections/doctor/diets/[id]/DoctorDietDetail';
import React from 'react';

export default async function DoctorDietsIDPage({ params }) {
  const newParams = await params;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorDietDetail params={newParams} />
    </div>
  );
}
