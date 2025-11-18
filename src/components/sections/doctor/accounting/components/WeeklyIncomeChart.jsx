'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function WeeklyIncomeChart({ data }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Ingresos por Paciente</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consultas" fill="#3b82f6" />
          <Bar dataKey="medicamentos" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
