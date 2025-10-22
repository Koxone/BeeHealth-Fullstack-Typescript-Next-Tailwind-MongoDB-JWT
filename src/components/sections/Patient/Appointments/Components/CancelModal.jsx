'use client';

/* imports */
import { AlertCircle, Calendar, User } from 'lucide-react'; // icons

/* modal */
export default function CancelModal({ apt, onClose, onConfirm }) {
  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="border-b border-gray-100 bg-linear-to-r from-rose-50 to-red-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <AlertCircle className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="space-y-5 p-6">
            <p className="text-base text-gray-700">
              ¿Estás seguro de que deseas cancelar esta cita médica?
            </p>

            <div className="rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-blue-50 p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Fecha y hora</p>
                    <p className="font-semibold text-gray-900">
                      {apt.fecha} • {apt.hora}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Médico</p>
                    <p className="font-semibold text-gray-900">{apt.medico}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-amber-900">
                    Política de cancelación
                  </p>
                  <p className="text-sm text-amber-800">
                    Si cancelas con menos de 24 horas de anticipación, podrías ser sujeto a cargos.
                  </p>
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
              >
                Mantener cita
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:bg-rose-700 active:scale-95"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
