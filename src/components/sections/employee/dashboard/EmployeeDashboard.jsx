import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import StatsGrid from '@/components/shared/dashboard/statsGrid/StatsGrid';
import AppointmentsToday from '@/components/shared/dashboard/appointmentsToday/AppointmentsToday';
import GeneralInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/GeneralInventoryAlerts';

export default function EmployeeDashboard({ currentUser }) {
  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="employee" />

      {/* Stats */}
      <StatsGrid role="employee" />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <AppointmentsToday />
        <GeneralInventoryAlerts />
      </div>
    </DashboardLayout>
  );
}
