'use client';

import { useRouter } from 'next/navigation';
import { Heart, Weight, Sparkles, ArrowLeft, Check, ClipboardPlus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MedicalHistoryForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('peso');
  const [formData, setFormData] = useState({
    // Datos comunes
    edad: '',
    genero: '',
    altura: '',
    pesoActual: '',

    // Control de Peso
    talla: '',
    pesoObjetivo: '',
    actividadFisica: '',
    horasSueno: '',
    consumoAgua: '',
    enfermedadesCronicas: '',
    medicamentosActuales: '',
    alergias: '',
    habitosAlimenticios: '',
    cirugiasPrevias: '',
    motivoConsulta: '',

    // Estético
    tratamientoInteres: '',
    zonaTratamiento: '',
    tratamientosPrevios: '',
    expectativas: '',
    condicionesPiel: '',
    embarazoLactancia: '',
    cirugiasEsteticasPrevias: '',
    alergiasMedicamentos: '',
    motivoEstetico: '',
  });

  useEffect(() => {
    // Verificar que vengan del paso 1
    const signupData = localStorage.getItem('signupData');
    if (!signupData) {
      router.push('/signup');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');

    const completeData = {
      ...formData,
      tipoConsulta: activeTab,
      fechaRegistro: new Date().toISOString(),
    };

    try {
      // 1. Crear el usuario primero
      const resUser = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signupData.nombre,
          email: signupData.email,
          phone: signupData.telefono,
          password: signupData.password,
        }),
      });

      const userData = await resUser.json();
      if (!resUser.ok) throw new Error(userData.error || 'Error al crear usuario');

      const patientId = userData.user.id;

      // 2. Crear historial clínico ligado al usuario
      const resRecord = await fetch('/api/clinical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...completeData,
          patientId,
        }),
      });

      const recordData = await resRecord.json();
      if (!resRecord.ok) throw new Error(recordData.error || 'Error al crear historial clínico');

      alert('¡Registro completado exitosamente!');
      localStorage.removeItem('signupData');
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al completar el registro');
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="h-full overflow-y-auto bg-linear-to-br from-blue-50 via-white to-green-50 p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-blue-500 md:h-10 md:w-10" />
            <span className="text-2xl font-bold text-gray-900 md:text-3xl">MedTrack</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Historial Clínico</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Paso 2 de 2: Completa tu información médica
          </p>
        </div>

        {/* Tabs */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('peso')}
              className={`flex items-center justify-center gap-2 px-4 py-4 font-medium transition ${
                activeTab === 'peso'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ClipboardPlus className="h-5 w-5" />
              <span className="text-sm md:text-base">Informacion del Paciente</span>
            </button>
            {/* Seccion para Maureen */}
            {/* <button
              onClick={() => setActiveTab('estetico')}
              className={`flex items-center justify-center gap-2 px-4 py-4 font-medium transition ${
                activeTab === 'estetico'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-sm md:text-base">Tratamiento Estético</span>
            </button> */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            {/* Datos Comunes */}
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
                Datos Generales
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Edad</label>
                  <input
                    type="number"
                    required
                    value={formData.edad}
                    onChange={(e) => updateField('edad', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Género</label>
                  <select
                    required
                    value={formData.genero}
                    onChange={(e) => updateField('genero', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.altura}
                    onChange={(e) => updateField('altura', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="170"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Peso Actual (kg)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.pesoActual}
                    onChange={(e) => updateField('pesoActual', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="75"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Talla (En Centimetros)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.talla}
                    onChange={(e) => updateField('talla', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="120"
                  />
                </div>
              </div>
            </div>

            {/* Formulario de Control de Peso */}
            {activeTab === 'peso' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
                  Información para Control de Peso
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Peso Objetivo (kg)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.pesoObjetivo}
                      onChange={(e) => updateField('pesoObjetivo', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Actividad Física
                    </label>
                    <select
                      required
                      value={formData.actividadFisica}
                      onChange={(e) => updateField('actividadFisica', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    >
                      <option value="">Seleccionar</option>
                      <option value="sedentario">Sedentario</option>
                      <option value="ligero">Ligero (1-2 días/semana)</option>
                      <option value="moderado">Moderado (3-5 días/semana)</option>
                      <option value="intenso">Intenso (6-7 días/semana)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Horas de Sueño
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.horasSueno}
                      onChange={(e) => updateField('horasSueno', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                      placeholder="7"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Consumo de Agua (litros/día)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.consumoAgua}
                      onChange={(e) => updateField('consumoAgua', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Enfermedades Crónicas
                  </label>
                  <textarea
                    rows={2}
                    value={formData.enfermedadesCronicas}
                    onChange={(e) => updateField('enfermedadesCronicas', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="Diabetes, hipertensión, tiroides, etc. (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Medicamentos Actuales
                  </label>
                  <textarea
                    rows={2}
                    value={formData.medicamentosActuales}
                    onChange={(e) => updateField('medicamentosActuales', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="Lista de medicamentos que tomas actualmente (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Alergias Alimentarias
                  </label>
                  <textarea
                    rows={2}
                    value={formData.alergias}
                    onChange={(e) => updateField('alergias', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="Alergias o intolerancias alimentarias (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tipos de Alimentacion
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.habitosAlimenticios}
                    onChange={(e) => updateField('habitosAlimenticios', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="Describe tu alimentación típica diaria"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Cirugias Previas
                  </label>
                  <textarea
                    rows={2}
                    value={formData.cirugiasPrevias}
                    onChange={(e) => updateField('cirugiasPrevias', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="Cualquier tipo de intervencion Quirurgica anterior"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Motivo de Consulta
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.motivoConsulta}
                    onChange={(e) => updateField('motivoConsulta', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
                    placeholder="¿Qué te motivó a buscar ayuda para el control de peso?"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Formulario Estético */}
            {activeTab === 'estetico' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
                  Información para Tratamiento Estético
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tratamiento de Interés
                    </label>
                    <select
                      required
                      value={formData.tratamientoInteres}
                      onChange={(e) => updateField('tratamientoInteres', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    >
                      <option value="">Seleccionar</option>
                      <option value="botox">Botox</option>
                      <option value="rellenos">Rellenos Dérmicos</option>
                      <option value="peeling">Peeling Químico</option>
                      <option value="laser">Láser Facial</option>
                      <option value="hilos">Hilos Tensores</option>
                      <option value="plasma">Plasma Rico en Plaquetas</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Zona a Tratar
                    </label>
                    <select
                      required
                      value={formData.zonaTratamiento}
                      onChange={(e) => updateField('zonaTratamiento', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    >
                      <option value="">Seleccionar</option>
                      <option value="frente">Frente</option>
                      <option value="entrecejo">Entrecejo</option>
                      <option value="patas-gallo">Patas de Gallo</option>
                      <option value="labios">Labios</option>
                      <option value="pomulos">Pómulos</option>
                      <option value="mandibula">Mandíbula</option>
                      <option value="cuello">Cuello</option>
                      <option value="rostro-completo">Rostro Completo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tratamientos Estéticos Previos
                  </label>
                  <textarea
                    rows={3}
                    value={formData.tratamientosPrevios}
                    onChange={(e) => updateField('tratamientosPrevios', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    placeholder="Describe tratamientos estéticos anteriores y resultados (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Expectativas del Tratamiento
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.expectativas}
                    onChange={(e) => updateField('expectativas', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    placeholder="¿Qué esperas lograr con este tratamiento?"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Condiciones de la Piel
                  </label>
                  <textarea
                    rows={2}
                    value={formData.condicionesPiel}
                    onChange={(e) => updateField('condicionesPiel', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    placeholder="Acné, rosácea, manchas, cicatrices, etc. (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    ¿Embarazo o Lactancia?
                  </label>
                  <select
                    required
                    value={formData.embarazoLactancia}
                    onChange={(e) => updateField('embarazoLactancia', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                  >
                    <option value="">Seleccionar</option>
                    <option value="no">No</option>
                    <option value="embarazo">Embarazo</option>
                    <option value="lactancia">Lactancia</option>
                    <option value="planificando">Planificando embarazo</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Cirugías Estéticas Previas
                  </label>
                  <textarea
                    rows={2}
                    value={formData.cirugiasEsteticasPrevias}
                    onChange={(e) => updateField('cirugiasEsteticasPrevias', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    placeholder="Rinoplastia, blefaroplastia, etc. (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Alergias a Medicamentos o Productos
                  </label>
                  <textarea
                    rows={2}
                    value={formData.alergiasMedicamentos}
                    onChange={(e) => updateField('alergiasMedicamentos', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    placeholder="Alergias conocidas a medicamentos, anestesia, productos cosméticos (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Motivo de Consulta
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.motivoEstetico}
                    onChange={(e) => updateField('motivoEstetico', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 md:py-3"
                    placeholder="¿Qué te motivó a buscar un tratamiento estético?"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver
              </button>
              <button
                type="submit"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md transition active:scale-95 ${
                  activeTab === 'peso'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                <Check className="h-5 w-5" />
                Completar Registro
              </button>
            </div>
          </form>
        </div>

        {/* Indicador de progreso */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
