'use client';

import { useModalClose } from '@/hooks/useModalClose';
import { X } from 'lucide-react';
import CreatePatientForm from './CreatePatientForm';

export default function CreatePatientModal({
  setIsModalPatientsOpen,
  specialty,
}) {
  // Close handler
  const { handleOverlayClick } = useModalClose(() => setIsModalPatientsOpen(false));

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-[600px] items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={() => setIsModalPatientsOpen(false)}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover absolute top-6 right-6 rounded-full p-2 text-white transition"
        >
          <X size={20} />
        </button>

        <CreatePatientForm setIsModalPatientsOpen={setIsModalPatientsOpen} specialty={specialty} />
      </div>
    </div>
  );
}
