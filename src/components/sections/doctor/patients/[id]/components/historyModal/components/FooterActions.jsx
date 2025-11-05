'use client';

/* actions */
export default function FooterActions({ onCancel, submitLabel }) {
  return (
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="flex-1 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
      >
        {submitLabel}
      </button>
    </div>
  );
}
