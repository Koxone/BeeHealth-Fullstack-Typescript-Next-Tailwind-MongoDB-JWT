'use client';

import { LayoutDashboard, Calendar, ChevronRight } from 'lucide-react';
import {
  patientSidebarItems,
  doctorSidebarItems,
  employeeSidebarItems,
} from './components/SideBarData';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  // Hooks
  const pathname = usePathname();
  const router = useRouter();

  const sidebarOptions = pathname.startsWith('/doctor')
    ? doctorSidebarItems
    : pathname.startsWith('/patient')
      ? patientSidebarItems
      : employeeSidebarItems;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-72 flex-col border-r-2 border-gray-200 bg-linear-to-b from-white to-gray-50 shadow-xl md:flex">
        <nav className="flex-1 space-y-1 p-4">
          {sidebarOptions.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);

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
                {/* Active background effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-indigo-500/5" />
                )}

                {/* Icon and label */}
                <div className="relative z-10 flex flex-1 items-center gap-3">
                  <div
                    className={`rounded-lg p-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500 shadow-lg'
                        : 'bg-gray-100 group-hover:scale-110 group-hover:bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                      }`}
                    />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>

                {/* Chevron and decorative bar */}
                {isActive && (
                  <>
                    <ChevronRight className="relative z-10 h-4 w-4 text-blue-600" />
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 rounded-r-full bg-linear-to-b from-blue-500 to-indigo-600" />
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile navigation */}
      <nav className="safe-area-inset-bottom fixed right-0 bottom-0 left-0 z-50 border-t-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          {/* Dashboard */}
          <button
            onClick={() => router.push(`/${pathname.split('/')[1]}/dashboard`)}
            className={`relative flex flex-col items-center justify-center rounded-xl px-1 py-2.5 transition-all duration-200 ${
              pathname.endsWith('/dashboard')
                ? 'scale-110 text-blue-600'
                : 'text-gray-600 active:scale-95'
            }`}
          >
            {pathname.endsWith('/dashboard') && (
              <>
                <div className="animate-fadeIn absolute inset-0 rounded-xl bg-linear-to-t from-blue-50 to-indigo-50" />
                <div className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full bg-linear-to-r from-purple-500 to-pink-600" />
              </>
            )}
            <div className="relative z-10">
              <LayoutDashboard className="mb-1 h-6 w-6 stroke-[2.5]" />
              <span className="text-[10px] font-semibold">Inicio</span>
            </div>
          </button>

          {/* Appointments */}
          <button
            onClick={() => router.push(`/${pathname.split('/')[1]}/appointments`)}
            className={`relative flex flex-col items-center justify-center rounded-xl px-1 py-2.5 transition-all duration-200 ${
              pathname.includes('/appointments')
                ? 'scale-110 text-blue-600'
                : 'text-gray-600 active:scale-95'
            }`}
          >
            {pathname.includes('/appointments') && (
              <>
                <div className="animate-fadeIn absolute inset-0 rounded-xl bg-linear-to-t from-blue-50 to-indigo-50" />
                <div className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full bg-linear-to-r from-purple-500 to-pink-600" />
              </>
            )}
            <div className="relative z-10">
              <Calendar className="mb-1 h-6 w-6" />
              <span className="text-[10px] font-semibold">Citas</span>
            </div>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <span className="text-[8px] font-bold text-white">2</span>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
