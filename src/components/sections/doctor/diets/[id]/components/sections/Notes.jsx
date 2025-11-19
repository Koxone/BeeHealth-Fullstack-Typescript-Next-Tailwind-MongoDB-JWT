import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';

function Notes({ diet, isEditing }) {
  const [notes, setNotes] = useState(diet.notes || '');

  return (
    <section className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 md:p-4">
      {/* Header block */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-200 p-2">
          <AlertCircle className="h-5 w-5 text-blue-700" />
        </div>
        <h2 className="text-xl font-semibold text-blue-900">Notas del Médico</h2>
      </div>

      {/* Display block */}
      {!isEditing && <p className="leading-relaxed whitespace-pre-line text-blue-900">{notes}</p>}

      {/* Edit block */}
      {isEditing && (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Escribe las notas del médico"
          className="w-full rounded-lg border border-blue-300 bg-white p-3 text-blue-900 focus:border-blue-600 focus:outline-none"
          rows={2}
        />
      )}
    </section>
  );
}

export default Notes;
