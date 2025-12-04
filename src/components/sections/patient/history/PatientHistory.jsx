'use client';

/* State */
import { useState } from 'react';

/* UI */
import Stats from '../history/components/Stats';
import RecordsTable from '../history/components/RecordsTable';
import RecordsMobileList from '../history/components/RecordsMobileList';
import EmptyState from '../history/components/EmptyState';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';

/* Mock data */
const mockHistoryRaw = [
  {
    _id: 'rec_1',
    fechaRegistro: '2025-10-01T12:00:00Z',
    pesoActual: 74.2,
    indiceMasaCorporal: 24.6,
    motivoConsulta: 'Seguimiento mensual',
  },
  {
    _id: 'rec_2',
    fechaRegistro: '2025-09-01T12:00:00Z',
    pesoActual: 75.1,
    indiceMasaCorporal: 24.9,
    motivoConsulta: 'Ajuste de dieta',
  },
  {
    _id: 'rec_3',
    fechaRegistro: '2025-08-01T12:00:00Z',
    pesoActual: 76.3,
    indiceMasaCorporal: 25.3,
    motivoConsulta: '',
  },
];

export default function PatientHistory({ role, currentUser }) {
  // Fetch clinical records for the current patient
  const { data, isLoading, error, refetch } = useGetPatientClinicalRecords(currentUser?.id);

  /* Local state */
  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');

  /* Replacements */
  const currentUserId = currentUser?.id;

  /* Data mapping */
  const historyData = data || [];
  const mappedHistory = historyData.map((r) => ({
    id: r?._id,
    fecha: new Date(r?.recordDate).toISOString().split('T')[0],
    peso: r?.answers.find((a) => a.question?.questionId === 7)?.value,
    talla: r?.answers.find((a) => a.question?.questionId === 8)?.value,
    imc: Number(r?.indiceMasaCorporal).toFixed(1),
    notas: r?.motivoConsulta || 'Sin notas',
  }));

  /* Early returns */
  if (isLoading) return <p className="p-6 text-center text-gray-500">Cargando historial...</p>;
  if (error)
    return <p className="p-6 text-center text-red-600">Error: {error?.message || 'Desconocido'}</p>;
  if (!historyData.length) return <EmptyState onAdd={() => setShowModal(true)} />;

  /* Render */
  return (
    <div className="w-full h-full overflow-y-auto space-y-6 pb-40">
      <SharedSectionHeader
        role={role}
        title="Historial Clínico"
        subtitle="Visualiza tus ultimos registros medicos"
        Icon="history"
      />

      <div className="space-y-6">
        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Resumen de Peso</h3>
          </div>
          <Stats type="weight" historyData={mappedHistory} />
          
          <div className="col-span-1 mt-4 md:col-span-2 lg:col-span-2 xl:col-span-4">
             <h3 className="mb-3 text-lg font-semibold text-gray-800">Resumen de Talla</h3>
          </div>
          <Stats type="size" historyData={mappedHistory} />
        </div>

        {/* Table Container */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
          <RecordsTable historyData={mappedHistory} />
          <RecordsMobileList historyData={mappedHistory} />
        </div>
      </div>
    </div>
  );
}
