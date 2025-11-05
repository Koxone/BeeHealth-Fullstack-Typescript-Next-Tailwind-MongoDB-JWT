// src/components/sections/doctor/patients/[id]/components/historyModal/HistoryModal.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import ModalOverlay from './components/ModalOverlay';
import ModalContainer from './components/ModalContainer';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import BasicInfoSection from './components/BasicInfoSection';
import VitalsSection from './components/VitalsSection';
import DiagnosisSection from './components/DiagnosisSection';
import QuestionnaireSection from './components/QuestionnaireSection';
import FooterActions from './components/FooterActions';
import { X, FileText, Stethoscope, ClipboardList } from 'lucide-react';
import useAuthStore from '@/zustand/useAuthStore';

// Ids mapping
const ID = {
  fullName: 1,
  height: 6,
  weight: 7,
  size: 8,
  bloodPressure: 122,
  heartRate: 123,
  temperature: 125,
  imc: 127,
  diagnosis: 131,
  treatment: 132,
  notes: 133,
};

export default function HistoryModal({ onClose, onSaved, record, readOnly, patientId }) {
  const { user } = useAuthStore();

  // Single source of truth
  const [answersDraft, setAnswersDraft] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(!!readOnly);
  const [activeTab, setActiveTab] = useState('basico');

  // Init from last record for "Agregar" or from current record for "Editar"
  useEffect(() => {
    // Initialize from record.answers or empty
    const base = record?.answers ? { ...record.answers } : {};
    setAnswersDraft(base);
    setIsReadOnly(!!readOnly);
  }, [record, readOnly]);

  // Helpers
  const getAnswer = useCallback(
    (id) => {
      const v = answersDraft?.[id];
      return v ?? '';
    },
    [answersDraft]
  );

  const setAnswer = useCallback((id, value) => {
    // Update single id
    setAnswersDraft((prev) => {
      if (prev?.[id] === value) return prev;
      return { ...(prev || {}), [id]: value };
    });
  }, []);

  const recalcIMC = useCallback((h, w) => {
    // h in cm, w in kg
    const height = Number(h);
    const weight = Number(w);
    if (!height || !weight) return '';
    const m = height / 100;
    const bmi = weight / (m * m);
    return bmi ? bmi.toFixed(2) : '';
  }, []);

  // Recalculate IMC when height or weight change
  useEffect(() => {
    const h = answersDraft?.[ID.height] || answersDraft?.[ID.size];
    const w = answersDraft?.[ID.weight];
    const bmi = recalcIMC(h, w);
    if (bmi) {
      setAnswersDraft((prev) => ({ ...(prev || {}), [ID.imc]: bmi }));
    }
  }, [answersDraft?.[ID.height], answersDraft?.[ID.size], answersDraft?.[ID.weight], recalcIMC]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Build payload
      const body = {
        doctor: user?.id || null,
        specialty: user?.specialty || record?.specialty || 'weight',
        version: 'full',
        answers: answersDraft,
      };

      const res = await fetch(`/api/clinical-records/${patientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al guardar el historial clínico');
      }

      // Optional read response
      await res.json();

      // Notify and close
      if (onSaved) onSaved();
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(error.message);
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />

      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader
          title={
            record
              ? isReadOnly
                ? 'Ver Historial Clínico'
                : 'Nuevo Historial Clínico'
              : 'Nuevo Historial Clínico'
          }
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          {activeTab === 'basico' && (
            <div className="space-y-6">
              <BasicInfoSection
                isReadOnly={isReadOnly}
                getAnswer={getAnswer}
                setAnswer={setAnswer}
              />
              <VitalsSection isReadOnly={isReadOnly} getAnswer={getAnswer} setAnswer={setAnswer} />
              <DiagnosisSection
                isReadOnly={isReadOnly}
                getAnswer={getAnswer}
                setAnswer={setAnswer}
                icons={{ Stethoscope }}
              />
            </div>
          )}

          {activeTab === 'completo' && (
            <QuestionnaireSection
              isReadOnly={isReadOnly}
              getAnswer={getAnswer}
              setAnswer={setAnswer}
              icons={{ ClipboardList }}
            />
          )}

          {!isReadOnly && (
            <FooterActions onCancel={onClose} submitLabel={'Guardar nuevo registro'} />
          )}
        </form>
      </ModalContainer>
    </>
  );
}
