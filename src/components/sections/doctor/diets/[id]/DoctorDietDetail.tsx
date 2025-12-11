'use client';

import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Custom Hooks
import { useEditDiet } from '@/hooks/diets/edit/useEditDiet';
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';

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
import GoBackButton from '@/components/shared/diets/GoBackButton';
import DietImage from './components/sections/DietImage';
import Name from './components/sections/Name';
import LoadingState from '@/components/shared/feedback/LoadingState';
import Images from './components/sections/Images';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';

export default function DoctorDietDetail({ params, specialty }) {
  const { id } = params;

  // Fetch all diets Custom Hook
  const { dietsData, isLoading, error, refetch } = useGetAllDiets();
  const refreshDiets = () => {
    refetch();
  };

  // Edit Diet Custom Hook
  const { isLoading: isEditingDiet, error: editError, editDiet } = useEditDiet();

  const diet = dietsData.find((d) => d._id === id);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [isReading, setIsReading] = useState(mode !== 'edit');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync when URL changes
  useEffect(() => {
    setIsEditing(mode === 'edit');
    setIsReading(mode !== 'edit');
  }, [mode]);

  if (isLoading || isEditingDiet) {
    return <LoadingState />;
  }

  if (error || !diet || editError) {
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
    <div className="bg-beehealth-body-main h-full min-h-full overflow-auto">
      {/* Success Modal */}
      <SuccessModal
        title={isEditing ? 'Dieta editada con éxito' : 'Dieta creada con éxito'}
        message="La información fue guardada correctamente."
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />

      {/* Header */}
      <div className="mb-8">
        {/* Go Back Button */}
        <GoBackButton />

        {/* Hero section with image */}
        {diet?.images?.[0] && <DietImage diet={diet} />}
        {isEditing && (
          <Images
            diet={diet}
            isEditing={isEditing}
            editDiet={editDiet}
            refreshDiets={refreshDiets}
            setShowSuccessModal={setShowSuccessModal}
          />
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto px-0">
        {/* Title section */}
        <div className="mb-8 flex flex-col gap-6">
          <Name
            diet={diet}
            isEditing={isEditing}
            editDiet={editDiet}
            setShowSuccessModal={setShowSuccessModal}
            refreshDiets={refreshDiets}
          />

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {diet?.category && <Category diet={diet} />}

            {/* Doctor Name */}
            {diet?.doctor?.fullName && <DoctorName diet={diet} />}

            {/* Assigned Date */}
            {diet?.createdAt && <AssignedDate diet={diet} />}
          </div>

          {/* Select Patient to assign the diet */}
          <AssignDiet specialty={specialty} dietId={id} diet={diet} refetch={refetch} />

          {/* Patients assigned to this diet */}
          <PatientsAssignedViewer patients={diet.patients} />
        </div>

        {/* Collapse toggle */}
        {isReading && (
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mb-6 rounded-lg px-4 py-2 text-white"
          >
            {isCollapsed ? 'Ocultar dieta' : 'Mostrar dieta'}
          </button>
        )}

        {/* Content sections */}
        {(isEditing || isCollapsed) && (
          <div className="space-y-6">
            {/* Description section */}
            {diet?.description && (
              <Description
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Benefits section */}
            {diet?.benefits && (
              <Benefits
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Instructions section */}
            {diet?.instructions && (
              <Instructions
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Ingredients section */}
            {diet?.ingredients?.length > 0 && (
              <Ingredients
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Allowed foods section */}
            {diet?.allowedFoods?.items?.length > 0 && (
              <AllowedFoods
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Allowed liquids section */}
            {diet?.allowedLiquids?.items?.length > 0 && (
              <AllowedLiquids
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}
            {/* Forbidden foods section */}
            {diet?.forbiddenFoods?.items?.length > 0 && (
              <ForbiddenFoods
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Forbidden liquids section */}
            {diet?.forbiddenLiquids?.items?.length > 0 && (
              <ForbiddenLiquids
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Duration section */}
            {diet?.duration && (
              <Duration
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Medical notes section */}
            {diet?.notes && (
              <Notes
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}
          </div>
        )}

        {/* Spacing at bottom */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
