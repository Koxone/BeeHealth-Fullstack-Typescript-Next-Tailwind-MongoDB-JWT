import { useRouter } from 'next/navigation';
import React from 'react';

export default function PatientStatsCard({
  role,
  Icon,
  mainData,
  title,
  href,
  extraData,
  variant = 'primary',
}) {
  const router = useRouter();
  const styles = {
    primary: 'bg-medtrack-blue-solid text-white border-transparent',
    success: 'border border-border bg-surface text-main hover:border-medtrack-green-light active:scale-95',
    purple: 'border border-border bg-surface text-main hover:border-medtrack-blue-light active:scale-95',
    danger: 'border-2 border-medtrack-red-light bg-medtrack-red-light/10 text-main hover:border-medtrack-red-light-hover active:scale-95',
  };

  const textColors = {
    primary: 'text-white',
    success: 'text-muted',
    purple: 'text-muted',
    danger: 'text-muted',
  };

  const badgeColors = {
    primary: 'bg-white/20 text-white',
    success: 'bg-medtrack-green-light text-medtrack-green-dark',
    purple: 'bg-medtrack-blue-light text-medtrack-blue-solid',
    danger: 'bg-medtrack-red-light text-medtrack-red-solid',
  };

  const iconColors = {
    primary: 'text-white opacity-80',
    success: 'text-medtrack-green-solid',
    purple: 'text-medtrack-blue-solid',
    danger: 'text-medtrack-red-solid',
  };

  return (
    <div
      onClick={() => router.push(`${href || '#'}`)}
      className={`cursor-pointer rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md md:p-6 ${styles[variant]}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <Icon className={`h-8 w-8 ${iconColors[variant]}`} />
        {extraData && (
          <span className={`rounded px-2 py-1 text-xs font-medium ${badgeColors[variant]}`}>
            {extraData}
          </span>
        )}
      </div>

      {/* Main data */}
      <p className={`mb-1 text-2xl font-bold md:text-3xl ${textColors[variant]}`}>{mainData}</p>

      {/* Title */}
      <p className={`text-xs md:text-sm ${textColors[variant]}`}>{title}</p>
    </div>
  );
}
