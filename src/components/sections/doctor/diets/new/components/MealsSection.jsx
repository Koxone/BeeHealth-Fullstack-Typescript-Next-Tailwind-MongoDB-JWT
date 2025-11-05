'use client';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import MealItem from './MealItem';

export default function MealsSection() {
  const [meals, setMeals] = useState([
    { nombre: 'Desayuno', hora: '08:00', items: [''] },
    { nombre: 'Almuerzo', hora: '13:00', items: [''] },
    { nombre: 'Cena', hora: '19:00', items: [''] },
  ]);

  const addItem = (mealIndex) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items.push('');
    setMeals(newMeals);
  };

  const removeItem = (mealIndex, itemIndex) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items.splice(itemIndex, 1);
    setMeals(newMeals);
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
        Plan Diario de Comidas
      </h2>

      <div className="space-y-4 md:space-y-6">
        {meals.map((meal, mealIndex) => (
          <div key={mealIndex} className="rounded-lg bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={meal.nombre}
                  onChange={(e) => {
                    const newMeals = [...meals];
                    newMeals[mealIndex].nombre = e.target.value;
                    setMeals(newMeals);
                  }}
                  className="border-b border-transparent bg-transparent font-semibold text-gray-900 outline-none hover:border-gray-300 focus:border-blue-500"
                />
                <input
                  type="time"
                  value={meal.hora}
                  onChange={(e) => {
                    const newMeals = [...meals];
                    newMeals[mealIndex].hora = e.target.value;
                    setMeals(newMeals);
                  }}
                  className="border-b border-transparent bg-transparent text-sm text-gray-600 outline-none hover:border-gray-300 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => addItem(mealIndex)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Agregar alimento
              </button>
            </div>

            <div className="space-y-2">
              {meal.items.map((item, itemIndex) => (
                <MealItem
                  key={itemIndex}
                  mealIndex={mealIndex}
                  itemIndex={itemIndex}
                  item={item}
                  removeItem={removeItem}
                  meals={meals}
                  setMeals={setMeals}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
