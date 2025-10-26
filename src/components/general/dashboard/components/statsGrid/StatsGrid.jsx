'use client';

import { usePathname } from 'next/navigation';
import StatsCard from './components/StatsCard';
import { doctorStats, employeeStats, patientStats } from './components/StatsData';

export default function StatsGrid() {
  const pathname = usePathname();

  const stats = pathname.startsWith('/doctor')
    ? doctorStats
    : pathname.startsWith('/patient')
      ? patientStats
      : employeeStats;
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
