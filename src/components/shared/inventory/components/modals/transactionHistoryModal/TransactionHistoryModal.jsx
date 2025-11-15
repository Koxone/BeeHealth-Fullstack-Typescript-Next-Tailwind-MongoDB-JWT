'use client';

import { X, History, ArrowDownCircle, ArrowUpCircle, User, Power } from 'lucide-react';
import { useModalClose } from '@/hooks/useModalClose';

export default function TransactionHistoryModal({ onClose, history, item }) {
  const { handleOverlayClick } = useModalClose(onClose);

  const itemName = item?.product?.name;

  /* No history */
  if (!history || history.length === 0) {
    return (
      <div
        id="overlay"
        onClick={handleOverlayClick}
        className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      >
        <div
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-gray-900">Sin historial</h2>
          <p className="mt-2 text-sm text-gray-600">
            Este producto no tiene movimientos registrados.
          </p>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  console.log(history);

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative */}
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br from-green-100 to-emerald-200 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-green-100 to-emerald-200 opacity-20 blur-3xl" />

        {/* Header */}
        <div className="relative overflow-hidden border-b border-gray-100 bg-white/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-green-100 to-emerald-200 opacity-10" />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="bg-medtrack-blue-solid relative flex items-center justify-center rounded-2xl p-3 shadow-lg">
                    <History className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Historial de <span className="text-blue-500">{itemName}</span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">Movimientos recientes del producto</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-180px)] space-y-4 overflow-y-auto p-6">
          {history?.map((transaction) => (
            <div
              key={transaction?._id}
              className={`rounded-2xl border border-gray-200 p-4 shadow-sm transition-all hover:shadow-md ${
                transaction?.reasonType === 'restock'
                  ? 'bg-yellow-100/60'
                  : transaction?.reasonType === 'correction'
                    ? 'bg-green-100/60'
                    : transaction?.reasonType === 'initial'
                      ? 'bg-green-400/60'
                      : transaction?.reasonType === 'status_change' &&
                          transaction?.movement === 'IN'
                        ? 'bg-blue-200/60'
                        : transaction?.reasonType === 'status_change' &&
                            transaction?.movement === 'OUT'
                          ? 'bg-blue-200/60'
                          : 'bg-gray-50'
              }`}
            >
              {/* BLOCK: INITIAL STOCK */}
              {transaction?.reasonType === 'initial' && (
                <div>
                  {/* Header */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Stock Inicial</span>

                    <span className="flex items-center gap-1 rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
                      <ArrowDownCircle className="h-4 w-4" />
                      {transaction?.quantity} unidades
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-800">Motivo:</span>{' '}
                      {transaction?.reason}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Tipo:</span> Ingreso Inicial
                    </p>
                  </div>

                  {/* User */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{transaction?.performedBy?.fullName}</span>
                  </div>

                  {/* Time */}
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* BLOCK: RESTOCK */}
              {transaction?.reasonType === 'restock' && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Reabastecimiento</span>

                    <span className="flex items-center gap-1 rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
                      <ArrowDownCircle className="h-4 w-4" />
                      {transaction?.quantity} unidades
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-800">Motivo:</span>{' '}
                      {transaction?.reason}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Tipo:</span> Reposición
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{transaction?.performedBy?.fullName}</span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* BLOCK: QUANTITY CORRECTION */}
              {transaction?.reasonType === 'correction' && !transaction?.priceField && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Corrección de Existencias</span>

                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        transaction?.movement === 'IN'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-red-200 text-red-500'
                      }`}
                    >
                      {transaction?.movement === 'IN' ? (
                        <ArrowUpCircle className="h-4 w-4" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4" />
                      )}
                      {transaction?.quantity} unidades
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-800">Motivo:</span>{' '}
                      {transaction?.reason}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Tipo:</span> Corrección de
                      Inventario
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Cantidad Anterior:</span>{' '}
                      {transaction?.oldQuantity} unidades
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Cambio:</span>{' '}
                      {transaction?.movement === 'IN' ? '+' : '-'}
                      {transaction?.quantityDelta} unidades
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Cantidad Nueva:</span>{' '}
                      {transaction?.newQuantity} unidades
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{transaction?.performedBy?.fullName}</span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* BLOCK: PRICE CORRECTION */}
              {transaction?.reasonType === 'correction' && transaction?.priceField && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    {/* Title */}
                    <span className="font-semibold">
                      {transaction?.priceField === 'costPrice'
                        ? 'Costo de producto'
                        : transaction?.priceField === 'salePrice'
                          ? 'Precio de Venta'
                          : 'Precio'}
                    </span>

                    {/* Badge */}
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        transaction?.movement === 'IN'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-red-200 text-red-500'
                      }`}
                    >
                      {transaction?.movement === 'IN' ? (
                        <ArrowUpCircle className="h-4 w-4" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4" />
                      )}
                      {transaction?.movement === 'IN' ? 'Aumento de ' : 'Disminución de '}
                      {transaction?.priceField === 'costPrice'
                        ? 'Costo'
                        : transaction?.priceField === 'salePrice'
                          ? 'Precio'
                          : 'Precio'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-1 text-sm text-gray-700">
                    {/* Reason */}
                    <p>
                      <span className="font-medium text-gray-800">Motivo:</span>{' '}
                      {transaction?.reason}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Tipo:</span> Corrección de
                      Inventario
                    </p>

                    {/* Change Info */}
                    <p>
                      <span className="font-medium text-gray-800">Anterior:</span>{' '}
                      {transaction?.priceField === 'costPrice'
                        ? `$${transaction?.oldCostPrice.toFixed(2)}`
                        : transaction?.priceField === 'salePrice'
                          ? `$${transaction?.oldSalePrice.toFixed(2)}`
                          : `$${transaction?.oldPrice.toFixed(2)}`}
                    </p>

                    <p>
                      <span className="font-medium text-gray-800">Cambio:</span>{' '}
                      {transaction?.movement === 'IN' ? '+' : '-'}$
                      {transaction?.priceDelta.toFixed(2)}
                    </p>

                    <p>
                      <span className="font-medium text-gray-800">Nuevo:</span>{' '}
                      {transaction?.priceField === 'costPrice'
                        ? `$${transaction?.newCostPrice.toFixed(2)}`
                        : transaction?.priceField === 'salePrice'
                          ? `$${transaction?.newSalePrice.toFixed(2)}`
                          : `$${transaction?.newPrice.toFixed(2)}`}
                    </p>
                  </div>

                  {/* Performed By */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{transaction?.performedBy?.fullName}</span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* BLOCK: STATUS ON */}
              {transaction?.reasonType === 'status_change' && transaction?.movement === 'IN' && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Disponibilidad</span>

                    <span className="flex items-center gap-1 rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
                      Encendido
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-800">Motivo:</span>{' '}
                      {transaction?.reason}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Tipo:</span> Cambio de Estatus
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{transaction?.performedBy?.fullName}</span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* BLOCK: STATUS OFF */}
              {transaction?.reasonType === 'status_change' && transaction?.movement === 'OUT' && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Disponibilidad</span>

                    <span className="flex items-center gap-1 rounded-full bg-red-200 px-2 py-1 text-xs font-medium text-red-500">
                      Apagado
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-800">Motivo:</span>{' '}
                      {transaction?.reason}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Tipo:</span> Cambio de Estatus
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{transaction?.performedBy?.fullName}</span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
