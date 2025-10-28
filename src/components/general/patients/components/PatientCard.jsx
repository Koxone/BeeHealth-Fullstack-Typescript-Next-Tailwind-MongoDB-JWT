import { Phone, Mail, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('');

export default function PatientCard({ patient, type }) {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-4 transition hover:border-blue-300">
      <div className="flex items-center gap-4">
        {/* Patient Avatar */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 font-semibold text-white">
          {getInitials(patient.nombre)}
        </div>
        <div className="flex-1">
          {/* Patient Name */}
          <h3 className="mb-2 font-semibold text-gray-900">{patient.nombre}</h3>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-3">
            {/* Patient Phone */}
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{patient.telefono}</span>
            </div>

            {/* Patient Email */}
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="truncate">{patient.email}</span>
            </div>
            <div className="flex items-center justify-between">
              {/* Last Appointment */}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Última Cita: {patient.ultimaVisita}</span>
              </div>

              {type.value === 'doctor' ? (
                <Link
                  href={`/doctor/patients/${patient._id}`}
                  className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalles
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
