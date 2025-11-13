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
          <p className="mb-1 text-base font-medium text-gray-900">
            No hay suministros medicamentos registrados
          </p>
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
                const stockStatus = getStockStatus(sum?.quantity, sum?.minStock);
                return (
                  <tr key={sum?._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-2 py-3 text-sm font-medium text-gray-900">
                      {sum?.product?.name}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                      >
                        {sum?.quantity} / {sum?.minStock}
                      </span>
                    </td>
                    <td className="hidden px-2 py-3 text-right text-sm text-gray-900 md:table-cell">
                      ${sum?.product?.costPrice}
                    </td>
                    <td className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-900 lg:table-cell">
                      ${(sum?.quantity * sum?.product?.costPrice).toLocaleString()}
                    </td>

                    {/* Action Buttons */}
                    <td className="px-2 py-3">
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
