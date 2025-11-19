'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function WeeklyIncomeChart({ data }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold text-main md:text-xl">Ingresos por Paciente</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consultas" fill="var(--color-chart-blue)" />
          <Bar dataKey="medicamentos" fill="var(--color-chart-green)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
