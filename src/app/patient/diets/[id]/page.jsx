'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Apple, Clock, User, Calendar } from 'lucide-react';

export default function PatientDietDetail({ params }) {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver a Dietas
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex h-64 items-center justify-center bg-linear-to-br from-green-100 to-blue-100">
          <Apple className="h-32 w-32 text-green-600" />
        </div>

        <div className="p-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Plan Mediterráneo</h1>

          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>30 días</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              <span>Dra. Martínez</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Inicio: 01 Oct 2024</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Descripción</h2>
            <p className="mb-6 text-gray-600">
              Dieta balanceada rica en vegetales, frutas, pescado y aceite de oliva. Este plan está
              diseñado para ayudarte a alcanzar tus objetivos de peso de manera saludable y
              sostenible.
            </p>

            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Instrucciones Diarias
            </h2>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Desayuno (8:00 AM)</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-600">
                  <li>1 taza de avena con frutas</li>
                  <li>1 yogurt natural</li>
                  <li>Té verde o café sin azúcar</li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Almuerzo (1:00 PM)</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-600">
                  <li>Ensalada verde con aceite de oliva</li>
                  <li>150g de pescado a la plancha</li>
                  <li>1 porción de arroz integral</li>
                  <li>Agua natural</li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Cena (7:00 PM)</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-600">
                  <li>Sopa de verduras</li>
                  <li>Pechuga de pollo a la plancha</li>
                  <li>Ensalada mixta</li>
                  <li>Infusión de hierbas</li>
                </ul>
              </div>
            </div>

            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Notas del Médico
            </h2>
            <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="text-gray-700">
                Recuerda mantener una hidratación adecuada (2 litros de agua al día). Evita
                alimentos procesados y azúcares refinados. Complementa con 30 minutos de ejercicio
                moderado diario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
