import Link from 'next/link';
import { LayoutDashboard, Calendar, ChevronRight } from 'lucide-react';
import {
  doctorSidebarItems,
  patientSidebarItems,
  employeeSidebarItems,
} from './components/SideBarData';

export default function Sidebar({ type }) {
  const sidebarOptions =
    type === 'doctor'
      ? doctorSidebarItems
      : type === 'patient'
        ? patientSidebarItems
        : employeeSidebarItems;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-72 flex-col border-r-2 border-gray-200 bg-linear-to-b from-white to-gray-50 shadow-xl md:flex">
        <nav className="flex-1 space-y-1 p-4">
          {sidebarOptions.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                style={{ animationDelay: `${index * 50}ms` }}
                className="group animate-fadeInLeft relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl border-2 border-transparent px-4 py-3.5 text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95"
              >
                <div className="relative z-10 flex flex-1 items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2 transition-all duration-200 group-hover:scale-110 group-hover:bg-blue-100">
                    <Icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile navigation */}
      <nav className="safe-area-inset-bottom fixed right-0 bottom-0 left-0 z-50 border-t-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          <Link
            href={`/${type}/dashboard`}
            className="relative flex scale-110 flex-col items-center justify-center rounded-xl px-1 py-2.5 text-blue-600 transition-all duration-200"
          >
            <div className="animate-fadeIn absolute inset-0 rounded-xl bg-linear-to-t from-blue-50 to-indigo-50" />
            <div className="relative z-10">
              <LayoutDashboard className="mb-1 h-6 w-6 stroke-[2.5]" />
              <span className="text-[10px] font-semibold text-blue-600">Inicio</span>
            </div>
            <div className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full bg-linear-to-r from-purple-500 to-pink-600" />
          </Link>

          <Link
            href={`/${type}/appointments`}
            className="relative flex flex-col items-center justify-center rounded-xl px-1 py-2.5 text-gray-600 transition active:scale-95"
          >
            <Calendar className="mb-1 h-6 w-6" />
            <span className="text-[10px] font-semibold text-gray-600">Citas</span>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <span className="text-[8px] font-bold text-white">2</span>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
