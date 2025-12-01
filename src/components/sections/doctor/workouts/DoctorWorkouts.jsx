'use client';

import { useState } from 'react';
import { Loader2, Plus, Search } from 'lucide-react';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import WorkoutCard from './components/workoutCard/WorkoutCard';
import LoadingState from '@/components/shared/feedback/LoadingState';

// Hooks
import { useGetAllWorkouts } from '@/hooks/workouts/useGetAllWorkouts';
import { workoutsMockData } from './components/workoutsMockData';
import { useDeleteWorkout } from '@/hooks/workouts/useDeleteWorkout';

// Modals
import SharedModalOpenWorkout from '@/components/shared/workouts/SharedModalOpenWorkout';
import ModalEditWorkout from './components/modals/ModalEditWorkout';
import ModalDelete from './components/modals/ModalDelete';
import ModalCreateWorkout from './components/modals/create/ModalCreateWorkout';

export default function DoctorWorkouts({ role }) {
  // Get Workouts from API
  const { workoutData, isLoading, error, refetch: fetchWorkouts } = useGetAllWorkouts();

  // Delete Workout Hook
  const { deleteWorkout } = useDeleteWorkout();

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
  const handleDelete = async () => {
    if (!workoutToDelete) return;
    const result = await deleteWorkout({ id: workoutToDelete._id });
    if (result) {
      setWorkouts(workouts.filter((e) => e._id !== workoutToDelete._id));
      fetchWorkouts();
    }
    setShowDeleteModal(false);
  };

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <SharedSectionHeader
        role={role}
        Icon="workouts"
        newWorkout
        setEditingWorkout={setEditingWorkout}
        setShowCreateWorkoutModal={setShowCreateWorkoutModal}
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
                  ? 'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover text-white'
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
