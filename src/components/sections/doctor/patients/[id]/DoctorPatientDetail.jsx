'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, TrendingUp, Loader2 } from 'lucide-react';
import PatientHeader from './components/patientHeader/PatientHeader';
import QuickStats from './components/QuickStats';
import WeightChart from './components/WeightChart';
import ClinicalHistory from './components/clinicalHistory/ClinicalHistory';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';
import DoctorCreateAppointmentModal from './components/createAppointmentModal/DoctorCreateAppointmentModal';
import DoctorClinicalRecordModal from './components/historyModal/DoctorClinicalRecordModal';
import { useClinicalRecord } from './hooks/useClinicalRecord';
import DoctorBudgets from './components/budgets/DoctorBudgets';
import DoctorProducts from './components/products/DoctorProducts';

export default function DoctorPatientDetail({ patient, specialty }) {
  const router = useRouter();
  const { id } = useParams();

  const { data: patientRecord, isLoading, error } = useClinicalRecord(id);
  const currentPatientInfo = patientRecord?.[0];

  const [historyMode, setHistoryMode] = useState('view');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [activeTab, setActiveTab] = useState('Historial');

  if (error || isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {error ? (
          <p className="text-lg font-medium text-red-600">Error al cargar los datos del paciente</p>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-600">Cargando información...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton onClick={() => router.back()} icon={{ ArrowLeft }} />
        <PatientHeader
          patientRecord={patientRecord}
          patient={patient}
          onClickNew={() => setShowCreateAppointmentModal(true)}
        />
      </div>

      {/* Quick Stats */}
      <QuickStats patientRecord={patientRecord} specialty={specialty} />

      {/* Tabs */}
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

      {specialty === 'weight' && (
        <WeightChart patientRecord={patientRecord} icons={{ TrendingUp }} />
      )}

      {showHistoryModal && (
        <DoctorClinicalRecordModal
          onClose={() => setShowHistoryModal(false)}
          onSaved={() => {
            router.refresh();
          }}
          record={selectedRecord}
          readOnly={isReadOnly}
          patientId={id}
          mode={historyMode}
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
