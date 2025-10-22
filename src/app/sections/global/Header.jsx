'use client';

import { useAuthStore } from '@/Zustand/useAuthStore';
import { Bell, User, LogOut, Menu, Settings, HelpCircle, Shield, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header({ userName = 'Usuario', role = 'patient' }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Zustand
  const { currentUser, logout } = useAuthStore();

  const notificationCount = 3;

  const getRoleInfo = () => {
    switch (role) {
      case 'doctor':
      case 'medic':
        return {
          title: `Dr. ${userName}`,
          subtitle: 'Médico',
          gradient: 'from-purple-500 to-pink-600',
          bgGradient: 'from-purple-50 to-pink-50',
        };
      case 'employee':
        return {
          title: userName,
          subtitle: 'Empleado',
          gradient: 'from-emerald-500 to-green-600',
          bgGradient: 'from-emerald-50 to-green-50',
        };
      default:
        return {
          title: userName,
          subtitle: 'Paciente',
          gradient: 'from-blue-500 to-indigo-600',
          bgGradient: 'from-blue-50 to-indigo-50',
        };
    }
  };

  const roleInfo = getRoleInfo();

  const mockNotifications = [
    { id: 1, title: 'Nueva cita programada', time: 'Hace 5 min', unread: true },
    { id: 2, title: 'Recordatorio de medicación', time: 'Hace 1 hora', unread: true },
    { id: 3, title: 'Resultados disponibles', time: 'Hace 2 horas', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-gray-200 bg-white/95 shadow-lg backdrop-blur-lg">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${roleInfo.gradient} shadow-lg`}
          >
            <User className="h-5 w-5 text-white" />
            <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{roleInfo.title}</p>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <p className="text-xs font-medium text-gray-500">{roleInfo.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications button mobile */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="group relative rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            <Bell className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
            {notificationCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-[10px] font-bold text-white shadow-lg">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            {showMenu ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden items-center justify-between px-6 py-4 md:flex">
        <div className="flex items-center gap-4">
          <div className={`bg-linear-to-br p-3 ${roleInfo.gradient} rounded-2xl shadow-lg`}>
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">MedTrack</h2>
            <p className="text-sm font-medium text-gray-500">
              {role === 'patient'
                ? 'Panel de Paciente'
                : role === 'employee'
                  ? 'Panel de Empleado'
                  : 'Panel Médico'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="group relative rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-blue-200 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 active:scale-95"
            >
              <Bell className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-xs font-bold text-white shadow-lg">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="animate-slideDown absolute top-full right-0 z-50 mt-2 w-80 rounded-2xl border-2 border-gray-200 bg-white shadow-2xl">
                  <div className="rounded-t-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3">
                    <h3 className="text-sm font-bold text-white">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-2">
                    {mockNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`group flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-blue-50 ${
                          notif.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div
                          className={`rounded-lg p-2 ${notif.unread ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                          <Bell className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                        {notif.unread && (
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-gray-200 p-3">
                    <button className="w-full rounded-lg py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 border-l-2 border-gray-200 pl-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{roleInfo.title}</p>
              <div className="flex items-center justify-end gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                <p className="text-xs font-medium text-gray-500">{roleInfo.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (role === 'medic' || role === 'doctor') router.push('/doctor/profile');
                else if (role === 'patient') router.push('/patient/profile');
                else if (role === 'employee') router.push('/employee/profile');
              }}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${roleInfo.gradient} shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95`}
            >
              <User className="h-6 w-6 text-white" />
              <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="group rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-red-200 hover:bg-red-50 active:scale-95"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu mejorado */}
      {showMenu && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setShowMenu(false)}
          />
          <div className="animate-slideDown absolute top-full right-4 z-50 mt-2 w-64 rounded-2xl border-2 border-gray-200 bg-white shadow-2xl md:hidden">
            {/* Menu Header */}
            <div
              className={`bg-linear-to-r ${roleInfo.gradient} relative overflow-hidden rounded-t-xl px-4 py-4`}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-20 w-20 rounded-full bg-white/10" />
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-lg backdrop-blur-sm`}
                >
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{roleInfo.title}</p>
                  <p className="text-xs text-white/80">{roleInfo.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push(
                    role === 'patient'
                      ? '/patient/profile'
                      : role === 'employee'
                        ? '/employee/profile'
                        : '/doctor/profile'
                  );
                }}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 active:scale-95"
              >
                <div className="rounded-lg bg-blue-100 p-2 transition-all duration-200 group-hover:bg-blue-500">
                  <User className="h-4 w-4 text-blue-600 transition-colors duration-200 group-hover:text-white" />
                </div>
                <span className="text-sm font-semibold">Mi Perfil</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowNotifications(true);
                }}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50 active:scale-95"
              >
                <div className="relative rounded-lg bg-amber-100 p-2 transition-all duration-200 group-hover:bg-amber-500">
                  <Bell className="h-4 w-4 text-amber-600 transition-colors duration-200 group-hover:text-white" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                      {notificationCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold">Notificaciones</span>
              </button>

              {role === 'patient' && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    router.push('/patient/support');
                  }}
                  className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 active:scale-95"
                >
                  <div className="rounded-lg bg-purple-100 p-2 transition-all duration-200 group-hover:bg-purple-500">
                    <HelpCircle className="h-4 w-4 text-purple-600 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-semibold">Soporte</span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowMenu(false);
                  // Configuración
                }}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-linear-to-r hover:from-gray-50 hover:to-slate-50 active:scale-95"
              >
                <div className="rounded-lg bg-gray-100 p-2 transition-all duration-200 group-hover:bg-gray-500">
                  <Settings className="h-4 w-4 text-gray-600 transition-colors duration-200 group-hover:text-white" />
                </div>
                <span className="text-sm font-semibold">Configuración</span>
              </button>

              <div className="my-2 border-t-2 border-gray-200" />

              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                  router.push('/');
                }}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-all duration-200 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 active:scale-95"
              >
                <div className="rounded-lg bg-red-100 p-2 transition-all duration-200 group-hover:bg-red-500">
                  <LogOut className="h-4 w-4 text-red-600 transition-colors duration-200 group-hover:text-white" />
                </div>
                <span className="text-sm font-bold">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </header>
  );
}
