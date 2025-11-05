import DietForm from './components/DietForm';
import TopBar from './components/TopBar';

export default function DoctorDietNew() {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <TopBar label="Volver a Dietas" />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Crear Nueva Dieta</h1>

        <DietForm />
      </div>
    </div>
  );
}
