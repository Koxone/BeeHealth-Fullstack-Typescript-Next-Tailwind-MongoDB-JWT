'use client';

/* table */
export default function MedicamentosTable({
  rows,
  getStockStatus,
  getCaducidadStatus,
  icons,
  onEdit,
  onDelete,
}) {
  // safe destructuring
  const { Edit2, Trash2, Package: PackageIcon } = icons || {};

  if (!Array.isArray(rows) || rows.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            {PackageIcon ? (
              <PackageIcon className="h-8 w-8 text-gray-400" />
            ) : (
              <span className="text-2xl text-gray-400">📦</span>
            )}
          </div>
          <p className="mb-1 text-base font-medium text-gray-900">
            No hay medicamentos registrados
          </p>
          <p className="text-sm text-gray-500">Comienza agregando tu primer medicamento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Medicamento
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Categoría
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Stock
                </th>
                <th className="hidden px-4 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase lg:table-cell">
                  Precio
                </th>
                <th className="hidden px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase md:table-cell">
                  Caducidad
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Ubicación
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {rows.map((med, index) => {
                const stockStatus = getStockStatus(med.stock, med.minimo);
                const cad = getCaducidadStatus(med.caducidad);

                return (
                  <tr
                    key={`${med.id}-${index}`}
                    className="group animate-fadeIn transition-colors duration-150 hover:bg-gray-50/80"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: '0.3s',
                      animationTimingFunction: 'ease-in-out',
                      animationFillMode: 'forwards',
                    }}
                  >
                    {/* Medicamento */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 transition-transform duration-200 group-hover:scale-110">
                          {PackageIcon ? (
                            <PackageIcon className="h-5 w-5 text-blue-600" />
                          ) : (
                            <span className="text-lg text-blue-600">📦</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {med.nombre}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {med.categoria}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${stockStatus.bg} ${stockStatus.color}`}
                        >
                          <span className="relative flex h-2 w-2">
                            <span
                              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                                stockStatus.color === 'text-red-700'
                                  ? 'bg-red-400'
                                  : 'bg-transparent'
                              }`}
                            ></span>
                            <span
                              className={`relative inline-flex h-2 w-2 rounded-full ${
                                stockStatus.color === 'text-red-700'
                                  ? 'bg-red-500'
                                  : stockStatus.color === 'text-yellow-700'
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                              }`}
                            ></span>
                          </span>
                          {med.stock} / {med.minimo}
                        </span>
                      </div>
                    </td>

                    {/* Precio */}
                    <td className="hidden px-4 py-4 text-right lg:table-cell">
                      <span className="text-sm font-semibold text-gray-900">
                        ${parseFloat(med.precio).toFixed(2)}
                      </span>
                    </td>

                    {/* Caducidad */}
                    <td className="hidden px-4 py-4 text-center md:table-cell">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${cad.bg} ${cad.color}`}
                      >
                        {med.caducidad}
                      </span>
                    </td>

                    {/* Ubicación */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        📍 {med.ubicacion}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(med)}
                          className="group/btn relative rounded-lg bg-blue-50 p-2 transition-all duration-200 hover:bg-blue-100 hover:shadow-md active:scale-95"
                          title="Editar medicamento"
                        >
                          {Edit2 && (
                            <Edit2 className="h-4 w-4 text-blue-600 transition-transform duration-200 group-hover/btn:scale-110" />
                          )}
                        </button>
                        <button
                          onClick={() => onDelete(med)}
                          className="group/btn relative rounded-lg bg-red-50 p-2 transition-all duration-200 hover:bg-red-100 hover:shadow-md active:scale-95"
                          title="Eliminar medicamento"
                        >
                          {Trash2 && (
                            <Trash2 className="h-4 w-4 text-red-600 transition-transform duration-200 group-hover/btn:scale-110" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* keyframes globales */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
        }
      `}</style>
    </div>
  );
}
