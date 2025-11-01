'use client';

import { Heart, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Guardar datos en localStorage para el siguiente paso
    localStorage.setItem('signupData', JSON.stringify(formData));

    // Ir al paso 2: historial clínico
    router.push('/signup/medical-history');
  };
  
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto">
      <div className="h-fit w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-2xl">Crear Cuenta</h1>
          <p className="text-sm text-gray-600 md:text-base">Paso 1 de 2: Información de acceso</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
          <form className="space-y-4 md:space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Teléfono</label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => router.push('/auth/signup/medical-history')}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 font-medium text-white shadow-md transition hover:bg-blue-600 active:scale-95"
            >
              Continuar al historial clínico
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => router.push('/auth/login')}
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
          <div className="h-2 w-8 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
