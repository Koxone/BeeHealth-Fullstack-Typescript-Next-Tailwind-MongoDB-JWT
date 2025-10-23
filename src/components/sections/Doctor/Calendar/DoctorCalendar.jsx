'use client';

/* state */
import { useState, useMemo } from 'react';

/* icons */
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  TrendingUp,
  Users,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

/* components */
import HeaderBar from './Components/HeaderBar';
import StatsGrid from './Components/StatsGrid';
import CalendarCard from './Components/CalendarCard';
import AppointmentsCard from './Components/AppointmentsCard';

/* data */
const appointmentsData = {
  '2024-10-21': [
    {
      id: 1,
      hora: '09:00',
      paciente: 'Juan Pérez',
      telefono: '+52 55 1234 5678',
      email: 'juan@email.com',
      motivo: 'Control de peso',
      avatar: 'JP',
    },
    {
      id: 2,
      hora: '10:00',
      paciente: 'María López',
      telefono: '+52 55 8765 4321',
      email: 'maria@email.com',
      motivo: 'Seguimiento',
      avatar: 'ML',
    },
    {
      id: 3,
      hora: '15:00',
      paciente: 'Carlos Ruiz',
      telefono: '+52 55 5555 5555',
      email: 'carlos@email.com',
      motivo: 'Primera consulta',
      avatar: 'CR',
    },
  ],
  '2024-10-22': [
    {
      id: 4,
      hora: '09:00',
      paciente: 'Ana Martínez',
      telefono: '+52 55 1111 2222',
      email: 'ana@email.com',
      motivo: 'Revisión',
      avatar: 'AM',
    },
    {
      id: 5,
      hora: '14:00',
      paciente: 'Pedro García',
      telefono: '+52 55 3333 4444',
      email: 'pedro@email.com',
      motivo: 'Control mensual',
      avatar: 'PG',
    },
  ],
  '2024-10-23': [
    {
      id: 6,
      hora: '11:00',
      paciente: 'Laura Sánchez',
      telefono: '+52 55 6666 7777',
      email: 'laura@email.com',
      motivo: 'Tratamiento estético',
      avatar: 'LS',
    },
    {
      id: 7,
      hora: '15:00',
      paciente: 'Roberto Díaz',
      telefono: '+52 55 8888 9999',
      email: 'roberto@email.com',
      motivo: 'Consulta nutricional',
      avatar: 'RD',
    },
  ],
  '2024-10-24': [
    {
      id: 8,
      hora: '10:00',
      paciente: 'Sofia Torres',
      telefono: '+52 55 2222 3333',
      email: 'sofia@email.com',
      motivo: 'Control de peso',
      avatar: 'ST',
    },
    {
      id: 9,
      hora: '14:00',
      paciente: 'Miguel Ángel',
      telefono: '+52 55 4444 5555',
      email: 'miguel@email.com',
      motivo: 'Seguimiento',
      avatar: 'MA',
    },
    {
      id: 10,
      hora: '16:00',
      paciente: 'Isabel Ramírez',
      telefono: '+52 55 7777 8888',
      email: 'isabel@email.com',
      motivo: 'Primera consulta',
      avatar: 'IR',
    },
  ],
};

/* utils */
const formatDate = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/* utils */
const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
  return days;
};

/* container */
export default function DoctorCalendar() {
  /* ui state */
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); /* October 2024 */
  const [selectedDate, setSelectedDate] = useState(null);

  /* helpers */
  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return appointmentsData[dateStr] || [];
  };
  const hasAppointments = (date) => getAppointmentsForDate(date).length > 0;

  /* nav */
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  /* computed */
  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);
  const monthName = useMemo(
    () => currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
    [currentMonth]
  );
  const selectedAppointments = useMemo(
    () => (selectedDate ? getAppointmentsForDate(selectedDate) : []),
    [selectedDate]
  );

  /* stats */
  const totalAppointmentsThisMonth = useMemo(
    () =>
      Object.keys(appointmentsData)
        .filter((dateStr) => {
          const d = new Date(dateStr);
          return (
            d.getMonth() === currentMonth.getMonth() &&
            d.getFullYear() === currentMonth.getFullYear()
          );
        })
        .reduce((total, dateStr) => total + appointmentsData[dateStr].length, 0),
    [currentMonth]
  );
  const daysWithAppointments = useMemo(
    () =>
      Object.keys(appointmentsData).filter((dateStr) => {
        const d = new Date(dateStr);
        return (
          d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()
        );
      }).length,
    [currentMonth]
  );
  const todayAppointments = getAppointmentsForDate(new Date()).length;
  const averagePerDay =
    totalAppointmentsThisMonth > 0 && daysWithAppointments > 0
      ? Math.round(totalAppointmentsThisMonth / daysWithAppointments)
      : 0;

  return (
    <div className="h-full space-y-4 overflow-x-hidden overflow-y-auto md:space-y-6">
      {/* header */}
      <HeaderBar icons={{ CalendarIcon }} />

      {/* stats */}
      <StatsGrid
        stats={{
          totalAppointmentsThisMonth,
          daysWithAppointments,
          todayAppointments,
          averagePerDay,
        }}
        icons={{ CalendarIcon, CheckCircle, Clock, TrendingUp }}
      />

      {/* layout */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <CalendarCard
            monthName={monthName}
            days={days}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            onSelectDate={setSelectedDate}
            helpers={{ hasAppointments, getAppointmentsForDate, formatDate }}
            icons={{ ChevronLeft, ChevronRight, CalendarIcon }}
          />

          <AppointmentsCard
            selectedDate={selectedDate}
            appointments={selectedAppointments}
            icons={{ Users, Clock, CalendarIcon, User, Phone, Mail, Sparkles }}
          />
        </div>
      </div>

      {/* animations */
      /* global keyframes */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
