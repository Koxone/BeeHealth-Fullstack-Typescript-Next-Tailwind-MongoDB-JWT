'use client';

/* alerts */
export default function InventoryAlerts({ items, icons }) {
  const { AlertTriangle, Package, Pill, FileText, Syringe } = icons;

  const getItemIcon = (tipo) => {
    const iconClass = 'h-5 w-5 text-red-600';
    switch (tipo) {
      case 'medicamento':
        return <Pill className={iconClass} />;
      case 'receta':
        return <FileText className={iconClass} />;
      case 'suministro':
        return <Syringe className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  const getStockPercentage = (stock, minimo) => {
    return Math.round((stock / minimo) * 100);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Alertas de Inventario</h2>
          {items.length > 0 && (
            <span className="flex h-6 min-w-6 animate-pulse items-center justify-center rounded-full bg-red-500 px-2 text-xs font-semibold text-white">
              {items.length}
            </span>
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, idx) => {
            const percentage = getStockPercentage(item.stock, item.minimo);
            const isCritical = percentage < 50;

            return (
              <div
                key={`${item.nombre}-${idx}`}
                className={`group relative overflow-hidden rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                  isCritical
                    ? 'border-red-300 bg-linear-to-r from-red-50 to-red-50/50'
                    : 'border-orange-200 bg-linear-to-r from-orange-50 to-orange-50/50'
                }`}
              >
                {/* Barra de progreso sutil */}
                <div
                  className={`absolute top-0 left-0 h-1 transition-all duration-300 ${
                    isCritical ? 'bg-red-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />

                <div className="flex items-center justify-between p-4 pt-5">
                  <div className="flex flex-1 items-center gap-4">
                    {/* Icono mejorado */}
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${
                        isCritical ? 'bg-red-100 shadow-sm' : 'bg-orange-100 shadow-sm'
                      }`}
                    >
                      {getItemIcon(item.tipo)}
                    </div>

                    {/* Información del item */}
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 truncate text-sm font-semibold text-gray-900">
                        {item.nombre}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={`font-medium ${
                            isCritical ? 'text-red-700' : 'text-orange-700'
                          }`}
                        >
                          Stock: <span className="font-bold">{item.stock}</span>
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">Mínimo: {item.minimo}</span>
                        <span
                          className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                            isCritical ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Icono de alerta */}
                  <AlertTriangle
                    className={`ml-3 h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isCritical ? 'text-red-500' : 'text-orange-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <Package className="h-8 w-8 text-green-500" />
          </div>
          <p className="mb-1 font-medium text-gray-900">¡Todo bajo control!</p>
          <p className="text-sm text-gray-500">No hay alertas de inventario</p>
          <p className="mt-1 text-xs text-gray-400">Todo el stock está en niveles óptimos</p>
        </div>
      )}
    </div>
  );
}
