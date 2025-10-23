'use client';

import { ArrowLeft } from 'lucide-react';

export default function TopBar({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
    >
      <ArrowLeft className="h-5 w-5" />
      Volver a Dietas
    </button>
  );
}
