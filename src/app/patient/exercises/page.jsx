'use client';

import { useState } from 'react';
import {
  Dumbbell,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Info,
  AlertCircle,
  Target,
} from 'lucide-react';

const ejerciciosData = [
  {
    id: 1,
    nombre: 'Sentadillas',
    categoria: 'Fuerza',
    duracion: '3 series de 15 repeticiones',
    nivel: 'Intermedio',
    imagenPrincipal: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
    imagenes: [
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
    ],
    videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
    explicacion:
      'Las sentadillas son un ejercicio fundamental para fortalecer las piernas y glúteos. Este movimiento compuesto trabaja múltiples grupos musculares simultáneamente.',
    instrucciones: [
      'Párate con los pies al ancho de los hombros',
      'Mantén la espalda recta y el pecho hacia arriba',
      'Baja lentamente doblando las rodillas',
      'Desciende hasta que tus muslos estén paralelos al suelo',
      'Empuja con los talones para volver a la posición inicial',
    ],
    beneficios: [
      'Fortalece cuádriceps, glúteos e isquiotibiales',
      'Mejora la movilidad de cadera',
      'Aumenta la fuerza del core',
      'Quema calorías efectivamente',
    ],
    precauciones: [
      'No dejes que las rodillas sobrepasen los dedos de los pies',
      'Mantén siempre la espalda recta',
      'Si tienes problemas de rodilla, consulta antes de realizar',
    ],
  },
  {
    id: 2,
    nombre: 'Plancha Abdominal',
    categoria: 'Core',
    duracion: '3 series de 30 segundos',
    nivel: 'Principiante',
    imagenPrincipal: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    imagenes: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
    ],
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
    explicacion:
      'La plancha es un ejercicio isométrico excelente para fortalecer todo el core, incluyendo abdominales, espalda baja y hombros.',
    instrucciones: [
      'Colócate en posición de flexión sobre los antebrazos',
      'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
      'Contrae el abdomen y glúteos',
      'Mantén la posición sin dejar caer las caderas',
      'Respira de manera constante',
    ],
    beneficios: [
      'Fortalece el core completo',
      'Mejora la postura',
      'Reduce el dolor de espalda',
      'Aumenta la estabilidad',
    ],
    precauciones: [
      'No arquees la espalda',
      'Mantén el cuello en posición neutral',
      'Si sientes dolor en la espalda baja, detente',
    ],
  },
  {
    id: 3,
    nombre: 'Burpees',
    categoria: 'Cardio',
    duracion: '3 series de 10 repeticiones',
    nivel: 'Avanzado',
    imagenPrincipal: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    imagenes: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    ],
    videoUrl: 'https://www.youtube.com/embed/dZgVxmf6jkA',
    explicacion:
      'Los burpees son un ejercicio de cuerpo completo que combina fuerza y cardio, ideal para quemar calorías y mejorar la resistencia.',
    instrucciones: [
      'Comienza de pie',
      'Baja a posición de cuclillas y coloca las manos en el suelo',
      'Salta con los pies hacia atrás a posición de plancha',
      'Realiza una flexión (opcional)',
      'Salta con los pies hacia adelante',
      'Salta verticalmente con los brazos arriba',
    ],
    beneficios: [
      'Ejercicio de cuerpo completo',
      'Quema muchas calorías',
      'Mejora la resistencia cardiovascular',
      'Aumenta la fuerza funcional',
    ],
    precauciones: [
      'Calienta bien antes de realizar',
      'Mantén el core contraído durante todo el movimiento',
      'Modifica si tienes problemas de muñeca o rodilla',
    ],
  },
  {
    id: 4,
    nombre: 'Estiramiento de Gato-Vaca',
    categoria: 'Flexibilidad',
    duracion: '2 series de 10 repeticiones',
    nivel: 'Principiante',
    imagenPrincipal: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    imagenes: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
    ],
    videoUrl: 'https://www.youtube.com/embed/kqnua4rHVVA',
    explicacion:
      'Este estiramiento de yoga es perfecto para mejorar la flexibilidad de la columna y aliviar la tensión en la espalda.',
    instrucciones: [
      'Colócate en cuatro puntos (manos y rodillas)',
      'Arquea la espalda hacia arriba (posición de gato)',
      'Mantén 5 segundos',
      'Arquea la espalda hacia abajo (posición de vaca)',
      'Mantén 5 segundos',
      'Repite el movimiento fluidamente',
    ],
    beneficios: [
      'Mejora la flexibilidad de la columna',
      'Alivia la tensión en la espalda',
      'Masajea los órganos internos',
      'Reduce el estrés',
    ],
    precauciones: [
      'Realiza los movimientos lentamente',
      'No fuerces el rango de movimiento',
      'Respira profundamente durante el ejercicio',
    ],
  },
];

export default function PatientExercises() {
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filterCategoria, setFilterCategoria] = useState('Todos');

  const categorias = ['Todos', 'Fuerza', 'Cardio', 'Core', 'Flexibilidad'];

  const filteredEjercicios =
    filterCategoria === 'Todos'
      ? ejerciciosData
      : ejerciciosData.filter((e) => e.categoria === filterCategoria);

  const nextImage = () => {
    if (selectedEjercicio) {
      setCurrentImageIndex((prev) =>
        prev === selectedEjercicio.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEjercicio) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedEjercicio.imagenes.length - 1 : prev - 1
      );
    }
  };

  const getNivelColor = (nivel) => {
    const colores = {
      Principiante: 'bg-green-100 text-green-800',
      Intermedio: 'bg-yellow-100 text-yellow-800',
      Avanzado: 'bg-red-100 text-red-800',
    };
    return colores[nivel] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Rutina de Ejercicios</h1>
        <p className="text-sm text-gray-600 md:text-base">Ejercicios asignados por tu médico</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategoria(cat)}
            className={`rounded-lg px-4 py-2 font-medium whitespace-nowrap transition active:scale-95 ${
              filterCategoria === cat
                ? 'bg-blue-500 text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de ejercicios */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEjercicios.map((ejercicio) => (
          <div
            key={ejercicio.id}
            onClick={() => {
              setSelectedEjercicio(ejercicio);
              setCurrentImageIndex(0);
            }}
            className="group cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-lg active:scale-95"
          >
            {/* Imagen principal */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={ejercicio.imagenPrincipal}
                alt={ejercicio.nombre}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradiente superior para destacar etiquetas */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Nivel */}
              <div className="absolute top-3 right-3">
                <span
                  className={`rounded-full bg-white/80 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${getNivelColor(
                    ejercicio.nivel
                  )}`}
                >
                  {ejercicio.nivel}
                </span>
              </div>

              {/* Categoría */}
              <div className="absolute bottom-3 left-3">
                <span className="rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                  {ejercicio.categoria}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                {ejercicio.nombre}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{ejercicio.duracion}</span>
              </div>

              <p className="mt-3 text-sm font-medium text-blue-600 opacity-90 transition-opacity group-hover:opacity-100">
                Click para ver detalles →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalle */}
      {selectedEjercicio && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={() => setSelectedEjercicio(null)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEjercicio.nombre}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getNivelColor(selectedEjercicio.nivel)}`}
                    >
                      {selectedEjercicio.nivel}
                    </span>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {selectedEjercicio.categoria}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEjercicio(null)}
                  className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Carousel de imágenes */}
                <div className="relative">
                  <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 md:h-96">
                    <img
                      src={selectedEjercicio.imagenes[currentImageIndex]}
                      alt={`${selectedEjercicio.nombre} - Imagen ${currentImageIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {selectedEjercicio.imagenes.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 active:scale-95"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 active:scale-95"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                          {selectedEjercicio.imagenes.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-2 w-2 rounded-full transition ${
                                index === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Video */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Play className="h-5 w-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Video Tutorial</h3>
                  </div>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={selectedEjercicio.videoUrl}
                      className="absolute top-0 left-0 h-full w-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Duración */}
                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duración</p>
                    <p className="font-semibold text-gray-900">{selectedEjercicio.duracion}</p>
                  </div>
                </div>

                {/* Explicación */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Explicación</h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">{selectedEjercicio.explicacion}</p>
                </div>

                {/* Instrucciones */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Instrucciones</h3>
                  </div>
                  <ol className="space-y-2">
                    {selectedEjercicio.instrucciones.map((inst, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                          {index + 1}
                        </span>
                        <span className="pt-0.5 text-gray-700">{inst}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Beneficios */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Beneficios</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedEjercicio.beneficios.map((ben, index) => (
                      <li key={index} className="flex gap-2 text-gray-700">
                        <span className="font-bold text-green-600">✓</span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precauciones */}
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Precauciones</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedEjercicio.precauciones.map((prec, index) => (
                      <li key={index} className="flex gap-2 text-gray-700">
                        <span className="font-bold text-yellow-600">⚠</span>
                        <span>{prec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
