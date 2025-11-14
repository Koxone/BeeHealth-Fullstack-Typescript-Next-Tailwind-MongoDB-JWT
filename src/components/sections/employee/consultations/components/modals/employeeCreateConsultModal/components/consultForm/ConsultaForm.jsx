import { Clock, User, DollarSign } from 'lucide-react';
import AutocompleteMedicamentos from './components/AutocompleteMedicamentos';

/* Form */
export default function ConsultaForm({ form, setForm }) {
  return (
    <div className="space-y-5">
      {/* Time */}
      {/* <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Clock className="h-4 w-4 text-blue-500" />
          Hora
        </label>
        <input
          type="time"
          required
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div> */}

      {/* Consult Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Tipo de consulta</label>
        <select
          required
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="Primera Consulta">Primera Vez</option>
          <option value="Consulta General">Subsecuente</option>
        </select>
      </div>

      {/* Patient */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <User className="h-4 w-4 text-purple-500" />
          Paciente
        </label>

        {form.tipo === 'Primera Consulta' ? (
          <input
            type="text"
            required
            disabled={!form.tipo}
            value={form.paciente}
            onChange={(e) => setForm({ ...form, paciente: e.target.value })}
            placeholder="Nombre del paciente"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          />
        ) : (
          <select
            required
            disabled={!form.tipo}
            value={form.paciente}
            onChange={(e) => setForm({ ...form, paciente: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Seleccionar paciente</option>

            {/* Ejemplo temporal */}
            <option value="Paciente Demo 1">Paciente Demo 1</option>
            <option value="Paciente Demo 2">Paciente Demo 2</option>
            <option value="Paciente Demo 3">Paciente Demo 3</option>
          </select>
        )}
      </div>

      {/* Costo */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Costo
        </label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={form.costo}
          onChange={(e) => setForm({ ...form, costo: e.target.value })}
          placeholder="800.00"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>

      {/* Payment Method */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Método de pago</label>
        <select
          required
          value={form.metodoPago}
          onChange={(e) => setForm({ ...form, metodoPago: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>

      {/* Meds Sold */}
      <AutocompleteMedicamentos />

      {/* Pagado */}
      {/* <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={form.pagado}
            onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
            className="h-5 w-5 rounded border-gray-300 text-blue-600"
          />
          <span className="font-semibold text-blue-900">Consulta pagada</span>
        </label>
      </div> */}
    </div>
  );
}
