'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import WorkoutCard from './components/WorkoutCard';
import { useGetAllWorkouts } from '@/hooks/workouts/useGetAllWorkouts';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import SharedModalOpenWorkout from '../../../shared/workouts/SharedModalOpenWorkout';

export default function PatientWorkouts({ role }) {
  // Get Workouts from API
  const { workoutData, isLoading, error, refetch: fetchWorkouts } = useGetAllWorkouts();

  // Local States
  const [filterCategorie, setFilterCategorie] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Workout Modal States
  const [seletctedWorkout, setSelectedWorkout] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['Todos', 'Fuerza', 'Cardio', 'Core', 'Flexibilidad', 'Movilidad'];

  const filteredWorkouts = workoutData.filter((e) => {
    const matchCategorie = filterCategorie === 'Todos' || e.type === filterCategorie;
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategorie && matchSearch;
  });

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
        </div>
      </div>

      {/* Workout Card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
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
    </div>
  );
}
