'use client';

import {
  Pill,
  FileText,
  Syringe,
  Package,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  ShoppingCart,
  TrendingDown,
  Box,
} from 'lucide-react';

export default function InventoryAlerts({ items, onVerMas }) {
  const getItemIcon = (tipo) => {
    switch (tipo) {
      case 'medicamento':
        return Pill;
      case 'receta':
        return FileText;
      case 'suministro':
        return Syringe;
      default:
        return Box;
    }
  };

  const getAlertLevel = (stock, minimo) => {
    const percentage = (stock / minimo) * 100;
    if (percentage <= 25) return 'critical';
    if (percentage <= 50) return 'warning';
    return 'low';
  };

  const getAlertConfig = (level) => {
    switch (level) {
      case 'critical':
        return {
          gradient: 'from-rose-500 to-red-600',
          bgGradient: 'from-rose-50 to-red-50',
          border: 'border-rose-300',
          hoverBorder: 'hover:border-rose-500',
          iconBg: 'bg-rose-100',
          iconColor: 'text-rose-600',
          textColor: 'text-rose-600',
          badge: 'CRÍTICO',
          badgeBg: 'bg-rose-600',
          pulseColor: 'bg-rose-500',
        };
      case 'warning':
        return {
          gradient: 'from-amber-500 to-orange-600',
          bgGradient: 'from-amber-50 to-orange-50',
          border: 'border-amber-300',
          hoverBorder: 'hover:border-amber-500',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          textColor: 'text-amber-600',
          badge: 'BAJO',
          badgeBg: 'bg-amber-600',
          pulseColor: 'bg-amber-500',
        };
      default:
        return {
          gradient: 'from-orange-500 to-red-500',
          bgGradient: 'from-orange-50 to-red-50',
          border: 'border-orange-300',
          hoverBorder: 'hover:border-orange-500',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          textColor: 'text-orange-600',
          badge: 'MÍNIMO',
          badgeBg: 'bg-orange-600',
          pulseColor: 'bg-orange-500',
        };
    }
  };

  const totalCritical = items.filter(
    (item) => getAlertLevel(item.stock, item.minimo) === 'critical'
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header mejorado con gradiente */}
      <div className="relative overflow-hidden bg-linear-to-r from-rose-600 via-red-600 to-orange-600 px-6 py-5">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <AlertTriangle className="h-6 w-6 text-white" />
              {totalCritical > 0 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <span className="text-xs font-bold text-rose-600">{totalCritical}</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Alertas de Inventario</h2>
              <p className="text-sm text-rose-100">
                {items.length > 0
                  ? `${items.length} producto${items.length !== 1 ? 's' : ''} con stock bajo`
                  : 'Sin alertas activas'}
              </p>
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

      {/* Estadísticas rápidas */}
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-4 border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-rose-50 px-6 py-4">
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <p className="text-xs font-semibold text-gray-600">Críticos</p>
            </div>
            <p className="text-2xl font-bold text-rose-600">{totalCritical}</p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              <p className="text-xs font-semibold text-gray-600">Bajos</p>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {items.filter((item) => getAlertLevel(item.stock, item.minimo) === 'warning').length}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              <Package className="h-4 w-4 text-gray-600" />
              <p className="text-xs font-semibold text-gray-600">Total</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{items.length}</p>
          </div>
        </div>
      )}

      {/* Lista de alertas */}
      <div className="p-6">
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => {
              const Icon = getItemIcon(item.tipo);
              const alertLevel = getAlertLevel(item.stock, item.minimo);
              const config = getAlertConfig(alertLevel);
              const stockPercentage = (item.stock / item.minimo) * 100;

              return (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`group relative flex items-center justify-between rounded-xl bg-linear-to-r ${config.bgGradient} border-2 p-4 ${config.border} ${config.hoverBorder} animate-fadeInUp overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                >
                  {/* Elemento decorativo de fondo */}
                  <div
                    className={`absolute -right-4 -bottom-4 h-24 w-24 bg-linear-to-br ${config.gradient} rounded-full opacity-5 transition-all duration-300 group-hover:scale-150`}
                  />

                  <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
                    <div
                      className={`${config.iconBg} relative rounded-xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                    >
                      <Icon className={`h-5 w-5 ${config.iconColor}`} />
                      {alertLevel === 'critical' && (
                        <div
                          className={`absolute -top-1 -right-1 h-3 w-3 ${config.pulseColor} animate-ping rounded-full`}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-gray-900">{item.nombre}</p>
                        <span
                          className={`${config.badgeBg} rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap text-white ${alertLevel === 'critical' ? 'animate-pulse' : ''}`}
                        >
                          {config.badge}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`font-semibold ${config.textColor}`}>
                            Stock: {item.stock} unidades
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">Mínimo: {item.minimo}</span>
                        </div>
                        {/* Barra de progreso */}
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full bg-linear-to-r ${config.gradient} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className={`text-xs font-medium ${config.textColor} mb-1`}>
                        Faltan {item.minimo - item.stock} unid.
                      </p>
                      <p className="text-xs text-gray-500">
                        {stockPercentage.toFixed(0)}% del mínimo
                      </p>
                    </div>
                    <AlertTriangle
                      className={`h-6 w-6 ${config.iconColor} shrink-0 ${alertLevel === 'critical' ? 'animate-bounce' : ''}`}
                    />
                  </div>

                  {/* Barra lateral de color */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b ${config.gradient} transition-all duration-300 group-hover:w-2`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state mejorado */
          <div className="py-12 text-center">
            <div className="relative mb-4 inline-block">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-100 to-emerald-100">
                <Package className="h-10 w-10 text-green-600" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shadow-lg">
                <span className="text-xl text-white">✓</span>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">¡Todo está bajo control!</h3>
            <p className="mb-1 text-gray-600">No hay alertas de inventario</p>
            <p className="text-sm text-gray-500">Todo el stock está en niveles óptimos</p>
          </div>
        )}
      </div>

      {/* Footer con acción rápida */}
      {items.length > 0 && (
        <div className="border-t-2 border-gray-200 bg-linear-to-r from-gray-50 to-rose-50 px-6 py-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95">
            <ShoppingCart className="h-5 w-5" />
            <span>Generar Orden de Compra</span>
          </button>
        </div>
      )}

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
