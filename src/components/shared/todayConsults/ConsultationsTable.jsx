'use client';

/* table */
export default function ConsultationsTable({ rows, icons, totals, onEdit, onDelete }) {
  const { Calendar, Users, FileText, DollarSign, CheckCircle, Clock, Edit2, Trash2, Award } = icons;
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
            <th className="px-6 py-4 text-center">
              <span className="text-sm font-bold text-gray-900">Estado</span>
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
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 transition group-hover:bg-blue-500">
                    <Calendar className="h-4 w-4 text-blue-600 transition group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{c.fecha}</p>
                    <p className="text-xs text-gray-500">{c.hora}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md">
                    {c.avatar}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{c.paciente}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-700">{c.tipo}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-bold text-indigo-600">${c.costo}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${
                    c.pagado
                      ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                      : 'border-amber-200 bg-amber-100 text-amber-700'
                  }`}
                >
                  {c.pagado ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                  {c.pagado ? 'Pagado' : 'Pendiente'}
                </span>
              </td>
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
        <tfoot className="border-t-2 border-gray-200 bg-linear-to-r from-gray-50 to-indigo-50">
          <tr className="font-bold">
            <td colSpan="3" className="px-6 py-4 text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <span>Total General</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right text-lg text-indigo-600">
              ${totals.totalIngresos.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-center">
              <span className="text-xs font-semibold text-gray-600">
                {totals.cobradas}/{totals.total} cobradas
              </span>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
