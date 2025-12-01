'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import PatientEvolutionChart from './components/PatientEvolutionChart';
import PatientMotivationalBanner from './components/PatientMotivationalBanner';
import PatientStatsGrid from './components/PatientStatsGrid';
import { useGetAllClinicalRecords } from '@/hooks/clinicalRecords/get/useGetAllClinicalRecords';

export default function PatientDashboard({ currentUser }) {
  // Fetch clinical records for the patient
  const { data } = useGetAllClinicalRecords({ patient: currentUser?.id });
  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="patient" />

      {/* Stats */}
      <PatientStatsGrid role="patient" currentUser={currentUser} />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <PatientEvolutionChart
          data={data}
          loading={!data}
          keyAnswer="7"
          title="Evolución del Peso"
          legendLabel="Peso"
          legendColor="#3b82f6"
          unit="kg"
          stroke="#3b82f6"
        />
        <PatientMotivationalBanner />
      </div>
    </DashboardLayout>
  );
}
