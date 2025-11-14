'use client';

import {
  Calendar,
  Users,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  Edit2,
  Trash2,
  Award,
  Banknote,
  CreditCard,
  ArrowLeftRight,
} from 'lucide-react';

/* table */
export default function ConsultationsTable({ rows, totals, onEdit, onDelete }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full">
        <thead className="border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-indigo-50">
          <tr>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Fecha</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Paciente</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Tipo</span>
              </div>
            </th>
            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Costo</span>
              </div>
            </th>
            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Extras</span>
              </div>
            </th>
            <th className="px-6 py-4 text-center">
              <span className="text-sm font-bold text-gray-900">Metodo de Pago</span>
            </th>
            <th className="px-6 py-4 text-center">
              <span className="text-sm font-bold text-gray-900">Acciones</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.map((c, i) => (
            <tr
              key={c.id}
              style={{ animationDelay: `${i * 50}ms` }}
              className="group animate-fadeInUp transition hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50"
            >
              {/* Dates */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-medtrack-blue-solid group-hover:bg-medtrack-blue-hover rounded-lg p-2 transition">
                    <Calendar className="h-4 w-4 text-white transition group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{c.fecha}</p>
                    <p className="text-xs text-gray-500">{c.hora}</p>
                  </div>
                </div>
              </td>

              {/* Patient Info */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-medtrack-blue-solid flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md">
                    {c.avatar}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{c.paciente}</span>
                </div>
              </td>

              {/* Type */}
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-700">{c.tipo}</span>
              </td>

              {/* Cost */}
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-bold text-neutral-700">${c.costo}</span>
              </td>

              {/* Extras */}
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-bold text-neutral-700">${c.costo}</span>
              </td>

              {/* Payment Method */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${
                    c.paymentMethod === 'Efectivo'
                      ? 'border-[#C4E3CC] bg-[#E6F4EA] text-[#2F6E45]'
                      : c.paymentMethod === 'Tarjeta'
                        ? 'border-[#C9D8FF] bg-[#E7EEFF] text-[#3C5BBF]'
                        : 'border-[#FFE2B8] bg-[#FFF6E6] text-[#A86A00]'
                  }`}
                >
                  {c.paymentMethod === 'Efectivo' && <Banknote className="h-3.5 w-3.5" />}

                  {c.paymentMethod === 'Tarjeta' && <CreditCard className="h-3.5 w-3.5" />}

                  {c.paymentMethod === 'Transferencia' && (
                    <ArrowLeftRight className="h-3.5 w-3.5" />
                  )}

                  {c.paymentMethod}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-blue-200 hover:bg-blue-50 active:scale-95"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600 transition-transform group-hover/btn:rotate-12" />
                  </button>
                  <button
                    onClick={() => onDelete(c)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-red-200 hover:bg-red-50 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 transition-transform group-hover/btn:scale-110" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="w-full border-t-2 border-gray-200">
          <tr className="font-bold">
            <td colSpan="3" className="px-6 py-4 text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <span>Total General</span>
              </div>
            </td>

            <td className="px-6 py-4 text-right text-lg font-bold text-indigo-600">
              ${totals.totalIngresos.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
