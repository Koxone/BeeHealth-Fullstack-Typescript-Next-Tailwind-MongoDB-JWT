'use client';

/* chart */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function WeightChart({ data, icons }) {
  const { TrendingUp: TrendIcon = TrendingUp } = icons;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-500">
            <TrendIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Evolución de Peso</h2>
            <p className="text-sm text-gray-500">Seguimiento del progreso del paciente</p>
          </div>
        </div>
        <div className="rounded-full bg-blue-50 px-4 py-2">
          <span className="text-sm font-semibold text-blue-700">{data.length} registros</span>
        </div>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="fecha"
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: '500' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{
                value: 'Peso (kg)',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '12px', fill: '#6b7280' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="peso"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorPeso)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
          <TrendIcon className="mb-3 h-12 w-12 text-gray-300" />
          <p className="mb-1 font-medium text-gray-600">Sin datos de evolución</p>
          <p className="text-sm text-gray-500">Agrega registros para ver el progreso</p>
        </div>
      )}
    </div>
  );
}
