'use client';

/* imports */
import { useState } from 'react'; // state
import { useRouter } from 'next/navigation'; // navigation

/* components */
import HeaderBar from './Components/HeaderBar';
import ProgressSteps from './Components/ProgressSteps';
import DoctorsGrid from './Components/DoctorsGrid';
import CalendarPicker from './Components/CalendarPicker';
import TimeSlots from './Components/TimeSlots';
import ReasonField from './Components/ReasonField';
import SummaryCard from './Components/SummaryCard';

/* demo data */
const doctors = [
  { id: 1, nombre: 'Dra. Johana Lemus', especialidad: 'Endocrinología', avatar: 'MG' },
  { id: 2, nombre: 'Dr. Arturo Lemus', especialidad: 'Medicina Estética', avatar: 'CR' },
  { id: 3, nombre: 'Dra. Maureen Acosta', especialidad: 'Nutrición', avatar: 'AM' },
];

/* demo data */
const availableSlots = {
  '2024-10-21': ['09:00', '10:00', '11:00', '15:00', '16:00'],
  '2024-10-22': ['09:00', '10:00', '14:00', '15:00', '16:00', '17:00'],
  '2024-10-23': ['09:00', '11:00', '15:00', '16:00'],
  '2024-10-24': ['10:00', '11:00', '14:00', '15:00', '16:00'],
  '2024-10-25': ['09:00', '10:00', '11:00', '15:00'],
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

/* utils */
const formatDate = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/* utils */
const isPastDate = (date) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export default function NewAppointment() {
  /* router */
  const router = useRouter();

  /* ui state */
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9));
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');

  /* derived */
  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const availableTimesForDate = selectedDate ? availableSlots[formatDate(selectedDate)] || [] : [];

  /* helpers */
  const isDateAvailable = (date) => {
    if (!date || !selectedDoctor) return false;
    const dateStr = formatDate(date);
    return availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  /* handlers */
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  /* handlers */
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  /* handlers */
  const handleDateSelect = (date) => {
    if (!isPastDate(date) && isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  /* handlers */
  const getStepStatus = (step) => {
    if (step === 1) return selectedDoctor ? 'complete' : 'current';
    if (step === 2) return selectedDate ? 'complete' : selectedDoctor ? 'current' : 'pending';
    if (step === 3) return selectedTime ? 'complete' : selectedDate ? 'current' : 'pending';
    return 'pending';
  };

  /* handlers */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos');
      return;
    }
    const appointmentData = {
      doctor: doctors.find((d) => d.id === selectedDoctor),
      fecha: formatDate(selectedDate),
      hora: selectedTime,
      motivo: reason,
    };
    console.log('Cita agendada:', appointmentData);
    alert('Cita agendada exitosamente');
    router.push('/patient/appointments');
  };

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      {/* header */}
      <HeaderBar onBack={() => router.back()} />

      <div className="mx-auto max-w-4xl">
        {/* steps */}
        <ProgressSteps
          getStepStatus={getStepStatus}
          selectedDoctor={selectedDoctor}
          selectedDate={!!selectedDate}
          selectedTime={!!selectedTime}
        />

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* doctors */}
          <DoctorsGrid
            doctors={doctors}
            selectedDoctor={selectedDoctor}
            onSelect={(id) => {
              setSelectedDoctor(id);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
          />

          {/* calendar */}
          {selectedDoctor && (
            <CalendarPicker
              monthName={monthName}
              days={days}
              onPrev={handlePrevMonth}
              onNext={handleNextMonth}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              isDateAvailable={isDateAvailable}
              isPastDate={isPastDate}
            />
          )}

          {/* time slots */}
          {selectedDate && (
            <TimeSlots
              dateLabel={selectedDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
              })}
              times={availableTimesForDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          )}

          {/* reason */}
          {selectedTime && <ReasonField value={reason} onChange={setReason} />}

          {/* summary */}
          {selectedDoctor && selectedDate && selectedTime && (
            <SummaryCard
              doctor={doctors.find((d) => d.id === selectedDoctor)}
              date={selectedDate}
              time={selectedTime}
            />
          )}

          {/* actions */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedDoctor || !selectedDate || !selectedTime}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
                selectedDoctor && selectedDate && selectedTime
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              Confirmar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
