'use client';

import { useState } from 'react';

/* Prescription Form (connected to backend) */
export default function PrescriptionForm({ mode, initialData, onCancel, onSubmit }) {
  // Local state
  const [form, setForm] = useState(() => ({
    category: initialData?.category || '',
    quantity: initialData?.quantity != null ? String(initialData.quantity) : '',
    minStock: initialData?.minStock != null ? String(initialData.minStock) : '',
    maxStock: initialData?.maxStock != null ? String(initialData.maxStock) : '',
  }));

  // Handlers
  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.category.trim() || 'Receta sin nombre',
      type: 'receta',
      category: form.category.trim() || 'General',
      inStock: true,
      costPrice: 0,
      salePrice: 0,
      quantity: Number(form.quantity || 0),
      minStock: Number(form.minStock || 0),
      maxStock: Number(form.maxStock || 0),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
        <input
          type="text"
          required
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="Tipo de receta (Control de Peso u Odontología)"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            placeholder="Cantidad"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
          />
          <input
            type="number"
            min="0"
            value={form.minStock}
            onChange={(e) => handleChange('minStock', e.target.value)}
            placeholder="Stock mínimo"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
          />
        </div>

        <input
          type="number"
          min="0"
          value={form.maxStock}
          onChange={(e) => handleChange('maxStock', e.target.value)}
          placeholder="Stock máximo"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500"
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
          className="flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-blue-500/50"
        >
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
