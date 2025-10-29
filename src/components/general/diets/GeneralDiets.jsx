import { Plus } from 'lucide-react';
import GeneralDietCard from './components/dietCard/GeneralDietCard';
import Link from 'next/link';
export const runtime = 'nodejs';
import { diets } from './components/dietCard/components/mockData';

export default async function GeneralDiets({ role }) {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {role === 'doctor' ? 'Gestión de Dietas' : 'Mis Dietas'}
          </h1>
          <p className="text-gray-600">
            {role === 'doctor'
              ? 'Crea y administra planes nutricionales'
              : 'Planes nutricionales personalizados'}
          </p>
        </div>

        {/* New Diet Button */}
        {role === 'doctor' && (
          <Link
            href="/doctor/diets/new"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Nueva Dieta
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diets.map((diet) => (
          <GeneralDietCard role={role} diet={diet} key={diet.id} />
        ))}
      </div>
    </div>
  );
}
