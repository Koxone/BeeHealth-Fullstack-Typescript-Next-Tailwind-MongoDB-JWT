'use client';

import {
  ClipboardList,
  FileText,
  Package,
  DollarSign,
  Wallet,
  HeartPulse,
  AlignLeft,
  Image,
  Pill,
  FlaskRound,
} from 'lucide-react';

/* Tabs navigation */
export default function TabsNav({ activeTab, setActiveTab }) {
  const tabs = [
    { name: 'Historial', icon: ClipboardList },
    { name: 'Presupuestos', icon: FileText },
    { name: 'Productos', icon: Package },
    { name: 'Cotización', icon: DollarSign },
    { name: 'Caja', icon: Wallet },
    { name: 'Ortodoncia', icon: AlignLeft },
    { name: 'Imágenes', icon: Image },
    { name: 'Receta', icon: Pill },
    { name: 'Laboratorios', icon: FlaskRound },
  ];

  return (
    <div className="scrollbar-thin scrollbar-thumb-emerald-400/30 scrollbar-track-transparent flex w-full justify-between overflow-x-auto rounded-2xl border border-(--med-gray-border) bg-white/80 p-1 shadow-sm backdrop-blur-sm">
      {tabs.map(({ name, icon: Icon }, index) => (
        <button
          key={name}
          onClick={() => setActiveTab(name)}
          className={[
            'group relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-3',
            activeTab === name
              ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md'
              : 'text-(--med-text-dark) hover:bg-(--med-blue-light)/30 hover:text-emerald-600',
          ].join(' ')}
        >
          <Icon
            className={`h-4 w-4 transition-all duration-300 ${
              activeTab === name
                ? 'scale-110 text-white'
                : 'text-emerald-600 group-hover:scale-110 group-hover:text-emerald-700'
            }`}
          />
          <span className="whitespace-nowrap">{name}</span>

          {activeTab === name && (
            <div className="absolute right-0 bottom-0 left-0 h-[3px] rounded-full bg-white/70 shadow-md transition-all duration-300" />
          )}
        </button>
      ))}
    </div>
  );
}
