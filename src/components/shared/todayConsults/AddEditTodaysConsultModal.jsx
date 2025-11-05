'use client';

import {
  X,
  Calendar,
  User,
  DollarSign,
  Clock,
  Pill,
  Package,
  AlertCircle,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { useState, useMemo } from 'react';

/* modal */
export default function AddEditTodaysConsultModal({
  type,
  editingItem,
  onClose,
  onSaveConsulta,
  onSaveMedicamento,
}) {
  /* local state */
  const isConsulta = type === 'consulta';
  const [form, setForm] = useStateFromEditing(type, editingItem);

  /* handlers */
  const onSubmit = (e) => {
    e.preventDefault();
    if (isConsulta) {
      onSaveConsulta(form);
    } else {
      onSaveMedicamento(form);
    }
  };

  const getGradientColor = () => {
    return isConsulta ? 'from-blue-500 to-indigo-500' : 'from-green-500 to-emerald-500';
  };

  const getAccentColor = () => {
    return isConsulta ? 'blue' : 'green';
  };

  return (
    <>
      {/* Overlay mejorado */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="animate-slideUp fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-lg overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-purple-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Elements */}
          <div
            className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradientColor()} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradientColor()} opacity-20 blur-3xl`}
          />

          {/* Header Premium */}
          <div className="relative overflow-hidden border-b border-white/50 bg-white/80 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-linear-to-r ${getGradientColor()} opacity-10`} />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {/* Anillo pulsante */}
                    <div
                      className={`absolute inset-0 animate-ping rounded-2xl bg-${getAccentColor()}-500 opacity-20`}
                    />
                    <div
                      className={`relative rounded-2xl bg-linear-to-br ${getGradientColor()} p-3 shadow-lg`}
                    >
                      {isConsulta ? (
                        <Calendar className="h-6 w-6 text-white" />
                      ) : (
                        <Pill className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingItem ? 'Editar' : 'Agregar'} {isConsulta ? 'Consulta' : 'Medicamento'}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      {editingItem
                        ? 'Actualiza la información'
                        : 'Completa todos los campos requeridos'}
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

          {/* Content */}
          <div className="relative max-h-[calc(90vh-180px)] overflow-y-auto p-6">
            {isConsulta ? (
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Información de la Consulta */}
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-blue-500 to-indigo-500 p-1.5">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información de la Consulta</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Hora
                    </label>
                    <input
                      type="time"
                      required
                      value={form.hora}
                      onChange={(e) => setForm({ ...form, hora: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <User className="h-4 w-4 text-purple-500" />
                      Paciente
                    </label>
                    <input
                      type="text"
                      required
                      value={form.paciente}
                      onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      placeholder="Nombre del paciente"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Sparkles className="h-4 w-4 text-indigo-500" />
                      Tipo de Consulta
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                      >
                        <option value="">Seleccionar tipo...</option>
                        <option value="Primera Consulta">🆕 Primera Consulta</option>
                        <option value="Consulta General">📋 Consulta General</option>
                        <option value="Seguimiento">🔄 Seguimiento</option>
                        <option value="Urgencia">🚨 Urgencia</option>
                      </select>
                      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      Costo
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.costo}
                      onChange={(e) => setForm({ ...form, costo: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                      placeholder="800.00"
                    />
                  </div>

                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.pagado}
                        onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 transition focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Consulta pagada</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Botones de acción */}
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
                    className="group flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Información del Medicamento */}
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-green-500 to-emerald-500 p-1.5">
                      <Pill className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información del Medicamento</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Pill className="h-4 w-4 text-green-500" />
                      Medicamento
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                      placeholder="Nombre del medicamento"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Package className="h-4 w-4 text-blue-500" />
                      Cantidad
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={form.cantidad}
                      onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Precio Unitario
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.precioUnitario}
                      onChange={(e) => setForm({ ...form, precioUnitario: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-md focus:shadow-emerald-500/20 focus:outline-none"
                      placeholder="150.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <User className="h-4 w-4 text-purple-500" />
                      Paciente
                    </label>
                    <input
                      type="text"
                      required
                      value={form.paciente}
                      onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      placeholder="Nombre del paciente"
                    />
                  </div>
                </div>

                {/* Botones de acción */}
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
                    className="group flex-1 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Pill className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* helper hook */
function useStateFromEditing(type, editingItem) {
  // init
  const initial = useMemo(() => {
    if (type === 'consulta') {
      return editingItem
        ? {
            hora: editingItem.hora,
            paciente: editingItem.paciente,
            tipo: editingItem.tipo,
            costo: String(editingItem.costo),
            pagado: editingItem.pagado,
          }
        : { hora: '', paciente: '', tipo: '', costo: '', pagado: true };
    }
    return editingItem
      ? {
          nombre: editingItem.nombre,
          cantidad: String(editingItem.cantidad),
          precioUnitario: String(editingItem.precioUnitario),
          paciente: editingItem.paciente,
        }
      : { nombre: '', cantidad: '', precioUnitario: '', paciente: '' };
  }, [type, editingItem]);

  const [form, setForm] = useState(initial);
  return [form, setForm];
}
