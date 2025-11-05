'use client';

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';

/* chart */
export default function PatientEvolutionChart({
  title,
  legendLabel,
  legendColor,
  data,
  unit,
  stroke,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">{title}</h2>
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: legendColor }} />
          <span className="text-sm font-medium text-gray-700">{legendLabel}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value) => [`${value} ${unit}`, legendLabel]}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke={stroke}
            strokeWidth={3}
            dot={{ fill: stroke, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* <div className="mt-4 rounded-lg bg-blue-50 p-3">
        <p className="text-sm text-gray-700">
          Tip: usa los cards de arriba para cambiar la métrica mostrada.
        </p>
      </div> */}
    </div>
  );
}
