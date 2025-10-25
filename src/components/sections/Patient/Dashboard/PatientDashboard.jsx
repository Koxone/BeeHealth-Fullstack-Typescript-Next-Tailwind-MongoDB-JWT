'use client';

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
  if (!record) return <p className="p-6 text-center text-gray-500">Sin registros clínicos.</p>;

  // Chart Data
  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  function getWeekRange(date) {
    const curr = new Date(date);
    const first = new Date(curr);
    first.setDate(curr.getDate() - curr.getDay() + 1);
    const last = new Date(first);
    last.setDate(first.getDate() + 6);

    const fmt = (d) =>
      d.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
      });

    return `${fmt(first)}–${fmt(last)}`;
  }

  function generarEvolutionDataSemanal(clinicalRecords) {
    const agrupado = {};

    clinicalRecords.forEach((record) => {
      const fecha = new Date(record.fechaRegistro);
      const week = getWeekNumber(fecha);
      const year = fecha.getFullYear();
      const key = `${year}-W${week}`;

      if (!agrupado[key]) agrupado[key] = [];
      agrupado[key].push(record);
    });

    const peso = [];
    const imc = [];
    const cambio = [];

    const semanasOrdenadas = Object.keys(agrupado).sort();

    semanasOrdenadas.forEach((semana, i) => {
      const registros = agrupado[semana];
      const fechaReferencia = new Date(registros[0].fechaRegistro);
      const rango = getWeekRange(fechaReferencia);

      const promedioPeso = registros.reduce((sum, r) => sum + r.pesoActual, 0) / registros.length;
      const promedioIMC =
        registros.reduce((sum, r) => sum + r.indiceMasaCorporal, 0) / registros.length;

      peso.push({
        mes: rango,
        valor: parseFloat(promedioPeso.toFixed(1)),
      });

      imc.push({
        mes: rango,
        valor: parseFloat(promedioIMC.toFixed(2)),
      });

      if (i === 0) {
        cambio.push({ mes: rango, valor: 0 });
      } else {
        const diff = promedioPeso - peso[i - 1].valor;
        cambio.push({
          mes: rango,
          valor: parseFloat(diff.toFixed(1)),
        });
      }
    });

    return { peso, imc, cambio };
  }

  const evolutionData = generarEvolutionDataSemanal(clinicalRecords);
  console.log(clinicalRecords);

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
      value: (() => {
        if (clinicalRecords.length < 2) return '—';
        const pesoActual = clinicalRecords[0].pesoActual;
        const pesoAnterior = clinicalRecords[1].pesoActual;
        const diff = pesoActual - pesoAnterior;
        const signo = diff > 0 ? '+' : '';
        return `${signo}${diff.toFixed(1)} kg`;
      })(),
      subtitle: (() => {
        if (clinicalRecords.length < 2) return 'Sin datos previos';
        const pesoActual = clinicalRecords[0].pesoActual;
        const pesoAnterior = clinicalRecords[1].pesoActual;
        if (pesoActual < pesoAnterior) return 'Has bajado de peso';
        if (pesoActual > pesoAnterior) return 'Has subido de peso';
        return 'Sin cambios';
      })(),
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
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome currentUser={currentUser} />

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
