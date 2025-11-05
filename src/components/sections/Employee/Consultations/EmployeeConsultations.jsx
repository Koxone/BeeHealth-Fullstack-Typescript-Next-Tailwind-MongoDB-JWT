'use client';

import { Users, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

import MetricsGrid from './components/MetricsGrid';
import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import TodayConsultsTable from '@/components/shared/todayConsults/TodayConsultsTable';
import MedicamentosTable from '../../../shared/medsSale/MedicamentosTable';

export default function EmployeeConsultations({ role }) {
  const metrics = {
    totalIngresos: 3800,
    totalPagado: 3200,
    totalPendiente: 600,
    count: 5,
    porcentajeCobrado: ((3200 / 3800) * 100).toFixed(1),
  };

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      {/* Header */}
      <GeneralSectionHeader
        role={role}
        Icon="accounting"
        title="Gestión de Consultas"
        subtitle="Registrar y controlar la atención médica de los pacientes."
      />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Metrics summary */}
        <MetricsGrid
          icons={{ TrendingUp, CheckCircle, AlertCircle, Users }}
          totals={{
            totalIngresos: metrics.totalIngresos,
            totalPagado: metrics.totalPagado,
            totalPendiente: metrics.totalPendiente,
            count: metrics.count,
          }}
          porcentajeCobrado={metrics.porcentajeCobrado}
        />

        {/* Consultations Table */}
        <TodayConsultsTable />

        {/* Medications Sold Table */}
        <MedicamentosTable />
      </div>
    </div>
  );
}
