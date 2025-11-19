import { CheckCircle, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function AllowedFoods({ diet, isEditing = false, onChange }) {
  // state setup
  const [items, setItems] = useState(diet.allowedFoods.items || []);
  const [note, setNote] = useState(diet.allowedFoods.note || '');
  const [newItem, setNewItem] = useState('');

  // item add
  const handleAdd = () => {
    if (!newItem.trim()) return;
    const updated = [...items, newItem.trim()];
    setItems(updated);
    setNewItem('');
    onChange({ items: updated, note });
  };

  // item delete
  const handleDelete = (i) => {
    const updated = items.filter((_, idx) => idx !== i);
    setItems(updated);
    onChange({ items: updated, note });
  };

  // note update
  const handleNoteChange = (e) => {
    const updated = e.target.value;
    setNote(updated);
    onChange({ items, note: updated });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Alimentos Permitidos</h2>
      </div>

      {!isEditing && (
        <>
          {/* read items */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3"
              >
                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                <span className="text-gray-700">{i}</span>
              </div>
            ))}
          </div>

          {/* read note */}
          {note && (
            <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
              <p className="text-sm text-gray-600 italic">{note}</p>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <>
          {/* edit items */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((i, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                  <span className="text-gray-700">{i}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* new item label */}
          <label className="mb-1 block text-sm font-medium text-gray-700">Agregar alimento</label>

          {/* new item */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Ej. Pollo a la plancha"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* note label */}
          <label className="mb-1 block text-sm font-medium text-gray-700">Nota opcional</label>

          {/* edit note */}
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Escribe una nota para esta sección"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm"
            rows={3}
          />
        </>
      )}
    </section>
  );
}
