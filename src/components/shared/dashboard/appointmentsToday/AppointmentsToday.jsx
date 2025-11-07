import { Clock, Users, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentsToday({ appointments }) {
  console.log(appointments);
  const citasHoyData = [
    { id: 1, hora: '09:00', paciente: 'Juan Pérez', estado: 'Confirmada', telefono: '555-0101' },
    { id: 2, hora: '10:30', paciente: 'María López', estado: 'Pendiente', telefono: '555-0102' },
    { id: 3, hora: '11:00', paciente: 'Carlos Ruiz', estado: 'Confirmada', telefono: '555-0103' },
    { id: 4, hora: '15:00', paciente: 'Ana Martínez', estado: 'Pendiente', telefono: '555-0104' },
    { id: 5, hora: '16:30', paciente: 'Pedro García', estado: 'Confirmada', telefono: '555-0105' },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
        <Link
          href="/doctor/calendar"
          className="bg-medtrack-green-solid hover:bg-medtrack-green-hover flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition active:scale-95"
        >
          Ver todas
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="max-h-[400px] space-y-3 overflow-y-auto">
        {appointments.map((cita) => (
          <div
            key={cita.id}
            className="border-medtrack-green-solid/30 hover:border-medtrack-green-hover rounded-xl border-2 p-4 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{cita.paciente}</h3>
                  <span
                    className={`rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800`}
                  >
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
    </div>
  );
}
