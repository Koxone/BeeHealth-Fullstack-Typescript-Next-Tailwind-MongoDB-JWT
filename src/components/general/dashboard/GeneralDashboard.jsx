import HeaderWelcome from './components/general/HeaderWelcome';
import StatsGrid from './components/statsGrid/StatsGrid';
import DoctorIncomeChart from './components/doctor/DoctorIncomeChart';
import DoctorPatientsChart from './components/doctor/DoctorPatientsChart';
import AppointmentsToday from './components/general/AppointmentsToday';
import DoctorAccountingSummary from './components/doctor/DoctorAccountingSummary';
import InventoryAlerts from './components/general/InventoryAlerts/InventoryAlerts';
import CancelAppointmentModal from './components/general/CancelAppointmentModal';
import PatientEvolutionChart from './components/patient/PatientEvolutionChart';
import PatientMotivationalBanner from './components/patient/PatientMotivationalBanner';

export default function GeneralDashboard({ role, currentUser }) {
  console.log('Usuario:', currentUser);
  console.log(role);
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role={role} />

      {/* Stats */}
      <StatsGrid role={role} />

      {/* Doctor Charts */}
      {role === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorIncomeChart data={[]} />
          <DoctorPatientsChart data={[]} />
        </div>
      )}

      {/* Doctor Appointments */}
      {role === 'doctor' && <AppointmentsToday />}

      {/* Doctor Summaries */}
      {role === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorAccountingSummary />
          <InventoryAlerts />
        </div>
      )}

      {/* Patient */}
      {role === 'patient' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-1">
          {/* Chart */}
          <PatientEvolutionChart />

          {/* Motivational Banner */}
          <PatientMotivationalBanner />
        </div>
      )}

      {/* Employee */}
      {role === 'employee' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <AppointmentsToday />
          <InventoryAlerts />
        </div>
      )}

      {/* Cancel modal */}
      {/* <CancelAppointmentModal /> */}
    </div>
  );
}
