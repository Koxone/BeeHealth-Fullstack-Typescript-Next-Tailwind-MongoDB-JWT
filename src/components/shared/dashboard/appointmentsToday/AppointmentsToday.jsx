import { Clock, Phone, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentsToday({ appointments, role }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
        <Link
          href={role === 'doctor' ? '/doctor/calendar' : '/employee/appointments'}
          className="bg-medtrack-green-solid hover:bg-medtrack-green-hover flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition active:scale-95"
        >
          Ver todas
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* No appointments */}
      {appointments.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-gray-500">No hay citas programadas para hoy</p>
        </div>
      )}

      {/* Doctor  */}
      {role === 'doctor' && (
        <div className="max-h-[400px] space-y-3 overflow-y-auto">
          {appointments.map((cita) => (
            <Link
              key={cita.id}
              href={`/doctor/patients/${cita?.patientId}`}
              className="border-medtrack-green-solid/30 hover:border-medtrack-green-hover block rounded-xl border-2 p-4 transition hover:bg-emerald-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 transition-colors duration-200 hover:text-emerald-700">
                      {cita.paciente}
                    </h3>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Confirmada
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{cita.hora}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{cita.telefono}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Employee */}
      {role === 'employee' && (
        <div className="max-h-[400px] space-y-3 overflow-y-auto">
          {appointments.map((cita) => (
            <div
              key={cita.id}
              className="border-medtrack-green-solid/30 hover:border-medtrack-green-hover block rounded-xl border-2 p-4 transition hover:bg-emerald-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 transition-colors duration-200 hover:text-emerald-700">
                      {cita.paciente}
                    </h3>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Confirmada
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{cita.hora}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{cita.telefono}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
