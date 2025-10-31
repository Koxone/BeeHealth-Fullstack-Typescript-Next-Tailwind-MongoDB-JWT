'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react'; 

/* table */
export default function ConsultasTable({ items, total, pagadasBadge, onAdd, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Consultas del Día</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Hora</th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Paciente</th>
              <th className="hidden px-2 py-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Tipo
              </th>
              <th className="px-2 py-3 text-right text-sm font-semibold text-gray-700">Costo</th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-2 py-3 text-sm text-gray-900">{c.hora}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{c.paciente}</td>
                <td className="hidden px-2 py-3 text-sm text-gray-600 md:table-cell">{c.tipo}</td>
                <td className="px-2 py-3 text-right text-sm font-semibold text-gray-900">
                  ${c.costo}
                </td>
                <td className="px-2 py-3 text-center">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${c.pagado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {c.pagado ? 'Pagado' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(c)}
                      className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(c)}
                      className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan="3" className="px-2 py-3 text-sm text-gray-900">
                Total Consultas
              </td>
              <td className="px-2 py-3 text-right text-sm text-gray-900">
                ${total.toLocaleString()}
              </td>
              <td className="px-2 py-3 text-center text-xs text-gray-600">{pagadasBadge}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
