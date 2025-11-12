'use client';

import EmployeeStatsCard from './EmployeeStatsCard';
import { useGetFullInventory } from '@/hooks/useGetFullInventory';
import { Calendar, DollarSign, FileText, TriangleAlert } from 'lucide-react';
import { useAllTodayAppointments } from '@/hooks/useAllTodayAppointments';

export default function EmployeeStatsGrid({ role }) {
  // Appointments Today logic
  const { appointments } = useAllTodayAppointments();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Calendar,
          mainData: todaysAppointmentsNumber,
          extraData: 'Hoy',
          title: 'Citas Programadas',
          variant: 'primary',
        },
        {
          Icon: DollarSign,
          mainData: '$1,200.00',
          title: 'Venta de Medicamentos',
          variant: 'success',
        },
        {
          Icon: FileText,
          mainData: '$1,000.00',
          title: 'Consultas Hoy',
          variant: 'purple',
        },
        {
          Icon: TriangleAlert,
          mainData: totalAlerts,
          extraData: 'Revisar',
          title: 'Alertas de Inventario',
          variant: 'danger',
        },
      ].map((card, index) => (
        <EmployeeStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          mainData={card.mainData}
          extraData={card.extraData}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
