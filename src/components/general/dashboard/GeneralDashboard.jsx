// Client Side Components
import DoctorIncomeChart from './components/doctor/DoctorIncomeChart';
import DoctorPatientsChart from './components/doctor/DoctorPatientsChart';
import PatientEvolutionChart from './components/patient/PatientEvolutionChart';

// Server Side Components
import HeaderWelcome from './components/general/HeaderWelcome';
import StatsGrid from './components/statsGrid/StatsGrid';
import AppointmentsToday from './components/general/AppointmentsToday';
import DoctorAccountingSummary from './components/doctor/DoctorAccountingSummary';
import GeneralInventoryAlerts from './components/general/InventoryAlerts/GeneralInventoryAlerts';
import CancelAppointmentModal from './components/general/CancelAppointmentModal';
import PatientMotivationalBanner from './components/patient/PatientMotivationalBanner';

export default function GeneralDashboard({ role, currentUser }) {
  // Debug Logs
  console.log('Usuario:', currentUser?.fullName);
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
          <DoctorAccountingSummary role={role} />
          <GeneralInventoryAlerts role={role} />
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
          <GeneralInventoryAlerts role={role} />
        </div>
      )}

      {/* Cancel modal */}
      {/* <CancelAppointmentModal /> */}
    </div>
  );
}
