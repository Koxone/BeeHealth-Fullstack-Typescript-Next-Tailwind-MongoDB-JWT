'use client';

import { useState, useEffect } from 'react';
import ModalOverlay from './components/ModalOverlay';
import ModalContainer from './components/ModalContainer';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import BasicInfoSection from './components/BasicInfoSection';
import VitalsSection from './components/VitalsSection';
import DiagnosisSection from './components/DiagnosisSection';
import QuestionnaireSection from './components/QuestionnaireSection';
import FooterActions from './components/FooterActions';

export default function HistoryModal({ onClose, record, readOnly, icons }) {
  const [form, setForm] = useState({
    recordDate: new Date().toISOString().split('T')[0],
    currentWeight: '',
    iMC: '',
    bloodPressure: '',
    glucose: '',
    colesterol: '',
    notes: '',
    diagnosis: '',
    treatment: '',
  });

  const [isReadOnly, setIsReadOnly] = useState(readOnly || false);

  useEffect(() => {
    if (record) {
      setForm({
        recordDate: record.recordDateRegistro?.split('T')[0] || '',
        currentWeight: record.currentWeight || '',
        iMC: record.IMC || '',
        bloodPressure: record.bloodPressure || '',
        glucose: record.glucose || '',
        colesterol: record.colesterol || '',
        notes: record.notes || '',
        diagnosis: record.diagnosis || '',
        treatment: record.treatment || '',
      });
      setIsReadOnly(readOnly);
    }
  }, [record, readOnly]);

  // Submit handler (temporal)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', form);
    onClose();
  };

  // Tabs
  const [activeTab, setActiveTab] = useState('basico');
  const { X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope, ClipboardList } = icons;

  return (
    <>
      <ModalOverlay onClick={onClose} />

      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader
          title={
            record
              ? isReadOnly
                ? 'Ver Historial Clínico'
                : 'Editar Historial Clínico'
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
                form={form}
                record={record}
                setForm={setForm}
                isReadOnly={isReadOnly}
              />

              <VitalsSection
                form={form}
                setForm={setForm}
                record={record}
                isReadOnly={isReadOnly}
              />

              <DiagnosisSection
                form={form}
                record={record}
                setForm={setForm}
                isReadOnly={isReadOnly}
                icons={{ Stethoscope }}
              />
            </div>
          )}

          {activeTab === 'completo' && (
            <QuestionnaireSection
              isReadOnly={isReadOnly}
              initialData={record?.answers || {}}
              icons={{ ClipboardList }}
            />
          )}

          {!isReadOnly && (
            <FooterActions
              onCancel={onClose}
              submitLabel={record ? 'Actualizar Registro' : 'Guardar Registro'}
            />
          )}
        </form>
      </ModalContainer>
    </>
  );
}
