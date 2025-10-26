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
} from 'lucide-react';

/* Doctor dashboard cards */
export const doctorStats = [
  {
    Icon: DollarSign,
    MainData: '$3,800',
    ExtraData: 'Hoy',
    Title: 'Ingresos totales',
    variant: 'primary',
  },
  {
    Icon: Users,
    MainData: '0',
    ExtraData: '0 este mes',
    Title: 'Citas de hoy',
    variant: 'success',
  },
  {
    Icon: Activity,
    MainData: '$760',
    ExtraData: '+12%',
    Title: 'Promedio/paciente',
    variant: 'purple',
  },
  {
    Icon: AlertTriangle,
    MainData: '4',
    ExtraData: 'Revisar',
    Title: 'Alertas inventario',
    variant: 'danger',
  },
];

/* Patient dashboard cards */
export const patientStats = [
  {
    Icon: Weight,
    MainData: '72 kg',
    ExtraData: 'Actual',
    Title: 'Peso Actual',
    variant: 'primary',
  },
  {
    Icon: Activity,
    MainData: '22.8',
    ExtraData: 'Normal',
    Title: 'IMC Actual',
    variant: 'success',
  },
  {
    Icon: TrendingDown,
    MainData: '+2.4 kg',
    ExtraData: 'Este mes',
    Title: 'Progreso',
    variant: 'purple',
  },
  {
    Icon: Calendar,
    MainData: '3 Nov',
    ExtraData: '9:00 AM',
    Title: 'Próxima Cita',
    variant: 'success',
  },
];

/* Employee dashboard cards */
export const employeeStats = [
  {
    Icon: Calendar,
    MainData: '12',
    ExtraData: 'Hoy',
    Title: 'Citas Programadas',
    variant: 'primary',
  },
  {
    Icon: Clock,
    MainData: '3',
    ExtraData: 'Pendientes',
    Title: 'Pendientes por Confirmar',
    variant: 'success',
  },
  {
    Icon: FileText,
    MainData: '5',
    ExtraData: 'Hoy',
    Title: 'Consultas Hoy',
    variant: 'purple',
  },
  {
    Icon: AlertTriangle,
    MainData: '2',
    ExtraData: 'Revisar',
    Title: 'Alertas de Inventario',
    variant: 'danger',
  },
];

/* Shared styles */
export const styles = {
  primary: 'bg-linear-to-br from-blue-500 to-blue-600 text-white',
  success:
    'border border-gray-200 bg-white text-gray-900 hover:border-green-300 transition active:scale-95',
  purple:
    'border border-gray-200 bg-white text-gray-900 hover:border-purple-300 transition active:scale-95',
  danger:
    'border-2 border-red-200 bg-red-50 text-gray-900 hover:border-red-300 transition active:scale-95',
};

export const textColors = {
  primary: 'text-blue-100',
  success: 'text-gray-600',
  purple: 'text-gray-600',
  danger: 'text-gray-600',
};

export const badgeColors = {
  primary: 'bg-white/20 text-white',
  success: 'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
  danger: 'bg-red-50 text-red-700',
};

export const iconColors = {
  primary: 'text-white opacity-80',
  success: 'text-green-500',
  purple: 'text-purple-500',
  danger: 'text-red-500',
};
