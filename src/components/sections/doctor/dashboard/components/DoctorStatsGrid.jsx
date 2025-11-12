'use client';

import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/useGetFullInventory';
import { Users, DollarSign, AlertTriangle, Activity, Pill } from 'lucide-react';
import DoctorStatsCard from './DoctorStatsCard';

export default function DoctorStatsGrid({ role }) {
  // Appointments Today logic
  const { appointments, loading } = useTodayAppointmentsBySpecialty();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: DollarSign,
          mainData: '$1,500.00',
          extraData: 'Hoy',
          title: 'Ingresos de Hoy',
          variant: 'primary',
        },
        {
          Icon: Users,
          mainData: todaysAppointmentsNumber,
          extraData: 'Hoy',
          title: 'Citas Programadas',
          variant: 'success',
          href: '/doctor/calendar',
        },
        {
          Icon: Pill,
          mainData: '$500.00',
          extraData: 'Hoy',
          title: 'Venta de Medicamentos',
          variant: 'purple',
        },
        {
          Icon: AlertTriangle,
          mainData: totalAlerts,
          extraData: 'Revisar',
          title: 'Alertas de Inventario',
          variant: 'danger',
          href: '/doctor/inventory',
        },
      ].map((card, index) => (
        <DoctorStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
