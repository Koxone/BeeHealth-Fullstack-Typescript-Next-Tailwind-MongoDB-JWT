import { ArrowLeft, Apple, Clock, User, Calendar } from 'lucide-react';
import Link from 'next/link';
import { diets } from '@/components/shared/diets/[id]/components/sharedDietsMockData';

export default function PatientDietDetail({ params }) {
  const { id } = params;
  const diet = diets.find((d) => d.id === id);

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <Link
        href="/patient/diets"
        className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver a Dietas
      </Link>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex h-64 items-center justify-center bg-linear-to-br from-green-100 to-blue-100">
          <Apple className="h-32 w-32 text-green-600" />
        </div>

        <div className="p-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{diet?.name}</h1>

          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{diet?.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              <span>Dr. {diet?.doctor}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>{diet?.assignedDate}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Descripción</h2>
            <p className="mb-6 text-gray-600">{diet?.description}</p>

            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Instrucciones Diarias
            </h2>
            <div className="mb-6 space-y-4">
              {diet.plan.map((meal, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-4">
                  {/* Title and time */}
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {meal.title} ({meal.time})
                  </h3>

                  {/* Items */}
                  <ul className="list-inside list-disc space-y-1 text-gray-600">
                    {meal.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Notas del Médico
            </h2>
            <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="text-gray-700">{diet?.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
