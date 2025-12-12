import ClinicalHistory from '../../clinicalHistory/ClinicalHistory';
import WeightChart from '../../WeightChart';
import QuickStats from '../../QuickStats';

export default function ConsultsTab({
  patientId,
  patientRecord,
  specialty,
  showDeleteModal,
  setShowDeleteModal,
  setShowCreateFirstRecordModal,
  setSelectedRecord,
  setIsReadOnly,
  setHistoryMode,
  setShowHistoryModal,
  setShowEditRecordModal,
  setShowCreateGoalModal,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickStats patientRecord={patientRecord} specialty={specialty} patientId={patientId} />

      {/* Consults Tab */}
      <ClinicalHistory
        specialty={specialty}
        patientRecord={patientRecord}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onCreateNew={() => setShowCreateFirstRecordModal(true)}
        // Add Section
        onAdd={() => {
          const lastRecord = patientRecord?.[0] || null;
          setSelectedRecord(lastRecord);
          setIsReadOnly(false);
          setHistoryMode('create');
          setShowHistoryModal(true);
        }}
        // Edit Section
        onEdit={(record, readOnly) => {
          setSelectedRecord(record);
          setIsReadOnly(readOnly);
          setHistoryMode(readOnly ? 'view' : 'edit');
          setShowEditRecordModal(true);
        }}
        // Delete Section
        onDelete={(record) => {
          setSelectedRecord(record);
          setShowDeleteModal(true);
        }}
        setShowCreateGoalModal={setShowCreateGoalModal}
        setShowEditRecordModal={setShowEditRecordModal}
      />

      {/* Weight Chart */}
      <WeightChart id={patientId} />
    </div>
  );
}
