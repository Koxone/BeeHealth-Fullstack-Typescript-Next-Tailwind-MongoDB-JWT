import { Plus } from 'lucide-react';
import GeneralDietCard from './components/dietCard/GeneralDietCard';
import Link from 'next/link';
export const runtime = 'nodejs';
import { diets } from './components/dietCard/components/mockData';
import GeneralSectionHeader from '../sections/GeneralSectionHeader';

export default async function SharedDiets({ role }) {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <GeneralSectionHeader
          role={role}
          Icon="diets"
          title={role === 'doctor' ? 'Gestion de Dietas' : 'Mis Dietas'}
          subtitle={
            role === 'doctor'
              ? 'Crea y personaliza planes nutricionales'
              : 'Planes nutricionales personalizados'
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diets.map((diet) => (
          <GeneralDietCard role={role} diet={diet} key={diet.id} />
        ))}
      </div>
    </div>
  );
}
