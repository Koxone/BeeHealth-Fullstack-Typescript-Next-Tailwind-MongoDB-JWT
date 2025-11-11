'use client';

import { useState } from 'react';

/* Medication Form (connected to backend) */
export default function MedicationForm({ mode, initialData, onCancel, onSubmit }) {
  // Local state
  const [form, setForm] = useState(() => ({
    name: initialData?.name || '',
    category: initialData?.category || '',
    costPrice: initialData?.costPrice != null ? String(initialData.costPrice) : '',
    salePrice: initialData?.salePrice != null ? String(initialData.salePrice) : '',
    quantity: initialData?.quantity != null ? String(initialData.quantity) : '',
    minStock: initialData?.minStock != null ? String(initialData.minStock) : '',
    maxStock: initialData?.maxStock != null ? String(initialData.maxStock) : '',
  }));

  // Handlers
  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      type: 'medicamento',
      category: form.category.trim(),
      inStock: true,
      costPrice: Number(form.costPrice || 0),
      salePrice: Number(form.salePrice || 0),
      quantity: Number(form.quantity || 0),
      minStock: Number(form.minStock || 0),
      maxStock: Number(form.maxStock || 0),
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
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nombre (ej. Paracetamol 500mg)"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
          />
          <input
            type="text"
            required
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="Categoría (ej. Analgésico, Antibiótico)"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              value={form.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              placeholder="Cantidad"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
            <input
              type="number"
              min="0"
              value={form.minStock}
              onChange={(e) => handleChange('minStock', e.target.value)}
              placeholder="Stock mínimo"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              value={form.maxStock}
              onChange={(e) => handleChange('maxStock', e.target.value)}
              placeholder="Stock máximo"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
            <input
              type="number"
              min="0"
              value={form.costPrice}
              onChange={(e) => handleChange('costPrice', e.target.value)}
              placeholder="Costo ($)"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500"
            />
          </div>
          <input
            type="number"
            min="0"
            value={form.salePrice}
            onChange={(e) => handleChange('salePrice', e.target.value)}
            placeholder="Precio de venta ($)"
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
