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

export default function QuickToggleWorkouts({ patientId }: { patientId: string }) {
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
      {/* Assigned Diets Cards */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-green-100 p-2">
            <Utensils className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Dietas Asignadas</h3>
            <p className="text-sm text-gray-500">Click en una dieta para activar o desactivar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {assignedDiets.map((diet) => (
            <button
              key={diet._id}
              onClick={() => handleDietClick(diet)}
              className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 hover:shadow-lg ${
                diet.isActive
                  ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark hover:border-beehealth-green-secondary-dark-hover'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              {/* Status indicator */}
              <div
                className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold ${
                  diet.isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {diet.isActive ? (
                  <>
                    <Power className="h-3 w-3" />
                    Activa
                  </>
                ) : (
                  <>
                    <PowerOff className="h-3 w-3" />
                    Inactiva
                  </>
                )}
              </div>

              {/* Diet info */}
              <div className="mb-3 pr-20">
                <h4 className="text-lg font-bold text-gray-900">{diet.name}</h4>
                <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {diet.category}
                </span>
              </div>

              {/* Meta info */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Asignada: {formatDate(diet.assignedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Duración: {diet.duration}</span>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                <span>Click para {diet.isActive ? 'desactivar' : 'activar'}</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          ))}
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
