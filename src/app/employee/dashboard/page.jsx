'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const citasHoyData = [
  { id: 1, hora: '09:00', paciente: 'Juan Pérez', estado: 'Confirmada', telefono: '555-0101' },
  { id: 2, hora: '10:30', paciente: 'María López', estado: 'Pendiente', telefono: '555-0102' },
  { id: 3, hora: '11:00', paciente: 'Carlos Ruiz', estado: 'Confirmada', telefono: '555-0103' },
  { id: 4, hora: '15:00', paciente: 'Ana Martínez', estado: 'Pendiente', telefono: '555-0104' },
  { id: 5, hora: '16:30', paciente: 'Pedro García', estado: 'Confirmada', telefono: '555-0105' },
];

const consultasSemanales = [
  { dia: 'Lun', consultas: 5 },
  { dia: 'Mar', consultas: 4 },
  { dia: 'Mié', consultas: 6 },
  { dia: 'Jue', consultas: 4 },
  { dia: 'Vie', consultas: 7 },
  { dia: 'Sáb', consultas: 3 },
  { dia: 'Hoy', consultas: 5 },
];

export default function EmployeeDashboard() {
  const router = useRouter();
  const [citasHoy, setCitasHoy] = useState(citasHoyData);

  const alertasInventario = [
    { nombre: 'Atorvastatina 20mg', stock: 12, minimo: 15 },
    { nombre: 'Omeprazol 20mg', stock: 8, minimo: 25 },
    { nombre: 'Alcohol 70%', stock: 8, minimo: 15 },
  ];

  const handleConfirmar = (id) => {
    setCitasHoy(citasHoy.map((c) => (c.id === id ? { ...c, estado: 'Confirmada' } : c)));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Panel de Recepción</h1>
        <p className="text-sm text-gray-600 md:text-base">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <div
          onClick={() => router.push('/employee/appointments')}
          className="cursor-pointer rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm transition hover:from-blue-600 hover:to-blue-700 active:scale-95 md:p-6"
        >
          <div className="mb-2 flex items-center justify-between">
            <Calendar className="h-8 w-8 opacity-80" />
            <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
          </div>
          <p className="mb-1 text-2xl font-bold md:text-3xl">{citasHoy.length}</p>
          <p className="text-xs text-blue-100 md:text-sm">Citas programadas</p>
        </div>

        <div
          onClick={() => router.push('/employee/appointments')}
          className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-yellow-300 active:scale-95 md:p-6"
        >
          <div className="mb-2 flex items-center justify-between">
            <Clock className="h-8 w-8 text-yellow-500" />
            <span className="rounded bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
              {citasHoy.filter((c) => c.estado === 'Pendiente').length}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            {citasHoy.filter((c) => c.estado === 'Pendiente').length}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Pendientes confirmar</p>
        </div>

        <div
          onClick={() => router.push('/employee/consultations')}
          className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-green-300 active:scale-95 md:p-6"
        >
          <div className="mb-2 flex items-center justify-between">
            <FileText className="h-8 w-8 text-green-500" />
            <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              5
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">$3,800</p>
          <p className="text-xs text-gray-600 md:text-sm">Consultas hoy</p>
        </div>

        <div
          onClick={() => router.push('/employee/inventory')}
          className={`cursor-pointer rounded-xl border-2 p-4 shadow-sm transition active:scale-95 md:p-6 ${
            alertasInventario.length > 0
              ? 'border-red-200 bg-red-50 hover:border-red-300'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <AlertTriangle
              className={`h-8 w-8 ${alertasInventario.length > 0 ? 'text-red-500' : 'text-gray-400'}`}
            />
            <span
              className={`rounded px-2 py-1 text-xs font-medium ${
                alertasInventario.length > 0
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {alertasInventario.length > 0 ? 'Revisar' : 'OK'}
            </span>
          </div>
          <p
            className={`mb-1 text-2xl font-bold md:text-3xl ${alertasInventario.length > 0 ? 'text-red-600' : 'text-gray-900'}`}
          >
            {alertasInventario.length}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Alertas inventario</p>
        </div>
      </div>

      {/* Gráfica y alertas */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
            Consultas de la Semana
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consultasSemanales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="consultas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
              Alertas de Inventario
            </h2>
            <button
              onClick={() => router.push('/employee/inventory')}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
            >
              Ver más
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {alertasInventario.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                  <p className="text-xs text-red-600">
                    Stock: {item.stock} / Mín: {item.minimo}
                  </p>
                </div>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citas de hoy */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
          <button
            onClick={() => router.push('/employee/appointments')}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition hover:bg-blue-600 active:scale-95"
          >
            Ver todas
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {citasHoy.map((cita) => (
            <div
              key={cita.id}
              className="rounded-xl border-2 border-gray-200 p-4 transition hover:border-blue-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{cita.paciente}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        cita.estado === 'Confirmada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {cita.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{cita.hora}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{cita.telefono}</span>
                    </div>
                  </div>
                </div>
                {cita.estado === 'Pendiente' && (
                  <button
                    onClick={() => handleConfirmar(cita.id)}
                    className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600 active:scale-95"
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="rounded-xl bg-linear-to-br from-purple-500 to-pink-600 p-4 text-white shadow-sm md:p-6">
        <h2 className="mb-4 text-lg font-semibold md:text-xl">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <button
            onClick={() => router.push('/employee/appointments')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <Calendar className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Agendar Cita</p>
          </button>
          <button
            onClick={() => router.push('/employee/consultations')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <FileText className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Registrar Consulta</p>
          </button>
          <button
            onClick={() => router.push('/employee/inventory')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <Package className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Ver Inventario</p>
          </button>
          <button
            onClick={() => router.push('/employee/patients')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <Users className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Buscar Paciente</p>
          </button>
        </div>
      </div>
    </div>
  );
}
