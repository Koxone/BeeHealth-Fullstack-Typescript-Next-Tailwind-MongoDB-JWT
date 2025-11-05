'use client';

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
  Calendar,
  FileText,
  Stethoscope,
  Clock,
  Sparkles,
  Heart,
  Scale,
  ClipboardList,
  Loader2,
} from 'lucide-react';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import 'moment/locale/es';

import PatientHeader from './components/patientHeader/PatientHeader';
import QuickStats from './components/QuickStats';
import WeightChart from './components/WeightChart';
import ClinicalHistory from './components/clinicalHistory/ClinicalHistory';
import HistoryModal from './components/historyModal/HistoryModal';
import BackButton from './components/BackButton';
import TabsNav from './components/TabsNav';
import CreateEditAppointmentModal from '@/components/sections/employee/appointments/components/CreateEditAppointmentModal';

export default function DoctorPatientDetail({ patient }) {
  /* Router */
  const router = useRouter();

  // Backend Get Clinical Record
  const { id } = useParams();
  const [patientRecord, setPatientRecord] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchRecords() {
      try {
        const res = await fetch(`/api/clinical-records/${id}`);
        if (!res.ok) throw new Error('Error en la solicitud');

        const data = await res.json();
        setPatientRecord(data.data);
        console.log('Datos recibidos:', data);
      } catch (error) {
        console.error('Error al obtener clinical records:', error);
      }
    }

    fetchRecords();
  }, [id]);

  // Local States
  const [isReadOnly, setIsReadOnly] = useState(false);

  /* Modal states */
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);

  // Create New Apponitment Modal States
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(null);
  const [editingCita, setEditingCita] = useState(null);
  const [citaForm, setCitaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    telefono: '',
    email: '',
    motivo: '',
  });
  const handleSave = (e) => {
    e.preventDefault();
    const newCita = {
      id: editingCita ? editingCita.id : Date.now(),
      ...citaForm,
      estado: editingCita ? editingCita.estado : 'Pendiente',
      avatar: citaForm.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };
    setCitas((prev) =>
      editingCita ? prev.map((c) => (c.id === editingCita.id ? newCita : c)) : [...prev, newCita]
    );
    setShowModal(false);
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
  };

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

  if (isLoading)
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-600">Cargando información...</p>
        </div>
      </div>
    );

  const handleCreateAppointmentModal = () => {
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
    setShowCreateAppointmentModal(true);
  };

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      {/* Top */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton onClick={() => router.back()} icon={{ ArrowLeft }} />
        <PatientHeader
          patientRecord={patientRecord}
          patient={patient}
          onClickNew={handleCreateAppointmentModal}
        />
      </div>

      {/* Quick stats */}
      <QuickStats patientRecord={patientRecord} />

      {/* Tabs Nav */}
      <TabsNav />

      {/* Clinical history */}
      <ClinicalHistory
        patientRecord={patientRecord}
        onAdd={() => openHistoryModal()}
        onEdit={(r, readOnly) => openHistoryModal(r, readOnly)}
      />

      {/* Weight chart */}
      <WeightChart patientRecord={patientRecord} icons={{ TrendingUp }} />

      {/* History Modal */}
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

      {/* Create Appointment Modal */}
      {showCreateAppointmentModal && (
        <CreateEditAppointmentModal
          editingCita={editingCita}
          citaForm={citaForm}
          setCitaForm={setCitaForm}
          onClose={() => setShowCreateAppointmentModal(false)}
          onSubmit={handleSave}
          icons={{ Plus, Edit2, X, Calendar, Clock, User, Phone, Mail, Sparkles }}
        />
      )}
    </div>
  );
}
