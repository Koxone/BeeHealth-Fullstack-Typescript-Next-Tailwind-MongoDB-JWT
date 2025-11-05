import MealsSection from './MealsSection';

export default function DietForm() {
  return (
    <form className="space-y-4 md:space-y-6">
      {/* Basic info */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Nombre del Plan</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 active:scale-95"
            placeholder="Ej: Plan Mediterráneo"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Duración (días)</label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 active:scale-95"
            placeholder="30"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          rows="3"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 active:scale-95"
          placeholder="Describe el objetivo y características del plan nutricional..."
        ></textarea>
      </div>

      {/* Meals */}
      <MealsSection />

      {/* Notes */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Notas e Instrucciones Especiales
        </label>
        <textarea
          rows="4"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 active:scale-95"
          placeholder="Recomendaciones, restricciones, consejos adicionales..."
        ></textarea>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 rounded-lg bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-600"
        >
          Crear Dieta
        </button>
        <button
          type="button"
          className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
