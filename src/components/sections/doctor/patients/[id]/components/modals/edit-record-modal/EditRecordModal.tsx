'use client';

import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';

import ModalHeader from './components/ModalHeader';
import ShortVersion from './components/ShortVersion';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useEditWorkout } from '@/hooks/workouts/edit/useEditWorkout';
import { useAssignDiet } from '@/hooks/diets/assign/useAssignDiet';
import { useEditClinicalRecord } from '@/hooks/clinicalRecords/edit/useEditClinicalRecord';

export default function EditRecordModal({ onClose, record, specialty, patientId }) {
  console.log(record)
  // Record ID
  const recordId = record?._id;

  // Edit Clinical Record Custom Hook State
  const { isLoading, error, editClinicalRecord } = useEditClinicalRecord();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Diet state
  const [dietSelected, setDietSelected] = useState(null);
  const { editPatients } = useAssignDiet();

  // Workout state
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const { editWorkout } = useEditWorkout();

  // Close Modal handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Form data
  const [formData, setFormData] = useState({
    7: '',
    8: '',
    18: '',
    19: '',
    122: '',
    133: '',
    148: '',
    149: '',
  });

  // Populate form data with existing record answers
  useEffect(() => {
    if (record?.answers) {
      const initial = {
        1: '',
        6: '',
        7: '',
        8: '',
        18: '',
        19: '',
        122: '',
        123: '',
        125: '',
        126: '',
        133: '',
        148: '',
        149: '',
      };
      record.answers.forEach((ans) => {
        initial[ans.question?.questionId] = ans.value || '';
      });
      setFormData(initial);
    }
  }, [record]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        className="bg-beehealth-body-main relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          title="Editar Historial Clínico"
          subtitle="Edita los campos que sean necesarios"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Main content */}
        <form
          // onSubmit={handleSubmit}
          className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8"
        >
          <ShortVersion
            patientId={patientId}
            specialty={specialty}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            onClose={onClose}
            setDietSelected={setDietSelected}
            setWorkoutSelected={setWorkoutSelected}
          />
        </form>
      </div>
    </div>
  );
}
