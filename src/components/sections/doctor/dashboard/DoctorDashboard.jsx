'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/dashboard/appointmentsToday/AppointmentsToday';
import DoctorAccountingSummary from '@/components/sections/doctor/dashboard/components/DoctorAccountingSummary';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { useTodayAppointmentsBySpecialty } from '@/hooks/appointments/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import DoctorStatsGrid from './components/DoctorStatsGrid';
import { getConsultTotals } from '../../employee/consultations/utils/getConsultTotals';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';
import { Loader2 } from 'lucide-react';

export default function DoctorDashboard({ currentUser, role, specialty }) {
  // Google Calendar Custom Hooks
  const { appointments, loading, error } = useTodayAppointmentsBySpecialty();

  // Custom Hooks
  const {
    inventory,
    loading: loadingInventory,
    error: errorInventory,
    setInventory,
  } = useGetFullInventory();

  // All Consults
  const {
    consults,
    loading: loadingConsults,
    error: errorConsults,
  } = useGetAllConsults({ speciality: specialty });

  const { consultPrice, totalItemsSold, totalCost } = getConsultTotals(consults);

  if (loading || loadingInventory || loadingConsults) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {error ? (
          <p className="text-lg font-medium text-red-600">Error al cargar los datos del paciente</p>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-600">Cargando información...</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="doctor" />

      {/* Stats */}
      <DoctorStatsGrid role="doctor" specialty={specialty} />

      {/* Appointments */}
      <AppointmentsToday role={currentUser?.role} appointments={appointments} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary
          role={role}
          consultPrice={consultPrice}
          totalItemsSold={totalItemsSold}
          totalCost={totalCost}
          consults={consults}
        />
        <SharedInventoryAlerts
          inventory={inventory}
          role={currentUser?.role}
          loading={loadingInventory}
        />
      </div>
    </DashboardLayout>
  );
}
