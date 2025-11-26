'use client';

import { useCreateWorkout } from '@/hooks/workouts/useCreateWorkout';
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
  Loader,
} from 'lucide-react';
import { useState } from 'react';

export default function ModalCreateWorkout({ setShowCreateModal }) {
  // Create Workout Hook
  const { createWorkout, loading, error } = useCreateWorkout();

  // Images
  const [imageInputs, setImageInputs] = useState(['']);
  const handleAddImageInput = () => {
    setImageInputs([...imageInputs, '']);
  };
  const handleRemoveImageInput = (index) => {
    setImageInputs(imageInputs.filter((_, i) => i !== index));
  };
  const handleImageInputChange = (index, value) => {
    const newInputs = [...imageInputs];
    newInputs[index] = value;
    setImageInputs(newInputs);
  };

  // Instructions
  const [instructionInputs, setInstructionInputs] = useState(['']);
  const handleAddInstructionInput = () => {
    setInstructionInputs([...instructionInputs, '']);
  };
  const handleRemoveInstructionInput = (index) => {
    setInstructionInputs(instructionInputs.filter((_, i) => i !== index));
  };
  const handleInstructionInputChange = (index, value) => {
    const newInputs = [...instructionInputs];
    newInputs[index] = value;
    setInstructionInputs(newInputs);
  };

  // Benefits
  const [benefitInputs, setBenefitInputs] = useState(['']);
  const handleAddBenefitInput = () => {
    setBenefitInputs([...benefitInputs, '']);
  };
  const handleRemoveBenefitInput = (index) => {
    setBenefitInputs(benefitInputs.filter((_, i) => i !== index));
  };
  const handleBenefitInputChange = (index, value) => {
    const newInputs = [...benefitInputs];
    newInputs[index] = value;
    setBenefitInputs(newInputs);
  };

  // Cautions
  const [cautionInputs, setCautionInputs] = useState(['']);
  const handleAddCautionInput = () => {
    setCautionInputs([...cautionInputs, '']);
  };
  const handleRemoveCautionInput = (index) => {
    setCautionInputs(cautionInputs.filter((_, i) => i !== index));
  };
  const handleCautionInputChange = (index, value) => {
    const newInputs = [...cautionInputs];
    newInputs[index] = value;
    setCautionInputs(newInputs);
  };

  // Form State
  const [form, setForm] = useState({
    patients: [],
    name: '',
    type: '',
    difficulty: '',
    duration: 0,
    about: '',
    instructions: '',
    benefits: '',
    cautions: '',
    images: '',
    video: '',
  });

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!form.name.trim()) {
      setSubmitError('El nombre del ejercicio es requerido');
      return;
    }
    if (!form.type) {
      setSubmitError('Selecciona una categoría');
      return;
    }
    if (!form.difficulty) {
      setSubmitError('Selecciona un nivel de dificultad');
      return;
    }
    if (!form.duration || form.duration <= 0) {
      setSubmitError('La duración debe ser mayor a 0');
      return;
    }
    if (!form.about.trim()) {
      setSubmitError('La explicación es requerida');
      return;
    }

    const instructions = instructionInputs.map((i) => i.trim()).filter((i) => i.length > 0);

    const benefits = benefitInputs.map((i) => i.trim()).filter((i) => i.length > 0);

    const cautions = cautionInputs.map((i) => i.trim()).filter((i) => i.length > 0);

    const images = imageInputs.map((i) => i.trim()).filter((i) => i.length > 0);

    if (instructions.length === 0) {
      setSubmitError('Debes agregar al menos una instrucción');
      return;
    }
    if (benefits.length === 0) {
      setSubmitError('Debes agregar al menos un beneficio');
      return;
    }
    if (cautions.length === 0) {
      setSubmitError('Debes agregar al menos una precaución');
      return;
    }
    if (images.length === 0) {
      setSubmitError('Debes agregar al menos una imagen');
      return;
    }
    if (!form.video.trim()) {
      setSubmitError('Debes agregar un video');
      return;
    }

    const payload = {
      patients: form.patients,
      name: form.name.trim(),
      type: form.type,
      difficulty: form.difficulty,
      duration: Number(form.duration),
      about: form.about.trim(),
      instructions,
      benefits,
      cautions,
      images,
      video: form.video.trim(),
    };

    const res = await createWorkout(payload);

    if (res) {
      setShowCreateModal(false);
      // Reset form
      setForm({
        patients: [],
        name: '',
        type: '',
        difficulty: '',
        duration: 0,
        about: '',
        instructions: '',
        benefits: '',
        cautions: '',
        images: '',
        video: '',
      });
      setImageInputs(['']);
      setInstructionInputs(['']);
      setBenefitInputs(['']);
      setCautionInputs(['']);
    }
  };

  const getNivelColor = (nivel) => {
    const colors = {
      Beginner: 'bg-green-100 text-green-700 border-green-300',
      Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Advanced: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[nivel] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={() => setShowCreateModal(false)}
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
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-500 opacity-20" />
                    <div className={`bg-beehealth-blue-solid relative rounded-2xl p-3 shadow-lg`}>
                      <Dumbbell className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Crear Nuevo Ejercicio
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      Completa todos los campos para agregar un nuevo ejercicio
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Error Messages */}
              {(submitError || error) && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-800">Error</p>
                    <p className="text-sm text-red-700">{submitError || error}</p>
                  </div>
                </div>
              )}

              <div className="group bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-beehealth-blue-solid rounded-xl p-2.5">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                </div>

                {/* Name */}
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
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Categoría
                    </label>
                    <div className="relative">
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="bg-beehealth-body-main w-full appearance-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      >
                        <option value="">Selecciona una categoría</option>
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

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 text-green-500" />
                      Duración (minutos)
                    </label>
                    <input
                      type="number"
                      placeholder="Ej: 30"
                      min="1"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Difficulty Level */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      Nivel de Dificultad
                    </label>
                    <div className="relative">
                      <select
                        value={form.difficulty}
                        onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                        className={`w-full appearance-none rounded-xl border-2 px-4 py-3.5 font-semibold shadow-sm transition-all duration-300 focus:shadow-md focus:outline-none ${getNivelColor(form.difficulty)}`}
                      >
                        <option value="">Selecciona un nivel</option>
                        <option value="Beginner">Principiante</option>
                        <option value="Intermediate">Intermedio</option>
                        <option value="Advanced">Avanzado</option>
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

                {/* Images Gallery */}
                <div className="space-y-5">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <ImageIcon className="h-4 w-4 text-pink-500" />
                      Galería de Imágenes
                    </label>

                    {/* Images List */}
                    <div className="space-y-3">
                      {imageInputs.map((imageUrl, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => handleImageInputChange(index, e.target.value)}
                            placeholder={
                              index === 0 ? 'Imagen principal (URL)' : 'Imagen adicional (URL)'
                            }
                            className="bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-200 px-4 py-3.5 font-mono text-sm text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-pink-500 focus:shadow-md focus:shadow-pink-500/20 focus:outline-none"
                          />
                          {imageInputs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImageInput(index)}
                              className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Button */}
                    <button
                      type="button"
                      onClick={handleAddImageInput}
                      className="w-full rounded-xl border-2 border-dashed border-pink-300 bg-pink-50 px-4 py-3.5 font-semibold text-pink-600 shadow-sm transition-all duration-300 hover:border-pink-400 hover:bg-pink-100 active:scale-95"
                    >
                      + Agregar otra imagen
                    </button>

                    {/* Info */}
                    <div className="flex items-start gap-2 rounded-lg bg-pink-50 px-3 py-2">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-pink-600" />
                      <p className="text-xs text-pink-700">
                        La primera imagen será la portada principal de la galería.
                      </p>
                    </div>
                  </div>

                  {/* Video Tutorial */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Play className="h-4 w-4 text-red-500" />
                      Video Tutorial (YouTube)
                    </label>
                    <input
                      type="url"
                      value={form.video}
                      onChange={(e) => setForm({ ...form, video: e.target.value })}
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
                      value={form.about}
                      onChange={(e) => setForm({ ...form, about: e.target.value })}
                      placeholder="Describe el ejercicio, qué músculos trabaja y sus características principales..."
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-teal-500 focus:shadow-md focus:shadow-teal-500/20 focus:outline-none"
                      rows="3"
                    />
                  </div>

                  {/* Instructions */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <List className="h-4 w-4 text-blue-500" />
                      Instrucciones Paso a Paso
                    </label>

                    {/* Instructions List */}
                    <div className="space-y-3">
                      {instructionInputs.map((instruction, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <textarea
                            value={instruction}
                            onChange={(e) => handleInstructionInputChange(index, e.target.value)}
                            placeholder={`Paso ${index + 1}: Describe la instrucción...`}
                            className="bg-beehealth-body-main flex-1 resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                            rows="1"
                          />
                          {instructionInputs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveInstructionInput(index)}
                              className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Button */}
                    <button
                      type="button"
                      onClick={handleAddInstructionInput}
                      className="w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-3.5 font-semibold text-blue-600 shadow-sm transition-all duration-300 hover:border-blue-400 hover:bg-blue-100 active:scale-95"
                    >
                      + Agregar paso
                    </button>

                    {/* Info */}
                    <div className="flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      <p className="text-xs text-blue-700">
                        Cada paso se mostrará numerado para el usuario. Sé claro y conciso en cada
                        instrucción.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Benefits */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Award className="h-4 w-4 text-yellow-500" />
                        Beneficios
                      </label>

                      {/* Benefits List */}
                      <div className="space-y-3">
                        {benefitInputs.map((benefit, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                              <span className="text-xs font-bold text-yellow-600">•</span>
                            </div>
                            <textarea
                              value={benefit}
                              onChange={(e) => handleBenefitInputChange(index, e.target.value)}
                              placeholder={`Beneficio ${index + 1}...`}
                              className="bg-beehealth-body-main flex-1 resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-yellow-500 focus:shadow-md focus:shadow-yellow-500/20 focus:outline-none"
                              rows="1"
                            />
                            {benefitInputs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBenefitInput(index)}
                                className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={handleAddBenefitInput}
                        className="w-full rounded-xl border-2 border-dashed border-yellow-300 bg-yellow-50 px-4 py-3.5 font-semibold text-yellow-600 shadow-sm transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-100 active:scale-95"
                      >
                        + Agregar beneficio
                      </button>

                      {/* Info */}
                      <div className="flex items-start gap-2 rounded-lg bg-yellow-50 px-3 py-2">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                        <p className="text-xs text-yellow-700">
                          Lista los beneficios principales que proporciona este ejercicio.
                        </p>
                      </div>
                    </div>

                    {/* Cautions */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Precauciones
                      </label>

                      {/* Cautions List */}
                      <div className="space-y-3">
                        {cautionInputs.map((caution, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                              <span className="text-xs font-bold text-orange-600">!</span>
                            </div>
                            <textarea
                              value={caution}
                              onChange={(e) => handleCautionInputChange(index, e.target.value)}
                              placeholder={`Precaución ${index + 1}...`}
                              className="bg-beehealth-body-main flex-1 resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                              rows="1"
                            />
                            {cautionInputs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveCautionInput(index)}
                                className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={handleAddCautionInput}
                        className="w-full rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 px-4 py-3.5 font-semibold text-orange-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-100 active:scale-95"
                      >
                        + Agregar precaución
                      </button>

                      {/* Info */}
                      <div className="flex items-start gap-2 rounded-lg bg-orange-50 px-3 py-2">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                        <p className="text-xs text-orange-700">
                          Advierte sobre lesiones o errores comunes al realizar este ejercicio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  disabled={loading}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="group bg-beehealth-blue-solid hover:shadow-beehealth-blue-solid flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      <>
                        <Dumbbell className="h-5 w-5 transition-transform group-hover:rotate-12" />
                        Crear Ejercicio
                      </>
                    )}
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
