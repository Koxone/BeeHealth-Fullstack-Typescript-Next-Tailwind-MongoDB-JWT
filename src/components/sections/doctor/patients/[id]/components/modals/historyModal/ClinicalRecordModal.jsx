'use client';

import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { useModalClose } from '@/hooks/useModalClose';
import { useCreateClinicalRecordDoctor } from '@/hooks/clinicalRecords/create/useCreateClinicalRecordDoctor';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import { useEditWorkout } from '@/hooks/workouts/edit/useEditWorkout';
import { useAssignDiet } from '@/hooks/diets/assign/useAssignDiet';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import ShortVersion from './components/ShortVersion';
import FullVersion from './components/FullVersion';

export default function ClinicalRecordModal({
  onClose,
  record,
  specialty,
  readOnly,
  patientId,
  mode = 'view',
  fetchRecord,
}) {
  // Readonly state
  const [isReadOnly, setIsReadOnly] = useState(!!readOnly);
  const [activeTab, setActiveTab] = useState('basico');

  // Diet state
  const [dietSelected, setDietSelected] = useState(null);
  const { editPatients } = useAssignDiet();

  // Workout state
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const { editWorkout } = useEditWorkout();

  // Close handler
  const { handleOverlayClick } = useModalClose(onClose);

  const isCreate = mode === 'create';

  // Form data
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (record?.answers) {
      const initial = {};
      record.answers.forEach((ans) => {
        initial[ans.question?.questionId] = ans.value || '';
      });
      setFormData(initial);
    }
  }, [record]);

  const { submit, isSubmitting, error } = useCreateClinicalRecordDoctor();
  const { questions } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'short' && q.specialty === specialty);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect answers
    const answers = Object.entries(formData).map(([questionId, value]) => {
      const question = filtered?.find((q) => q.questionId === parseInt(questionId, 10));
      return {
        questionId: question?._id,
        value,
      };
    });

    // Assign diet to patient if selected
    if (dietSelected) {
      try {
        await editPatients(dietSelected, [patientId]);
      } catch (err) {
        console.error('Error assigning diet:', err);
        return;
      }
    }

    // Assign workout to patient if selected
    if (workoutSelected) {
      try {
        await editWorkout(workoutSelected, [patientId]);
        console.log('Koxone:', workoutSelected, patientId);
      } catch (err) {
        console.error('Error assigning workout:', err);
        return;
      }
    }

    // Submit clinical record including dietId
    const result = await submit({
      patientId,
      specialty,
      version: 'short',
      answers,
      dietId: dietSelected || null,
      workoutId: workoutSelected || null,
    });

    if (result.ok) {
      onClose();
      fetchRecord();
    }
  };

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
          title={
            record
              ? isReadOnly
                ? 'Ver Historial Clínico'
                : isCreate
                  ? 'Nuevo Historial Clínico'
                  : 'Editar Historial Clínico'
              : 'Nuevo Historial Clínico'
          }
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8"
        >
          {activeTab === 'basico' && (
            <ShortVersion
              specialty={specialty}
              isReadOnly={isReadOnly}
              formData={formData}
              setFormData={setFormData}
              activeTab={activeTab}
              isCreate={isCreate}
              isSubmitting={isSubmitting}
              onClose={onClose}
              dietSelected={dietSelected}
              setDietSelected={setDietSelected}
              workoutSelected={workoutSelected}
              setWorkoutSelected={setWorkoutSelected}
            />
          )}

          {activeTab === 'completo' && (
            <FullVersion
              specialty={specialty}
              isReadOnly={isReadOnly}
              formData={formData}
              setFormData={setFormData}
              patientId={patientId}
            />
          )}
        </form>
      </div>
    </div>
  );
}
