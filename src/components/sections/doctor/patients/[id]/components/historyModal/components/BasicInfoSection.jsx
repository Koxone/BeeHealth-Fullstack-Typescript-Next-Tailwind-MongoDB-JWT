'use client';
import useGetAnswer from '@/components/shared/hooks/useGetAnswer';
import { CalendarIcon, Scale, Heart } from 'lucide-react';

/* basic info */
export default function BasicInfoSection({ form, setForm, isReadOnly, record }) {
  const getAnswer = useGetAnswer(record);

  // BMI calculation
  const height = Number(record?.answers?.['6']);
  const weight = Number(record?.answers?.['7']);

  const imc = height && weight ? (weight / (height / 100) ** 2).toFixed(2) : null;
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <CalendarIcon className="h-5 w-5 text-blue-600" />
        Información Básica
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Nombre completo</label>
          <input
            id="q-1"
            name="q-1"
            type="text"
            disabled={isReadOnly}
            value={getAnswer(1)}
            placeholder="Ingrese el nombre completo"
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Peso (kg) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Scale className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              disabled={isReadOnly}
              step="0.1"
              required
              value={getAnswer(7)}
              onChange={(e) => setForm({ ...form, peso: e.target.value })}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="75.5"
            />
          </div>
        </div>

        {/* imc */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            IMC <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Heart className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              disabled={isReadOnly}
              step="0.1"
              value={imc}
              onChange={(e) => setForm({ ...form, imc: e.target.value })}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="25.8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
