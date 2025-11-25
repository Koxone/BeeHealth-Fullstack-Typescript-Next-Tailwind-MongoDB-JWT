'use client';

import {
  X,
  Play,
  Image as ImageIcon,
  Dumbbell,
  Clock,
  TrendingUp,
  AlertCircle,
  List,
  Award,
  Sparkles,
  Info,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ModalEditWorkout({ setShowEditModal, editingWorkout, handleSave }) {
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Fuerza',
    duracion: '',
    nivel: 'Principiante',
    imagenes: '',
    videoUrl: '',
    explicacion: '',
    instrucciones: '',
    beneficios: '',
    precauciones: '',
  });

  useEffect(() => {
    if (editingWorkout) {
      setForm({
        nombre: editingWorkout.name,
        categoria: editingWorkout.type,
        duracion: editingWorkout.duration,
        nivel: editingWorkout.difficulty,
        imagenes: editingWorkout.images.join('\n'),
        videoUrl: editingWorkout.video,
        explicacion: editingWorkout.about,
        instrucciones: editingWorkout.instructions,
        beneficios: editingWorkout.benefits,
        precauciones: editingWorkout.cautions,
      });
    }
  }, [editingWorkout]);

  const getNivelColor = (nivel) => {
    const colors = {
      Principiante: 'bg-green-100 text-green-700 border-green-300',
      Intermedio: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Avanzado: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[nivel] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={() => setShowEditModal(false)}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <div
          className="animate-in fade-in zoom-in-95 bg-beehealth-body-main relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Elements */}
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-linear-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-linear-to-tr from-pink-400/20 to-orange-400/20 blur-3xl" />

          {/* Header Premium */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className={`bg-beehealth-blue-light absolute inset-0`} />
            <div className="relative px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {/* Anillo pulsante */}
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-500 opacity-20" />
                    <div className={`bg-beehealth-blue-solid relative rounded-2xl p-3 shadow-lg`}>
                      <Dumbbell className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Editar Ejercicio
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      Actualiza la información del ejercicio
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={(e) => handleSave(e, form)} className="space-y-6 p-6 sm:p-8">
              <div className="group bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-beehealth-blue-solid rounded-xl p-2.5">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Dumbbell className="h-4 w-4 text-blue-500" />
                      Nombre del Ejercicio
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Sentadillas con Peso"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Categoría
                    </label>
                    <div className="relative">
                      <select
                        value={form.categoria}
                        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                        className="bg-beehealth-body-main w-full appearance-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      >
                        <option value="Fuerza">Fuerza</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Core">Core</option>
                        <option value="Flexibilidad">Flexibilidad</option>
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
                      <Clock className="h-4 w-4 text-green-500" />
                      Duración
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 3 series de 15 repeticiones"
                      value={form.duracion}
                      onChange={(e) => setForm({ ...form, duracion: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      Nivel de Dificultad
                    </label>
                    <div className="relative">
                      <select
                        value={form.nivel}
                        onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                        className={`w-full appearance-none rounded-xl border-2 px-4 py-3.5 font-semibold shadow-sm transition-all duration-300 focus:shadow-md focus:outline-none ${getNivelColor(form.nivel)}`}
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                        <svg
                          className="h-5 w-5"
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
                </div>
              </div>

              {/* Multimedia Section */}
              <div className="group bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-beehealth-blue-solid rounded-xl p-2.5">
                    <ImageIcon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Contenido Multimedia</h3>
                </div>

                {/* Images */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <ImageIcon className="h-4 w-4 text-pink-500" />
                      Galería de Imágenes
                    </label>
                    <textarea
                      value={form.imagenes}
                      onChange={(e) => setForm({ ...form, imagenes: e.target.value })}
                      placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg&#10;https://ejemplo.com/imagen3.jpg"
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 font-mono text-sm text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-pink-500 focus:shadow-md focus:shadow-pink-500/20 focus:outline-none"
                      rows="3"
                    />
                    <div className="flex items-start gap-2 rounded-lg bg-pink-50 px-3 py-2">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-pink-600" />
                      <p className="text-xs text-pink-700">
                        Ingresa una URL por línea. La primera imagen será la principal.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Play className="h-4 w-4 text-red-500" />
                      Video Tutorial (YouTube)
                    </label>
                    <input
                      type="url"
                      value={form.videoUrl}
                      onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 font-mono text-sm text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-red-500 focus:shadow-md focus:shadow-red-500/20 focus:outline-none"
                    />
                    <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2">
                      <Play className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                      <p className="text-xs text-red-700">
                        Usa el formato embed: youtube.com/embed/VIDEO_ID
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workout Details */}
              <div className="group bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-beehealth-blue-solid rounded-xl p-2.5">
                    <List className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Descripción Completa</h3>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      📝 Explicación General
                    </label>
                    <textarea
                      value={form.explicacion}
                      onChange={(e) => setForm({ ...form, explicacion: e.target.value })}
                      placeholder="Describe el ejercicio, qué músculos trabaja y sus características principales..."
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-teal-500 focus:shadow-md focus:shadow-teal-500/20 focus:outline-none"
                      rows="3"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <List className="h-4 w-4 text-blue-500" />
                      Instrucciones Paso a Paso
                    </label>
                    <textarea
                      value={form.instrucciones}
                      onChange={(e) => setForm({ ...form, instrucciones: e.target.value })}
                      placeholder="Paso 1: Colócate en la posición inicial...&#10;Paso 2: Realiza el movimiento...&#10;Paso 3: Regresa a la posición inicial..."
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                      rows="4"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Award className="h-4 w-4 text-yellow-500" />
                        Beneficios
                      </label>
                      <textarea
                        value={form.beneficios}
                        onChange={(e) => setForm({ ...form, beneficios: e.target.value })}
                        placeholder="• Fortalece los músculos&#10;• Mejora la resistencia&#10;• Aumenta la flexibilidad..."
                        className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-yellow-500 focus:shadow-md focus:shadow-yellow-500/20 focus:outline-none"
                        rows="4"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Precauciones
                      </label>
                      <textarea
                        value={form.precauciones}
                        onChange={(e) => setForm({ ...form, precauciones: e.target.value })}
                        placeholder="• Mantén la espalda recta&#10;• No fuerces las articulaciones&#10;• Calienta antes de comenzar..."
                        className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="group bg-beehealth-blue-solid hover:shadow-beehealth-blue-solid flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    Actualizar Ejercicio
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
