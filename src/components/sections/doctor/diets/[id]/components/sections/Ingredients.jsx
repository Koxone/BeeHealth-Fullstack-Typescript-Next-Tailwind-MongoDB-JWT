import React from 'react';
import { Plus, X } from 'lucide-react';

function Ingredients({ diet, isEditing = false, onChange, onSave }) {
  const handleAdd = () => {
    const updated = [...diet.ingredients, ''];
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = diet.ingredients.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleEdit = (index, value) => {
    const updated = [...diet.ingredients];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md md:p-4">
      {/* Title */}
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Ingredientes</h2>

      {/* Read */}
      {!isEditing && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {diet.ingredients.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Edit */}
      {isEditing && (
        <div className="space-y-4">
          {/* List editor */}
          <div className="space-y-3">
            {diet.ingredients.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
              >
                {/* Input */}
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                  value={item}
                  onChange={(e) => handleEdit(index, e.target.value)}
                  placeholder="Ingrediente"
                />

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(index)}
                  className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className="bg-medtrack-blue-solid hover:bg-medtrack-blue-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar ingrediente
          </button>

          {/* Save and cancel */}
          <div className="flex items-center gap-3 pt-2">
            <button
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              onClick={onSave}
            >
              Guardar
            </button>

            <button
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              onClick={() => onChange(diet.ingredients)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Ingredients;
