'use client';

import { useRouter } from 'next/navigation';
import { Apple, Plus, Edit, Eye } from 'lucide-react';

const diets = [
  { id: 1, nombre: 'Plan Mediterráneo', pacientes: 12, duracion: '30 días' },
  { id: 2, nombre: 'Plan Bajo en Carbohidratos', pacientes: 8, duracion: '45 días' },
  { id: 3, nombre: 'Plan Vegetariano', pacientes: 5, duracion: '60 días' },
  { id: 4, nombre: 'Plan Keto', pacientes: 3, duracion: '90 días' },
];

export default function DoctorDiets() {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Gestión de Dietas</h1>
          <p className="text-gray-600">Crea y administra planes nutricionales</p>
        </div>
        <button
          onClick={() => router.push('/doctor/diets/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Nueva Dieta
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diets.map((diet) => (
          <div
            key={diet.id}
            className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg md:p-6"
          >
            {/* Imagen/Icono */}
            <div className="relative mb-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100">
              <Apple className="h-12 w-12 text-green-600 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Título */}
            <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {diet.nombre}
            </h3>

            {/* Información */}
            <div className="mb-4 space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Asignado a:</span> {diet.pacientes}{' '}
                Pacientes
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Duración:</span> {diet.duracion}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/doctor/diets/${diet.id}`)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:scale-95"
              >
                <Eye className="h-4 w-4" />
                Ver
              </button>
              <button
                onClick={() => router.push(`/doctor/diets/${diet.id}`)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                <Edit className="h-4 w-4" />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
