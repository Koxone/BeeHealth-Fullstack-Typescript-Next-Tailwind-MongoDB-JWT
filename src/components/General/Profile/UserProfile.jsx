'use client';

import { useState } from 'react';
import { useAuthStore } from '@/Zustand/useAuthStore';
import { User, Mail, Phone, Calendar, Briefcase, Edit2 } from 'lucide-react';

export default function UserProfile() {
  const { currentUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) return null;

  const { role, fullName, email, phone } = currentUser;

  if (role === 'medic')
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Mi Perfil Profesional
            </h1>
            <p className="text-gray-600">Información profesional y de contacto</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
          >
            <Edit2 className="h-5 w-5" />
            {isEditing ? 'Guardar' : 'Editar Perfil'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-green-500">
              <User className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Dr(a). {fullName}</h2>
            <p className="text-gray-600">Nutriólogo(a)</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Información Personal</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Correo Electrónico" value={email} isEditing={isEditing} />
              <Field label="Teléfono" value={phone} isEditing={isEditing} />
              <Field label="Cédula Profesional" value="1234567" isEditing={isEditing} />
              <Field label="Universidad" value="UNAM" isEditing={isEditing} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Información Profesional</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">Biografía</label>
              <textarea
                rows="4"
                defaultValue="Especialista en nutrición clínica con más de 10 años de experiencia ayudando a pacientes a alcanzar sus objetivos de salud."
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 active:scale-95 disabled:bg-gray-50"
              ></textarea>
            </div>
          </div>
        </div>

        <SecuritySection />
      </div>
    );

  if (role === 'employee') {
    const empleado = {
      nombre: fullName,
      email,
      telefono: phone,
      puesto: 'Recepcionista',
      fechaIngreso: '2023-01-15',
      horario: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    };

    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Mi Perfil</h1>
          <p className="text-sm text-gray-600 md:text-base">Información personal y laboral</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-3xl font-bold text-white">
              {empleado.nombre
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{empleado.nombre}</h2>
            <p className="text-gray-600">{empleado.puesto}</p>
          </div>

          <div className="space-y-4">
            <InfoCard icon={Mail} label="Email" value={empleado.email} />
            <InfoCard icon={Phone} label="Teléfono" value={empleado.telefono} />
            <InfoCard icon={Calendar} label="Fecha de Ingreso" value={empleado.fechaIngreso} />
            <InfoCard icon={Briefcase} label="Horario" value={empleado.horario} />
          </div>
        </div>
      </div>
    );
  }

  if (role === 'patient')
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Mi Perfil</h1>
            <p className="text-gray-600">Información personal y médica</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
          >
            <Edit2 className="h-5 w-5" />
            {isEditing ? 'Guardar' : 'Editar Perfil'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-blue-500">
              <User className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">{fullName}</h2>
            <p className="text-gray-600">Paciente</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Información Personal</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Correo Electrónico" value={email} isEditing={isEditing} />
              <Field label="Teléfono" value={phone} isEditing={isEditing} />
              <Field label="Altura (cm)" value="175" isEditing={isEditing} />
              <Field label="Peso Actual (kg)" value="75" isEditing={isEditing} />
            </div>
          </div>
        </div>

        <SecuritySection />
      </div>
    );

  return <p className="text-center text-gray-600">No se encontró un perfil válido.</p>;
}

// Campo editable
function Field({ label, value, isEditing }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        defaultValue={value}
        disabled={!isEditing}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 active:scale-95 disabled:bg-gray-50"
      />
    </div>
  );
}

// Tarjeta de información
function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
      <Icon className="h-5 w-5 text-gray-600" />
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

// Sección de seguridad
function SecuritySection() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Seguridad</h3>
      <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95">
        Cambiar Contraseña
      </button>
    </div>
  );
}
