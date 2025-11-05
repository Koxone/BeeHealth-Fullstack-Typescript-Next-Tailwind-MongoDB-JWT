'use client';

import { Plus } from 'lucide-react';
import React from 'react';

function CreateAppointmentButton({ onClickNew }) {
  return (
    <button
      onClick={onClickNew}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#567c6a] px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#3d584c] active:scale-95 sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      Nueva Cita
    </button>
  );
}

export default CreateAppointmentButton;
