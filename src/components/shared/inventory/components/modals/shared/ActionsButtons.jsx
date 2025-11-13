'use client';
import { Edit2, Power, History } from 'lucide-react';

export default function ActionButtons({ item, onEdit, onDelete, onHistory }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Edit Button */}
      <button
        onClick={() => onEdit(item)}
        className="group/btn relative rounded-lg bg-blue-50 p-2 transition-all duration-200 hover:bg-blue-100 hover:shadow-md active:scale-95"
        title="Editar producto"
      >
        <Edit2 className="h-4 w-4 text-blue-600 transition-transform duration-200 group-hover/btn:scale-110" />
      </button>

      {/* Toggle Button */}
      <button
        onClick={() => onDelete(item)}
        className={`group/btn relative rounded-lg p-2 transition-all duration-200 hover:shadow-md active:scale-95 ${
          item?.product?.inStock ? 'bg-green-300 hover:bg-green-500' : 'bg-red-50 hover:bg-red-100'
        }`}
        title={item?.product?.inStock ? 'Desactivar producto' : 'Reactivar producto'}
      >
        <Power
          className={`h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110 ${
            item?.product?.inStock ? 'text-green-800' : 'text-red-600'
          }`}
        />
      </button>

      {/* Transaction History Button */}
      <button
        onClick={() => onHistory(item)}
        className="group/btn relative rounded-lg bg-amber-100 p-2 transition-all duration-200 hover:bg-amber-100 hover:shadow-md active:scale-95"
        title="Ver historial de transacciones"
      >
        <History className="h-4 w-4 text-blue-700 transition-transform duration-200 group-hover/btn:scale-110" />
      </button>
    </div>
  );
}
