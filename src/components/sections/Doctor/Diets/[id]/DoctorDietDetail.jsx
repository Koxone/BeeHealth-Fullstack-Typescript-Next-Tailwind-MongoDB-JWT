'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/* UI blocks */
import TopBar from './Components/TopBar';
import DietHeader from './Components/DietHeader';
import SectionCard from './Components/SectionCard';
import MealPlan from './Components/MealPlan';
import NotesCallout from './Components/NotesCallout';
import PatientsList from './Components/PatientsList';

export default function DoctorDietDetail({ params }) {
  const router = useRouter();

  // En una integración real, aquí harías fetch con params.id
  const diet = {
    id: params?.id ?? 'mediterraneo',
    nombre: 'Plan Mediterráneo',
    duracion: '30 días',
    pacientesAsignados: 12,
    descripcion:
      'Dieta balanceada rica en vegetales, frutas, pescado y aceite de oliva. Este plan está diseñado para ayudar a los pacientes a alcanzar sus objetivos de peso de manera saludable y sostenible.',
    plan: [
      {
        titulo: 'Desayuno',
        hora: '8:00 AM',
        items: ['1 taza de avena con frutas', '1 yogurt natural', 'Té verde o café sin azúcar'],
      },
      {
        titulo: 'Almuerzo',
        hora: '1:00 PM',
        items: [
          'Ensalada verde con aceite de oliva',
          '150g de pescado a la plancha',
          '1 porción de arroz integral',
          'Agua natural',
        ],
      },
      {
        titulo: 'Cena',
        hora: '7:00 PM',
        items: [
          'Sopa de verduras',
          'Pechuga de pollo a la plancha',
          'Ensalada mixta',
          'Infusión de hierbas',
        ],
      },
    ],
    notas:
      'Recuerda mantener una hidratación adecuada (2 litros de agua al día). Evita alimentos procesados y azúcares refinados. Complementa con 30 minutos de ejercicio moderado diario.',
    pacientes: ['Juan Pérez', 'María López', 'Carlos Ruiz', 'Ana Martínez'],
  };

  const handleBack = useCallback(() => router.back(), [router]);
  const handleEdit = useCallback(() => {
    // TODO: navegación o modal de edición
    console.log('Editar dieta', diet.id);
  }, [diet.id]);

  const handleDelete = useCallback(() => {
    // TODO: confirmación/eliminación
    console.log('Eliminar dieta', diet.id);
  }, [diet.id]);

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <TopBar onBack={handleBack} />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <DietHeader
          title={diet.nombre}
          duration={diet.duracion}
          assignedCount={diet.pacientesAsignados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="space-y-4 md:space-y-6">
          <SectionCard title="Descripción">
            <p className="text-gray-600">{diet.descripcion}</p>
          </SectionCard>

          <SectionCard title="Plan Diario de Comidas">
            <MealPlan blocks={diet.plan} />
          </SectionCard>

          <SectionCard title="Notas e Instrucciones">
            <NotesCallout text={diet.notas} />
          </SectionCard>

          <SectionCard title="Pacientes Asignados">
            <PatientsList patients={diet.pacientes} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
