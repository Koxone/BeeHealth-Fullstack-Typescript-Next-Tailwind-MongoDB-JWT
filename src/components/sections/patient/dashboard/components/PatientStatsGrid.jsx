'use client';

import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/useGetFullInventory';
import {
  Users,
  DollarSign,
  AlertTriangle,
  Activity,
  Calendar,
  Weight,
  TrendingDown,
  Clock,
  FileText,
  Ruler,
} from 'lucide-react';
import PatientStatsCard from './PatientStatsCard';

export default function PatientStatsGrid({ role }) {
  // Hooks
  const { appointments, loading } = useTodayAppointmentsBySpecialty();
  const todaysAppointmentsNumber = appointments?.length || 0;

  const { inventory, loading: loadingInventory, error: errorInventory } = useGetFullInventory();

  // Alerts logic
  const criticalItems = inventory.filter((i) => i.quantity < i.minStock);
  const lowItems = inventory.filter((i) => i.quantity === i.minStock);
  const totalAlerts = criticalItems.length + lowItems.length;

  // Mock Data
  const pendingAppointments = 3;
  const completedConsults = 5;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: '70kg',
          extraData: 'Actual',
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Activity,
          mainData: '22.8',
          title: 'IMC Actual',
          variant: 'success',
        },
        {
          Icon: Ruler,
          mainData: '100cm',
          extraData: '+12%',
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: '+2.4kg',
          extraData: 'Este mes',
          title: 'Progreso',
          variant: 'purple',
        },
      ].map((card, index) => (
        <PatientStatsCard
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
