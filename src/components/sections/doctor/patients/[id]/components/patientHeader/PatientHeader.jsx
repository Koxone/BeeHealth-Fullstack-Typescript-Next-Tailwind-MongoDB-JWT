import { User, Mail, Phone, CalendarIcon, Activity, Stethoscope } from 'lucide-react';
import CreateAppointmentButton from './components/CreateAppointmentButton';
import RegisterVisitButton from './components/RegisterVisitButton';
import questionsMap from '@/data/questions.json';
import moment from 'moment';

export default function PatientHeader({ patient, onClickNew, patientRecord }) {
  // Specialty map
  const specialtyLabels = {
    weight: 'Control de Peso',
    dental: 'Odontología',
    stetic: 'Tratamiento Estético',
  };
  const specialtyName = specialtyLabels[patientRecord?.[0]?.specialty] || 'Sin especialidad';
  // Get label helper
  function getQuestionLabel(id) {
    const q = questionsMap.find((q) => q.id === Number(id));
    return q ? q.question : `Campo ${id}`;
  }

  function getAnswer(id) {
    return patientRecord?.[0]?.answers?.[id] || 'Sin respuesta';
  }

  return (
    <div className="bg-beehealth-green-solid relative overflow-hidden rounded-2xl p-8 shadow-xl">
      <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-beehealth-body-main/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="group relative">
          <div className="bg-beehealth-body-main absolute inset-0 rounded-full opacity-75 blur-xl transition-opacity group-hover:opacity-100" />

          {/* Avatar */}
          <div className="bg-beehealth-body-main relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
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
            <h1 className="text-4xl font-bold">
              {patientRecord?.length > 0 ? getAnswer(1) : patient?.fullName}
            </h1>
            {/* Patient Age */}
            <p className="text-sm">
              {patientRecord?.length > 0 ? getAnswer(4) : 'No hay historial clinico'}{' '}
              {patientRecord?.length > 0 ? 'años' : ''}
            </p>
            {/* Patient Gender */}
            <p className="mb-4 text-sm">
              {patientRecord?.length > 0 ? getAnswer(5) : 'No hay historial clinico'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Patient Mail */}
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-blue-100">Correo</p>
                <p className="truncate text-sm font-semibold">
                  {patientRecord?.length > 0 ? getAnswer(12) : patient?.email}
                </p>
              </div>
            </div>

            {/* Patient Phone Number */}
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Telefono</p>
                <p className="text-sm font-semibold">
                  {patientRecord?.length > 0 ? getAnswer(14) : patient?.phone}
                </p>
              </div>
            </div>

            {/* Patient First Consultation */}
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
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
