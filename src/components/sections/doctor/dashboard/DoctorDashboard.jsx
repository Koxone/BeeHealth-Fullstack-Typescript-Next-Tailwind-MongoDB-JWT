'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/dashboard/appointmentsToday/AppointmentsToday';
import DoctorAccountingSummary from '@/components/sections/doctor/dashboard/components/DoctorAccountingSummary';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/useGetFullInventory';
import DoctorStatsGrid from './components/DoctorStatsGrid';

export default function DoctorDashboard({ currentUser }) {
  // Google Calendar Custom Hooks
  const { appointments, loading, error } = useTodayAppointmentsBySpecialty();

  // Custom Hooks
  const {
    inventory,
    loading: loadingInventory,
    error: errorInventory,
    setInventory,
  } = useGetFullInventory();

  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="doctor" />

      {/* Stats */}
      <DoctorStatsGrid role="doctor" />

      {/* Appointments */}
      <AppointmentsToday role={currentUser?.role} appointments={appointments} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary />
        <SharedInventoryAlerts inventory={inventory} role={currentUser?.role} />
      </div>
    </DashboardLayout>
  );
}
