'use client';

import { Calendar, Weight, Activity, FileText, BarChart3 } from 'lucide-react';
import { getIMCCategory } from './utils';

export default function RecordsTable({ historyData = [] }) {
  return (
    <>
      {/* Header de la tabla */}
      <div className="relative overflow-hidden bg-linear-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Registro de Mediciones</h2>
            <p className="text-sm text-purple-100">{historyData.length} registros totales</p>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-900">Fecha</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-900">Peso (kg)</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-900">IMC</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-900">Notas</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyData.map((record, index) => {
              const category = getIMCCategory(record.imc);
              return (
                <tr
                  key={record.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="group animate-fadeInUp transition-all duration-200 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-blue-100 p-2 transition-all duration-200 group-hover:bg-blue-500">
                        <Calendar className="h-4 w-4 text-blue-600 transition-colors duration-200 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{record.fecha}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-600">{record.peso}</span>
                      <span className="text-sm text-gray-500">kg</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-900">{record.imc}</span>
                      <span
                        className={`rounded-lg border px-3 py-1 text-xs font-bold ${category.color}`}
                      >
                        {category.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-600">{record.notas}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
