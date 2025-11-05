// src/components/sections/doctor/patients/[id]/components/historyModal/components/BasicInfoSection.jsx
'use client';

import { CalendarIcon, Scale, Ruler } from 'lucide-react';
import { useMemo } from 'react';

// Ids mapping
const ID = {
  fullName: 1,
  height: 6,
  weight: 7,
  size: 8,
  imc: 127,
};

export default function BasicInfoSection({ isReadOnly, getAnswer, setAnswer }) {
  // Compute IMC view-only from current values
  const imcValue = useMemo(() => getAnswer(ID.imc), [getAnswer]);

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
            id={ID.fullName}
            name={`q-${ID.fullName}`}
            type="text"
            value={getAnswer(ID.fullName)}
            onChange={(e) => setAnswer(ID.fullName, e.target.value)}
            disabled={isReadOnly}
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
              id={ID.weight}
              type="number"
              step="0.1"
              required
              disabled={isReadOnly}
              value={getAnswer(ID.weight)}
              onChange={(e) => setAnswer(ID.weight, e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="75.5"
            />
          </div>
        </div>

        {/* Height or Size */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Talla o Altura (cm) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Ruler className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id={ID.size}
              type="number"
              step="0.1"
              disabled={isReadOnly}
              value={getAnswer(ID.size) || getAnswer(ID.height)}
              onChange={(e) => {
                // Prefer size id if exists
                setAnswer(ID.size, e.target.value);
              }}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="180"
            />
          </div>
        </div>

        {/* IMC (read-only view) */}
        <div className="md:col-span-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700">IMC</label>
          <input
            id={ID.imc}
            type="text"
            readOnly
            value={imcValue}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3"
            placeholder="Calculado automáticamente"
          />
        </div>
      </div>
    </div>
  );
}
