'use client';

import { useRouter } from 'next/navigation';
import EmptyState from './Components/EmptyState';
import DietCard from './Components/DietCard';
import { diets } from './Components/mockData';

export default function PatientDiets() {
  const router = useRouter();

  const handleOpen = (id) => router.push(`/patient/diets/${id}`);

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Mis Dietas</h1>
        <p className="text-gray-600">Planes nutricionales personalizados</p>
      </div>

      {diets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {diets.map((diet) => (
            <DietCard key={diet.id} diet={diet} onOpen={() => handleOpen(diet.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
