'use client';

import { useState } from 'react';
import { Pill } from 'lucide-react';

export default function VentaMedicamentos() {
  // Static list
  const allMedicines = [
    'Metformina',
    'Ozempic',
    'Ibuprofeno',
    'Ketorolaco',
    'Paracetamol',
    'Amoxicilina',
    'Clonazepam',
    'Sertralina',
    'Guantes de latex',
  ];

  const [enabled, setEnabled] = useState(false);

  // Selected medicines with quantity
  const [selected, setSelected] = useState([]);

  // Add medicine
  const handleSelect = (med) => {
    const exists = selected.some((item) => item.name === med);
    if (!exists) {
      setSelected([...selected, { name: med, quantity: 1 }]);
    }
  };

  // Update quantity
  const handleQuantity = (name, value) => {
    setSelected((prev) =>
      prev.map((item) => (item.name === name ? { ...item, quantity: Number(value) } : item))
    );
  };

  // Remove medicine
  const handleRemove = (name) => {
    setSelected(selected.filter((item) => item.name !== name));
  };

  return (
    <div className="space-y-3">
      {/* Checkbox */}
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600"
        />
        Venta de medicamentos
      </label>

      {enabled && (
        <div className="space-y-4">
          {/* Label select */}
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Pill className="h-4 w-4 text-red-600" />
            Seleccionar medicamento
          </label>

          {/* Select */}
          <select
            value=""
            onChange={(e) => handleSelect(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
          >
            <option value="">Seleccionar</option>

            {allMedicines.map((med) => (
              <option key={med} value={med}>
                {med}
              </option>
            ))}
          </select>

          {/* Selected list */}
          {selected.length > 0 && (
            <div className="space-y-3">
              {selected.map((item) => (
                <div
                  key={item.name}
                  className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  {/* Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{item.name}</span>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.name)}
                      className="text-sm font-semibold text-red-600"
                    >
                      Quitar
                    </button>
                  </div>

                  {/* Quantity input */}
                  <div className="grid gap-1">
                    <label className="text-xs font-semibold text-gray-500">Cantidad</label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantity(item.name, e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 px-3 py-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
