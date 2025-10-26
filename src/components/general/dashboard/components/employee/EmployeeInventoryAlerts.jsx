'use client';

import { AlertTriangle, ChevronRight } from 'lucide-react';
import { alertasInventarioPreset } from './inventoryAlerts/data';

export default function EmployeeInventoryAlerts({ onViewMore }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Alertas de Inventario</h2>
        <button
          onClick={onViewMore}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
        >
          Ver más
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[250px] space-y-2 overflow-y-auto">
        {alertasInventarioPreset.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
              <p className="text-xs text-red-600">
                Stock: {item.stock} / Mín: {item.minimo}
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
