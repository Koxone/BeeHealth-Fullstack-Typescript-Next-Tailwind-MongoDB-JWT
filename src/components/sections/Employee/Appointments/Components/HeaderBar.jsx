'use client';

/* header */
import { Calendar } from 'lucide-react'; /* icon */
export default function HeaderBar() {
  return (
    <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start gap-4">
          <div className="rounded-2xl bg-linear-to-br from-emerald-600 to-teal-600 p-3 shadow-lg">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Gestión de Citas
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Agendar y administrar citas de pacientes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
