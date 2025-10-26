'use client';

// Static imports
import { Bell, User, LogOut, Menu, X } from 'lucide-react';

export default function Header() {
  // Render
  return (
    <header className="sticky top-0 z-40 border-b-2 border-gray-200 bg-white/95 shadow-lg backdrop-blur-lg">
      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg">
            <User className="h-5 w-5 text-white" />
            <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Usuario</p>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <p className="text-xs font-medium text-gray-500">Paciente</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="group relative rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <Bell className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
            <span className="absolute top-0.5 right-0.5 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-[10px] font-bold text-white shadow-lg">
              3
            </span>
          </button>
          <button className="rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden items-center justify-between px-6 py-4 md:flex">
        <div className="flex items-center gap-4">
          <img src="/images/logo.webp" alt="" className="max-w-10" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">MedTrack</h2>
            <p className="text-sm font-medium text-gray-500">Panel de Paciente</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="group relative rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-blue-200 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 active:scale-95">
            <Bell className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-xs font-bold text-white shadow-lg">
              3
            </span>
          </button>

          <div className="flex items-center gap-3 border-l-2 border-gray-200 pl-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Juan Pérez</p>
              <div className="flex items-center justify-start gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                <p className="text-xs font-medium text-gray-500">Paciente</p>
              </div>
            </div>
            <button className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95">
              <User className="h-6 w-6 text-white" />
              <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            </button>
          </div>

          <button className="group rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-red-200 hover:bg-red-50 active:scale-95">
            <LogOut className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown example */}
      <div className="absolute top-full right-4 z-50 mt-2 w-64 rounded-2xl border-2 border-gray-200 bg-white shadow-2xl md:hidden">
        <div className="rounded-t-xl bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Usuario</p>
              <p className="text-xs text-white/80">Paciente</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 active:scale-95">
            <div className="rounded-lg bg-blue-100 p-2 group-hover:bg-blue-500">
              <User className="h-4 w-4 text-blue-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold">Mi Perfil</span>
          </button>
          <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-all duration-200 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 active:scale-95">
            <div className="rounded-lg bg-red-100 p-2 group-hover:bg-red-500">
              <LogOut className="h-4 w-4 text-red-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-bold">Cerrar Sesión</span>
          </button>
        </div>
      </div>

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
