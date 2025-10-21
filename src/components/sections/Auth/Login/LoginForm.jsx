'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '@/Zustand/useAuthStore';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Zustand
  const { login } = useAuthStore();

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // Guarda el token y usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirige según el rol del usuario
      const role = data.user.role;
      if (role === 'patient') router.push('/patient/dashboard');
      else if (role === 'doctor') router.push('/doctor/dashboard');
      else if (role === 'employee') router.push('/employee/dashboard');
      else router.push('/admin/dashboard');
      console.log(data);
      login(data.user, data.token);
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Heart className="h-10 w-10 text-blue-500" />
          <span className="text-2xl font-bold text-gray-900 md:text-3xl">MedTrack</span>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
        <p className="mb-8 text-center text-gray-600">Accede a tu cuenta médica</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Recordarme</span>
            </label>
            <button type="button" className="text-blue-600 hover:text-blue-700">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón principal */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-3 font-medium text-white transition ${
              loading ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Enlace a registro */}
        <p className="mt-6 text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => router.push('/signup')}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
