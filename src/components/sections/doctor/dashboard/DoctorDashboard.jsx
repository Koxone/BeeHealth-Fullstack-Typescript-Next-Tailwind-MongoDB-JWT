'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/dashboard/appointmentsToday/AppointmentsToday';
import DoctorAccountingSummary from '@/components/sections/doctor/dashboard/components/DoctorAccountingSummary';
import DoctorIncomeChart from '@/components/sections/doctor/dashboard/components/DoctorIncomeChart';
import DoctorPatientsChart from '@/components/sections/doctor/dashboard/components/DoctorPatientsChart';
import StatsGrid from '@/components/shared/dashboard/statsGrid/StatsGrid';
import GeneralInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/GeneralInventoryAlerts';
import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';

export default function DoctorDashboard({ currentUser }) {
  // Google Calendar Custom Hooks
  const { appointments, loading, error } = useTodayAppointmentsBySpecialty();

  const todaysAppointmentsNumber = appointments?.length;

  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="doctor" />

      {/* Stats */}
      <StatsGrid role="doctor" />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorIncomeChart data={[]} />
        <DoctorPatientsChart data={[]} />
      </div>

      {/* Appointments */}
      <AppointmentsToday appointments={appointments} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary />
        <GeneralInventoryAlerts />
      </div>
    </DashboardLayout>
  );
}
