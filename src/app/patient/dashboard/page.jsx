'use client';

import { useRouter } from 'next/navigation';
import { Weight, Activity, TrendingDown, Calendar, FileText, Apple, Plus } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';

// Datos de evolución
const evolutionData = {
  peso: [
    { mes: 'Ene', valor: 85 },
    { mes: 'Feb', valor: 83 },
    { mes: 'Mar', valor: 81 },
    { mes: 'Abr', valor: 100 },
    { mes: 'May', valor: 77 },
    { mes: 'Jun', valor: 75 },
  ],
  imc: [
    { mes: 'Ene', valor: 27.8 },
    { mes: 'Feb', valor: 27.1 },
    { mes: 'Mar', valor: 26.4 },
    { mes: 'Abr', valor: 25.8 },
    { mes: 'May', valor: 25.1 },
    { mes: 'Jun', valor: 24.5 },
  ],
  cambio: [
    { mes: 'Ene', valor: 0 },
    { mes: 'Feb', valor: -2 },
    { mes: 'Mar', valor: -12 },
    { mes: 'Abr', valor: -2 },
    { mes: 'May', valor: -2 },
    { mes: 'Jun', valor: -2 },
  ],
};

const metrics = [
  {
    id: 'peso',
    icon: Weight,
    title: 'Peso Actual',
    value: '75 kg',
    subtitle: 'Objetivo: 70 kg',
    color: 'blue',
    chartColor: '#3b82f6',
    chartTitle: 'Evolución de Peso',
    unit: 'kg',
  },
  {
    id: 'imc',
    icon: Activity,
    title: 'IMC Actual',
    value: '24.5',
    subtitle: 'Normal',
    color: 'green',
    chartColor: '#10b981',
    chartTitle: 'Evolución de IMC',
    unit: '',
  },
  {
    id: 'cambio',
    icon: TrendingDown,
    title: 'Cambio Semanal',
    value: '-0.5 kg',
    subtitle: '-2.5%',
    color: 'purple',
    chartColor: '#8b5cf6',
    chartTitle: 'Cambio de Peso Mensual',
    unit: 'kg',
  },
];

export default function PatientDashboard() {
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState('peso');

  const currentMetric = metrics.find((m) => m.id === selectedMetric);
  const chartData = evolutionData[selectedMetric];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="mb-1 text-2xl font-bold text-gray-900 md:mb-2 md:text-3xl">Dashboard</h1>
        <p className="text-sm text-gray-600 md:text-base">Bienvenido de vuelta</p>
      </div>

      {/* Cards de métricas - Clickeables */}
      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;

          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`rounded-xl border-2 bg-white p-3 text-left shadow-sm transition hover:shadow-md active:scale-95 md:p-6 ${
                isSelected
                  ? `border-${metric.color}-500 ring-2 ring-${metric.color}-200`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-xs font-medium text-gray-600 md:text-sm">
                    {metric.title}
                  </p>
                  <p className="mb-1 text-xl font-bold text-gray-900 md:mb-2 md:text-3xl">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500 md:text-sm">{metric.subtitle}</p>
                </div>
                <div
                  className={`rounded-lg p-2 md:p-3 ${
                    metric.color === 'blue'
                      ? 'bg-blue-50 text-blue-600'
                      : metric.color === 'green'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
              </div>
              {isSelected && (
                <div className="mt-2 border-t border-gray-200 pt-2">
                  <p className="text-xs font-medium text-blue-600">Mostrando en gráfica</p>
                </div>
              )}
            </button>
          );
        })}

        {/* Próxima Cita */}
        <button
          onClick={() => router.push('/patient/appointments')}
          className="rounded-xl border-2 border-gray-200 bg-white p-3 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md active:scale-95 md:p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-xs font-medium text-gray-600 md:text-sm">Próxima Cita</p>
              <p className="mb-1 text-xl font-bold text-gray-900 md:mb-2 md:text-3xl">25 Oct</p>
              <p className="text-xs text-gray-500 md:text-sm">Dr. García</p>
            </div>
            <div className="rounded-lg bg-red-50 p-2 text-red-600 md:p-3">
              <Calendar className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>
        </button>
      </div>

      {/* Gráfica de evolución - Dinámica */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
            {currentMetric.chartTitle}
          </h2>
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: currentMetric.chartColor }}
            ></div>
            <span className="text-sm font-medium text-gray-700">{currentMetric.title}</span>
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
              formatter={(value) => [`${value} ${currentMetric.unit}`, currentMetric.title]}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke={currentMetric.chartColor}
              strokeWidth={3}
              dot={{ fill: currentMetric.chartColor, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 rounded-lg bg-blue-50 p-3">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> Haz click en los cards superiores para cambiar la métrica
            mostrada en la gráfica
          </p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          <button
            onClick={() => router.push('/patient/history')}
            className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50 active:scale-95"
          >
            <FileText className="mb-2 h-8 w-8 text-blue-500" />
            <h3 className="mb-1 font-semibold text-gray-900">Ver Historial</h3>
            <p className="text-sm text-gray-600">Consulta tu historial clínico completo</p>
          </button>

          <button
            onClick={() => router.push('/patient/appointments/new')}
            className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-green-500 hover:bg-green-50 active:scale-95"
          >
            <Calendar className="mb-2 h-8 w-8 text-green-500" />
            <h3 className="mb-1 font-semibold text-gray-900">Agendar Cita</h3>
            <p className="text-sm text-gray-600">Programa tu próxima consulta</p>
          </button>

          <button
            onClick={() => router.push('/patient/diets')}
            className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-purple-500 hover:bg-purple-50 active:scale-95"
          >
            <Apple className="mb-2 h-8 w-8 text-purple-500" />
            <h3 className="mb-1 font-semibold text-gray-900">Mis Dietas</h3>
            <p className="text-sm text-gray-600">Revisa tu plan nutricional</p>
          </button>
        </div>
      </div>

      {/* Recordatorios */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-white/20 p-3">
            <Plus className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold">¡Sigue así!</h3>
            <p className="mb-3 text-sm text-blue-50">
              Has perdido 10 kg desde que comenzaste. Mantén tu rutina de alimentación y ejercicio.
            </p>
            <button
              onClick={() => router.push('/patient/history')}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:scale-95"
            >
              Ver mi progreso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
