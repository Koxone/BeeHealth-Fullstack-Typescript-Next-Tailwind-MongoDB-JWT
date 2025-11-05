// src/components/sections/doctor/patients/[id]/components/historyModal/components/VitalsSection.jsx
'use client';

import { Activity } from 'lucide-react';

const ID = {
  bloodPressure: 122,
  heartRate: 123,
  temperature: 125,
};

export default function VitalsSection({ isReadOnly, getAnswer, setAnswer }) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Activity className="h-5 w-5 text-blue-600" />
        Signos Vitales
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* BP */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Presión arterial</label>
          <input
            id={ID.bloodPressure}
            type="text"
            disabled={isReadOnly}
            value={getAnswer(ID.bloodPressure)}
            onChange={(e) => setAnswer(ID.bloodPressure, e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="120/80"
          />
        </div>

        {/* Temp */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Temperatura</label>
          <input
            id={ID.temperature}
            type="text"
            disabled={isReadOnly}
            value={getAnswer(ID.temperature)}
            onChange={(e) => setAnswer(ID.temperature, e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="36.7 °C"
          />
        </div>

        {/* HR */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Frecuencia cardiaca
          </label>
          <input
            id={ID.heartRate}
            type="text"
            disabled={isReadOnly}
            value={getAnswer(ID.heartRate)}
            onChange={(e) => setAnswer(ID.heartRate, e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="80"
          />
        </div>
      </div>
    </div>
  );
}
