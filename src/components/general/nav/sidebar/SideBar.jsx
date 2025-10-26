'use client';

import {
  LayoutDashboard,
  FileText,
  Calendar,
  Apple,
  User,
  HelpCircle,
  Users,
  DollarSign,
  Package,
  Dumbbell,
  ChevronRight,
} from 'lucide-react';
import {
  patientSidebarItems,
  doctorSidebarItems,
  employeeSidebarItems,
} from './components/SideBarData';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

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
          {/* Buttons */}
          {sidebarOptions.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                className="group relative flex w-full items-center justify-between gap-3 rounded-xl border-2 border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-3.5 font-semibold text-blue-600 shadow-md transition-all duration-200"
              >
                <div className="relative z-10 flex flex-1 items-center gap-3">
                  <div className="rounded-lg bg-blue-500 p-2 shadow-lg">
                    <Icon className={`h-5 w-5`} />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight className="relative z-10 h-4 w-4 animate-pulse text-blue-600" />
                <div className="absolute top-0 bottom-0 left-0 w-1.5 rounded-r-full bg-linear-to-b from-purple-500 to-pink-600" />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile navigation */}
      <nav className="safe-area-inset-bottom fixed right-0 bottom-0 left-0 z-50 border-t-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          <button className="relative flex scale-110 flex-col items-center justify-center rounded-xl px-1 py-2.5 text-blue-600 transition-all duration-200">
            <div className="animate-fadeIn absolute inset-0 rounded-xl bg-linear-to-t from-blue-50 to-indigo-50" />
            <div className="relative z-10">
              <LayoutDashboard className="mb-1 h-6 w-6 stroke-[2.5]" />
              <span className="text-[10px] font-semibold text-blue-600">Inicio</span>
            </div>
            <div className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full bg-linear-to-r from-purple-500 to-pink-600" />
          </button>

          <button className="relative flex flex-col items-center justify-center rounded-xl px-1 py-2.5 text-gray-600 active:scale-95">
            <Calendar className="mb-1 h-6 w-6" />
            <span className="text-[10px] font-semibold text-gray-600">Citas</span>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <span className="text-[8px] font-bold text-white">2</span>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
