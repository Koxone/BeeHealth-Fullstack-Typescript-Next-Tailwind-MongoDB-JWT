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
import HistoryModal from './components/HistoryModal';
import BackButton from './components/BackButton';

/* Mock patient */
const mockPatient = {
  fullName: 'Laura Hernández',
  email: 'laura.hernandez@example.com',
  telefono: '555-1234',
  edad: 32,
  genero: 'Femenino',
  fechaRegistro: '2025-03-15',
};

/* Mock records */
const mockRecords = [
  {
    _id: '1',
    fechaRegistro: '2025-10-15',
    pesoActual: 68,
    indiceMasaCorporal: 23.4,
    presionArterial: '120/80',
    glucosa: '90',
    colesterol: '180',
    notas: 'Paciente estable',
    diagnostico: 'Chequeo general',
    tratamiento: 'Mantener dieta y ejercicio',
  },
  {
    _id: '2',
    fechaRegistro: '2025-09-10',
    pesoActual: 70,
    indiceMasaCorporal: 24.0,
    presionArterial: '125/85',
    glucosa: '95',
    colesterol: '190',
    notas: 'Leve aumento de peso',
    diagnostico: 'Control de peso',
    tratamiento: 'Reducir carbohidratos',
  },
];

/* Mock weight chart */
const mockWeightData = mockRecords
  .map((r) => ({
    fecha: new Date(r.fechaRegistro).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
    }),
    peso: Number(r.pesoActual),
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
    fecha: new Date().toISOString().split('T')[0],
    peso: '',
    imc: '',
    presionArterial: '',
    glucosa: '',
    colesterol: '',
    notas: '',
    diagnostico: '',
    tratamiento: '',
  });

  /* Stats mock */
  const records = mockRecords;
  const totalConsultas = records.length;
  const ultimoPeso = records.length > 0 ? records[0].pesoActual : 'N/A';
  const ultimoIMC = records.length > 0 ? records[0].indiceMasaCorporal?.toFixed(1) : 'N/A';
  const weightData = mockWeightData;

  /* Modal Handlers */
  const openHistoryModal = (record = null, readOnly = false) => {
    setIsReadOnly(readOnly);
    if (record) {
      setEditingHistory(record);
      setHistoryForm({
        fecha: record.fechaRegistro?.split('T')[0] || '',
        peso: record.pesoActual || '',
        imc: record.indiceMasaCorporal || '',
        presionArterial: record.presionArterial || '',
        glucosa: record.glucosa || '',
        colesterol: record.colesterol || '',
        notas: record.notas || '',
        diagnostico: record.diagnostico || '',
        tratamiento: record.tratamiento || '',
      });
    } else {
      setEditingHistory(null);
      setHistoryForm({
        fecha: new Date().toISOString().split('T')[0],
        peso: '',
        imc: '',
        presionArterial: '',
        glucosa: '',
        colesterol: '',
        notas: '',
        diagnostico: '',
        tratamiento: '',
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
        stats={{ totalConsultas, ultimoPeso, ultimoIMC }}
        icons={{ FileText, Scale, Heart, Activity, TrendingUp }}
      />

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
          icons={{ X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope }}
          isReadOnly={isReadOnly}
        />
      )}
    </div>
  );
}
