export default function RecetasGrid({ rows, getStockStatus, icons, onEdit, onDelete }) {
  const { Edit2, Trash2 } = icons;
  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {rows.map((receta) => {
          const stockStatus = getStockStatus(receta.stock, receta.minimo);
          return (
            <div
              key={receta.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                  Receta
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(receta)}
                    className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(receta)}
                    className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">{receta.tipo}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stock</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                >
                  {receta.stock} / {receta.minimo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
