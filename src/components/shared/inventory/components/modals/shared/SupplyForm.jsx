'use client';

import { useState } from 'react';

/* Supply Form (connected to backend) */
export default function SupplyForm({ mode, initialData, onCancel, onSubmit }) {
  // Local state
  const [form, setForm] = useState(() => ({
    name: initialData?.name || '',
    category: initialData?.category || '',
    quantity: initialData?.quantity != null ? String(initialData.quantity) : '',
    minStock: initialData?.minStock != null ? String(initialData.minStock) : '',
    maxStock: initialData?.maxStock != null ? String(initialData.maxStock) : '',
    costPrice: initialData?.costPrice != null ? String(initialData.costPrice) : '',
    salePrice: initialData?.salePrice != null ? String(initialData.salePrice) : '',
  }));

  // Handlers
  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim() || 'Suministro sin nombre',
      type: 'suministro',
      category: form.category.trim() || 'General',
      inStock: true,
      costPrice: Number(form.costPrice || 0),
      salePrice: Number(form.salePrice || 0),
      quantity: Number(form.quantity || 0),
      minStock: Number(form.minStock || 0),
      maxStock: Number(form.maxStock || 0),
    };

    onSubmit(payload);
  };

  // Categorías predefinidas para suministros médicos
  const supplyCategories = [
    'Guantes',
    'Algodón',
    'Alcohol y desinfectantes',
    'Material de curación',
    'Equipo básico de examen',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
        {/* Nombre */}
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Nombre del suministro"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
        />

        {/* Categoría */}
        <select
          required
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
        >
          <option value="">Seleccionar categoría</option>
          {supplyCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Stock y mínimo */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            placeholder="Cantidad"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
          <input
            type="number"
            min="0"
            value={form.minStock}
            onChange={(e) => handleChange('minStock', e.target.value)}
            placeholder="Stock mínimo"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
        </div>

        {/* Stock máximo y costo */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={form.maxStock}
            onChange={(e) => handleChange('maxStock', e.target.value)}
            placeholder="Stock máximo"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
          <input
            type="number"
            min="0"
            value={form.costPrice}
            onChange={(e) => handleChange('costPrice', e.target.value)}
            placeholder="Costo ($)"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
        </div>

        {/* Precio de venta */}
        <input
          type="number"
          min="0"
          value={form.salePrice}
          onChange={(e) => handleChange('salePrice', e.target.value)}
          placeholder="Precio de venta ($)"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
        />
      </div>

      {/* Botones */}
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
