'use client';

import { Activity, Weight, TrendingDown, Ruler } from 'lucide-react';
import PatientStatsCard from './PatientStatsCard';
import { useGetAllClinicalRecords } from '@/hooks/clinicalRecords/get/useGetAllClinicalRecords';
import useGetAnswer from '@/hooks/useGetAnswer';

export default function PatientStatsGrid({ role, currentUser }) {
  const { data } = useGetAllClinicalRecords({ patient: currentUser?.id });

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
          mainData: `${pesoActual} kg`,
          extraData: `${pctPeso}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${tallaActual} cm`,
          extraData: `${pctTalla}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${diffPeso} kg`,
          extraData: `${pctPeso}%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Activity,
          mainData: `${getAnswerLatest(127)}`,
          title: 'IMC Actual',
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
