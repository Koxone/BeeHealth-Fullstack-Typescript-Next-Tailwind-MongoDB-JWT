'use client';

/* Imports */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderWelcome from './Components/HeaderWelcome';
import MetricCards from './Components/MetricCards';
import EvolutionChart from './Components/EvolutionChart';
import QuickActions from './Components/QuickActions';
import MotivationalBanner from './Components/MotivationalBanner';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/Zustand/useAuthStore';

export default function PatientDashboard() {
  // Zustand
  const { currentUser } = useAuthStore();
  const currentUserId = currentUser?.id;

  // Native
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState('peso');

  // Tanstack query
  const {
    data: clinicalRecords = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['clinical-records', currentUserId],
    queryFn: async () => {
      const res = await fetch('/api/clinical-records/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: currentUserId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Error fetching records');
      return data.records;
    },
    enabled: !!currentUserId,
  });

  // Loading and error states
  if (isLoading) return <p className="p-6 text-center text-gray-500">Cargando historial...</p>;
  if (isError) return <p className="p-6 text-center text-red-600">{error.message}</p>;

  // Current record (latest)
  const record = clinicalRecords[0];
  console.log(record);
  if (!record) return <p className="p-6 text-center text-gray-500">Sin registros clínicos.</p>;

  // Gr
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

  // Metrics based on real data
  const metrics = [
    {
      id: 'peso',
      icon: 'Weight',
      title: 'Peso Actual',
      value: `${record.pesoActual} kg`,
      subtitle: `Objetivo: ${record.pesoObjetivo} kg`,
      color: 'blue',
      chartColor: '#3b82f6',
      chartTitle: 'Evolución de Peso',
      unit: 'kg',
    },
    {
      id: 'imc',
      icon: 'Activity',
      title: 'IMC Actual',
      value: (() => {
        const imc =
          record.indiceMasaCorporal ?? record.pesoActual / Math.pow(record.altura / 100, 2);
        return imc ? imc.toFixed(1) : '—';
      })(),
      subtitle: (() => {
        const imc =
          record.indiceMasaCorporal ?? record.pesoActual / Math.pow(record.altura / 100, 2);
        if (!imc) return 'Sin datos';
        if (imc < 18.5) return 'Bajo peso';
        if (imc < 25) return 'Normal';
        if (imc < 30) return 'Sobrepeso';
        return 'Obesidad';
      })(),
      color: 'green',
      chartColor: '#10b981',
      chartTitle: 'Evolución de IMC',
      unit: '',
    },

    {
      id: 'cambio',
      icon: 'TrendingDown',
      title: 'Progreso',
      value: `${(record.pesoActual - record.pesoObjetivo).toFixed(1)} kg`,
      subtitle:
        record.pesoActual > record.pesoObjetivo
          ? 'Por bajar'
          : record.pesoActual < record.pesoObjetivo
            ? 'Meta superada'
            : 'En objetivo',
      color: 'purple',
      chartColor: '#8b5cf6',
      chartTitle: 'Cambio hacia el objetivo',
      unit: 'kg',
    },
  ];

  // Chart data based on current record
  const chartData = evolutionData[selectedMetric];

  // Handlers
  const goHistory = () => router.push('/patient/history');
  const goNewAppointment = () => router.push('/patient/appointments/new');
  const goAppointments = () => router.push('/patient/appointments');
  const goDiets = () => router.push('/patient/diets');

  // Selected metric
  const currentMetric = metrics.find((m) => m.id === selectedMetric);

  // Return ui
  return (
    <div className="space-y-4 md:space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <HeaderWelcome />

      {/* Metric cards + next appointment */}
      <MetricCards
        metrics={metrics}
        selectedMetric={selectedMetric}
        onSelectMetric={setSelectedMetric}
        onOpenAppointments={goAppointments}
      />

      {/* Evolution chart */}
      <EvolutionChart
        title={currentMetric.chartTitle}
        legendLabel={currentMetric.title}
        legendColor={currentMetric.chartColor}
        data={chartData}
        unit={currentMetric.unit}
        stroke={currentMetric.chartColor}
      />

      {/* Quick actions */}
      <QuickActions onHistory={goHistory} onNewAppointment={goNewAppointment} onDiets={goDiets} />

      {/* Motivational banner */}
      <MotivationalBanner
        message={`Tu meta es ${record.pesoObjetivo} kg. Mantén el enfoque y sigue avanzando.`}
        ctaLabel="Ver mi progreso"
        onCta={goHistory}
      />
    </div>
  );
}
