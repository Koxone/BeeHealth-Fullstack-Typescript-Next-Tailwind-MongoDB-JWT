import { Clock } from 'lucide-react';
import React, { useState } from 'react';

function Duration({ diet, isEditing }) {
  const [duration, setDuration] = useState(diet.duration || '');

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header block */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <Clock className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Duración</h2>
      </div>

      {/* Content block */}
      {!isEditing && <p className="leading-relaxed text-gray-700">{duration}</p>}

      {/* Edit block */}
      {isEditing && (
        <textarea
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Ingresa la duración de la dieta"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none"
          rows={2}
        />
      )}
    </section>
  );
}

export default Duration;
