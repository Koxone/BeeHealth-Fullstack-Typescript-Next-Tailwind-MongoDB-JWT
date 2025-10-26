'use client';

import { ChevronRight } from 'lucide-react';

import HeaderWelcome from './components/doctor/HeaderWelcome';
import StatsGrid from './components/statsGrid/StatsGrid';
import DoctorIncomeChart from './components/doctor/DoctorIncomeChart';
import DoctorPatientsChart from './components/doctor/DoctorPatientsChart';
import AppointmentsList from './components/doctor/AppointmentsList';
import AccountingSummary from './components/doctor/AccountingSummary';
import InventoryAlerts from './components/doctor/InventoryAlerts';
import QuickActions from './components/doctor/QuickActions';
import CancelAppointmentModal from './components/doctor/CancelAppointmentModal';
import { usePathname } from 'next/navigation';
import PatientEvolutionChart from './components/patient/EvolutionChart';
import EmployeeWeekChart from './components/employee/WeekChart';

export default function GeneralDashboard() {
  const pathname = usePathname();

  const dashboardType = pathname.startsWith('/doctor')
    ? 'doctor'
    : pathname.startsWith('/patient')
      ? 'patient'
      : 'employee';
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName="Dr. Example" />

      {/* Stats */}
      <StatsGrid />

      {/* Charts section */}
      {dashboardType === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorIncomeChart data={[]} />
          <DoctorPatientsChart data={[]} />
        </div>
      )}

      {dashboardType === 'patient' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-1">
          <PatientEvolutionChart />
        </div>
      )}

      {dashboardType === 'employee' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <EmployeeWeekChart />
          <InventoryAlerts />
        </div>
      )}

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
