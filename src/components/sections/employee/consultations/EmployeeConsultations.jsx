'use client';

import MetricsGrid from './components/MetricsGrid';
import SharedSectionHeader from '@/components/shared/sections/SharedSectionHeader';
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
      <SharedSectionHeader
        role={role}
        Icon="accounting"
        title="Gestión de Consultas"
        subtitle="Registrar y controlar la atención médica de los pacientes."
      />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Metrics summary */}
        <MetricsGrid
          totals={{
            totalIngresos: metrics.totalIngresos,
            totalPagado: metrics.totalPagado,
            totalPendiente: metrics.totalPendiente,
            count: metrics.count,
          }}
        />

        {/* Consultations Table */}
        <TodayConsultsTable />

        {/* Medications Sold Table */}
        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
          <MedicamentosTable />
        </div>
      </div>
    </div>
  );
}
