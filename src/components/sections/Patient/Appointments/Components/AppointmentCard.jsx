'use client';

/* imports */
import { Calendar, Clock, User, RefreshCw, X } from 'lucide-react';
import { getStatusColor } from '../PatientAppointments'; // helpers

/* card */
export default function AppointmentCard({ apt, index, canModify, onReschedule, onCancel }) {
  return (
    <div
      style={{ animationDelay: `${index * 50}ms` }}
      className={`animate-fadeInUp rounded-2xl border-2 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl md:p-6 ${
        apt.estado === 'Cancelada'
          ? 'border-rose-200 bg-linear-to-r from-rose-50/50 to-white'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* info */}
        <div className="flex-1 space-y-3">
          {/* date time status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">{apt.fecha}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{apt.hora}</span>
            </div>
            <span
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${getStatusColor(apt.estado)}`}
            >
              {apt.estado}
            </span>
          </div>

          {/* doctor */}
          <div className="flex items-start gap-3 pl-1">
            <div className="mt-0.5 rounded-lg bg-linear-to-br from-blue-100 to-indigo-100 p-2">
              <User className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{apt.medico}</p>
              <p className="text-sm text-gray-600">{apt.especialidad}</p>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
          {canModify && (
            <>
              <button
                onClick={onReschedule}
                className="group flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white active:scale-95"
              >
                <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                <span>Reagendar</span>
              </button>
              <button
                onClick={onCancel}
                className="group flex items-center justify-center gap-2 rounded-xl border-2 border-rose-500 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-rose-600 transition-all duration-200 hover:bg-rose-500 hover:text-white active:scale-95"
              >
                <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                <span>Cancelar</span>
              </button>
            </>
          )}

          {apt.estado === 'Completada' && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="text-sm font-medium text-slate-600">Consulta finalizada</span>
            </div>
          )}

          {apt.estado === 'Cancelada' && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
              <span className="text-sm font-semibold text-rose-600">Cita cancelada</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
