'use client';

import { useRouter } from 'next/navigation';
import { Heart, Activity, Calendar, Apple, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-500 md:h-8 md:w-8" />
            <span className="text-xl font-bold text-gray-900 md:text-2xl">MedTrack</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => router.push('/about')}
              className="text-gray-600 transition hover:text-gray-900"
            >
              Acerca de
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="text-gray-600 transition hover:text-gray-900"
            >
              Contacto
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 font-medium text-blue-600 transition hover:text-blue-700"
            >
              Ingresar
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-sm transition hover:bg-blue-600"
            >
              Registrarse
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
          >
            {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="border-t bg-white md:hidden">
            <div className="space-y-2 px-4 py-3">
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/about');
                }}
                className="w-full rounded-lg px-4 py-2 text-left text-gray-700 transition hover:bg-gray-50"
              >
                Acerca de
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/contact');
                }}
                className="w-full rounded-lg px-4 py-2 text-left text-gray-700 transition hover:bg-gray-50"
              >
                Contacto
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/login');
                }}
                className="w-full rounded-lg px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Ingresar
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/signup');
                }}
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:mb-6 md:text-5xl">
              Control médico inteligente para tu salud
            </h1>
            <p className="mb-6 text-lg text-gray-600 md:mb-8 md:text-xl">
              Gestiona tu peso, historial clínico, citas médicas y dietas personalizadas en un solo
              lugar.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <button
                onClick={() => router.push('/signup')}
                className="w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-600 active:scale-95 sm:w-auto"
              >
                Comenzar ahora
              </button>
              <button
                onClick={() => router.push('/about')}
                className="w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95 sm:w-auto"
              >
                Conocer más
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-linear-to-br from-blue-100 to-green-100 p-8 shadow-xl md:p-12">
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <Activity className="mx-auto mb-4 h-12 w-12 text-blue-500 md:h-16 md:w-16" />
              <h3 className="text-center text-lg font-semibold text-gray-900 md:text-xl">
                Tu salud en tiempo real
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:mb-12 md:text-3xl">
          Todo lo que necesitas para cuidar tu salud
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg md:p-6">
            <Activity className="mb-3 h-8 w-8 text-blue-500 md:mb-4 md:h-12 md:w-12" />
            <h3 className="mb-1 text-sm font-semibold text-gray-900 md:mb-2 md:text-lg">
              Control de Peso
            </h3>
            <p className="text-xs text-gray-600 md:text-base">Monitorea tu peso e IMC</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg md:p-6">
            <Heart className="mb-3 h-8 w-8 text-red-500 md:mb-4 md:h-12 md:w-12" />
            <h3 className="mb-1 text-sm font-semibold text-gray-900 md:mb-2 md:text-lg">
              Historial Clínico
            </h3>
            <p className="text-xs text-gray-600 md:text-base">Historial completo</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg md:p-6">
            <Calendar className="mb-3 h-8 w-8 text-green-500 md:mb-4 md:h-12 md:w-12" />
            <h3 className="mb-1 text-sm font-semibold text-gray-900 md:mb-2 md:text-lg">
              Citas Médicas
            </h3>
            <p className="text-xs text-gray-600 md:text-base">Agenda fácilmente</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg md:p-6">
            <Apple className="mb-3 h-8 w-8 text-yellow-500 md:mb-4 md:h-12 md:w-12" />
            <h3 className="mb-1 text-sm font-semibold text-gray-900 md:mb-2 md:text-lg">Dietas</h3>
            <p className="text-xs text-gray-600 md:text-base">Planes a tu medida</p>
          </div>
        </div>
      </section>
    </div>
  );
}
