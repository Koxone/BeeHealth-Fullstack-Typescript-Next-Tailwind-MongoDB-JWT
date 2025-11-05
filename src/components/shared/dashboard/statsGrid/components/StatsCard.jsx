import React from 'react';
import { textColors, badgeColors, iconColors, styles } from './StatsData';

function StatsCard({ Icon, MainData, ExtraData, Title, variant = 'primary' }) {
  return (
    <div className={`cursor-pointer rounded-xl p-4 shadow-sm md:p-6 ${styles[variant]}`}>
      <div className="mb-2 flex items-center justify-between">
        <Icon className={`h-8 w-8 ${iconColors[variant]}`} />
        <span className={`rounded px-2 py-1 text-xs font-medium ${badgeColors[variant]}`}>
          {ExtraData}
        </span>
      </div>
      <p className="mb-1 text-2xl font-bold md:text-3xl">{MainData}</p>
      <p className={`text-xs md:text-sm ${textColors[variant]}`}>{Title}</p>
    </div>
  );
}

export default StatsCard;
