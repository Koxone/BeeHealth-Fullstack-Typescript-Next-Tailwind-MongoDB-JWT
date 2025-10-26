'use client';

import {
  Users,
  DollarSign,
  AlertTriangle,
  Activity,
  ChevronRight,
  Clock,
  FileText,
  User,
  AlertCircle,
  Package,
  Calendar,
} from 'lucide-react';

import HeaderWelcome from './components/HeaderWelcome';
import StatsGrid from './components/statsGrid/StatsGrid';
import IncomeChart from './components/IncomeChart';
import PatientsChart from './components/PatientsChart';
import AppointmentsList from './components/AppointmentsList';
import AccountingSummary from './components/AccountingSummary';
import InventoryAlerts from './components/InventoryAlerts';
import QuickActions from './components/QuickActions';
import CancelAppointmentModal from './components/CancelAppointmentModal';
import { usePathname } from 'next/navigation';

export default function GeneralDashboard() {
  const pathname = usePathname();
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName="Dr. Example" />

      {/* Stats */}
      <StatsGrid />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <IncomeChart data={[]} />
        <PatientsChart data={[]} />
      </div>

      {/* Appointments */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95">
            Ver calendario
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <AppointmentsList />
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <AccountingSummary />
        <InventoryAlerts />
      </div>

      {/* Cancel modal */}
      {/* <CancelAppointmentModal /> */}
    </div>
  );
}
