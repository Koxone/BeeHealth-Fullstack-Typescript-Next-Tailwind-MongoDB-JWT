'use client';

// Imports
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

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import BackButton from '../[id]/Components/BackButton';
import PatientHeader from '../[id]/Components/PatientHeader';
import QuickStats from '../[id]/Components/QuickStats';
import WeightChart from '../[id]/Components/WeightChart';
import ClinicalHistory from '../[id]/Components/ClinicalHistory/ClinicalHistory';
import HistoryModal from '../[id]/Components/HistoryModal';

export default function DoctorPatientDetail() {
  // Local
  const router = useRouter();
  const params = useParams();
  const patientId = params.id;

  // Tanstack
  const queryClient = useQueryClient();

  // Local States
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);

  // Form State
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

  // Fetch Patient
  const {
    data: patient,
    isLoading: loadingPatient,
    error: errorPatient,
  } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${patientId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al obtener paciente');
      return data.user;
    },
    enabled: !!patientId,
  });

  // Fetch Clinical Records
  const {
    data: recordsData,
    isLoading: loadingRecords,
    error: errorRecords,
  } = useQuery({
    queryKey: ['clinical-records', patientId],
    queryFn: async () => {
      const res = await fetch(`/api/clinical-records/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al obtener registros clínicos');
      return data.records || [];
    },
    enabled: !!patientId,
  });

  const records = recordsData || [];

  // Data
  const weightData = records
    .filter((r) => r.pesoActual && r.fechaRegistro)
    .map((r) => ({
      fecha: new Date(r.fechaRegistro).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
      }),
      peso: Number(r.pesoActual),
    }))
    .reverse();

  const totalConsultas = records.length;
  const ultimoPeso = records.length > 0 ? records[0].pesoActual : 'N/A';
  const ultimoIMC = records.length > 0 ? records[0].indiceMasaCorporal?.toFixed(1) : 'N/A';

  // Mutation Create-Edit
  const mutation = useMutation({
    mutationFn: async () => {
      const url = '/api/clinical-records';
      const method = editingHistory ? 'PUT' : 'POST';

      const body = editingHistory
        ? {
            recordId: editingHistory._id,
            updates: {
              pesoActual: parseFloat(historyForm.peso),
              indiceMasaCorporal: parseFloat(historyForm.imc) || null,
              presionArterial: historyForm.presionArterial || '',
              glucosa: historyForm.glucosa || '',
              colesterol: historyForm.colesterol || '',
              notas: historyForm.notas || '',
              diagnostico: historyForm.diagnostico || '',
              tratamiento: historyForm.tratamiento || '',
              fechaRegistro: historyForm.fecha || new Date().toISOString(),
            },
          }
        : {
            edad: 0,
            genero: 'masculino',
            altura: 0,
            pesoActual: parseFloat(historyForm.peso),
            pesoObjetivo: parseFloat(historyForm.peso),
            habitosAlimenticios: 'N/A',
            motivoConsulta: historyForm.diagnostico || 'Consulta general',
            tipoConsulta: 'general',
            fechaRegistro: historyForm.fecha,
            patientId,
            actividadFisica: 'sedentario',
            horasSueno: 0,
            consumoAgua: 0,
            enfermedadesCronicas: '',
            medicamentosActuales: '',
            alergias: '',
            cirugiasPrevias: '',
            indiceMasaCorporal: parseFloat(historyForm.imc) || null,
            presionArterial: historyForm.presionArterial || '',
            glucosa: historyForm.glucosa || '',
            colesterol: historyForm.colesterol || '',
            notas: historyForm.notas || '',
            tratamiento: historyForm.tratamiento || '',
          };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar historial clínico');
      return data.record;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['clinical-records', patientId]);
      closeHistoryModal();
      alert(editingHistory ? 'Historial actualizado' : 'Historial creado');
    },
    onError: (err) => {
      console.error(err);
      alert('Error al guardar historial clínico');
    },
  });

  // Modal Handlers
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

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setEditingHistory(null);
  };

  // Loading Screen
  if (loadingPatient || loadingRecords)
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
          patient={patient}
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
        onEdit={(r) => openHistoryModal(r)}
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
            mutation.mutate();
          }}
          icons={{ X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope }}
        />
      )}
    </div>
  );
}
