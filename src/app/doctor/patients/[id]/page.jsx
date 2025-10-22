'use client';

import { useRouter, useParams } from 'next/navigation';
import moment from 'moment';
import 'moment/locale/es';
import { ArrowLeft, User, Mail, Phone, Calendar, Plus, X, Edit2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useState, useEffect } from 'react';

export default function DoctorPatientDetail() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id;

  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);
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
  // obtener paciente por id
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

  // obtener registros clínicos por id
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
      } else {
        alert(data.error || 'Error al guardar historial');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!patient)
    return <p className="py-10 text-center text-gray-500">Cargando información del paciente...</p>;

  return (
    <div className="space-y-4 md:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900 active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver a Pacientes
      </button>

      {/* Encabezado del paciente */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 md:h-24 md:w-24">
            <User className="h-10 w-10 text-white md:h-12 md:w-12" />
          </div>
          <div className="w-full flex-1">
            {/* Patient Name */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              {patient?.fullName}
            </h1>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
              {/* Patient Mail */}
              <div className="flex w-fit flex-col items-start">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <p>Correo</p>
                </div>
                <span className="truncate">{patient?.email}</span>
              </div>

              {/* Patient Phone */}
              <div className="flex w-fit flex-col items-start">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <p>Telefono</p>
                </div>
                <span>{patient?.phone}</span>
              </div>

              {/* Patient Creation Date */}
              <div className="flex w-fit flex-col items-start">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Paciente registrado</span>
                </div>
                <p className="text-black">{moment(patient?.createdAt).format('DD/MM/YYYY')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfica de evolución */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Evolución de Peso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="peso" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Historial clínico */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Historial Clínico</h2>
          <button
            onClick={() => openHistoryModal()}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white transition hover:bg-blue-600 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>

        {records.length > 0 ? (
          <div className="space-y-3">
            {records.map((r) => (
              <div
                key={r._id}
                className="rounded-lg border border-gray-200 p-3 transition hover:border-blue-300"
              >
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(r.fechaRegistro).toLocaleDateString('es-MX')}
                  </span>
                  <button
                    onClick={() => openHistoryModal(r)}
                    className="rounded p-1 transition hover:bg-gray-100 active:scale-95"
                    title="Editar"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-600">Peso: {r.pesoActual} kg</p>
                <p className="text-xs text-gray-600">IMC: {r.indiceMasaCorporal?.toFixed(1)}</p>
                <p className="mt-1 text-xs text-gray-500">{r.motivoConsulta}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No hay registros clínicos aún.</p>
        )}
      </div>

      {/* Modal de historial clínico */}
      {showHistoryModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={closeHistoryModal}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-4 py-4 md:px-6">
                <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                  {editingHistory ? 'Editar Historial Clínico' : 'Agregar Historial Clínico'}
                </h2>
                <button
                  onClick={closeHistoryModal}
                  className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleHistorySubmit} className="space-y-4 p-4 md:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                      type="date"
                      required
                      value={historyForm.fecha}
                      onChange={(e) => setHistoryForm({ ...historyForm, fecha: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={historyForm.peso}
                      onChange={(e) => setHistoryForm({ ...historyForm, peso: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="75.5"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">IMC</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={historyForm.imc}
                      onChange={(e) => setHistoryForm({ ...historyForm, imc: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="25.8"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Notas</label>
                  <textarea
                    rows="3"
                    value={historyForm.notas}
                    onChange={(e) => setHistoryForm({ ...historyForm, notas: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Observaciones adicionales..."
                  ></textarea>
                </div>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={closeHistoryModal}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
                  >
                    {editingHistory ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
