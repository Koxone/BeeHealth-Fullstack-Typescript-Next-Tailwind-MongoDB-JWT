/* Actions */
export default function Actions({ onClose, submitLabel }) {
  return (
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="flex-1 rounded-xl bg-medtrack-blue-solid hover:bg-medtrack-blue-hover px-6 py-3.5 font-semibold text-white"
      >
        {submitLabel}
      </button>
    </div>
  );
}
