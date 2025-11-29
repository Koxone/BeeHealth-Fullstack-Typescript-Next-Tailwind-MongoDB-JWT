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
import useGetAnswer from '@/hooks/useGetAnswer';
import { Loader2 } from 'lucide-react';

/* chart */
export default function PatientEvolutionChart({
  title,
  legendLabel,
  legendColor,
  data,
  loading,
  keyAnswer,
  unit,
  stroke,
}) {
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {isError ? (
          <p className="text-lg font-medium text-red-600">Error al cargar los datos del paciente</p>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-600">Cargando información...</p>
          </div>
        )}
      </div>
    );
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const chartData = sortedData.map((record) => {
    const getAnswer = useGetAnswer(record);
    return {
      mes: new Date(record.createdAt).toLocaleDateString('es-MX', {
        month: 'short',
        day: 'numeric',
      }),
      valor: Number(getAnswer(keyAnswer)),
    };
  });

  return (
    <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">{title}</h2>
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: legendColor }} />
          <span className="text-sm font-medium text-gray-700">{legendLabel}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
    </div>
  );
}
