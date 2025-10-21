"use client";

import { useRouter, usePathname } from "next/navigation";
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
  Package
} from "lucide-react";

export default function Sidebar({ role = "patient" }) {
  const router = useRouter();
  const pathname = usePathname();

  const patientMenu = [
    { icon: LayoutDashboard, label: "Inicio", path: "/patient/dashboard" },
    { icon: FileText, label: "Historial", path: "/patient/history" },
    { icon: Calendar, label: "Citas", path: "/patient/appointments" },
    { icon: Apple, label: "Dietas", path: "/patient/diets" },
    { icon: User, label: "Perfil", path: "/patient/profile" },
    { icon: HelpCircle, label: "Soporte", path: "/patient/support" },
  ];

  const doctorMenu = [
    { icon: LayoutDashboard, label: "Inicio", path: "/doctor/dashboard" },
    { icon: Users, label: "Pacientes", path: "/doctor/patients" },
    { icon: Calendar, label: "Calendario", path: "/doctor/calendar" },
    { icon: BarChart3, label: 'Stats', path: '/doctor/analytics' },
    { icon: Apple, label: "Dietas", path: "/doctor/diets" },
    { icon: DollarSign, label: "Contabilidad", path: "/doctor/accounting" },
    { icon: Package, label: "Inventario", path: "/doctor/inventory" },
    { icon: User, label: "Perfil", path: "/doctor/profile" },
  ];

  const employeeMenu = [
    { icon: LayoutDashboard, label: "Inicio", path: "/employee/dashboard" },
    { icon: Calendar, label: "Citas", path: "/employee/appointments" },
    { icon: FileText, label: "Consultas", path: "/employee/consultations" },
    { icon: Package, label: "Inventario", path: "/employee/inventory" },
    { icon: Users, label: "Pacientes", path: "/employee/patients" },
    { icon: User, label: "Perfil", path: "/employee/profile" },
  ];

  const menu = role === "patient" ? patientMenu : role === "employee" ? employeeMenu : doctorMenu;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-500" />
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {menu.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

