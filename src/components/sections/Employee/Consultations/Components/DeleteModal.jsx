'use client';

/* modal */
export default function DeleteModal({ item, onClose, onConfirm, icons }) {
  const { AlertCircle } = icons;
  if (!item) return null;
  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden rounded-t-3xl bg-linear-to-r from-red-600 to-rose-600 px-6 py-5">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Eliminar Consulta</h2>
                <p className="text-sm text-rose-100">Esta acción no se puede deshacer</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <p className="text-base text-gray-700">
              ¿Estás seguro de que deseas eliminar esta consulta del registro?
            </p>

            <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-red-50 p-5">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 font-bold text-white shadow-lg">
                  {(item.avatar || '').slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 font-bold text-gray-900">{item.paciente}</p>
                  <p className="text-sm text-gray-600">
                    {item.fecha} • {item.tipo}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="mb-1 text-xs text-gray-500">Costo de la consulta</p>
                <p className="text-2xl font-bold text-red-600">${item.costo}</p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-linear-to-r from-red-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-red-700 hover:to-rose-700 active:scale-95"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
