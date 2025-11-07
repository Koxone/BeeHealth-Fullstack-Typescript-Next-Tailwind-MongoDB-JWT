import React from 'react';
import {
  Package,
  Calendar,
  ClipboardClock,
  UserPlus,
  Download,
  Apple,
  Plus,
  DollarSign,
  Activity,
  Dumbbell,
} from 'lucide-react';
import Link from 'next/link';

function GeneralSectionHeader({ role, Icon, title = '', subtitle = '' }) {
  const iconsMap = {
    inventory: Package,
    consultas: ClipboardClock,
    calendar: Calendar,
    pacientes: UserPlus,
    diets: Apple,
    workouts: Dumbbell,
    accounting: DollarSign,
    history: Activity,
  };

  const SelectedIcon = iconsMap[Icon] || Package;

  return (
    <div className="-mx-4 -mt-4 mb-6 flex w-full items-center justify-between px-4 pt-6 md:rounded-2xl">
      <div>
        <div className="flex items-start gap-4">
          <div className="bg-medtrack-green-dark rounded-2xl p-3 shadow-lg">
            <SelectedIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {title}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Doctor Export Button */}
      {role === 'doctor' && Icon === 'diets' && (
        <div className="flex items-center gap-4">
          {/* Doctor New Diet Button */}
          <Link
            href="/doctor/diets/new"
            className="bg-medtrack-green-solid hover:bg-medtrack-green-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white transition active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Nueva Dieta
          </Link>

          {/* Doctor Export Button */}
          {role === 'doctor' && Icon === 'accounting' && (
            <button className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-white transition hover:bg-green-800 active:scale-95">
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GeneralSectionHeader;
