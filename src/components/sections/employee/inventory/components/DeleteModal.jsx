'use client';

/* modal */
export default function DeleteModal({ item, onClose, onConfirm }) {
  if (!item) return null;
  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Eliminar</h2>
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
          </div>
          <div className="p-6">
            <p className="text-gray-700">
              ¿Seguro que deseas eliminar{' '}
              <span className="font-semibold">{item.nombre || item.tipo}</span>?
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-rose-700 active:scale-95"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
