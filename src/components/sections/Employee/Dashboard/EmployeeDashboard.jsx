'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { citasHoyData, consultasSemanales, alertasInventarioPreset } from './Components/mockData';

import StatsCards from './Components/StatsCards';
import WeekChart from './Components/WeekChart';
import InventoryAlerts from './Components/InventoryAlerts';
import AppointmentsToday from './Components/AppointmentsToday';
import QuickActions from './Components/QuickActions';

export default function EmployeeDashboard() {
  // state
  const router = useRouter();
  const [citasHoy, setCitasHoy] = useState(citasHoyData);
  const alertasInventario = alertasInventarioPreset;

  // handlers
  const handleConfirmar = (id) => {
    setCitasHoy((prev) => prev.map((c) => (c.id === id ? { ...c, estado: 'Confirmada' } : c)));
  };

  // ui
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* header */}
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Panel de Recepción</h1>
        <p className="text-sm text-gray-600 md:text-base">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* stats */}
      <StatsCards
        citasHoy={citasHoy}
        alertasInventario={alertasInventario}
        onGoAppointments={() => router.push('/employee/appointments')}
        onGoConsultations={() => router.push('/employee/consultations')}
        onGoInventory={() => router.push('/employee/inventory')}
      />

      {/* chart and alerts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <WeekChart data={consultasSemanales} />
        <InventoryAlerts
          items={alertasInventario}
          onViewMore={() => router.push('/employee/inventory')}
        />
      </div>

      {/* today appointments */}
      <AppointmentsToday
        citas={citasHoy}
        onConfirm={handleConfirmar}
        onViewAll={() => router.push('/employee/appointments')}
      />

      {/* quick actions */}
      <QuickActions
        onGoAppointments={() => router.push('/employee/appointments')}
        onGoConsultations={() => router.push('/employee/consultations')}
        onGoInventory={() => router.push('/employee/inventory')}
        onGoPatients={() => router.push('/employee/patients')}
      />
    </div>
  );
}
