'use client';

/* basic info */
export default function BasicInfoSection({ form, setForm, isReadOnly, icons }) {
  const { CalendarIcon, Scale, Heart } = icons;

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <CalendarIcon className="h-5 w-5 text-blue-600" />
        Información Básica
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            disabled={isReadOnly}
            required
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* weight */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Peso (kg) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Scale className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              disabled={isReadOnly}
              step="0.1"
              required
              value={form.peso}
              onChange={(e) => setForm({ ...form, peso: e.target.value })}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="75.5"
            />
          </div>
        </div>

        {/* imc */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            IMC <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Heart className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              disabled={isReadOnly}
              step="0.1"
              value={form.imc}
              onChange={(e) => setForm({ ...form, imc: e.target.value })}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="25.8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
