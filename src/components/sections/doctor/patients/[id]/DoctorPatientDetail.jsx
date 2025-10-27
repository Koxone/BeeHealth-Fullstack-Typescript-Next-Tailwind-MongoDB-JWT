'use client';

/* Imports */
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Plus,
  X,
  Edit2,
  Activity,
  TrendingUp,
  FileText,
  Stethoscope,
  Heart,
  Scale,
  Droplet,
  ClipboardList,
  Loader2,
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

import PatientHeader from './components/PatientHeader';
import QuickStats from './components/QuickStats';
import WeightChart from './components/WeightChart';
import ClinicalHistory from './components/clinicalHistory/ClinicalHistory';
import HistoryModal from './components/historyModal/HistoryModal';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';

/* Mock patient */
const mockPatient = {
  fullName: 'Laura Hernández',
  email: 'laura.hernandez@example.com',
  phone: '555-1234',
  age: 32,
  gender: 'Femenino',
  recordDateRegistro: '2025-03-15',
};

/* Mock records */
const mockRecords = [
  {
    _id: '1',
    recordDate: '2025-10-15',
    currentWeight: 68,
    IMC: 23.4,
    diseases: 'Hypertension',
    bloodPressure: '120/80',
    glucose: '90',
    medication: 'Methylphenidate',
    size: '120',
    cholesterol: '180',
    notes: 'Patient stable',
    diagnosis: 'General checkup',
    treatment: 'Maintain diet and exercise',
  },
  {
    _id: '2',
    recordDate: '2025-09-10',
    currentWeight: 70,
    IMC: 24.0,
    diseases: 'Hypertension',
    bloodPressure: '125/85',
    glucose: '95',
    medication: 'Methylphenidate',
    size: '120',
    cholesterol: '190',
    notes: 'Slight weight increase',
    diagnosis: 'Weight control',
    treatment: 'Reduce carbohydrates',
  },
];

/* Mock weight chart */
const mockWeightData = mockRecords
  .map((r) => ({
    fecha: new Date(r.recordDate).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
    }),
    peso: Number(r.currentWeight),
  }))
  .reverse();

export default function DoctorPatientDetail() {
  /* Router */
  const router = useRouter();

  // Local States
  const [isReadOnly, setIsReadOnly] = useState(false);

  /* Modal states */
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);

  /* Form state */
  const [historyForm, setHistoryForm] = useState({
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

  /* Stats mock */
  const records = mockRecords;
  const totalConsultas = records.length;
  const ultimoPeso = records.length > 0 ? records[0].currentWeight : 'N/A';
  const ultimoIMC = records.length > 0 ? records[0].IMC?.toFixed(1) : 'N/A';
  const weightData = mockWeightData;

  /* Modal Handlers */
  const openHistoryModal = (record = null, readOnly = false) => {
    setIsReadOnly(readOnly);
    if (record) {
      setEditingHistory(record);
      setHistoryForm({
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
    } else {
      setEditingHistory(null);
      setHistoryForm({
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
    }
    setShowHistoryModal(true);
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setEditingHistory(null);
  };

  /* Mock loading state (false = listo) */
  const isLoading = false;

  if (isLoading)
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-600">Cargando información...</p>
        </div>
      </div>
    );

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      {/* Top */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton onClick={() => router.back()} icon={{ ArrowLeft }} />
        <PatientHeader
          patient={mockPatient}
          icons={{ User, Mail, Phone, CalendarIcon, Activity, Stethoscope }}
          moment={moment}
        />
      </div>

      {/* Quick stats */}
      <QuickStats
        stats={{ totalConsultas, currentWeight: ultimoPeso, ultimoIMC }}
        icons={{ FileText, Scale, Heart, Activity, TrendingUp }}
      />

      {/* Tabs Nav */}
      <TabsNav />

      {/* Clinical history */}
      <ClinicalHistory
        records={records}
        onAdd={() => openHistoryModal()}
        onEdit={(r, readOnly) => openHistoryModal(r, readOnly)}
        icons={{ ClipboardList, Plus, Edit2, Scale, Heart, Activity, Droplet }}
      />

      {/* Weight chart */}
      <WeightChart data={weightData} icons={{ TrendingUp }} />

      {/* Modal */}
      {showHistoryModal && (
        <HistoryModal
          editingHistory={editingHistory}
          form={historyForm}
          setForm={setHistoryForm}
          onClose={closeHistoryModal}
          onSubmit={(e) => {
            e.preventDefault();
            alert(editingHistory ? 'Historial actualizado (mock)' : 'Historial creado (mock)');
            closeHistoryModal();
          }}
          icons={{ X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope, ClipboardList }}
          isReadOnly={isReadOnly}
        />
      )}
    </div>
  );
}
