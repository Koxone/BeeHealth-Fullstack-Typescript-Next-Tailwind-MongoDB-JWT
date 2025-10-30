'use client';

/* table */
export default function SuministrosTable({ rows, getStockStatus, icons, onEdit, onDelete }) {
  const { Edit2, Trash2 } = icons;
  return (
    <div className="p-4 md:p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">
                Suministro
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">Stock</th>
              <th className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-700 md:table-cell">
                Precio
              </th>
              <th className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-700 lg:table-cell">
                Valor Total
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((sum) => {
              const stockStatus = getStockStatus(sum.stock, sum.minimo);
              return (
                <tr key={sum.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-2 py-3 text-sm font-medium text-gray-900">{sum.nombre}</td>
                  <td className="px-2 py-3 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                    >
                      {sum.stock} / {sum.minimo}
                    </span>
                  </td>
                  <td className="hidden px-2 py-3 text-right text-sm text-gray-900 md:table-cell">
                    ${sum.precio}
                  </td>
                  <td className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-900 lg:table-cell">
                    ${(sum.stock * sum.precio).toLocaleString()}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onEdit(sum)}
                        className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                      >
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => onDelete(sum)}
                        className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
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
  );
}
