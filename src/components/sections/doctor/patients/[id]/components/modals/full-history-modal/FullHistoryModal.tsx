'use client';

import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';

import ModalHeader from './components/ModalHeader';
import FullVersion from './components/FullVersion';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useCreateClinicalRecordDoctor } from '@/hooks/clinicalRecords/create/useCreateClinicalRecordDoctor';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';

export default function FullHistoryModal({
  onClose,
  record,
  specialty,
  patientId,
  fetchRecord,
  setShowSuccessModal,
}) {
  // Is editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Close handler
  const { handleOverlayClick } = useModalClose(onClose);

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

    // Submit clinical record including dietId
    const result = await submit({
      patientId,
      specialty,
      version: 'short',
      answers,
    });

    if (result.ok) {
      onClose();
      fetchRecord();
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 1000);
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
          title="Historia Clínica Completa"
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Main content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8"
        >
          <FullVersion
            specialty={specialty}
            patientId={patientId}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </form>
      </div>
    </div>
  );
}
