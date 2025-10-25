'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Apple,
  User,
  HelpCircle,
  Users,
  BarChart3,
  Heart,
  DollarSign,
  Package,
  Activity,
  Dumbbell,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useDoctorStatsStore } from '@/Zustand/useDoctorStatsStore';

export default function Sidebar({ role = 'patient' }) {
  const router = useRouter();
  const pathname = usePathname();

  // Zustand
  const todayAppointments = useDoctorStatsStore((state) => state.todayAppointments);
  const visiblePatientsCount = useDoctorStatsStore((state) => state.visiblePatientsCount);

  const patientMenu = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/patient/dashboard', badge: null },
    { icon: Activity, label: 'Historial', path: '/patient/history', badge: null },
    { icon: Calendar, label: 'Agendar Cita', path: '/patient/appointments', badge: null },
    { icon: Apple, label: 'Dietas', path: '/patient/diets', badge: null },
    { icon: Dumbbell, label: 'Ejercicios', path: '/patient/exercises', badge: null },
    { icon: User, label: 'Perfil', path: '/patient/profile', badge: null },
    { icon: HelpCircle, label: 'Soporte', path: '/patient/support', badge: null },
  ];

  const doctorMenu = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/doctor/dashboard', badge: null },
    {
      icon: Users,
      label: 'Pacientes',
      path: '/doctor/patients',
      badge: visiblePatientsCount > 0 ? String(visiblePatientsCount) : '0',
    },
    {
      icon: Calendar,
      label: 'Calendario',
      path: '/doctor/calendar',
      badge: todayAppointments > 0 ? String(todayAppointments) : '0',
    },
    { icon: Apple, label: 'Dietas', path: '/doctor/diets', badge: null },
    { icon: Dumbbell, label: 'Ejercicios', path: '/doctor/exercises', badge: null },
    { icon: DollarSign, label: 'Contabilidad', path: '/doctor/accounting', badge: null },
    { icon: Package, label: 'Inventario', path: '/doctor/inventory', badge: '5' },
    { icon: User, label: 'Perfil', path: '/doctor/profile', badge: null },
  ];

  const employeeMenu = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/employee/dashboard', badge: null },
    { icon: Calendar, label: 'Citas', path: '/employee/appointments', badge: '12' },
    { icon: FileText, label: 'Consultas', path: '/employee/consultations', badge: null },
    { icon: Package, label: 'Inventario', path: '/employee/inventory', badge: '3' },
    { icon: Users, label: 'Pacientes', path: '/employee/patients', badge: null },
    { icon: User, label: 'Perfil', path: '/employee/profile', badge: null },
  ];

  const menu = role === 'patient' ? patientMenu : role === 'employee' ? employeeMenu : doctorMenu;

  const getRoleName = () => {
    switch (role) {
      case 'patient':
        return 'Paciente';
      case 'doctor':
        return 'Doctor';
      case 'employee':
        return 'Empleado';
      default:
        return 'Usuario';
    }
  };

  const getRoleGradient = () => {
    switch (role) {
      case 'patient':
        return 'from-blue-500 to-indigo-600';
      case 'doctor':
        return 'from-purple-500 to-pink-600';
      case 'employee':
        return 'from-emerald-500 to-green-600';
      default:
        return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-72 flex-col border-r-2 border-gray-200 bg-linear-to-b from-white to-gray-50 shadow-xl md:flex">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menu.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`group animate-fadeInLeft relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl px-4 py-3.5 transition-all duration-200 ${
                  isActive
                    ? 'scale-105 border-2 border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50 font-semibold text-blue-600 shadow-md'
                    : 'border-2 border-transparent text-gray-700 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95'
                }`}
              >
                {/* Elemento decorativo de fondo */}
                {isActive && (
                  <div className="absolute inset-0 animate-pulse bg-linear-to-r from-blue-500/5 to-indigo-500/5" />
                )}

                <div className="relative z-10 flex flex-1 items-center gap-3">
                  <div
                    className={`rounded-lg p-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500 shadow-lg'
                        : 'bg-gray-100 group-hover:scale-110 group-hover:bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}
                    />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={`relative z-10 rounded-full px-2 py-1 text-xs font-bold ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 group-hover:bg-blue-500 group-hover:text-white'
                    } transition-all duration-200`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Arrow indicator */}
                {isActive && (
                  <ChevronRight className="relative z-10 h-4 w-4 animate-pulse text-blue-600" />
                )}

                {/* Active indicator bar */}
                {isActive && (
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-1.5 bg-linear-to-b ${getRoleGradient()} rounded-r-full`}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation mejorada */}
      <nav className="safe-area-inset-bottom fixed right-0 bottom-0 left-0 z-50 border-t-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          {menu.slice(0, 5).map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`relative flex flex-col items-center justify-center rounded-xl px-1 py-2.5 transition-all duration-200 ${
                  isActive ? 'scale-110 text-blue-600' : 'text-gray-600 active:scale-95'
                }`}
              >
                {/* Active background */}
                {isActive && (
                  <div className="animate-fadeIn absolute inset-0 rounded-xl bg-linear-to-t from-blue-50 to-indigo-50" />
                )}

                <div className="relative z-10">
                  <div className={`relative ${isActive ? 'animate-bounce-slow' : ''}`}>
                    <Icon className={`mb-1 h-6 w-6 ${isActive ? 'stroke-[2.5]' : ''}`} />

                    {/* Badge para mobile */}
                    {item.badge && (
                      <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                        <span className="text-[8px] font-bold text-white">{item.badge}</span>
                      </div>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-semibold ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div
                    className={`absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 bg-linear-to-r ${getRoleGradient()} rounded-b-full`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style jsx global>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.4s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out;
        }
      `}</style>
    </>
  );
}
