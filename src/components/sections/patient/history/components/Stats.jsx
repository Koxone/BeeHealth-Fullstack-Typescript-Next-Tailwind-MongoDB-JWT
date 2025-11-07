'use client';

import { Activity, Weight, TrendingDown, TrendingUp, Award, Ruler } from 'lucide-react';
import { calculateStats } from './utils';

export default function Stats({ historyData = [], type = 'weight' }) {
  // Stats
  const stats = calculateStats(historyData);

  // Labels by type
  const labels =
    type === 'size'
      ? {
          initial: 'Talla Inicial',
          current: 'Talla Actual',
          difference: 'Diferencia',
          unit: 'cm',
        }
      : {
          initial: 'Peso Inicial',
          current: 'Peso Actual',
          difference: 'Diferencia',
          unit: 'kg',
        };

  // Icons by type
  const icon =
    type === 'size' ? (
      <Ruler className="h-4 w-4 text-blue-600" />
    ) : (
      <Weight className="h-4 w-4 text-blue-600" />
    );

  return (
    <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-4">
      {/* Initial */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{labels.initial}</p>
          <div className="rounded-lg bg-blue-100 p-2">{icon}</div>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {stats.pesoInicial} {labels.unit}
        </p>
      </div>

      {/* Current */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{labels.current}</p>
          <div className="rounded-lg bg-emerald-100 p-2">
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {stats.pesoActual} {labels.unit}
        </p>
      </div>

      {/* Difference */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{labels.difference}</p>
          <div className={`rounded-lg p-2 ${stats.isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
            {stats.isPositive ? (
              <TrendingDown className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>
        <p className={`text-2xl font-bold ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {stats.isPositive ? '-' : '+'}
          {stats.diferencia} {labels.unit}
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-20 w-20 rounded-full bg-white/10" />
        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Progreso</p>
            <div className="bg-medtrack-green-solid rounded-lg p-2 backdrop-blur-sm">
              <Award className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-600">{stats.porcentaje}%</p>
        </div>
      </div>
    </div>
  );
}
