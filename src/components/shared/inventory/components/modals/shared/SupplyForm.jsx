'use client';

/* Local, single-responsibility form for supplies */
import { useState } from 'react';

export default function SupplyForm({ mode, initialData, onCancel, onSubmit }) {
  // Local state
  const [form, setForm] = useState(() => ({
    nombre: initialData?.nombre || '',
    stock: initialData?.stock != null ? String(initialData.stock) : '',
    minimo: initialData?.minimo != null ? String(initialData.minimo) : '',
    precio: initialData?.precio != null ? String(initialData.precio) : '',
  }));

  // Handlers
  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: initialData?.id || Date.now(),
      nombre: form.nombre.trim(),
      stock: Number(form.stock || 0),
      minimo: Number(form.minimo || 0),
      precio: Number(form.precio || 0),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
        <input
          type="text"
          required
          value={form.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          placeholder="Nombre del suministro"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            placeholder="Stock"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
          <input
            type="number"
            min="0"
            value={form.minimo}
            onChange={(e) => handleChange('minimo', e.target.value)}
            placeholder="Mínimo"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
        </div>
        <input
          type="number"
          min="0"
          value={form.precio}
          onChange={(e) => handleChange('precio', e.target.value)}
          placeholder="Precio"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
        />
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
          className="flex-1 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-purple-500/50"
        >
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
