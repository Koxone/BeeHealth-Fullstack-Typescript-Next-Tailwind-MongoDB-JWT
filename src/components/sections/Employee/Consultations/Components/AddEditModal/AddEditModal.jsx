'use client';

import MockVentaMedicamentos from './Components/MockVentaMedicamentos';

/* modal */
export default function AddEditModal({ editingItem, form, setForm, onClose, onSubmit, icons }) {
  const { X, Edit2, Plus, Calendar, Clock, Users, FileText, DollarSign, CreditCard } = icons;

  // mock de medicamentos
  const medicamentosMock = [
    // Analgésicos y antipiréticos
    'Paracetamol 500mg',
    'Ibuprofeno 400mg',
    'Naproxeno 250mg',
    'Diclofenaco 50mg',
    'Ketorolaco 10mg',

    // Antibióticos
    'Amoxicilina 875mg',
    'Azitromicina 500mg',
    'Ciprofloxacino 500mg',
    'Cefalexina 500mg',
    'Clindamicina 300mg',

    // Gastrointestinales
    'Omeprazol 20mg',
    'Pantoprazol 40mg',
    'Ranitidina 150mg',
    'Metoclopramida 10mg',
    'Loperamida 2mg',

    // Metabólicos
    'Metformina 850mg',
    'Glibenclamida 5mg',
    'Insulina NPH 100 UI/ml',
    'Levotiroxina 50mcg',

    // Cardiovasculares
    'Losartán 50mg',
    'Enalapril 10mg',
    'Amlodipino 5mg',
    'Atorvastatina 40mg',
    'Hidroclorotiazida 25mg',

    // Respiratorios
    'Salbutamol Inhalador 100mcg',
    'Budesonida Inhalador 200mcg',
    'Loratadina 10mg',
    'Montelukast 10mg',

    // Otros
    'Ácido Fólico 5mg',
    'Vitamina D 2000UI',
    'Clonazepam 0.5mg',
    'Sertralina 50mg',
    'Melatonina 3mg',
  ];

  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-gray-100 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 overflow-hidden rounded-t-3xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-5">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                  {editingItem ? (
                    <Edit2 className="h-6 w-6 text-white" />
                  ) : (
                    <Plus className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingItem ? 'Editar' : 'Registrar'} Consulta
                  </h2>
                  <p className="text-sm text-indigo-100">
                    {editingItem ? 'Actualiza los detalles' : 'Nueva consulta médica'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-xl p-2 transition hover:bg-white/20">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Fecha
                </label>
                <input
                  type="date"
                  required
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  Hora
                </label>
                <input
                  type="time"
                  required
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <Users className="h-4 w-4 text-indigo-600" />
                Paciente
              </label>
              <input
                type="text"
                required
                value={form.paciente}
                onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                placeholder="Nombre del paciente"
              />
            </div>

            {/* Consultation Type */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <FileText className="h-4 w-4 text-indigo-600" />
                Tipo de Consulta
              </label>
              <select
                required
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              >
                <option value="">Seleccionar tipo</option>
                <option value="Primera Consulta">Primera Consulta</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Seguimiento">Seguimiento</option>
                <option value="Control de Peso">Control de Peso</option>
                <option value="Urgencia">Urgencia</option>
              </select>
            </div>

            {/* Medication */}
            <MockVentaMedicamentos />

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <DollarSign className="h-4 w-4 text-indigo-600" />
                Costo
              </label>
              <div className="relative">
                <span className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.costo}
                  onChange={(e) => setForm({ ...form, costo: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-8 text-lg font-bold transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  placeholder="800"
                />
              </div>
            </div>

            <div className="rounded-xl border-2 border-indigo-200 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  id="pagado"
                  checked={form.pagado}
                  onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
                  className="h-5 w-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500/20"
                />
                <div className="flex flex-1 items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-bold text-gray-900">Consulta pagada</span>
                </div>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-700 hover:to-purple-700 active:scale-95"
              >
                {editingItem ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
