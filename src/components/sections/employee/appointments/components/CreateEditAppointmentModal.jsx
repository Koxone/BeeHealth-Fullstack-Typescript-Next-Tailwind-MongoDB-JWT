'use client';

import { Plus, Edit2, X, Calendar, Clock, User, Sparkles, Info } from 'lucide-react';
import { useEffect } from 'react';

export default function CreateEditAppointmentModal({
  editingCita,
  citaForm,
  setCitaForm,
  onClose,
  onSubmit,
  patients, 
}) {
  // Color
  const getColor = () =>
    editingCita ? 'from-blue-600 to-purple-600' : 'from-emerald-500 to-teal-500';

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = '');
  }, []);

  // Handle select
  const handleSelectPatient = (e) => {
    const selected = patients.find((p) => p._id === e.target.value);
    setCitaForm({
      ...citaForm,
      pacienteId: selected?._id || '',
      paciente: selected?.fullName || '',
      telefono: selected?.phone || '',
      email: selected?.email || '',
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <div
          className="animate-in fade-in zoom-in-95 relative max-h-[95vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30 shadow-2xl backdrop-blur-md duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/50 bg-white/80 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-linear-to-r ${getColor()} opacity-10`} />
            <div className="relative px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald-500 opacity-20" />
                    <div
                      className={`relative rounded-2xl bg-linear-to-br ${getColor()} p-3 shadow-lg`}
                    >
                      {editingCita ? (
                        <Edit2 className="h-7 w-7 text-white" />
                      ) : (
                        <Plus className="h-7 w-7 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {editingCita ? 'Editar Cita' : 'Agendar Nueva Cita'}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      {editingCita
                        ? 'Actualiza la información de la cita'
                        : 'Completa los campos para crear una nueva cita'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Info básica */}
              <div className="group rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 p-2.5">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Fecha */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-emerald-500" />
                      Fecha
                    </label>
                    <input
                      type="date"
                      required
                      value={citaForm.fecha}
                      onChange={(e) => setCitaForm({ ...citaForm, fecha: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-emerald-500 focus:shadow-md focus:shadow-emerald-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Hora */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 text-teal-500" />
                      Hora
                    </label>
                    <input
                      type="time"
                      required
                      value={citaForm.hora}
                      onChange={(e) => setCitaForm({ ...citaForm, hora: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-teal-500 focus:shadow-md focus:shadow-teal-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Datos del paciente */}
              <div className="group rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-green-500 to-emerald-500 p-2.5">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Datos del Paciente</h3>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="h-4 w-4 text-green-500" />
                    Selecciona un paciente
                  </label>
                  <select
                    required
                    value={citaForm.pacienteId || ''}
                    onChange={handleSelectPatient}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                  >
                    <option value="">-- Selecciona un paciente --</option>
                    {patients.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Motivo */}
              <div className="group rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-yellow-500 to-orange-500 p-2.5">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Motivo de la Consulta</h3>
                </div>

                <textarea
                  required
                  value={citaForm.motivo}
                  onChange={(e) => setCitaForm({ ...citaForm, motivo: e.target.value })}
                  placeholder="Describe el motivo de la cita..."
                  className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                  rows="4"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="group flex-1 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 active:scale-95"
                >
                  {editingCita ? (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Actualizar Cita
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      Agendar Cita
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
