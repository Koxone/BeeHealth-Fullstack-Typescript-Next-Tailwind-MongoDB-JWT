import ActionButtons from './modals/shared/ActionsButtons';

export default function RecetasGrid({ rows, getStockStatus, onEdit, onDelete, onHistory }) {
  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {rows.map((receta) => {
          const stockStatus = getStockStatus(receta.stock, receta.minimo);
          return (
            <div
              key={receta._id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                  Receta
                </span>

                {/* Action Buttons */}
                <ActionButtons
                  item={receta}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onHistory={onHistory}
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">{receta?.product?.category}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stock</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                >
                  {receta?.quantity} / {receta?.minStock}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
