'use client';

import { Pill, FileText, Syringe } from 'lucide-react';

export default function AddEditModal({
  activeTab,
  editingItem,
  medicamentoForm,
  setMedicamentoForm,
  recetaForm,
  setRecetaForm,
  suministroForm,
  setSuministroForm,
  onClose,
  onSubmit,
  icons,
}) {
  const { X } = icons;

  const getGradient = () => {
    if (activeTab === 'medicamentos') return 'from-green-500 to-emerald-500';
    if (activeTab === 'recetas') return 'from-blue-500 to-indigo-500';
    return 'from-purple-500 to-pink-500';
  };

  const getAccent = () => {
    if (activeTab === 'medicamentos') return 'green';
    if (activeTab === 'recetas') return 'blue';
    return 'purple';
  };

  const getIcon = () => {
    if (activeTab === 'medicamentos') return <Pill className="h-6 w-6 text-white" />;
    if (activeTab === 'recetas') return <FileText className="h-6 w-6 text-white" />;
    return <Syringe className="h-6 w-6 text-white" />;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-lg overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-purple-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background */}
          <div
            className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradient()} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradient()} opacity-20 blur-3xl`}
          />

          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/50 bg-white/80 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-linear-to-r ${getGradient()} opacity-10`} />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Animated Icon */}
                  <div className="relative">
                    <div
                      className={`absolute inset-0 animate-ping rounded-2xl bg-${getAccent()}-500 opacity-20`}
                    />
                    <div
                      className={`relative flex items-center justify-center rounded-2xl bg-linear-to-br ${getGradient()} p-3 shadow-lg`}
                    >
                      {getIcon()}
                    </div>
                  </div>

                  {/* Title and subtitle */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingItem ? 'Editar' : 'Agregar'}{' '}
                      {activeTab === 'medicamentos'
                        ? 'Medicamento'
                        : activeTab === 'recetas'
                          ? 'Receta'
                          : 'Suministro'}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {editingItem
                        ? 'Actualiza los datos existentes'
                        : 'Completa todos los campos requeridos'}
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative max-h-[calc(90vh-180px)] space-y-5 overflow-y-auto p-6">
            {/* Medications */}
            {activeTab === 'medicamentos' && (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <div className="grid gap-4">
                    <input
                      type="text"
                      required
                      value={medicamentoForm.nombre}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, nombre: e.target.value })
                      }
                      placeholder="Nombre del medicamento"
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20"
                    />
                    <input
                      type="text"
                      required
                      value={medicamentoForm.categoria}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, categoria: e.target.value })
                      }
                      placeholder="Categoría"
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        min="0"
                        value={medicamentoForm.stock}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, stock: e.target.value })
                        }
                        placeholder="Stock"
                        className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20"
                      />
                      <input
                        type="number"
                        min="0"
                        value={medicamentoForm.minimo}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, minimo: e.target.value })
                        }
                        placeholder="Mínimo"
                        className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        min="0"
                        value={medicamentoForm.precio}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, precio: e.target.value })
                        }
                        placeholder="Precio"
                        className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20"
                      />
                      <input
                        type="date"
                        value={medicamentoForm.caducidad}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, caducidad: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 active:scale-95"
                  >
                    {editingItem ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            )}

            {/* Recetas Medicas */}
            {activeTab === 'recetas' && (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <input
                    type="text"
                    required
                    value={recetaForm.tipo}
                    onChange={(e) => setRecetaForm({ ...recetaForm, tipo: e.target.value })}
                    placeholder="Tipo de receta"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min="0"
                      value={recetaForm.stock}
                      onChange={(e) => setRecetaForm({ ...recetaForm, stock: e.target.value })}
                      placeholder="Stock"
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20"
                    />
                    <input
                      type="number"
                      min="0"
                      value={recetaForm.minimo}
                      onChange={(e) => setRecetaForm({ ...recetaForm, minimo: e.target.value })}
                      placeholder="Mínimo"
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95"
                  >
                    {editingItem ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            )}

            {/* Supplies */}
            {activeTab === 'suministros' && (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <input
                    type="text"
                    required
                    value={suministroForm.nombre}
                    onChange={(e) =>
                      setSuministroForm({ ...suministroForm, nombre: e.target.value })
                    }
                    placeholder="Nombre del suministro"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min="0"
                      value={suministroForm.stock}
                      onChange={(e) =>
                        setSuministroForm({ ...suministroForm, stock: e.target.value })
                      }
                      placeholder="Stock"
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20"
                    />
                    <input
                      type="number"
                      min="0"
                      value={suministroForm.minimo}
                      onChange={(e) =>
                        setSuministroForm({ ...suministroForm, minimo: e.target.value })
                      }
                      placeholder="Mínimo"
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20"
                    />
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={suministroForm.precio}
                    onChange={(e) =>
                      setSuministroForm({ ...suministroForm, precio: e.target.value })
                    }
                    placeholder="Precio"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
                  >
                    {editingItem ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
