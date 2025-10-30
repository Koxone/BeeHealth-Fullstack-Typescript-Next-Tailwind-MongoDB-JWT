'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

import ModalDelete from './components/ModalDelete';
import ModalAddEdit from './components/ModalAddEdit';
import { workoutsMockData } from './components/workoutsMockData';
import WorkoutCard from './components/WorkoutCard';
import WorkoutModal from './components/WorkoutModal';
import GeneralSectionHeader from '../sections/GeneralSectionHeader';

export default function GeneralWorkouts({ role }) {
  // Local States
  const [workouts, setWorkouts] = useState(workoutsMockData);
  const [filterCategorie, setFilterCategorie] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Doctor Actions Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Workout Modal States
  const [seletctedWorkout, setSelectedWorkout] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['Todos', 'Fuerza', 'Cardio', 'Core', 'Flexibilidad', 'Movilidad'];

  const filteredWorkouts = workouts.filter((e) => {
    const matchCategorie = filterCategorie === 'Todos' || e.categoria === filterCategorie;
    const matchSearch = e.nombre.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <GeneralSectionHeader
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
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 bg-white hover:bg-gray-50'
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
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Doctor New Workout Button */}
          {role === 'doctor' && (
            <button
              onClick={() => {
                setEditingWorkout(null);
                setShowEditModal(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              <Plus className="h-5 w-5" /> Nuevo
            </button>
          )}
        </div>
      </div>

      {/* Workout Card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            role={role}
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
        <WorkoutModal
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

      {/* Doctor Create New Workout Modal */}
      {showEditModal && (
        <ModalAddEdit
          setShowEditModal={setShowEditModal}
          editingWorkout={editingWorkout}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}
