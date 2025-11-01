'use client';

import { AlertCircle } from 'lucide-react';

/* modal */
export default function DeleteConfirmModal({ type, item, onCancel, onConfirm }) {
  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50" onClick={onCancel} />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Confirmar Eliminación</h2>
            </div>
          </div>

          <div className="p-6">
            <p className="mb-4 text-gray-700">
              ¿Estás seguro de que deseas eliminar{' '}
              {type === 'consulta' ? 'esta consulta' : 'la venta de este medicamento'}?
            </p>

            <div className="mb-6 rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-900">
                {type === 'consulta'
                  ? `${item.paciente} - ${item.hora}`
                  : `${item.nombre} - ${item.cantidad} unidades`}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 active:scale-95"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
