'use client';

/* modal */
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
  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingItem ? 'Editar' : 'Agregar'}{' '}
              {activeTab === 'medicamentos'
                ? 'Medicamento'
                : activeTab === 'recetas'
                  ? 'Receta'
                  : 'Suministro'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {activeTab === 'medicamentos' && (
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              {/* fields */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={medicamentoForm.nombre}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, nombre: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Metformina 850mg"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Categoría</label>
                <input
                  type="text"
                  required
                  value={medicamentoForm.categoria}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, categoria: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Antidiabético"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={medicamentoForm.stock}
                    onChange={(e) =>
                      setMedicamentoForm({ ...medicamentoForm, stock: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={medicamentoForm.minimo}
                    onChange={(e) =>
                      setMedicamentoForm({ ...medicamentoForm, minimo: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={medicamentoForm.precio}
                    onChange={(e) =>
                      setMedicamentoForm({ ...medicamentoForm, precio: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Caducidad</label>
                  <input
                    type="date"
                    required
                    value={medicamentoForm.caducidad}
                    onChange={(e) =>
                      setMedicamentoForm({ ...medicamentoForm, caducidad: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'recetas' && (
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              {/* fields */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Tipo</label>
                <input
                  type="text"
                  required
                  value={recetaForm.tipo}
                  onChange={(e) => setRecetaForm({ ...recetaForm, tipo: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Receta Simple"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={recetaForm.stock}
                    onChange={(e) => setRecetaForm({ ...recetaForm, stock: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={recetaForm.minimo}
                    onChange={(e) => setRecetaForm({ ...recetaForm, minimo: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'suministros' && (
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              {/* fields */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={suministroForm.nombre}
                  onChange={(e) => setSuministroForm({ ...suministroForm, nombre: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Guantes Nitrilo"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={suministroForm.stock}
                    onChange={(e) =>
                      setSuministroForm({ ...suministroForm, stock: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={suministroForm.minimo}
                    onChange={(e) =>
                      setSuministroForm({ ...suministroForm, minimo: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={suministroForm.precio}
                  onChange={(e) => setSuministroForm({ ...suministroForm, precio: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
