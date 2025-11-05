'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

/* chart */
export default function WeeklyIncomeChart({ data }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:col-span-2">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Ingresos de la Semana</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip />
          <Bar dataKey="consultas" fill="#3b82f6" name="Consultas" />
          <Bar dataKey="medicamentos" fill="#10b981" name="Medicamentos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
