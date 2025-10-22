'use client';

/* alerts */
export default function InventoryAlerts({ items, icons }) {
  const { AlertTriangle, Package, Pill, FileText, Syringe } = icons;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Alertas de Inventario</h2>
      </div>
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={`${item.nombre}-${idx}`}
              className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2">
                  {item.tipo === 'medicamento' && <Pill className="h-4 w-4 text-red-600" />}
                  {item.tipo === 'receta' && <FileText className="h-4 w-4 text-red-600" />}
                  {item.tipo === 'suministro' && <Syringe className="h-4 w-4 text-red-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                  <p className="text-xs text-red-600">
                    Stock: {item.stock} • Mín: {item.minimo}
                  </p>
                </div>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="text-gray-600">No hay alertas de inventario</p>
          <p className="text-sm text-gray-500">Todo el stock está en niveles óptimos</p>
        </div>
      )}
    </div>
  );
}
