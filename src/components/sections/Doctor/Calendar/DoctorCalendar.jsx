'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';

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

import HeaderBar from './Components/HeaderBar';
import StatsGrid from './Components/StatsGrid';
import CalendarCard from './Components/CalendarCard';
import AppointmentsCard from './Components/AppointmentsCard';
import { useDoctorStatsStore } from '@/Zustand/useDoctorStatsStore';

/* Utils */
const formatDate = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/* Utils */
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

/* Tanstack */
async function fetchAppointments() {
  const res = await fetch('/api/appointments');
  if (!res.ok) throw new Error('Error al obtener citas');
  const data = await res.json();

  const formatted = {};
  data.forEach((event) => {
    const date = event.start?.dateTime?.slice(0, 10);
    if (!date) return;

    if (!formatted[date]) formatted[date] = [];
    formatted[date].push({
      id: event.id,
      hora: new Date(event.start.dateTime).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      paciente: event.summary || 'Sin título',
      telefono: event.description?.match(/Tel[eé]fono:\s*([+\d\s-]+)/i)?.[1]?.trim() || 'N/A',
      email: event.description?.match(/Email:\s*([^\n\r]+)/i)?.[1]?.trim() || 'N/A',

      motivo:
        event.description?.match(/Motivo:\s*([^\n\r]+)/i)?.[1]?.trim() ||
        event.description ||
        'Sin descripción',
      tipo: event.description?.match(/Tipo:\s*([^\n\r]+)/i)?.[1]?.trim() || 'Sin tipo',
      avatar: event.summary
        ? event.summary
            .split(' ')
            .map((n) => n[0])
            .join('')
        : '?',
    });
  });

  return formatted;
}

export default function DoctorCalendar() {
  /* Local States */
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Zustand
  const setAllStats = useDoctorStatsStore((state) => state.setAllStats);

  /* Query */
  const { data: appointmentsData = {}, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    refetchInterval: 60 * 1000,
  });

  /* Helpers */
  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return appointmentsData[dateStr] || [];
  };

  const hasAppointments = (date) => getAppointmentsForDate(date).length > 0;

  /* Nav */
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  /* Computed */
  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);
  const monthName = useMemo(
    () => currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
    [currentMonth]
  );
  const selectedAppointments = useMemo(
    () => (selectedDate ? getAppointmentsForDate(selectedDate) : []),
    [selectedDate, appointmentsData]
  );

  const totalAppointmentsThisMonth = useMemo(() => {
    return Object.entries(appointmentsData)
      .filter(([dateStr]) => {
        const [year, month] = dateStr.split('-').map(Number);
        return year === currentMonth.getFullYear() && month === currentMonth.getMonth() + 1;
      })
      .reduce((total, [, appointments]) => total + appointments.length, 0);
  }, [appointmentsData, currentMonth]);

  const daysWithAppointments = useMemo(() => {
    return Object.keys(appointmentsData).filter((dateStr) => {
      const [year, month] = dateStr.split('-').map(Number);
      return year === currentMonth.getFullYear() && month === currentMonth.getMonth() + 1;
    }).length;
  }, [appointmentsData, currentMonth]);

  const todayAppointments = getAppointmentsForDate(new Date()).length;
  const averagePerDay =
    totalAppointmentsThisMonth > 0 && daysWithAppointments > 0
      ? Math.round(totalAppointmentsThisMonth / daysWithAppointments)
      : 0;

  useEffect(() => {
    setAllStats({
      totalAppointmentsThisMonth,
      daysWithAppointments,
      todayAppointments,
    });
  }, [totalAppointmentsThisMonth, daysWithAppointments, todayAppointments]);

  /* Loading */
  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
        <span className="ml-3 text-lg font-medium text-gray-600">Cargando citas...</span>
      </div>
    );

  return (
    <div className="h-full space-y-4 overflow-x-hidden overflow-y-auto md:space-y-6">
      {/* Header */}
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

      {/* Layout */}
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
    </div>
  );
}
