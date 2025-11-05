'use client';

/* state */
import { useState } from 'react';

/* parts */
import ModalOverlay from './components/ModalOverlay';
import ModalContainer from './components/ModalContainer';
import ModalHeader from './components/ModalHeader';
import TabsNav from './components/TabsNav';
import BasicInfoSection from './components/BasicInfoSection';
import VitalsSection from './components/VitalsSection';
import DiagnosisSection from './components/DiagnosisSection';
import QuestionnaireSection from './components/QuestionnaireSection';
import FooterActions from './components/FooterActions';

export default function HistoryModal({
  editingHistory,
  form,
  setForm,
  onClose,
  onSubmit,
  icons,
  isReadOnly,
}) {
  // Local tab
  const [activeTab, setActiveTab] = useState('basico');

  // Icons pass-through
  const { X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope, ClipboardList } = icons;

  return (
    <>
      {/* overlay */}
      <ModalOverlay onClick={onClose} />

      {/* container */}
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <ModalHeader
          title={editingHistory ? 'Editar Historial Clínico' : 'Nuevo Historial Clínico'}
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* tabs */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* form */}
        <form onSubmit={onSubmit} className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          {activeTab === 'basico' && (
            <div className="space-y-6">
              {/* basic */}
              <BasicInfoSection
                form={form}
                setForm={setForm}
                isReadOnly={isReadOnly}
                icons={{ CalendarIcon, Scale, Heart }}
              />

              {/* vitals */}
              <VitalsSection form={form} setForm={setForm} isReadOnly={isReadOnly} icons={{ Activity }} />

              {/* diagnosis */}
              <DiagnosisSection form={form} setForm={setForm} isReadOnly={isReadOnly} icons={{ Stethoscope }} />
            </div>
          )}

          {activeTab === 'completo' && (
            <QuestionnaireSection isReadOnly={isReadOnly} icons={{ ClipboardList }} />
          )}

          {!isReadOnly && (
            <FooterActions
              onCancel={onClose}
              submitLabel={editingHistory ? 'Actualizar Registro' : 'Guardar Registro'}
            />
          )}
        </form>
      </ModalContainer>
    </>
  );
}
