'use client';

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

import { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import StatsGrid from './components/StatsGrid';
import AppointmentsCard from './components/AppointmentsCard';
import DoctorCalendarCard from './components/DoctorCalendarCard';
import { mockAppointmentsData } from './components/MockAppointmentsData';

/* Local Helpers */
const formatDate = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

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

export default function DoctorCalendar() {
  // Local States
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 10));

  // Visual Mocks
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const days = getDaysInMonth(currentMonth);

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return mockAppointmentsData[dateStr] || [];
  };

  const hasAppointments = (date) => getAppointmentsForDate(date).length > 0;

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  // Mock Stats
  const totalAppointmentsThisMonth = 3;
  const daysWithAppointments = 2;
  const todayAppointments = 1;
  const averagePerDay = 2;

  return (
    <div className="h-full space-y-4 overflow-x-hidden overflow-y-auto md:space-y-6">
      <HeaderBar icons={{ CalendarIcon }} />

      <StatsGrid
        stats={{
          totalAppointmentsThisMonth,
          daysWithAppointments,
          todayAppointments,
          averagePerDay,
        }}
        icons={{ CalendarIcon, CheckCircle, Clock, TrendingUp }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <DoctorCalendarCard
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
            appointments={getAppointmentsForDate(selectedDate)}
            icons={{ Users, Clock, CalendarIcon, User, Phone, Mail, Sparkles }}
          />
        </div>
      </div>
    </div>
  );
}
