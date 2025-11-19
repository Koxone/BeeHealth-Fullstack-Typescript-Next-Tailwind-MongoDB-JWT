import { Apple, Clock } from 'lucide-react';
import DietCardActions from './components/DietCardActions';
import Link from 'next/link';

export default function SharedDietCard({ diet, role }) {
  return (
    <div className="group border-medtrack-green-light group hover:border-medtrack-green-hover rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg md:p-6">
      {/* Diet Image */}
      <div className="relative mb-4 flex h-32 w-full scale-90 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100 transition-transform duration-250 group-hover:scale-100">
        <img src={diet?.images?.[0]} alt={diet?.name} />
      </div>

      {/* Diet Name */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        {diet?.name}
      </h3>

      {/* Doctor Diet Stats */}
      {role === 'doctor' && (
        <div className="mb-4 space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Asignado a:</span> {diet?.patients?.length}{' '}
            Pacientes
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Categoria:</span> {diet?.category}
          </p>
        </div>
      )}

      {/* Doctor Actions */}
      {role === 'doctor' && <DietCardActions id={diet?._id} />}

      {/* Patient Diet Description */}
      {role === 'patient' && (
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{diet?.description}</p>
      )}

      {/* Patient Diet Duration */}
      {role === 'patient' && (
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{diet?.duration}</span>
        </div>
      )}

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
