'use client';

import {
  Users,
  Pill,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Clock,
} from 'lucide-react';

export default function AccountingSummary({ data, onVerMas }) {
  const items = [
    {
      icon: Users,
      label: 'Consultas',
      value: `${data.consultas} pacientes`,
      amount: data.ingresosConsultas,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
    },
    {
      icon: Pill,
      label: 'Medicamentos',
      value: `${data.medicamentosVendidos} vendidos`,
      amount: data.ingresosMedicamentos,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-400',
    },
    {
      icon: AlertCircle,
      label: 'Pendiente de cobro',
      value: '1 consulta',
      amount: data.pendientesCobro,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      hoverBorder: 'hover:border-amber-400',
      badge: 'Urgente',
    },
  ];

  const totalIngresos = data.ingresosConsultas + data.ingresosMedicamentos;

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header mejorado con gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Resumen Contable</h2>
              <p className="text-sm text-blue-100">Estado financiero actual</p>
            </div>
          </div>

          <button
            onClick={onVerMas}
            className="group flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95"
          >
            <span>Ver más</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Total general */}
      <div className="border-b-2 border-gray-200 bg-linear-to-br from-gray-50 to-blue-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 p-2 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-xs text-gray-500">Consultas + Medicamentos</p>
            </div>
          </div>
          <div className="text-right">
            <p className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
              ${totalIngresos.toLocaleString()}
            </p>
            <p className="flex items-center justify-end gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12% vs mes anterior
            </p>
          </div>
        </div>
      </div>

      {/* Items del resumen */}
      <div className="space-y-3 p-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`group relative flex items-center justify-between rounded-xl bg-gradient-to-r ${item.bgGradient} border-2 p-4 ${item.borderColor} ${item.hoverBorder} animate-fadeInUp overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              {/* Elemento decorativo de fondo */}
              <div
                className={`absolute -right-4 -bottom-4 h-24 w-24 bg-linear-to-br ${item.gradient} rounded-full opacity-5 transition-all duration-300 group-hover:scale-150`}
              />

              <div className="relative z-10 flex flex-1 items-center gap-3">
                <div
                  className={`${item.iconBg} rounded-xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-600">{item.label}</p>
                    {item.badge && (
                      <span className="animate-pulse rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-900">{item.value}</p>
                </div>
              </div>

              <div className="relative z-10 text-right">
                <p
                  className={`text-2xl font-bold ${item.textColor} transition-all duration-300 group-hover:scale-110`}
                >
                  ${item.amount.toLocaleString()}
                </p>
                {item.label === 'Consultas' && (
                  <p className="mt-1 text-xs font-medium text-gray-500">
                    ${(item.amount / data.consultas).toFixed(0)} promedio
                  </p>
                )}
                {item.label === 'Medicamentos' && (
                  <p className="mt-1 text-xs font-medium text-gray-500">
                    ${(item.amount / data.medicamentosVendidos).toFixed(0)} promedio
                  </p>
                )}
              </div>

              {/* Barra de progreso decorativa */}
              <div
                className={`absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 transition-all duration-300 group-hover:opacity-100`}
              />
            </div>
          );
        })}
      </div>

      {/* Footer con acciones rápidas */}
      <div className="border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Última actualización: Hoy, 10:30 AM</span>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95">
            <ShoppingCart className="h-4 w-4" />
            <span>Registrar venta</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
