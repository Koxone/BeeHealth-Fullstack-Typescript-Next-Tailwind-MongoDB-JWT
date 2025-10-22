'use client';

import { useState } from 'react';
import {
  Plus,
  FileText,
  TrendingDown,
  TrendingUp,
  Calendar,
  Weight,
  Activity,
  X,
  AlertCircle,
  BarChart3,
  Award,
} from 'lucide-react';

const historyData = [
  { id: 1, fecha: '2024-10-15', peso: 75, imc: 24.5, notas: 'Progreso excelente' },
  { id: 2, fecha: '2024-10-08', peso: 75.5, imc: 24.7, notas: 'Mantener dieta' },
  { id: 3, fecha: '2024-10-01', peso: 76, imc: 24.8, notas: 'Buen avance' },
  { id: 4, fecha: '2024-09-24', peso: 77, imc: 25.1, notas: 'Continuar ejercicio' },
];

export default function PatientHistory() {
  const [showModal, setShowModal] = useState(false);
  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');

  const getIMCCategory = (imc) => {
    if (imc < 18.5)
      return { label: 'Bajo peso', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    if (imc < 25)
      return { label: 'Normal', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (imc < 30)
      return { label: 'Sobrepeso', color: 'bg-orange-100 text-orange-700 border-orange-200' };
    return { label: 'Obesidad', color: 'bg-rose-100 text-rose-700 border-rose-200' };
  };

  const calculateStats = () => {
    const pesoInicial = historyData[historyData.length - 1].peso;
    const pesoActual = historyData[0].peso;
    const diferencia = pesoInicial - pesoActual;
    const porcentaje = ((diferencia / pesoInicial) * 100).toFixed(1);

    return {
      pesoInicial,
      pesoActual,
      diferencia: Math.abs(diferencia).toFixed(1),
      porcentaje: Math.abs(porcentaje),
      isPositive: diferencia > 0,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 px-4 pt-6 pb-8 md:rounded-2xl">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 p-3 shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  Historial Clínico
                </h1>
                <p className="text-base text-gray-600 md:text-lg">
                  Registro completo de tus mediciones y progreso
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas de progreso */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Peso Inicial</p>
                <div className="rounded-lg bg-blue-100 p-2">
                  <Weight className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.pesoInicial} kg</p>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Peso Actual</p>
                <div className="rounded-lg bg-emerald-100 p-2">
                  <Activity className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.pesoActual} kg</p>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Diferencia</p>
                <div
                  className={`rounded-lg p-2 ${stats.isPositive ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  {stats.isPositive ? (
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
              <p
                className={`text-2xl font-bold ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}
              >
                {stats.isPositive ? '-' : '+'}
                {stats.diferencia} kg
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-20 w-20 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">Progreso</p>
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{stats.porcentaje}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Tabla mejorada */}
        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
          {/* Header de la tabla */}
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
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
              <thead className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
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
                      className="group animate-fadeInUp transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-blue-100 p-2 transition-all duration-200 group-hover:bg-blue-500">
                            <Calendar className="h-4 w-4 text-blue-600 transition-colors duration-200 group-hover:text-white" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {record.fecha}
                          </span>
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

          {/* Mobile Cards */}
          <div className="space-y-3 p-4 md:hidden">
            {historyData.map((record, index) => {
              const category = getIMCCategory(record.imc);
              return (
                <div
                  key={record.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fadeInUp rounded-xl border-2 border-gray-200 bg-linear-to-br from-purple-50 to-pink-50 p-4 transition-all duration-300 hover:border-purple-300 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-bold text-gray-900">{record.fecha}</span>
                    </div>
                    <span
                      className={`rounded-lg border px-2 py-1 text-xs font-bold ${category.color}`}
                    >
                      {category.label}
                    </span>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3">
                      <p className="mb-1 text-xs text-gray-600">Peso</p>
                      <p className="text-xl font-bold text-purple-600">{record.peso} kg</p>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <p className="mb-1 text-xs text-gray-600">IMC</p>
                      <p className="text-xl font-bold text-gray-900">{record.imc}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-3">
                    <p className="mb-1 text-xs text-gray-600">Notas</p>
                    <p className="text-sm font-medium text-gray-900">{record.notas}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty state */}
        {historyData.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-purple-50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <FileText className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">No hay registros aún</h3>
            <p className="mb-6 text-gray-600">
              Comienza a registrar tus mediciones para ver tu progreso
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-5 w-5" />
              Agregar Primer Registro
            </button>
          </div>
        )}
      </div>

      {/* Modal mejorado */}
      {showModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Agregar Registro</h3>
                      <p className="text-sm text-purple-100">Nueva medición</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-xl p-2 transition-all duration-200 hover:bg-white/20"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <form className="space-y-5 p-6">
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Weight className="h-4 w-4 text-purple-600" />
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ej: 75.5"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg font-semibold transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Notas (opcional)
                  </label>
                  <textarea
                    rows="4"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Ej: Progreso excelente, mantener rutina actual..."
                    className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
                  ></textarea>
                </div>

                <div className="rounded-lg border-l-4 border-blue-500 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="mb-1 text-sm font-semibold text-blue-900">Consejo</p>
                      <p className="text-sm text-blue-800">
                        Para mejores resultados, mídete siempre a la misma hora del día
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Aquí iría la lógica para guardar
                      setShowModal(false);
                      setPeso('');
                      setNotas('');
                    }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 hover:from-purple-700 hover:to-pink-700 active:scale-95"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
