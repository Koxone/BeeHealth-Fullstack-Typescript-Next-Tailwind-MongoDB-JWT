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
  Plus,
  Edit2,
  Trash2,
  Search,
} from 'lucide-react';
import ModalAddEdit from './ModalAddEdit';
import ModalDelete from './ModalDelete';

const ejerciciosDataInicial = [
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
    instrucciones:
      'Párate con los pies al ancho de los hombros\nMantén la espalda recta\nBaja lentamente doblando las rodillas\nDesciende hasta que tus muslos estén paralelos al suelo\nEmpuja con los talones para volver a la posición inicial',
    beneficios:
      'Fortalece cuádriceps, glúteos e isquiotibiales\nMejora la movilidad de cadera\nAumenta la fuerza del core\nQuema calorías efectivamente',
    precauciones:
      'No dejes que las rodillas sobrepasen los dedos de los pies\nMantén siempre la espalda recta\nSi tienes problemas de rodilla, consulta antes de realizar',
  },
];

export default function DoctorExercises() {
  const [ejercicios, setEjercicios] = useState(ejerciciosDataInicial);
  const [filterCategoria, setFilterCategoria] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingEjercicio, setEditingEjercicio] = useState(null);
  const [ejercicioToDelete, setEjercicioToDelete] = useState(null);

  const categorias = ['Todos', 'Fuerza', 'Cardio', 'Core', 'Flexibilidad', 'Movilidad'];

  const filteredEjercicios = ejercicios.filter((e) => {
    const matchCategoria = filterCategoria === 'Todos' || e.categoria === filterCategoria;
    const matchSearch = e.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategoria && matchSearch;
  });

  const handleSave = (e, form) => {
    e.preventDefault();
    const imagenesArray = form.imagenes.split('\n').filter((url) => url.trim());
    const nuevoEjercicio = {
      id: editingEjercicio ? editingEjercicio.id : Date.now(),
      ...form,
      imagenPrincipal: imagenesArray[0] || form.imagenPrincipal,
      imagenes: imagenesArray,
    };
    if (editingEjercicio) {
      setEjercicios(ejercicios.map((e) => (e.id === editingEjercicio.id ? nuevoEjercicio : e)));
    } else {
      setEjercicios([...ejercicios, nuevoEjercicio]);
    }
    setShowModal(false);
    setEditingEjercicio(null);
  };

  const handleEdit = (ejercicio) => {
    setEditingEjercicio(ejercicio);
    setShowModal(true);
  };

  const handleDelete = () => {
    setEjercicios(ejercicios.filter((e) => e.id !== ejercicioToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Ejercicios</h1>
        <p className="text-gray-600">Crear y administrar ejercicios</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex gap-2 overflow-x-auto">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategoria(cat)}
              className={`rounded-lg px-4 py-2 font-medium ${
                filterCategoria === cat
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              setEditingEjercicio(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            <Plus className="h-5 w-5" /> Nuevo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEjercicios.map((e) => (
          <div
            key={e.id}
            className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg"
          >
            {/* Imagen */}
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <img
                src={e.imagenPrincipal}
                alt={e.nombre}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Nombre y categoría */}
            <div className="mt-3">
              <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                {e.nombre}
              </h3>
              <p className="text-sm text-gray-600">{e.categoria}</p>
            </div>

            {/* Botones */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(e)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 active:scale-95"
              >
                <Edit2 className="h-4 w-4" />
                Editar
              </button>
              <button
                onClick={() => {
                  setEjercicioToDelete(e);
                  setShowDeleteModal(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </button>
            </div>

            {/* Overlay de acción rápida */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-blue-50/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {showModal && (
        <ModalAddEdit
          setShowModal={setShowModal}
          editingEjercicio={editingEjercicio}
          handleSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <ModalDelete
          ejercicioToDelete={ejercicioToDelete}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}
