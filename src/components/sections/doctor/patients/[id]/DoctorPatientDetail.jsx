'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  Loader2,
  X,
  FileText,
  Calendar as CalendarIcon,
  Scale,
  Heart,
  Activity,
  Stethoscope,
  ClipboardList,
} from 'lucide-react';
import PatientHeader from './components/patientHeader/PatientHeader';
import QuickStats from './components/QuickStats';
import WeightChart from './components/WeightChart';
import ClinicalHistory from './components/clinicalHistory/ClinicalHistory';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';
import DoctorCreateAppointmentModal from './components/createAppointmentModal/DoctorCreateAppointmentModal';
import HistoryModal from './components/historyModal/HistoryModal';
import { useClinicalRecord } from './hooks/useClinicalRecord';

export default function DoctorPatientDetail({ patient }) {
  const router = useRouter();
  const { id } = useParams();

  // Data
  const { data: patientRecord, isLoading, error } = useClinicalRecord(id);
  const currentPatientInfo = patientRecord?.[0];

  console.log('Current Patient Info:', currentPatientInfo);

  // Modal states
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Loading/Error states
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
      {/* Top */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton onClick={() => router.back()} icon={{ ArrowLeft }} />
        <PatientHeader
          patientRecord={patientRecord}
          patient={patient}
          onClickNew={() => setShowCreateAppointmentModal(true)}
        />
      </div>

      {/* Quick stats */}
      <QuickStats patientRecord={patientRecord} />

      {/* Tabs Nav */}
      <TabsNav />

      {/* Clinical history */}
      <ClinicalHistory
        patientRecord={patientRecord}
        onAdd={() => {
          const lastRecord = patientRecord?.[patientRecord.length - 1] || null;
          setSelectedRecord(lastRecord);
          setIsReadOnly(false);
          setShowHistoryModal(true);
        }}
        onEdit={(record, readOnly) => {
          setSelectedRecord(record);
          setIsReadOnly(readOnly);
          setShowHistoryModal(true);
        }}
      />

      {/* Weight chart */}
      <WeightChart patientRecord={patientRecord} icons={{ TrendingUp }} />

      {/* History Modal */}
      {showHistoryModal && (
        <HistoryModal
          onClose={() => setShowHistoryModal(false)}
          record={selectedRecord}
          readOnly={isReadOnly}
          icons={{ X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope, ClipboardList }}
        />
      )}

      {/* Create Appointment Modal */}
      {showCreateAppointmentModal && (
        <DoctorCreateAppointmentModal
          currentPatientInfo={currentPatientInfo}
          onClose={() => setShowCreateAppointmentModal(false)}
        />
      )}
    </div>
  );
}
