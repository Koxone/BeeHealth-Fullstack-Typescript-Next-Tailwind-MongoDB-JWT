'use client';

import { IClinicalRecord, TabName } from '@/types';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import PatientHeader from './components/patientHeader/PatientHeader';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';
import ConsultsTab from './components/tabs/consults/ConsultsTab';
import DietsTab from './components/tabs/diets/DietsTab';
import WorkoutsTab from './components/tabs/workouts/WorkoutsTab';

// Feedback Components
import ClinicalRecordModal from './components/modals/historyModal/ClinicalRecordModal';
import FullHistoryModal from './components/modals/full-history-modal/FullHistoryModal';
import CreateFirstRecordModal from './components/modals/create-first-record-modal/CreateFirstRecordModal';
import EditRecordModal from './components/modals/edit-record-modal/EditRecordModal';
import DeleteRecordModal from './components/modals/delete-record-modal/DeleteRecordModal';
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import DoctorCreateAppointmentModal from './components/modals/createAppointmentModal/DoctorCreateAppointmentModal';
import CreateGoalModal from './components/modals/create-goal-modal/CreateGoalModal';
import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';
import { useDeleteClinicalRecord } from '@/hooks/clinicalRecords/delete/useDeleteClinicalRecord';
import { useEditClinicalRecord } from '@/hooks/clinicalRecords/edit/useEditClinicalRecord';

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

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Short History Modal States
  const [historyMode, setHistoryMode] = useState<'create' | 'view' | 'edit'>('view');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

  // Edit Record Modal States
  const [showEditRecordModal, setShowEditRecordModal] = useState<boolean>(false);
  const { editClinicalRecord } = useEditClinicalRecord();

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
  const [activeTab, setActiveTab] = useState<TabName>('Dietas');

  // Loading State
  if (error || isLoading) {
    return <LoadingState />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
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

      {/* Tabs Nav */}
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Consults Tab */}
      {activeTab === 'Consultas' && (
        <ConsultsTab
          patientId={id}
          patientRecord={patientRecord}
          specialty={specialty}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          setShowCreateFirstRecordModal={setShowCreateFirstRecordModal}
          setSelectedRecord={setSelectedRecord}
          setIsReadOnly={setIsReadOnly}
          setHistoryMode={setHistoryMode}
          setShowHistoryModal={setShowHistoryModal}
          setShowEditRecordModal={setShowEditRecordModal}
          setShowCreateGoalModal={setShowCreateGoalModal}
        />
      )}

      {/* Diets Tab */}
      {activeTab === 'Dietas' && <DietsTab patientId={id} />}

      {/* Workouts Tab */}
      {activeTab === 'Ejercicios' && (
        <WorkoutsTab patientId={id} patientRecord={patientRecord} specialty={specialty} />
      )}

      {/* Full History Modal */}
      {showFullHistoryModal && (
        <FullHistoryModal
          onClose={() => setShowFullHistoryModal(false)}
          record={selectedRecord}
          specialty={specialty}
          setShowFullHistoryModal={setShowFullHistoryModal}
          patientId={id}
          fetchRecord={fetchRecord}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* Short History Modal */}
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

      {/* Edit Record Modal */}
      {showEditRecordModal && (
        <EditRecordModal
          onClose={() => setShowEditRecordModal(false)}
          record={selectedRecord}
          patientId={id}
          specialty={specialty}
          setShowSuccessModal={setShowSuccessModal}
          fetchRecord={fetchRecord}
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

      {/* Create Appointment Modal */}
      {showCreateAppointmentModal && (
        <DoctorCreateAppointmentModal
          currentPatientInfo={currentPatientInfo}
          onClose={() => setShowCreateAppointmentModal(false)}
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
    </div>
  );
}
