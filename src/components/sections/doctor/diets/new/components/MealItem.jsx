'use client';

import { X } from 'lucide-react';

export default function MealItem({ mealIndex, itemIndex, item, removeItem, meals, setMeals }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={item}
        onChange={(e) => {
          const newMeals = [...meals];
          newMeals[mealIndex].items[itemIndex] = e.target.value;
          setMeals(newMeals);
        }}
        placeholder="Ej: 1 taza de avena con frutas"
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
      />
      {meals[mealIndex].items.length > 1 && (
        <button
          type="button"
          onClick={() => removeItem(mealIndex, itemIndex)}
          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
