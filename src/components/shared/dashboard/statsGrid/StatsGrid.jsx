'use client';

import StatsCard from './components/StatsCard';
import { employeeStats, patientStats } from './components/StatsData';
import { doctorStats as baseDoctorStats } from './components/StatsData';
import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';

export default function StatsGrid({ role }) {
  const { appointments, loading } = useTodayAppointmentsBySpecialty();

  const todaysAppointmentsNumber = appointments?.length || 0;

  const doctorStats = baseDoctorStats.map((item) => {
    if (item.Title === 'Citas de hoy') {
      return {
        ...item,
        MainData: loading ? '...' : todaysAppointmentsNumber.toString(),
        ExtraData: `${todaysAppointmentsNumber} este mes`,
      };
    }
    return item;
  });

  const stats = role === 'doctor' ? doctorStats : role === 'patient' ? patientStats : employeeStats;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {stats.map((item, index) => (
        <StatsCard
          key={index}
          Icon={item.Icon}
          MainData={item.MainData}
          ExtraData={item.ExtraData}
          Title={item.Title}
          variant={item.variant}
        />
      ))}
    </div>
  );
}
