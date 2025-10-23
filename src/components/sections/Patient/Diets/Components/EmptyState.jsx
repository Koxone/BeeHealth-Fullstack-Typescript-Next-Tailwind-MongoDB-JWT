'use client';

import { Apple } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <Apple className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">Aún no tienes dietas asignadas</h3>
      <p className="text-sm text-gray-600">
        Cuando tu nutriólogo te asigne un plan, aparecerá aquí.
      </p>
    </div>
  );
}
