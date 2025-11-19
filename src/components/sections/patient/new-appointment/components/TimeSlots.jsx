'use client';

import { Clock, Check } from 'lucide-react';

/* slots */
export default function TimeSlots({ dateLabel, times, selectedTime, onSelectTime }) {
  return (
    <div className="animate-slideDown rounded-2xl border-2 border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-medtrack-blue-light/30 p-2">
          <Clock className="h-5 w-5 text-medtrack-blue-solid" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-main">Paso 3: Selecciona un horario</h2>
          <p className="text-sm text-muted">Horarios disponibles para {dateLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {times.map((time, idx) => (
          <button
            key={time}
            type="button"
            style={{ animationDelay: `${idx * 50}ms` }}
            onClick={() => onSelectTime(time)}
            className={`group animate-fadeInUp relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 px-3 py-4 transition-all duration-300 ${
              selectedTime === time
                ? 'scale-110 border-medtrack-blue-solid bg-linear-to-br from-medtrack-blue-light/20 to-medtrack-blue-light/40 shadow-lg'
                : 'border-border bg-surface hover:border-medtrack-blue-light hover:shadow-md active:scale-95'
            }`}
          >
            <Clock
              className={`h-5 w-5 transition-all duration-300 ${selectedTime === time ? 'scale-110 text-medtrack-blue-solid' : 'text-muted group-hover:scale-110 group-hover:text-medtrack-blue-solid'}`}
            />
            <span
              className={`text-sm font-bold ${selectedTime === time ? 'text-medtrack-blue-solid' : 'text-main'}`}
            >
              {time}
            </span>
            {selectedTime === time && (
              <div className="absolute top-1 right-1 rounded-full bg-medtrack-blue-solid p-1 shadow-lg">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
