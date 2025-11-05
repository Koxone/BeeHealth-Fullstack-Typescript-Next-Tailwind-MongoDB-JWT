import GoBackButton from './components/GoBackButton';
import DietHeader from './components/DietHeader';
import SectionCard from './components/SectionCard';
import MealPlan from './components/MealPlan';
import DietNotesAndInstructions from './components/DietNotesAndInstructions';
import DietAssignedToPatients from './components/DietAssignedToPatients';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

// Mock Data for Diets
import { diet } from './components/GeneralDietsMockData';
import { Apple } from 'lucide-react';

export default async function GeneralDietDetail() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <GoBackButton />

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Diet Image */}
        <div className="flex h-64 items-center justify-center rounded-t-xl bg-linear-to-br from-green-100 to-blue-100">
          <Apple className="h-32 w-32 text-green-600" />
        </div>

        <div className="p-4 md:p-6">
          <DietHeader
            title={diet.nombre}
            duration={diet.duracion}
            assignedCount={diet.pacientesAsignados}
            role={role}
          />

          <div className="space-y-4 md:space-y-6">
            <SectionCard title="Descripción">
              <p className="text-gray-600">{diet.descripcion}</p>
            </SectionCard>

            <SectionCard title="Plan Diario de Comidas">
              <MealPlan blocks={diet.plan} />
            </SectionCard>

            <SectionCard title="Notas e Instrucciones">
              <DietNotesAndInstructions text={diet.notas} />
            </SectionCard>

            {role === 'doctor' && (
              <SectionCard title="Pacientes Asignados">
                <DietAssignedToPatients patients={diet.pacientes} />
              </SectionCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
