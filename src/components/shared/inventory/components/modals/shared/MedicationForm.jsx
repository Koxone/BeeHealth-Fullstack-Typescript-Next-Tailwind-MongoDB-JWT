'use client';

import { useState } from 'react';

/* Local, single-responsibility form for medications */
export default function MedicationForm({ mode, initialData, onCancel, onSubmit }) {
  // Local state
  const [form, setForm] = useState(() => ({
    nombre: initialData?.nombre || '',
    categoria: initialData?.categoria || '',
    stock: initialData?.stock != null ? String(initialData.stock) : '',
    minimo: initialData?.minimo != null ? String(initialData.minimo) : '',
    precio: initialData?.precio != null ? String(initialData.precio) : '',
    caducidad: initialData?.caducidad || '',
    ubicacion: initialData?.ubicacion || '',
  }));

  // Handlers
  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: initialData?.id || Date.now(),
      nombre: form.nombre.trim(),
      categoria: form.categoria.trim(),
      stock: Number(form.stock || 0),
      minimo: Number(form.minimo || 0),
      precio: Number(form.precio || 0),
      caducidad: form.caducidad,
      ubicacion: form.ubicacion.trim(),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
        <div className="grid gap-4">
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            placeholder="Nombre del medicamento"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
          />
          <input
            type="text"
            required
            value={form.categoria}
            onChange={(e) => handleChange('categoria', e.target.value)}
            placeholder="Categoría"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              placeholder="Stock"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
            <input
              type="number"
              min="0"
              value={form.minimo}
              onChange={(e) => handleChange('minimo', e.target.value)}
              placeholder="Mínimo"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              value={form.precio}
              onChange={(e) => handleChange('precio', e.target.value)}
              placeholder="Precio"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
            <input
              type="date"
              value={form.caducidad}
              onChange={(e) => handleChange('caducidad', e.target.value)}
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
          </div>
          <input
            type="text"
            value={form.ubicacion}
            onChange={(e) => handleChange('ubicacion', e.target.value)}
            placeholder="Ubicación"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
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
          className="flex-1 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-green-500/50"
        >
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
