'use client';

import { useState } from 'react';
import { Loader2, Plus, Search } from 'lucide-react';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import WorkoutCard from './components/workoutCard/WorkoutCard';

// Hooks
import { useGetAllWorkouts } from '@/hooks/workouts/useGetAllWorkouts';
import { workoutsMockData } from './components/workoutsMockData';

// Modals
import SharedModalOpenWorkout from '../../../shared/workouts/SharedModalOpenWorkout';
import ModalEditWorkout from './components/modals/ModalEditWorkout';
import ModalDelete from './components/modals/ModalDelete';
import ModalCreateWorkout from './components/modals/ModalCreateWorkout';

export default function DoctorWorkouts({ role }) {
  // Get Workouts from API
  const { workoutData, isLoading, error, refetch: fetchWorkouts } = useGetAllWorkouts();

  // Local States
  const [workouts, setWorkouts] = useState(workoutsMockData);
  const [filterCategorie, setFilterCategorie] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Doctor Actions Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] = useState(false);

  // Workout Modal States
  const [seletctedWorkout, setSelectedWorkout] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['Todos', 'Fuerza', 'Cardio', 'Core', 'Flexibilidad', 'Movilidad'];

  const filteredWorkouts = workoutData.filter((e) => {
    const matchCategorie = filterCategorie === 'Todos' || e.type === filterCategorie;
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategorie && matchSearch;
  });

  const handleSave = (e, form) => {
    e.preventDefault();
    const imagesArray = form.imagenes.split('\n').filter((url) => url.trim());
    const newWorkout = {
      id: editingWorkout ? editingWorkout.id : Date.now(),
      ...form,
      imagenPrincipal: imagesArray[0] || form.imagenPrincipal,
      imagenes: imagesArray,
    };
    if (editingWorkout) {
      setWorkouts(workouts.map((e) => (e.id === editingWorkout.id ? newWorkout : e)));
    } else {
      setWorkouts([...workouts, newWorkout]);
    }
    setShowEditModal(false);
    setEditingWorkout(null);
  };

  // Edit Workout
  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setShowEditModal(true);
  };

  // Delete Workout
  const handleDelete = () => {
    setWorkouts(workouts.filter((e) => e.id !== workoutToDelete.id));
    setShowDeleteModal(false);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {error ? (
          <p className="text-lg font-medium text-red-600">Error al cargar los datos del paciente</p>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-600">Cargando información...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <SharedSectionHeader
        role={role}
        Icon="workouts"
        title={role === 'doctor' ? 'Gestion de Ejercicios' : 'Mis Ejercicios'}
        subtitle={role === 'doctor' ? 'Crea y personaliza ejercicios' : 'Ejercicios Personalizados'}
      />

      <div className="flex flex-col gap-3 md:flex-row">
        {/* Tabs Filter */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategorie(cat)}
              className={`rounded-lg px-4 py-2 font-medium ${
                filterCategorie === cat
                  ? 'bg-beehealth-blue-solid hover:bg-beehealth-blue-hover text-white'
                  : 'bg-beehealth-body-main hover:bg-beehealth-body-main border border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {/* Search Workout */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 outline-none"
            />
          </div>

          {/* Create Workout Button */}
          <button
            onClick={() => {
              setEditingWorkout(null);
              setShowCreateWorkoutModal(true);
            }}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white"
          >
            <Plus className="h-5 w-5" /> Nuevo
          </button>
        </div>
      </div>

      {/* Workout Card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            setShowDeleteModal={setShowDeleteModal}
            setWorkoutToDelete={setWorkoutToDelete}
            handleEdit={handleEdit}
            onOpen={() => {
              setSelectedWorkout(workout);
              setCurrentImageIndex(0);
            }}
          />
        ))}
      </div>

      {/* Workout Modal */}
      {seletctedWorkout && (
        <SharedModalOpenWorkout
          workout={seletctedWorkout}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onClose={() => setSelectedWorkout(null)}
        />
      )}

      {/* Doctor Delete Workout Modal */}
      {showDeleteModal && (
        <ModalDelete
          workoutToDelete={workoutToDelete}
          setSeletctedWorkout={setSelectedWorkout}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {/* Doctor Edit Workout Modal */}
      {showEditModal && (
        <ModalEditWorkout
          setShowEditModal={setShowEditModal}
          editingWorkout={editingWorkout}
          handleSave={handleSave}
        />
      )}

      {/* Doctor Create New Workout Modal */}
      {showCreateWorkoutModal && (
        <ModalCreateWorkout setShowCreateModal={setShowCreateWorkoutModal} />
      )}
    </div>
  );
}
