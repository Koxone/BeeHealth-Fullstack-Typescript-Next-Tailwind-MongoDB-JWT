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
} from 'lucide-react';

export default function Sidebar({ role = 'patient' }) {
  const router = useRouter();
  const pathname = usePathname();

  const patientMenu = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/patient/dashboard' },
    { icon: FileText, label: 'Historial', path: '/patient/history' },
    { icon: Calendar, label: 'Citas', path: '/patient/appointments' },
    { icon: Apple, label: 'Dietas', path: '/patient/diets' },
    { icon: User, label: 'Perfil', path: '/patient/profile' },
    { icon: HelpCircle, label: 'Soporte', path: '/patient/support' },
  ];

  const doctorMenu = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/doctor/dashboard' },
    { icon: Users, label: 'Pacientes', path: '/doctor/patients' },
    { icon: Calendar, label: 'Calendario', path: '/doctor/calendar' },
    { icon: Apple, label: 'Dietas', path: '/doctor/diets' },
    { icon: BarChart3, label: 'Stats', path: '/doctor/analytics' },
    { icon: User, label: 'Contabilidad', path: '/doctor/accounting' },
    { icon: User, label: 'Inventario', path: '/doctor/inventory' },
    { icon: User, label: 'Perfil', path: '/doctor/profile' },
  ];

  const menu = role === 'patient' ? patientMenu : doctorMenu;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-64 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">MedTrack</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <li key={item.path}>
                  <button
                    onClick={() => router.push(item.path)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                      isActive
                        ? 'bg-blue-50 font-medium text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="safe-area-inset-bottom fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white md:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {menu.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center rounded-lg px-1 py-2 transition ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className={`mb-1 h-6 w-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
