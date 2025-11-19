'use client';

import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useGetAllDiets } from '@/hooks/diets/useGetAllDiets';
import AssignDiet from './components/AssignDiet';
import PatientsAssignedViewer from './components/PatientsAssignedViewer';
import AllowedFoods from './components/sections/allowed/AllowedFoods';
import AllowedLiquids from './components/sections/allowed/AllowedLiquids';
import ForbiddenFoods from './components/sections/forbidden/ForbiddenFoods';
import ForbiddenLiquids from './components/sections/forbidden/ForbiddenLiquids';
import Ingredients from './components/sections/Ingredients';
import Duration from './components/sections/Duration';
import Notes from './components/sections/Notes';
import Instructions from './components/sections/Instructions';
import Benefits from './components/sections/Benefits';
import Description from './components/sections/Description';
import AssignedDate from './components/sections/AssignedDate';
import DoctorName from './components/sections/DoctorName';
import Category from './components/sections/Category';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DoctorDietDetail({ params, role, specialty }) {
  const { id } = params;

  const { dietsData, isLoading, error } = useGetAllDiets();
  const diet = dietsData.find((d) => d._id === id);

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [isEditing, setIsEditing] = useState(mode === 'edit');

  // Sync when URL changes
  useEffect(() => {
    setIsEditing(mode === 'edit');
  }, [mode]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-500">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (error || !diet) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <p className="text-gray-600">Error al cargar la dieta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-full overflow-auto bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/${role}/diets`}
          className="mb-6 inline-flex items-center gap-2 font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a Dietas
        </Link>

        {/* Hero section with image */}
        {diet?.images?.[0] && (
          <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-black/20"></div>
            <img
              src={diet.images[0]}
              alt={diet.name}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-0">
        {/* Title section */}
        <div className="mb-8 flex flex-col gap-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{diet?.name}</h1>

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {diet?.category && <Category diet={diet} />}

            {/* Doctor Name */}
            {diet?.doctor?.fullName && <DoctorName diet={diet} />}

            {/* Assigned Date */}
            {diet?.createdAt && <AssignedDate diet={diet} />}
          </div>

          {/* Select Patient to assign the diet */}
          <AssignDiet specialty={specialty} />

          {/* Patients assigned to this diet */}
          <PatientsAssignedViewer patients={diet.patients} />
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {/* Description section */}
          {diet?.description && <Description diet={diet} isEditing={isEditing} />}

          {/* Benefits section */}
          {diet?.benefits && <Benefits diet={diet} isEditing={isEditing} />}

          {/* Instructions section */}
          {diet?.instructions && <Instructions diet={diet} isEditing={isEditing} />}

          {/* Ingredients section */}
          {diet?.ingredients?.length > 0 && <Ingredients diet={diet} isEditing={isEditing} />}

          {/* Allowed foods section */}
          {diet?.allowedFoods?.items?.length > 0 && (
            <AllowedFoods diet={diet} isEditing={isEditing} />
          )}

          {/* Allowed liquids section */}
          {diet?.allowedLiquids?.items?.length > 0 && (
            <AllowedLiquids diet={diet} isEditing={isEditing} />
          )}
          {/* Forbidden foods section */}
          {diet?.forbiddenFoods?.items?.length > 0 && (
            <ForbiddenFoods diet={diet} isEditing={isEditing} />
          )}

          {/* Forbidden liquids section */}
          {diet?.forbiddenLiquids?.items?.length > 0 && (
            <ForbiddenLiquids diet={diet} isEditing={isEditing} />
          )}

          {/* Duration section */}
          {diet?.duration && <Duration diet={diet} isEditing={isEditing} />}

          {/* Medical notes section */}
          {diet?.notes && <Notes diet={diet} isEditing={isEditing} />}
        </div>

        {/* Spacing at bottom */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
