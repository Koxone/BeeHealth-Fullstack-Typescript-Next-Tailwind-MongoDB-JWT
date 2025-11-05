import React from 'react';
import { Scale, Activity, Stethoscope, Pill, Ruler, Edit2, Eye } from 'lucide-react';
import useGetAnswer from '@/components/shared/hooks/useGetAnswer';

function HistoryCard({ r, onEdit }) {
  const getAnswer = useGetAnswer(r);

  // BMI calculation
  const height = Number(r?.answers?.['6']);
  const weight = Number(r?.answers?.['7']);

  const imc = height && weight ? (weight / (height / 100) ** 2).toFixed(2) : null;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {/* Date */}
      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-(--med-blue-light) text-(--med-blue) sm:h-14 sm:w-14">
        {/* Month */}
        <span className="text-xs font-medium uppercase">
          {new Date(r.updatedAt).toLocaleDateString('es-MX', { month: 'short' })}
        </span>

        {/* Day */}
        <span className="text-base font-bold sm:text-lg">
          {new Date(r.updatedAt).toLocaleDateString('es-MX', { day: '2-digit' })}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          {/* Peso */}
          <div className="rounded-lg bg-(--med-blue-light) p-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-(--med-blue) sm:gap-2">
              <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> <span className="truncate">Peso</span>
            </div>
            <p className="text-sm font-bold text-(--med-text-dark)">{getAnswer(7)} kg</p>
          </div>

          {/* IMC */}
          <div className="rounded-lg bg-(--med-purple)/10 p-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-(--med-purple) sm:gap-2">
              <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{' '}
              <span className="truncate">IMC</span>
            </div>
            <p className="text-sm font-bold text-(--med-text-dark)">{imc}</p>
          </div>

          {/* Enfermedades */}
          <div className="rounded-lg bg-(--med-red)/10 p-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-(--med-red) sm:gap-2">
              <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{' '}
              <span className="truncate">Enfermedades</span>
            </div>
            <p className="truncate text-sm font-bold text-(--med-text-dark)">{getAnswer(26)}</p>
          </div>

          {/* Medicamentos */}
          <div className="rounded-lg bg-(--med-purple)/10 p-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-(--med-purple) sm:gap-2">
              <Pill className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{' '}
              <span className="truncate">Medicamentos</span>
            </div>
            <p className="truncate text-sm font-bold text-(--med-text-dark)">{getAnswer(19)}</p>
          </div>

          {/* Talla */}
          <div className="rounded-lg bg-(--med-cyan)/10 p-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-(--med-cyan) sm:gap-2">
              <Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{' '}
              <span className="truncate">Talla</span>
            </div>
            <p className="text-sm font-bold text-(--med-text-dark)">{getAnswer(8)} cm</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Doctor Notes */}
          <div className="rounded-xl bg-(--med-gray) p-3 shadow-sm transition hover:shadow-md sm:p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-(--med-text-muted)">
              <Stethoscope className="h-4 w-4 text-(--med-purple)" />
              Notas del médico
            </p>
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-(--med-text-dark)">
              {getAnswer(133)}
            </p>
          </div>

          {/* Consultation Reason */}
          <div className="rounded-xl bg-(--med-gray) p-3 shadow-sm transition hover:shadow-md sm:p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-(--med-text-muted)">
              <Activity className="h-4 w-4 text-(--med-blue)" />
              Motivo de consulta
            </p>
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-(--med-text-dark)">
              {getAnswer(17)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {/* View Patient History */}
        <button
          onClick={() => onEdit(r, true)} // ← true indica modo lectura
          className="self-start rounded-lg bg-(--med-blue-light) p-2 hover:bg-(--med-blue) hover:text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(r, false)} // ← false indica modo edición
          className="self-start rounded-lg bg-(--med-blue-light) p-2 hover:bg-(--med-blue) hover:text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;
