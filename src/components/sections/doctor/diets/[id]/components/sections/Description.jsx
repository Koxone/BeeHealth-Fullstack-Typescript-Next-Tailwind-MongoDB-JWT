import { FileText } from 'lucide-react';
import React from 'react';

export default function Description({ diet, isEditing = false, onChange, onSave, onCancel }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <FileText className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
      </div>

      {/* Read mode */}
      {!isEditing && <p className="leading-relaxed text-gray-700">{diet.description}</p>}

      {/* Edit mode */}
      {isEditing && (
        <div className="mt-4 space-y-4">
          <textarea
            className="focus:border-medtrack-blue w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none"
            value={diet.description}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
          />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              className="bg-medtrack-green-secondary-solid hover:bg-medtrack-green-secondary-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
