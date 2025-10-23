'use client';

import { useState } from 'react';
import Header from './Components/Header';
import Stats from './Components/Stats';
import RecordsTable from './Components/RecordsTable';
import RecordsMobileList from './Components/RecordsMobileList';
import EmptyState from './Components/EmptyState';
import AddRecordModal from './Components/AddRecordModal';
import { historyData as defaultHistory } from './Components/mockData';

export default function PatientHistory() {
  const [showModal, setShowModal] = useState(false);
  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');
  const [historyData] = useState(defaultHistory);

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      <Header total={historyData.length} />

      <div className="mx-auto max-w-7xl space-y-4">
        <Stats historyData={historyData} />

        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
          <RecordsTable historyData={historyData} />
          <RecordsMobileList historyData={historyData} />
        </div>

        {historyData.length === 0 && <EmptyState onAdd={() => setShowModal(true)} />}
      </div>

      {showModal && (
        <AddRecordModal
          peso={peso}
          notas={notas}
          setPeso={setPeso}
          setNotas={setNotas}
          onClose={() => setShowModal(false)}
          onSave={() => {
            // Aquí iría la lógica real de guardado (POST a tu API)
            setShowModal(false);
            setPeso('');
            setNotas('');
          }}
        />
      )}

      <style jsx global>{`
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
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
