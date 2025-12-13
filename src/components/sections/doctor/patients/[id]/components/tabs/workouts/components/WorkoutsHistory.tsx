'use client';

import { useState } from 'react';
import {
  Utensils,
  Calendar,
  Clock,
  Power,
  PowerOff,
  History,
  ChevronRight,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react';

// Mock data - reemplazar con datos reales después
const assignedDiets = [
  {
    _id: '1',
    name: 'Bee Reset +',
    category: 'Especial',
    isActive: true,
    assignedAt: '2025-12-09T16:31:53.907Z',
    duration: '2 días',
  },
  {
    _id: '2',
    name: 'Dieta Mediterránea',
    category: 'Equilibrada',
    isActive: false,
    assignedAt: '2025-11-15T10:00:00.000Z',
    duration: '4 semanas',
  },
  {
    _id: '3',
    name: 'Dieta Keto Básica',
    category: 'Cetogénica',
    isActive: false,
    assignedAt: '2025-10-01T08:00:00.000Z',
    duration: '8 semanas',
  },
];

const dietHistory = [
  {
    _id: '1',
    dietName: 'Bee Reset +',
    action: 'assigned',
    date: '2025-12-09T16:31:53.907Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '2',
    dietName: 'Dieta Mediterránea',
    action: 'completed',
    date: '2025-12-01T10:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '3',
    dietName: 'Dieta Mediterránea',
    action: 'assigned',
    date: '2025-11-15T10:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '4',
    dietName: 'Dieta Keto Básica',
    action: 'cancelled',
    date: '2025-10-20T14:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '5',
    dietName: 'Dieta Keto Básica',
    action: 'assigned',
    date: '2025-10-01T08:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
];

export default function WorkoutsHistory({ patientId }: { patientId: string }) {
  const [selectedDiet, setSelectedDiet] = useState<(typeof assignedDiets)[0] | null>(null);
  const [showToggleModal, setShowToggleModal] = useState(false);

  const handleDietClick = (diet: (typeof assignedDiets)[0]) => {
    setSelectedDiet(diet);
    setShowToggleModal(true);
  };

  const handleToggleDiet = () => {
    // Aquí va la lógica para activar/desactivar la dieta
    console.log('Toggle diet:', selectedDiet?._id);
    setShowToggleModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'assigned':
        return {
          label: 'Asignada',
          className: 'bg-blue-100 text-blue-700',
          icon: CheckCircle,
        };
      case 'completed':
        return {
          label: 'Completada',
          className: 'bg-green-100 text-green-700',
          icon: CheckCircle,
        };
      case 'cancelled':
        return {
          label: 'Cancelada',
          className: 'bg-red-100 text-red-700',
          icon: XCircle,
        };
      default:
        return {
          label: action,
          className: 'bg-gray-100 text-gray-700',
          icon: Clock,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Diet History */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-2">
            <History className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Historial de Dietas</h3>
            <p className="text-sm text-gray-500">Registro de asignaciones y cambios</p>
          </div>
        </div>

        <div className="space-y-3">
          {dietHistory.map((record) => {
            const badge = getActionBadge(record.action);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={record._id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  {/* Date */}
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-center">
                    <span className="text-xs font-medium text-blue-600 uppercase">
                      {new Date(record.date).toLocaleDateString('es-MX', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-blue-700">
                      {new Date(record.date).getDate()}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-semibold text-gray-900">{record.dietName}</p>
                    <p className="text-sm text-gray-500">Por: {record.doctor}</p>
                  </div>
                </div>

                {/* Action badge */}
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${badge.className}`}
                >
                  <BadgeIcon className="h-4 w-4" />
                  {badge.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggle Diet Modal */}
      {showToggleModal && selectedDiet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowToggleModal(false)}
        >
          <div
            className="bg-beehealth-body-main w-full max-w-md rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div
              className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                selectedDiet.isActive ? 'bg-red-100' : 'bg-green-100'
              }`}
            >
              {selectedDiet.isActive ? (
                <PowerOff className="h-8 w-8 text-red-600" />
              ) : (
                <Power className="h-8 w-8 text-green-600" />
              )}
            </div>

            {/* Content */}
            <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
              {selectedDiet.isActive ? 'Desactivar Dieta' : 'Activar Dieta'}
            </h3>

            <p className="mb-2 text-center text-lg font-semibold text-gray-700">
              "{selectedDiet.name}"
            </p>

            <p className="mb-6 text-center text-gray-500">
              {selectedDiet.isActive
                ? 'El paciente dejará de seguir esta dieta.'
                : 'El paciente comenzará a seguir esta dieta.'}
            </p>

            {/* Diet details */}
            <div className="mb-6 rounded-xl bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Categoría</p>
                  <p className="font-semibold text-gray-900">{selectedDiet.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duración</p>
                  <p className="font-semibold text-gray-900">{selectedDiet.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500">Asignada</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(selectedDiet.assignedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Estado Actual</p>
                  <p
                    className={`font-semibold ${selectedDiet.isActive ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {selectedDiet.isActive ? 'Activa' : 'Inactiva'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowToggleModal(false)}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleToggleDiet}
                className={`flex-1 rounded-xl px-4 py-3 font-semibold text-white transition ${
                  selectedDiet.isActive
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {selectedDiet.isActive ? 'Desactivar' : 'Activar'}
              </button>
            </div>

            {/* View diet link */}
            <button className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              <Eye className="h-4 w-4" />
              Ver detalles de la dieta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
