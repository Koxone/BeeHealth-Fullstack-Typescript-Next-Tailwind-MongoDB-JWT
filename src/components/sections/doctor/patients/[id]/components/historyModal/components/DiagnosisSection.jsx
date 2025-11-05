// src/components/sections/doctor/patients/[id]/components/historyModal/components/DiagnosisSection.jsx
'use client';

import { Stethoscope } from 'lucide-react';

const ID = {
  diagnosis: 131,
  treatment: 132,
  notes: 133,
};

export default function DiagnosisSection({ isReadOnly, getAnswer, setAnswer, icons }) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Stethoscope className="h-5 w-5 text-blue-600" />
        Diagnóstico y Tratamiento
      </h3>

      <div className="space-y-4">
        {/* Diagnostic */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Diagnóstico</label>
          <textarea
            id={ID.diagnosis}
            rows={2}
            disabled={isReadOnly}
            value={getAnswer(ID.diagnosis)}
            onChange={(e) => setAnswer(ID.diagnosis, e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Ingrese el diagnóstico..."
          />
        </div>

        {/* Treatment */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Tratamiento</label>
          <textarea
            id={ID.treatment}
            rows={2}
            disabled={isReadOnly}
            value={getAnswer(ID.treatment)}
            onChange={(e) => setAnswer(ID.treatment, e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Ingrese el tratamiento recomendado..."
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Notas del médico</label>
          <textarea
            id={ID.notes}
            rows={3}
            disabled={isReadOnly}
            value={getAnswer(ID.notes)}
            onChange={(e) => setAnswer(ID.notes, e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Observaciones adicionales, recomendaciones, etc..."
          />
        </div>
      </div>
    </div>
  );
}
