'use client';

import { Activity, Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from './PatientStatsCard';
import { useGetAllClinicalRecords } from '@/hooks/clinicalRecords/get/useGetAllClinicalRecords';
import useGetAnswer from '@/hooks/useGetAnswer';
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';

export default function PatientStatsGrid({ role, currentUser }) {
  const { data } = useGetAllClinicalRecords({ patient: currentUser?.id });

  // Weight Logs Hook
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetAllWeightLogs();
console.log(weightLogs)
  // Helpers
  const getAnswerLatest = useGetAnswer(data[0]);
  const getAnswerPrev = useGetAnswer(data[1]);

  /* Calc weight */
  const pesoActual = Number(getAnswerLatest(7));
  const pesoPrevio = Number(getAnswerPrev(7));
  const diffPeso = pesoActual - pesoPrevio;
  const pctPeso = pesoPrevio ? ((diffPeso / pesoPrevio) * 100).toFixed(1) : 0;

  /* Calc height */
  const tallaActual = Number(getAnswerLatest(8));
  const tallaPrev = Number(getAnswerPrev(8));
  const diffTalla = tallaActual - tallaPrev;
  const pctTalla = tallaPrev ? ((diffTalla / tallaPrev) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: `${weightLogs[0]?.currentWeight} kg`,
          extraData: `${pctPeso}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${weightLogs[0]?.currentSize} cm`,
          extraData: `${pctTalla}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${weightLogs[0]?.currentWeight - weightLogs[0]?.originalWeight} kg`,
          extraData: `${pctPeso}%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Clock,
          mainData: `06 dias`,
          title: 'Tiempo para tu siguiente consulta',
          variant: 'success',
        },
      ].map((card, index) => (
        <PatientStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
