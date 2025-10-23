'use client';

/* header */
export default function PatientHeader({ patient, icons, moment }) {
  const { User, Mail, Phone, CalendarIcon, Activity, Stethoscope } = icons;
  return (
    <div className="bg-asana-green relative overflow-hidden rounded-2xl p-8 shadow-xl">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="group relative">
          <div className="absolute inset-0 rounded-full bg-white opacity-75 blur-xl transition-opacity group-hover:opacity-100" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
            <User className="h-14 w-14 text-blue-600" />
          </div>
          <div className="absolute -right-2 -bottom-2 rounded-full bg-green-500 p-2 shadow-lg ring-4 ring-white">
            <Activity className="h-4 w-4 text-white" />
          </div>
        </div>

        <div className="flex-1 text-white">
          {/* Patient Status */}
          <div className="border-asana-beige/40 mb-3 inline-flex items-center gap-2 rounded-full border bg-black/20 px-4 py-1.5 backdrop-blur-sm">
            <Stethoscope className="h-4 w-4" />
            <span className="text-sm font-medium">Paciente Activo</span>
          </div>

          {/* Patient Name */}
          <h1 className="mb-4 text-4xl font-bold">{patient?.fullName}</h1>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Patient Mail */}
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-blue-100">Correo</p>
                <p className="truncate text-sm font-semibold">{patient?.email}</p>
              </div>
            </div>

            {/* Patient Phone Number */}
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Teléfono</p>
                <p className="text-sm font-semibold">{patient?.phone}</p>
              </div>
            </div>

            {/* Patient First Consultation */}
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Registro</p>
                <p className="text-sm font-semibold">
                  {moment(patient?.createdAt).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
