'use client';

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

/* calendar */
export default function CalendarPicker({
  monthName,
  days,
  onPrev,
  onNext,
  selectedDate,
  onSelectDate,
  isDateAvailable,
  isPastDate,
}) {
  return (
    <div className="animate-slideDown rounded-2xl border-2 border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-medtrack-blue-light/30 p-2">
          <CalendarIcon className="h-5 w-5 text-medtrack-blue-solid" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-main">Paso 2: Selecciona una fecha</h2>
          <p className="text-sm text-muted">Elige el día de tu consulta</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-linear-to-br from-surface-highlight to-medtrack-blue-light/10 p-5">
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="group rounded-xl border border-gray-200 p-2.5 shadow-sm transition-all duration-200 hover:bg-white active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 text-muted transition-transform duration-200 group-hover:-translate-x-1" />
          </button>
          <h3 className="rounded-xl border border-border bg-surface px-4 py-2 text-lg font-bold text-main capitalize shadow-sm">
            {monthName}
          </h3>
          <button
            type="button"
            onClick={onNext}
            className="group rounded-xl border border-gray-200 p-2.5 shadow-sm transition-all duration-200 hover:bg-white active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-muted transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* days of week */}
        <div className="mb-3 grid grid-cols-7 gap-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
            <div key={d} className="py-2 text-center text-xs font-bold text-muted">
              {d}
            </div>
          ))}
        </div>

        {/* days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="aspect-square" />;
            const isAvailable = isDateAvailable(date);
            const past = isPastDate(date);
            const selected = selectedDate && date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectDate(date)}
                disabled={past || !isAvailable}
                className={`group relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selected
                    ? 'bg-medtrack-blue-solid z-10 scale-110 text-white shadow-lg'
                    : isAvailable && !past
                      ? 'border-2 border-medtrack-blue-light bg-surface text-main hover:scale-105 hover:bg-medtrack-blue-light/10 hover:shadow-md active:scale-95'
                      : 'cursor-not-allowed bg-surface-highlight text-muted opacity-50'
                }`}
              >
                {date.getDate()}
                {isAvailable && !past && !selected && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-white bg-green-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>

        {/* legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg border-2 border-medtrack-blue-light bg-surface shadow-sm" />
            <span className="font-medium text-main">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg bg-surface-highlight" />
            <span className="font-medium text-main">No disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-medtrack-blue-solid h-5 w-5 rounded-lg shadow-sm" />
            <span className="font-medium text-main">Seleccionado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
