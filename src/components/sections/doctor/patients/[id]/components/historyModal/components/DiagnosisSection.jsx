'use client';

import useGetAnswer from '@/components/shared/hooks/useGetAnswer';
import { Stethoscope } from 'lucide-react';

/* diagnosis */
export default function DiagnosisSection({ form, setForm, isReadOnly, record }) {
  const getAnswer = useGetAnswer(record);
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
            rows="2"
            disabled={isReadOnly}
            value={getAnswer(148)}
            onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Ingrese el diagnóstico..."
          />
        </div>

        {/* Treatment */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Tratamiento</label>
          <textarea
            rows="2"
            disabled={isReadOnly}
            value={getAnswer(149)}
            onChange={(e) => setForm({ ...form, tratamiento: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Ingrese el tratamiento recomendado..."
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Notas Del Medico</label>
          <textarea
            rows="3"
            disabled={isReadOnly}
            value={getAnswer(133)}
            onChange={(e) => setForm({ ...form, notas: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Observaciones adicionales, recomendaciones, etc..."
          />
        </div>
      </div>
    </div>
  );
}
