import { Apple, Clock } from 'lucide-react';
import DietCardActions from './components/DietCardActions';
import Link from 'next/link';

export default function SharedDietCard({ diet, role }) {
  return (
    <div className="group border-medtrack-green-light hover:border-medtrack-green-hover rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg md:p-6">
      {/* Image/Icon */}
      <div className="relative mb-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100">
        <Apple className="h-12 w-12 text-green-600 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Diet Name */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        {diet?.name}
      </h3>

      {/* Patient Diet Description */}
      {role === 'patient' && (
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{diet?.description}</p>
      )}

      {/* Doctor Diet Stats */}
      {role === 'doctor' && (
        <div className="mb-4 space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Asignado a:</span> {diet?.pacientes}{' '}
            Pacientes
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Duración:</span> {diet?.duration}
          </p>
        </div>
      )}

      {/* Patient Diet Duration */}
      {role === 'patient' && (
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{diet?.duration}</span>
        </div>
      )}

      {/* Doctor Actions */}
      {role === 'doctor' && <DietCardActions id={diet?.id} />}

      {/* Patient Actions */}
      {role === 'patient' && (
        <Link
          href={`/patient/diets/${diet?.id}`}
          className="text-medtrack-green-dark mt-4 text-sm font-medium opacity-90 transition-opacity group-hover:opacity-100 hover:text-blue-500"
        >
          Ver detalles →
        </Link>
      )}
    </div>
  );
}
