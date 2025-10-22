'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import 'moment/locale/es';

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
} from 'lucide-react';

import BackButton from './Components/BackButton';
import PatientHeader from './Components/PatientHeader';
import QuickStats from './Components/QuickStats';
import WeightChart from './Components/WeightChart';
import ClinicalHistory from './Components/ClinicalHistory';
import HistoryModal from './Components/HistoryModal';

export default function DoctorPatientDetail() {
  /* router */
  const router = useRouter();
  const params = useParams();
  const patientId = params.id;

  /* data state */
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [weightData, setWeightData] = useState([]);

  /* ui state */
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);

  /* form state */
  const [historyForm, setHistoryForm] = useState({
    fecha: '',
    peso: '',
    imc: '',
    presionArterial: '',
    glucosa: '',
    colesterol: '',
    notas: '',
    diagnostico: '',
    tratamiento: '',
  });

  /* fetch patient */
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`/api/users/${patientId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al obtener paciente');
        setPatient(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    if (patientId) fetchPatient();
  }, [patientId]);

  /* fetch records */
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`/api/clinical-records/user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patientId }),
        });
        const data = await res.json();
        if (res.ok) {
          setRecords(data.records || []);
          const mapped = (data.records || []).map((r) => ({
            fecha: new Date(r.fechaRegistro).toLocaleDateString('es-MX', {
              month: 'short',
              day: 'numeric',
            }),
            peso: r.pesoActual,
          }));
          setWeightData(mapped);
        } else {
          setRecords([]);
          setWeightData([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (patientId) fetchRecords();
  }, [patientId]);

  /* modal open */
  const openHistoryModal = (record = null) => {
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

  /* modal close */
  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setEditingHistory(null);
  };

  /* submit */
  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clinical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...historyForm,
          edad: 0,
          genero: 'N/A',
          altura: 0,
          pesoActual: historyForm.peso,
          pesoObjetivo: 0,
          habitosAlimenticios: 'N/A',
          motivoConsulta: historyForm.diagnostico,
          tipoConsulta: 'general',
          fechaRegistro: historyForm.fecha,
          patientId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Historial guardado correctamente');
        closeHistoryModal();
        window.location.reload();
      } else {
        alert(data.error || 'Error al guardar historial');
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* loading */
  if (!patient)
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-lg font-medium text-gray-600">Cargando información del paciente...</p>
        </div>
      </div>
    );

  /* derived */
  const totalConsultas = records.length;
  const ultimoPeso = records.length > 0 ? records[0].pesoActual : 'N/A';
  const ultimoIMC = records.length > 0 ? records[0].indiceMasaCorporal?.toFixed(1) : 'N/A';

  return (
    <div className="space-y-6">
      {/* top */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton onClick={() => router.back()} icon={{ ArrowLeft }} />
        <PatientHeader
          patient={patient}
          icons={{ User, Mail, Phone, CalendarIcon, Activity, Stethoscope }}
          moment={moment}
        />
      </div>

      {/* quick stats */}
      <QuickStats
        stats={{ totalConsultas, ultimoPeso, ultimoIMC }}
        icons={{ FileText, Scale, Heart, Activity, TrendingUp }}
      />

      {/* weight chart */}
      <WeightChart data={weightData} icons={{ TrendingUp }} />

      {/* clinical history */}
      <ClinicalHistory
        records={records}
        onAdd={() => openHistoryModal()}
        onEdit={(r) => openHistoryModal(r)}
        icons={{ ClipboardList, Plus, Edit2, Scale, Heart, Activity, Droplet }}
      />

      {/* modal */}
      {showHistoryModal && (
        <HistoryModal
          editingHistory={editingHistory}
          form={historyForm}
          setForm={setHistoryForm}
          onClose={closeHistoryModal}
          onSubmit={handleHistorySubmit}
          icons={{ X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope }}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
