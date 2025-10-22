'use client';

import { useState } from 'react';
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

// Datos de ejemplo de citas
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

export default function DoctorCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // Octubre 2024
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return appointmentsData[dateStr] || [];
  };

  const hasAppointments = (date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const selectedAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  // Calcular estadísticas del mes
  const totalAppointmentsThisMonth = Object.keys(appointmentsData)
    .filter((dateStr) => {
      const date = new Date(dateStr);
      return (
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
      );
    })
    .reduce((total, dateStr) => total + appointmentsData[dateStr].length, 0);

  const daysWithAppointments = Object.keys(appointmentsData).filter((dateStr) => {
    const date = new Date(dateStr);
    return date.getMonth() === currentMonth.getMonth();
  }).length;

  const todayAppointments = getAppointmentsForDate(new Date()).length;
  const averagePerDay =
    totalAppointmentsThisMonth > 0
      ? Math.round(totalAppointmentsThisMonth / daysWithAppointments)
      : 0;

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 pt-6 pb-8 md:rounded-2xl">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 p-3 shadow-lg">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Mi Calendario
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Visualiza y gestiona tus citas médicas
              </p>
            </div>
          </div>

          {/* Estadísticas mejoradas */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              {
                label: 'Citas este mes',
                value: totalAppointmentsThisMonth,
                icon: CalendarIcon,
                gradient: 'from-blue-500 to-indigo-600',
                bg: 'from-blue-50 to-indigo-50',
              },
              {
                label: 'Días con citas',
                value: daysWithAppointments,
                icon: CheckCircle,
                gradient: 'from-emerald-500 to-green-600',
                bg: 'from-emerald-50 to-green-50',
              },
              {
                label: 'Citas hoy',
                value: todayAppointments,
                icon: Clock,
                gradient: 'from-amber-500 to-orange-600',
                bg: 'from-amber-50 to-orange-50',
              },
              {
                label: 'Promedio/día',
                value: averagePerDay,
                icon: TrendingUp,
                gradient: 'from-purple-500 to-pink-600',
                bg: 'from-purple-50 to-pink-50',
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`bg-linear-to-br ${stat.bg} animate-fadeInUp group relative overflow-hidden rounded-2xl border-2 border-gray-200 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <div
                    className={`absolute -right-4 -bottom-4 h-20 w-20 bg-linear-to-br ${stat.gradient} rounded-full opacity-10 transition-all duration-300 group-hover:scale-150`}
                  />
                  <div className="relative z-10">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-medium text-gray-600 md:text-sm">{stat.label}</p>
                      <div className={`bg-linear-to-br p-1.5 ${stat.gradient} rounded-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 md:text-3xl">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Calendario mejorado */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl lg:col-span-2">
            {/* Header del calendario */}
            <div className="mb-6 flex items-center justify-between border-b-2 border-gray-200 pb-4">
              <button
                onClick={handlePrevMonth}
                className="group rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 transition-all duration-200 group-hover:-translate-x-1 group-hover:text-blue-600" />
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 capitalize md:text-2xl">
                  {monthName}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {totalAppointmentsThisMonth} citas programadas
                </p>
              </div>
              <button
                onClick={handleNextMonth}
                className="group rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 active:scale-95"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600" />
              </button>
            </div>

            {/* Días de la semana */}
            <div className="mb-3 grid grid-cols-7 gap-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-bold text-gray-500 md:text-sm"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const hasApts = hasAppointments(date);
                const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);
                const isToday = formatDate(date) === formatDate(new Date());
                const aptCount = getAppointmentsForDate(date).length;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`group relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'z-10 scale-110 bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg'
                        : hasApts
                          ? 'border-2 border-blue-300 bg-linear-to-br from-blue-50 to-indigo-50 text-gray-900 hover:scale-105 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md'
                          : 'bg-gray-50 text-gray-600 hover:scale-105 hover:bg-gray-100'
                    } ${isToday && !isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''} active:scale-95`}
                  >
                    <span className="mb-1">{date.getDate()}</span>
                    {hasApts && (
                      <div
                        className={`flex items-center gap-1 ${isSelected ? 'text-white' : 'text-blue-600'}`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-600'}`}
                        />
                        <span className="text-xs font-bold">{aptCount}</span>
                      </div>
                    )}
                    {isToday && !isSelected && (
                      <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Leyenda mejorada */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t-2 border-gray-200 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border-2 border-blue-300 bg-linear-to-br from-blue-50 to-indigo-50"></div>
                <span className="font-medium text-gray-700">Con citas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-gray-300 bg-gray-50"></div>
                <span className="font-medium text-gray-700">Sin citas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 shadow-sm"></div>
                <span className="font-medium text-gray-700">Seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg ring-2 ring-blue-500 ring-offset-2"></div>
                <span className="font-medium text-gray-700">Hoy</span>
              </div>
            </div>
          </div>

          {/* Lista de citas mejorada */}
          <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            {/* Header */}
            <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedDate
                      ? selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                      : 'Selecciona un día'}
                  </h3>
                  {selectedDate && selectedAppointments.length > 0 && (
                    <p className="text-sm text-indigo-100">
                      {selectedAppointments.length} cita
                      {selectedAppointments.length !== 1 ? 's' : ''} programada
                      {selectedAppointments.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de citas */}
            <div className="p-6">
              {selectedDate && selectedAppointments.length > 0 ? (
                <div className="scrollbar-thin max-h-[600px] space-y-3 overflow-y-auto">
                  {selectedAppointments.map((apt, index) => (
                    <div
                      key={apt.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="group animate-fadeInUp relative overflow-hidden rounded-xl border-2 border-gray-200 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
                    >
                      <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 opacity-5 transition-all duration-300 group-hover:scale-150" />

                      <div className="relative z-10">
                        {/* Header con hora */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="font-bold text-gray-900">{apt.hora}</span>
                          </div>
                          <div className="rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 p-2 text-xs font-bold text-white">
                            #{apt.id}
                          </div>
                        </div>

                        {/* Info del paciente */}
                        <div className="mb-3 flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-md">
                            {apt.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <User className="h-4 w-4 shrink-0 text-gray-400" />
                              <span className="truncate font-bold text-gray-900">
                                {apt.paciente}
                              </span>
                            </div>
                            <div className="mb-1 flex items-center gap-2">
                              <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              <span className="text-xs text-gray-600">{apt.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              <span className="truncate text-xs text-gray-600">{apt.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Motivo */}
                        <div className="rounded-lg border border-purple-200 bg-linear-to-r from-purple-50 to-pink-50 p-3">
                          <div className="flex items-start gap-2">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                            <div>
                              <p className="mb-1 text-xs font-semibold text-purple-900">
                                Motivo de consulta
                              </p>
                              <p className="text-sm font-medium text-gray-700">{apt.motivo}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Barra decorativa */}
                      <div className="absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r from-blue-500 to-purple-600 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <CalendarIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="mb-1 font-semibold text-gray-900">No hay citas programadas</p>
                  <p className="text-sm text-gray-500">Este día está libre</p>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <CalendarIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="mb-1 font-semibold text-gray-900">Selecciona un día</p>
                  <p className="text-sm text-gray-500">Haz clic en una fecha del calendario</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
