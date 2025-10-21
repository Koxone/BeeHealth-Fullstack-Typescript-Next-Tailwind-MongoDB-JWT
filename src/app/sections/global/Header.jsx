'use client';

import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header({ userName = 'Usuario', role = 'patient' }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {role === 'medic' ? `Dr. ${userName}` : `${userName}`}
            </p>
            <p className="text-xs text-gray-500">{role === 'patient' ? 'Paciente' : 'Médico'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative rounded-lg p-2 transition hover:bg-gray-100 active:scale-95">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden items-center justify-between px-6 py-4 md:flex">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">MedTrack</h2>
          <p className="text-sm text-gray-500">
            {role === 'patient' ? 'Panel de Paciente' : 'Panel Médico'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 transition hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {role === 'medic' ? `Dr. ${userName}` : `${userName}`}
              </p>
              <p className="text-xs text-gray-500">{role === 'patient' ? 'Paciente' : 'Médico'}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute top-full right-4 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg md:hidden">
            <div className="p-2">
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push(role === 'patient' ? '/patient/profile' : '/doctor/profile');
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                <span className="text-sm">Mi Perfil</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (role === 'patient') {
                    router.push('/patient/support');
                  }
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <Bell className="h-4 w-4" />
                <span className="text-sm">Notificaciones</span>
              </button>
              <div className="my-2 border-t border-gray-200" />
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/');
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
