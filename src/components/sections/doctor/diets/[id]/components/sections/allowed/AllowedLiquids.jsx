import React, { useState } from 'react';
import { CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function AllowedLiquids({ diet, isEditing = false, onChange }) {
  // State setup
  const [items, setItems] = useState(diet.allowedLiquids.items || []);
  const [note, setNote] = useState(diet.allowedLiquids.note || '');
  const [newItem, setNewItem] = useState('');

  // Item add
  const handleAdd = () => {
    if (!newItem.trim()) return;
    const updated = [...items, newItem.trim()];
    setItems(updated);
    setNewItem('');
    onChange({ items: updated, note });
  };

  // Item delete
  const handleDelete = (i) => {
    const updated = items.filter((_, idx) => idx !== i);
    setItems(updated);
    onChange({ items: updated, note });
  };

  // Note update
  const handleNoteChange = (e) => {
    const updated = e.target.value;
    setNote(updated);
    onChange({ items, note: updated });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Líquidos Permitidos</h2>
      </div>

      {!isEditing && (
        <>
          {/* Read items */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3"
              >
                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                <span className="text-gray-700">{i}</span>
              </div>
            ))}
          </div>

          {/* Read note */}
          {note && (
            <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
              <p className="text-sm text-gray-600 italic">{note}</p>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <>
          {/* Edit items */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((i, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
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

          {/* New item label */}
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Agregar líquido permitido
          </label>

          {/* New item */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Ej. Agua de coco"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Note label */}
          <label className="mb-1 block text-sm font-medium text-gray-700">Nota opcional</label>

          {/* Edit note */}
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Detalles o consideraciones de los líquidos permitidos"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm"
            rows={3}
          />
        </>
      )}
    </section>
  );
}
