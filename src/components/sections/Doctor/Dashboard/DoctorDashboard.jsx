'use client';

/* imports */
import { useState } from 'react'; // state
import { useRouter } from 'next/navigation'; // navigation
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
import { useAuthStore } from '@/Zustand/useAuthStore'; // auth

/* components */
import HeaderWelcome from './Components/HeaderWelcome';
import StatsGrid from './Components/StatsGrid';
import IncomeChart from './Components/IncomeChart';
import PatientsChart from './Components/PatientsChart';
import AppointmentsList from './Components/AppointmentsList';
import AccountingSummary from './Components/AccountingSummary';
import InventoryAlerts from './Components/InventoryAlerts';
import QuickActions from './Components/QuickActions';
import CancelAppointmentModal from './Components/CancelAppointmentModal';

/* demo data */
const ingresosSemanales = [
  { dia: 'Lun', ingresos: 3650 },
  { dia: 'Mar', ingresos: 3180 },
  { dia: 'Mié', ingresos: 4120 },
  { dia: 'Jue', ingresos: 3410 },
  { dia: 'Vie', ingresos: 4740 },
  { dia: 'Sáb', ingresos: 2720 },
  { dia: 'Hoy', ingresos: 3800 },
];

/* demo data */
const pacientesSemana = [
  { dia: 'Lun', pacientes: 5 },
  { dia: 'Mar', pacientes: 4 },
  { dia: 'Mié', pacientes: 6 },
  { dia: 'Jue', pacientes: 4 },
  { dia: 'Vie', pacientes: 7 },
  { dia: 'Sáb', pacientes: 3 },
  { dia: 'Hoy', pacientes: 5 },
];

/* helpers */
const getEstadoBadge = (estado) => {
  const badges = {
    Confirmada: 'bg-green-100 text-green-800 border-green-200',
    Pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Cancelada: 'bg-red-100 text-red-800 border-red-200',
  };
  return badges[estado] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export default function DoctorDashboard() {
  /* router */
  const router = useRouter();

  /* zustand */
  const { currentUser } = useAuthStore();

  /* ui state */
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [citaToCancel, setCitaToCancel] = useState(null);

  /* data state */
  const [citasHoy, setCitasHoy] = useState([
    {
      id: 1,
      hora: '09:00',
      paciente: 'Juan Pérez',
      tipo: 'Primera Consulta',
      estado: 'Confirmada',
      avatar: 'JP',
    },
    {
      id: 2,
      hora: '10:30',
      paciente: 'María López',
      tipo: 'Seguimiento',
      estado: 'Confirmada',
      avatar: 'ML',
    },
    {
      id: 3,
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Control de Peso',
      estado: 'Pendiente',
      avatar: 'CR',
    },
    {
      id: 4,
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Consulta General',
      estado: 'Confirmada',
      avatar: 'AM',
    },
    {
      id: 5,
      hora: '16:30',
      paciente: 'Pedro García',
      tipo: 'Seguimiento',
      estado: 'Confirmada',
      avatar: 'PG',
    },
  ]);

  /* data derived */
  const contabilidadHoy = {
    totalIngresos: 3800,
    consultas: 5,
    ingresosConsultas: 3200,
    medicamentosVendidos: 4,
    ingresosMedicamentos: 600,
    pendientesCobro: 800,
  };

  /* data derived */
  const inventarioAlertas = [
    { nombre: 'Atorvastatina 20mg', stock: 12, minimo: 15, tipo: 'medicamento' },
    { nombre: 'Omeprazol 20mg', stock: 8, minimo: 25, tipo: 'medicamento' },
    { nombre: 'Receta Especial', stock: 12, minimo: 15, tipo: 'receta' },
    { nombre: 'Alcohol 70%', stock: 8, minimo: 15, tipo: 'suministro' },
  ];

  /* actions */
  const handleReagendar = (cita) => {
    localStorage.setItem('reagendarCita', JSON.stringify(cita)); // persist
    router.push('/doctor/calendar'); // go
  };

  /* actions */
  const openCancelModal = (cita) => {
    setCitaToCancel(cita);
    setShowCancelModal(true);
  };

  /* actions */
  const handleCancelar = () => {
    setCitasHoy((prev) =>
      prev.map((c) => (c.id === citaToCancel.id ? { ...c, estado: 'Cancelada' } : c))
    );
    setShowCancelModal(false);
    setCitaToCancel(null);
  };

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* header */}
      <HeaderWelcome fullName={currentUser?.fullName} />

      {/* stats */}
      <StatsGrid
        totalIngresos={contabilidadHoy.totalIngresos}
        totalCitas={citasHoy.length}
        citasActivas={citasHoy.filter((c) => c.estado !== 'Cancelada').length}
        promedioPorPaciente={Number((contabilidadHoy.totalIngresos / citasHoy.length).toFixed(0))}
        inventarioAlertas={inventarioAlertas.length}
        onClickCitas={() => router.push('/doctor/calendar')}
        onClickContabilidad={() => router.push('/doctor/accounting')}
        onClickInventario={() => router.push('/doctor/inventory')}
      />

      {/* charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <IncomeChart data={ingresosSemanales} />
        <PatientsChart data={pacientesSemana} />
      </div>

      {/* appointments */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
          <button
            onClick={() => router.push('/doctor/calendar')}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
          >
            Ver calendario
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <AppointmentsList
          citas={citasHoy}
          onReagendar={handleReagendar}
          onCancelar={openCancelModal}
          getEstadoBadge={getEstadoBadge}
        />
      </div>

      {/* summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <AccountingSummary
          data={contabilidadHoy}
          onVerMas={() => router.push('/doctor/accounting')}
        />
        <InventoryAlerts
          items={inventarioAlertas}
          onVerMas={() => router.push('/doctor/inventory')}
        />
      </div>

      {/* quick actions */}
      {/* <QuickActions
        onPacientes={() => router.push('/doctor/patients')}
        onCalendario={() => router.push('/doctor/calendar')}
        onContabilidad={() => router.push('/doctor/accounting')}
        onInventario={() => router.push('/doctor/inventory')}
      /> */}

      {/* cancel modal */}
      {showCancelModal && citaToCancel && (
        <CancelAppointmentModal
          cita={citaToCancel}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelar}
        />
      )}
    </div>
  );
}
