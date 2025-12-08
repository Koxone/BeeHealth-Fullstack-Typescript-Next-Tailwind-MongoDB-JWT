'use client';

import { IClinicalRecord, TabName } from '@/types';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import PatientHeader from './components/patientHeader/PatientHeader';
import QuickStats from './components/QuickStats';
import WeightChart from './components/WeightChart';
import ClinicalHistory from './components/clinicalHistory/ClinicalHistory';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';
import DoctorBudgets from './components/budgets/DoctorBudgets';
import DoctorProducts from './components/products/DoctorProducts';

// Feedback Components
import ClinicalRecordModal from './components/modals/historyModal/ClinicalRecordModal';
import DeleteRecordModal from './components/modals/delete-record-modal/DeleteRecordModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import DoctorCreateAppointmentModal from './components/modals/createAppointmentModal/DoctorCreateAppointmentModal';
import CreateGoalModal from './components/modals/create-goal-modal/CreateGoalModal';
import FullHistoryModal from './components/modals/full-history-modal/FullHistoryModal';
import CreateFirstRecordModal from './components/modals/create-first-record-modal/CreateFirstRecordModal';

// Custom Hooks
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';
import { useDeleteClinicalRecord } from '@/hooks/clinicalRecords/delete/useDeleteClinicalRecord';

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

  console.log(patientRecord)

  const currentPatientInfo = patientRecord?.[0];

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // History Modal
  const [historyMode, setHistoryMode] = useState<'create' | 'view' | 'edit'>('view');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

  // Delete record modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { deleteClinicalRecord } = useDeleteClinicalRecord();

  // Create Appointment Modal
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState<boolean>(false);

  // Create Goal Modal
  const [showCreateGoalModal, setShowCreateGoalModal] = useState<boolean>(false);

  // Full History Modal
  const [showFullHistoryModal, setShowFullHistoryModal] = useState<boolean>(false);

  // Create First Record Modal
  const [showCreateFirstRecordModal, setShowCreateFirstRecordModal] = useState<boolean>(false);

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
          onClickFullHistory={() => setShowFullHistoryModal(true)}
          onCreateNew={() => setShowCreateFirstRecordModal(true)}
        />
      </div>

      {/* Quick Stats */}
      <QuickStats patientRecord={patientRecord} specialty={specialty} patientId={id} />

      {/* Tabs Dental */}
      {specialty === 'dental' && <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />}

      {/* Dental Clinical Records */}
      {activeTab === 'Historial' && specialty === 'dental' && (
        <ClinicalHistory
          specialty={specialty}
          patientRecord={patientRecord}
          showDeleteModal={showDeleteModal}
          onCreateNew={() => setShowCreateFirstRecordModal(true)}
          setShowDeleteModal={setShowDeleteModal}
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
          onDelete={(record) => {
            setSelectedRecord(record);
            setShowDeleteModal(true);
          }}
          setShowCreateGoalModal={setShowCreateGoalModal}
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
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          onCreateNew={() => setShowCreateFirstRecordModal(true)}
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
          onDelete={(record) => {
            setSelectedRecord(record);
            setShowDeleteModal(true);
          }}
          setShowCreateGoalModal={setShowCreateGoalModal}
        />
      )}

      {/* Weight Chart */}
      {specialty === 'weight' && <WeightChart patientRecord={patientRecord} />}

      {/* Main Record Modal */}
      {showHistoryModal && (
        <ClinicalRecordModal
          fetchRecord={fetchRecord}
          onClose={() => setShowHistoryModal(false)}
          record={selectedRecord}
          readOnly={isReadOnly}
          patientId={id}
          mode={historyMode}
          specialty={specialty}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* Create Appointment Modal */}
      {showCreateAppointmentModal && (
        <DoctorCreateAppointmentModal
          currentPatientInfo={currentPatientInfo}
          onClose={() => setShowCreateAppointmentModal(false)}
        />
      )}

      {/* Delete Record Modal */}
      {showDeleteModal && (
        <DeleteRecordModal
          recordToDelete={selectedRecord}
          handleDelete={async () => {
            await deleteClinicalRecord(selectedRecord?._id);
            await fetchRecord();
          }}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title="Consulta registrada"
          message="La operación se ha realizado con éxito."
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
        />
      )}

      {/* Create Goal Modal */}
      {showCreateGoalModal && (
        <CreateGoalModal patient={patient} onClose={() => setShowCreateGoalModal(false)} />
      )}

      {/* Full History Modal */}
      {showFullHistoryModal && (
        <FullHistoryModal
          onClose={() => setShowFullHistoryModal(false)}
          record={selectedRecord}
          specialty={specialty}
          patientId={id}
          fetchRecord={fetchRecord}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* Create First Record Modal */}
      {showCreateFirstRecordModal && (
        <CreateFirstRecordModal
          fetchRecord={fetchRecord}
          setShowCreateFirstRecordModal={setShowCreateFirstRecordModal}
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
          onClose={() => setShowCreateFirstRecordModal(false)}
        />
      )}
    </div>
  );
}
