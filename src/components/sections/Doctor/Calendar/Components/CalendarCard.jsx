'use client';

/* calendar card */
import CalendarHeader from './CalendarHeader';
import WeekdaysRow from './WeekdaysRow';
import DaysGrid from './DaysGrid';
import Legend from './Legend';

export default function CalendarCard({
  monthName,
  days,
  currentMonth,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  helpers,
  icons,
}) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl lg:col-span-2">
      <CalendarHeader
        monthName={monthName}
        totalAppointmentsThisMonth={Object.keys(helpers).length ? null : null}
        onPrev={onPrev}
        onNext={onNext}
        icons={icons}
        statsText={`${helpers.getAppointmentsForDate ? Object.keys({}).length : ''}`}
      />
      <WeekdaysRow />
      <DaysGrid
        days={days}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        helpers={helpers}
      />
      <Legend />
    </div>
  );
}
