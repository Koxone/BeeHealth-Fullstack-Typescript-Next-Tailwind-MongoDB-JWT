'use client';

import { IClinicalRecord, TabName } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import PatientHeader from './components/patientHeader/PatientHeader';
import QuickStats from './components/QuickStats';
import WeightChart from './components/WeightChart';
import ClinicalHistory from './components/clinicalHistory/ClinicalHistory';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';
import DoctorBudgets from './components/budgets/DoctorBudgets';
import DoctorProducts from './components/products/DoctorProducts';
import LoadingState from '@/components/shared/feedback/LoadingState';

// Modals
import ClinicalRecordModal from './components/historyModal/ClinicalRecordModal';
import DoctorCreateAppointmentModal from './components/createAppointmentModal/DoctorCreateAppointmentModal';

// Fetch current patient clinical records
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/useGetPatientClinicalRecords';

export default function DoctorPatientDetail({ patient, specialty }) {
  // ID From URL Params
  const params = useParams<{ id: string }>();
  const id = params.id as string;

  // Patient Clinical Record
  const [selectedRecord, setSelectedRecord] = useState<IClinicalRecord | null>(null);
  const {
    data: patientRecord,
    isLoading,
    error,
    refetch: fetchRecord,
  } = useGetPatientClinicalRecords(id);

  const currentPatientInfo = patientRecord?.[0];

  // History Modal
  const [historyMode, setHistoryMode] = useState<'create' | 'view' | 'edit'>('view');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

  // Create Appointment Modal
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState<boolean>(false);

  // Dental Tabs Nav
  const [activeTab, setActiveTab] = useState<TabName>('Historial');

  if (error || isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton />
        <PatientHeader
          patientRecord={patientRecord}
          onClickNew={() => setShowCreateAppointmentModal(true)}
        />
      </div>

      {/* Quick Stats */}
      <QuickStats patientRecord={patientRecord} specialty={specialty} />

      {/* Tabs Dental */}
      {specialty === 'dental' && <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />}

      {/* Dental Clinical Records */}
      {activeTab === 'Historial' && specialty === 'dental' && (
        <ClinicalHistory
          specialty={specialty}
          patientRecord={patientRecord}
          onAdd={() => {
            const lastRecord = patientRecord?.[patientRecord.length - 1] || null;
            setSelectedRecord(lastRecord);
            setIsReadOnly(false);
            setHistoryMode('create');
            setShowHistoryModal(true);
          }}
          onEdit={(record, readOnly) => {
            setSelectedRecord(record);
            setIsReadOnly(readOnly);
            setHistoryMode(readOnly ? 'view' : 'edit');
            setShowHistoryModal(true);
          }}
        />
      )}

      {/* Dental Patient Budgets */}
      {activeTab === 'Presupuestos' && specialty === 'dental' && <DoctorBudgets />}

      {/* Dental Patient Budgets */}
      {activeTab === 'Productos' && specialty === 'dental' && <DoctorProducts />}

      {/* Weight Control Clinical Records */}
      {specialty === 'weight' && (
        <ClinicalHistory
          specialty={specialty}
          patientRecord={patientRecord}
          onAdd={() => {
            const lastRecord = patientRecord?.[0] || null;
            setSelectedRecord(lastRecord);
            setIsReadOnly(false);
            setHistoryMode('create');
            setShowHistoryModal(true);
          }}
          onEdit={(record, readOnly) => {
            setSelectedRecord(record);
            setIsReadOnly(readOnly);
            setHistoryMode(readOnly ? 'view' : 'edit');
            setShowHistoryModal(true);
          }}
        />
      )}

      {specialty === 'weight' && <WeightChart patientRecord={patientRecord} />}

      {showHistoryModal && (
        <ClinicalRecordModal
          fetchRecord={fetchRecord}
          onClose={() => setShowHistoryModal(false)}
          record={selectedRecord}
          readOnly={isReadOnly}
          patientId={id}
          mode={historyMode}
          specialty={specialty}
        />
      )}

      {showCreateAppointmentModal && (
        <DoctorCreateAppointmentModal
          currentPatientInfo={currentPatientInfo}
          onClose={() => setShowCreateAppointmentModal(false)}
        />
      )}
    </div>
  );
}
