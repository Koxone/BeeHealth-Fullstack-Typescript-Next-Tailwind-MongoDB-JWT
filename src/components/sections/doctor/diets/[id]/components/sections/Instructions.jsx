import { Utensils } from 'lucide-react';
import React from 'react';

function Instructions({ diet, isEditing = false, onChange, onSave }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <Utensils className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Instrucciones</h2>
      </div>

      {/* Read mode */}
      {!isEditing && (
        <p className="leading-relaxed whitespace-pre-line text-gray-700">{diet.instructions}</p>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div className="mt-4 space-y-4">
          <textarea
            className="focus:border-medtrack-blue w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none"
            value={diet.instructions}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
          />
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              className="bg-medtrack-blue-solid hover:bg-medtrack-blue-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Instructions;
