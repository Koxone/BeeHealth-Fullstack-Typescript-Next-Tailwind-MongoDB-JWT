'use client';

import { Pill, FileText, Syringe } from 'lucide-react';
import MedicationForm from '../shared/MedicationForm';
import PrescriptionForm from '../shared/PrescriptionForm';
import SupplyForm from '../shared/SupplyForm';

/* Layout helpers */
function getGradient(tab) {
  if (tab === 'medicamentos') return 'from-green-500 to-emerald-500';
  if (tab === 'recetas') return 'from-blue-500 to-indigo-500';
  return 'from-purple-500 to-pink-500';
}
function getIcon(tab) {
  if (tab === 'medicamentos') return <Pill className="h-6 w-6 text-white" />;
  if (tab === 'recetas') return <FileText className="h-6 w-6 text-white" />;
  return <Syringe className="h-6 w-6 text-white" />;
}

/* Modal container only handles layout and renders the proper form */
export default function AddProductModal({ activeTab, onClose, onSubmit, icons }) {
  const { X } = icons || {};

  /* Render proper form by tab */
  const renderForm = () => {
    if (activeTab === 'medicamentos') {
      return <MedicationForm mode="add" onCancel={onClose} onSubmit={onSubmit} />;
    }
    if (activeTab === 'recetas') {
      return <PrescriptionForm mode="add" onCancel={onClose} onSubmit={onSubmit} />;
    }
    return <SupplyForm mode="add" onCancel={onClose} onSubmit={onSubmit} />;
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative */}
          <div
            className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradient(activeTab)} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradient(activeTab)} opacity-20 blur-3xl`}
          />

          {/* Header */}
          <div className="relative overflow-hidden border-b border-gray-100 bg-white/80 backdrop-blur-xl">
            <div
              className={`absolute inset-0 bg-linear-to-r ${getGradient(activeTab)} opacity-10`}
            />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={`relative flex items-center justify-center rounded-2xl bg-linear-to-br ${getGradient(activeTab)} p-3 shadow-lg`}
                    >
                      {getIcon(activeTab)}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Agregar{' '}
                      {activeTab === 'medicamentos'
                        ? 'Medicamento'
                        : activeTab === 'recetas'
                          ? 'Receta'
                          : 'Suministro'}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Completa todos los campos requeridos
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500"
                >
                  {X ? (
                    <X className="h-5 w-5 text-gray-600 hover:text-white" />
                  ) : (
                    <span className="text-sm">Cerrar</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Body renders a single-responsibility form */}
          <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">{renderForm()}</div>
        </div>
      </div>
    </>
  );
}
