'use client';

/* modal */
export default function AddEditModal({
  editingCita,
  citaForm,
  setCitaForm,
  onClose,
  onSubmit,
  icons,
}) {
  const { Plus, Edit2, X, Calendar, Clock, User, Phone, Mail, Sparkles } = icons;
  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-100 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="relative sticky top-0 z-10 overflow-hidden rounded-t-3xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-5">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                  {editingCita ? (
                    <Edit2 className="h-6 w-6 text-white" />
                  ) : (
                    <Plus className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingCita ? 'Editar' : 'Agendar'} Cita
                  </h2>
                  <p className="text-sm text-emerald-100">
                    {editingCita ? 'Actualiza los detalles de la cita' : 'Programa una nueva cita'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 transition-all duration-200 hover:bg-white/20"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* form */}
          <form onSubmit={onSubmit} className="space-y-5 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  Fecha
                </label>
                <input
                  type="date"
                  required
                  value={citaForm.fecha}
                  onChange={(e) => setCitaForm({ ...citaForm, fecha: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  Hora
                </label>
                <input
                  type="time"
                  required
                  value={citaForm.hora}
                  onChange={(e) => setCitaForm({ ...citaForm, hora: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <User className="h-4 w-4 text-emerald-600" />
                Paciente
              </label>
              <input
                type="text"
                required
                value={citaForm.paciente}
                onChange={(e) => setCitaForm({ ...citaForm, paciente: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                placeholder="Nombre completo del paciente"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={citaForm.telefono}
                  onChange={(e) => setCitaForm({ ...citaForm, telefono: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  placeholder="555-0000"
                />
              </div>
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={citaForm.email}
                  onChange={(e) => setCitaForm({ ...citaForm, email: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  placeholder="email@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Motivo de la consulta
              </label>
              <textarea
                required
                value={citaForm.motivo}
                onChange={(e) => setCitaForm({ ...citaForm, motivo: e.target.value })}
                className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                rows="4"
                placeholder="Describe el motivo de la consulta..."
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 active:scale-95"
              >
                {editingCita ? 'Actualizar Cita' : 'Agendar Cita'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
