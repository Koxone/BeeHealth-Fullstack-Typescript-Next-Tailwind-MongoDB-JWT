'use client';

/* State */
import { useState } from 'react';

/* UI */
import Header from './components/Header';
import Stats from './components/Stats';
import RecordsTable from './components/RecordsTable';
import RecordsMobileList from './components/RecordsMobileList';
import EmptyState from './components/EmptyState';
import AddRecordModal from './components/AddRecordModal';

/* Mock data */
const mockUser = { id: 'user_12345' };
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

export default function PatientHistory() {
  /* Local state */
  const [showModal, setShowModal] = useState(false);
  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');

  /* Replacements */
  const currentUser = mockUser;
  const currentUserId = currentUser?.id;

  /* Loading and error flags */
  const isLoading = false;
  const isError = false;
  const error = null;

  /* Data mapping */
  const historyData = mockHistoryRaw;
  const mappedHistory = historyData.map((r) => ({
    id: r._id,
    fecha: new Date(r.fechaRegistro).toISOString().split('T')[0],
    peso: r.pesoActual,
    imc: Number(r.indiceMasaCorporal).toFixed(1),
    notas: r.motivoConsulta || 'Sin notas',
  }));

  /* Early returns */
  if (isLoading) return <p className="p-6 text-center text-gray-500">Cargando historial...</p>;
  if (isError)
    return <p className="p-6 text-center text-red-600">Error: {error?.message || 'Desconocido'}</p>;
  if (!historyData.length) return <EmptyState onAdd={() => setShowModal(true)} />;

  /* Render */
  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      <Header total={historyData.length} />

      <div className="mx-auto max-w-7xl space-y-4">
        <Stats historyData={mappedHistory} />

        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
          <RecordsTable historyData={mappedHistory} />
          <RecordsMobileList historyData={mappedHistory} />
        </div>
      </div>

      {showModal && (
        <AddRecordModal
          peso={peso}
          notas={notas}
          setPeso={setPeso}
          setNotas={setNotas}
          onClose={() => setShowModal(false)}
          onSave={() => {
            /* Mock save */
            setShowModal(false);
            setPeso('');
            setNotas('');
          }}
        />
      )}
    </div>
  );
}
