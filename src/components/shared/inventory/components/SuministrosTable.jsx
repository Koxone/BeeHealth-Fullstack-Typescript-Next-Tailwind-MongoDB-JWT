'use client';
import ActionButtons from './modals/shared/ActionsButtons';

export default function SuministrosTable({ rows, getStockStatus, onEdit, onDelete, onHistory }) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl text-gray-400">📦</span>
          </div>
          <p className="mb-1 text-base font-medium text-gray-900">No hay suministros registrados</p>
          <p className="text-sm text-gray-500">Comienza agregando tu primer suministro</p>
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
                  Suministro
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
                <th className="px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {rows.map((sum, index) => {
                const stockStatus = getStockStatus(sum?.quantity, sum?.minStock);

                return (
                  <tr
                    key={`${sum.id}-${index}`}
                    className="group animate-fadeIn transition-colors duration-150 hover:bg-gray-50/80"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: '0.3s',
                      animationTimingFunction: 'ease-in-out',
                      animationFillMode: 'forwards',
                    }}
                  >
                    {/* Supply name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 transition-transform duration-200 group-hover:scale-110">
                          <span className="text-lg text-amber-600">🧴</span>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {sum?.product?.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {sum?.product?.category}
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
                          {sum?.quantity} / {sum?.minStock}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="hidden px-4 py-4 text-right lg:table-cell">
                      <span className="text-sm font-semibold text-gray-900">
                        ${parseFloat(sum?.product?.costPrice).toFixed(2)}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-4">
                      <ActionButtons
                        item={sum}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onHistory={onHistory}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
