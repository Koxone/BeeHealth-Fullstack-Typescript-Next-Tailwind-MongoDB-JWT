'use client';

import {
  RefreshCw,
  X,
  Clock,
  FileText,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
} from 'lucide-react';

export default function AppointmentsList({ citas, onReagendar, onCancelar, getEstadoBadge }) {
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pendiente':
        return <Loader className="h-4 w-4" />;
      case 'Completada':
        return <CheckCircle className="h-4 w-4" />;
      case 'Cancelada':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'from-emerald-500 to-green-600';
      case 'Pendiente':
        return 'from-amber-500 to-orange-600';
      case 'Completada':
        return 'from-slate-400 to-gray-600';
      case 'Cancelada':
        return 'from-rose-500 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {citas.map((cita, index) => (
        <div
          key={cita.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className={`group animate-fadeInUp relative overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 ${
            cita.estado === 'Cancelada'
              ? 'border-rose-200 bg-linear-to-r from-rose-50/50 to-white opacity-75'
              : 'border-gray-200 bg-white hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl'
          }`}
        >
          {/* Decorative background element */}
          <div
            className={`absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-5 transition-all duration-300 ${
              cita.estado === 'Cancelada' ? 'bg-rose-500' : 'bg-blue-500 group-hover:scale-150'
            }`}
          />

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Avatar mejorado */}
            <div className="shrink-0">
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${
                  cita.estado === 'Cancelada'
                    ? 'from-gray-300 to-gray-400'
                    : 'from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/40'
                } font-bold text-white transition-all duration-300`}
              >
                {cita.avatar}
              </div>
            </div>

            {/* Info mejorada */}
            <div className="min-w-0 flex-1 space-y-2">
              {/* Header con nombre y estado */}
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-lg font-bold text-gray-900">{cita.paciente}</h3>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-semibold transition-all duration-200 ${getEstadoBadge(cita.estado)}`}
                >
                  {getEstadoIcon(cita.estado)}
                  <span>{cita.estado}</span>
                </span>
              </div>

              {/* Detalles en cards pequeñas */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 px-3 py-1.5">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">{cita.hora}</span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-purple-100 bg-linear-to-r from-purple-50 to-pink-50 px-3 py-1.5">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">{cita.tipo}</span>
                </div>
              </div>
            </div>

            {/* Botones de acción mejorados */}
            {cita.estado !== 'Cancelada' && cita.estado !== 'Completada' && (
              <div className="flex shrink-0 gap-2 sm:flex-col lg:flex-row">
                <button
                  onClick={() => onReagendar(cita)}
                  className="group/btn flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md active:scale-95"
                  title="Reagendar"
                >
                  <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-180" />
                  <span className="hidden xl:inline">Reagendar</span>
                </button>
                <button
                  onClick={() => onCancelar(cita)}
                  className="group/btn flex items-center justify-center gap-2 rounded-xl border-2 border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:border-rose-400 hover:bg-rose-50 hover:shadow-md active:scale-95"
                  title="Cancelar"
                >
                  <X className="h-4 w-4 transition-transform duration-200 group-hover/btn:rotate-90" />
                  <span className="hidden xl:inline">Cancelar</span>
                </button>
              </div>
            )}

            {/* Estado para citas completadas */}
            {cita.estado === 'Completada' && (
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="text-sm font-medium whitespace-nowrap text-slate-600">
                  Consulta finalizada
                </span>
              </div>
            )}

            {/* Estado para citas canceladas */}
            {cita.estado === 'Cancelada' && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                <span className="text-sm font-semibold whitespace-nowrap text-rose-600">
                  Cita cancelada
                </span>
              </div>
            )}
          </div>

          {/* Barra de color según estado */}
          <div
            className={`absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r ${getEstadoColor(cita.estado)} rounded-b-xl transition-all duration-300 ${
              cita.estado !== 'Cancelada' ? 'group-hover:h-1.5' : ''
            }`}
          />
        </div>
      ))}

      {/* Empty state si no hay citas */}
      {citas.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-blue-50 p-12 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">No hay citas programadas</h3>
            <p className="text-gray-600">Las citas aparecerán aquí cuando sean agendadas</p>
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  );
}
