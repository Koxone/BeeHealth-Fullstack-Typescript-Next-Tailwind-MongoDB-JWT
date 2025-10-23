'use client';

import { Apple, Clock, User } from 'lucide-react';

export default function DietCard({ diet, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg active:scale-95 md:p-6"
    >
      {/* Imagen / Ícono */}
      <div className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100">
        <Apple className="h-16 w-16 text-green-600 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Nombre y descripción */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        {diet.nombre}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-gray-600">{diet.descripcion}</p>

      {/* Duración */}
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
        <Clock className="h-4 w-4 text-blue-500" />
        <span className="font-medium">{diet.duracion}</span>
      </div>

      {/* Médico */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <User className="h-4 w-4 text-green-600" />
        <span className="font-medium">{diet.medico}</span>
      </div>

      {/* Footer visual */}
      <div className="mt-4 text-sm font-medium text-blue-600 opacity-90 transition-opacity group-hover:opacity-100">
        Ver detalles →
      </div>
    </div>
  );
}
