import CreateAppointmentButton from './components/CreateAppointmentButton';
import RegisterVisitButton from './components/RegisterVisitButton';
import questionsMap from '@/data/questions.json';

export default function PatientHeader({
  patient,
  icons,
  moment,
  onClickNew,
  mockPatient,
  patientRecord,
}) {
  const { User, Mail, Phone, CalendarIcon, Activity, Stethoscope } = icons;

  // Specialty map
  const specialtyLabels = {
    weight: 'Control de Peso',
    dental: 'Odontología',
    stetic: 'Tratamiento Estético',
  };

  const specialtyName = specialtyLabels[patient?.specialty] || 'Sin especialidad';

  const readableAnswers = patientRecord?.[0]?.answers.map((a) => {
    const q = questionsMap.find((q) => q.id === a.qId);
    return {
      question: q?.question || `Pregunta ${a.qId}`,
      answer: a.value,
    };
  });

  console.log(patientRecord);

  return (
    <div className="bg-asana-green relative overflow-hidden rounded-2xl p-8 shadow-xl">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="group relative">
          <div className="absolute inset-0 rounded-full bg-white opacity-75 blur-xl transition-opacity group-hover:opacity-100" />

          {/* Avatar */}
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
            <img src={patient?.avatar || '/oochel.jpg'} alt="" />
          </div>
        </div>

        <div className="flex-1 text-white">
          <div className="flex items-center justify-between">
            {/* Patient Specialty */}
            <div className="border-asana-beige/40 mb-3 inline-flex items-center gap-2 rounded-full border bg-black/20 px-4 py-1.5 backdrop-blur-sm">
              <Stethoscope className="h-4 w-4" />
              <span className="text-sm font-medium capitalize">Paciente de: {specialtyName}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Create Appointment Button */}
              <CreateAppointmentButton onClickNew={onClickNew} />

              {/* Register Patient Visit Button */}
              <RegisterVisitButton />
            </div>
          </div>

          <div>
            {/* Patient Name */}
            <h1 className="text-4xl font-bold">{patientRecord?.[0]?.patient?.fullName}</h1>
            {/* Patient Age */}
            <p className="text-sm">{mockPatient?.age} años</p>
            {/* Patient Gender */}
            <p className="mb-4 text-sm">{mockPatient?.gender}</p>
          </div>

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
