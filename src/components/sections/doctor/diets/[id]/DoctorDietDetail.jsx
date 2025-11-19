'use client';

import { ArrowLeft, Apple, Clock, User, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { diets } from '@/components/shared/diets/[id]/components/sharedDietsMockData';
import { useGetAllDiets } from '@/hooks/diets/useGetAllDiets';

export default function DoctorDietDetail({ params, role }) {
  // Get diet details based on ID from params
  const { id } = params;

  // Fetch all diets
  const { dietsData, isLoading, isError } = useGetAllDiets();
  const diet = dietsData.find((d) => d._id === id);
  console.log(diet);

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <Link
        href={`/${role}/diets`}
        className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver a Dietas
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Diet Image */}
        <div className="flex h-60 items-center justify-center bg-linear-to-br from-green-100 to-blue-100">
          <img
            src={diet?.images?.[0]}
            alt={diet?.name}
            className="h-full w-full rounded-t-xl object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{diet?.name}</h1>

          <div className="mb-6 flex flex-wrap gap-4">
            {/* Category */}
            <div className="flex items-center gap-2 text-gray-600">
              <Tag className="h-5 w-5" />
              <span>{diet?.category}</span>
            </div>

            {/* Doctors Name */}
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              <span>Dr. {diet?.doctor?.fullName}</span>
            </div>

            {/* Assigned Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>
                {new Date(diet?.createdAt).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="prose max-w-none">
            {/* Description */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Descripción</h2>
              <p className="mb-6 text-gray-600">{diet?.description}</p>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Beneficios</h2>
              <p className="mb-6 text-gray-600">{diet?.benefits}</p>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Instrucciones</h2>
              <div className="mb-6 space-y-4">
                {/* {diet.map((meal, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {meal.title} ({meal.time})
                  </h3>

                  <ul className="list-inside list-disc space-y-1 text-gray-600">
                    {meal.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))} */}
                {diet?.ingredients?.map((ingredient, index) => (
                  <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
                    {ingredient}
                  </h2>
                ))}
              </div>
            </div>

            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Notas del Médico
            </h2>
            <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="text-gray-700">{diet?.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
