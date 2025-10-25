'use client';

import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';

/* header */
export default function HeaderBar({ onBack }) {
  return (
    <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-4xl">
        {/* <button
          onClick={onBack}
          className="group mb-6 flex items-center gap-2 text-gray-600 transition-all duration-200 hover:text-gray-900"
        >
          <div className="rounded-lg p-1 transition-all duration-200 group-hover:bg-white/80">
            <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
          </div>
          <span className="font-medium">Volver a Citas</span>
        </button> */}

        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">
            <CalendarIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Agendar Nueva Cita
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Sigue los pasos para programar tu consulta médica
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
