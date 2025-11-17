'use client';

import { useState } from 'react';
import { DollarSign, Users, Pill, TrendingUp } from 'lucide-react';

import MetricsGrid from './components/MetricsGrid';
import WeeklyIncomeChart from './components/WeeklyIncomeChart';
import DistributionCard from './components/DistributionCard';
import MedsSoldTable from '../../../shared/medsSold/MedsSoldTable';
import SharedSectionHeader from '@/components/shared/sections/SharedSectionHeader';
import TodayConsultsTable from '@/components/shared/todayConsults/TodayConsultsTable';

/* Demo data */
const ingresosSemanales = [
  { dia: 'Lun', consultas: 3200, medicamentos: 450 },
  { dia: 'Mar', consultas: 2800, medicamentos: 380 },
  { dia: 'Mié', consultas: 3600, medicamentos: 520 },
  { dia: 'Jue', consultas: 3000, medicamentos: 410 },
  { dia: 'Vie', consultas: 3800, medicamentos: 940 },
  { dia: 'Sáb', consultas: 2400, medicamentos: 320 },
  { dia: 'Dom', consultas: 0, medicamentos: 0 },
];

export default function DoctorAccounting({ role }) {
  const [medicamentosVendidos, setMedicamentosVendidos] = useState([
    {
      id: 1,
      nombre: 'Metformina 850mg',
      cantidad: 2,
      precioUnitario: 150,
      total: 300,
      paciente: 'Juan Pérez',
    },
    {
      id: 2,
      nombre: 'Atorvastatina 20mg',
      cantidad: 1,
      precioUnitario: 200,
      total: 200,
      paciente: 'María López',
    },
    {
      id: 3,
      nombre: 'Losartán 50mg',
      cantidad: 3,
      precioUnitario: 120,
      total: 360,
      paciente: 'Carlos Ruiz',
    },
    {
      id: 4,
      nombre: 'Omeprazol 20mg',
      cantidad: 1,
      precioUnitario: 80,
      total: 80,
      paciente: 'Pedro García',
    },
  ]);

  /* Derived */
  const totalMedicamentos = medicamentosVendidos.reduce((sum, m) => sum + m.total, 0);
  const distribucionIngresos = [
    { name: 'Consultas', value: 4800, color: '#3b82f6' },
    { name: 'Medicamentos', value: totalMedicamentos, color: '#10b981' },
  ];
  const totalDia = 4800 + totalMedicamentos;

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <SharedSectionHeader
        Icon="accounting"
        role={role}
        title="Mis Finanzas"
        subtitle="Control financiero del consultorio"
      />

      {/* Metrics */}
      <MetricsGrid
        totalDia={totalDia}
        totalConsultas={4800}
        totalMedicamentos={totalMedicamentos}
        consultasCount={5}
        medsCount={medicamentosVendidos.length}
        promedio={(totalDia / 5).toFixed(0)}
        consultasPagadas={`4/5`}
        icons={{ DollarSign, Users, Pill, TrendingUp }}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <WeeklyIncomeChart data={ingresosSemanales} />
        <DistributionCard data={distribucionIngresos} />
      </div>

      {/* Tables */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Consultas del Día</h2>
        </div>

        <TodayConsultsTable />
      </div>

      <MedsSoldTable />
    </div>
  );
}
