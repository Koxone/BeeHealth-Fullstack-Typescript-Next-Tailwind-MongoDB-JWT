'use client';

/* Local, single-responsibility form for prescriptions */
import { useState } from 'react';

export default function PrescriptionForm({ mode, initialData, onCancel, onSubmit }) {
  // Local state
  const [form, setForm] = useState(() => ({
    tipo: initialData?.tipo || '',
    stock: initialData?.stock != null ? String(initialData.stock) : '',
    minimo: initialData?.minimo != null ? String(initialData.minimo) : '',
  }));

  // Handlers
  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: initialData?.id || Date.now(),
      tipo: form.tipo.trim(),
      stock: Number(form.stock || 0),
      minimo: Number(form.minimo || 0),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
        <input
          type="text"
          required
          value={form.tipo}
          onChange={(e) => handleChange('tipo', e.target.value)}
          placeholder="Tipo de receta"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            placeholder="Stock"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
          />
          <input
            type="number"
            min="0"
            value={form.minimo}
            onChange={(e) => handleChange('minimo', e.target.value)}
            placeholder="Mínimo"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-blue-500/50"
        >
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
