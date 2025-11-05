'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DeleteMedSaleModal from './DeleteMedSaleModal';
import AddEditMedicationSellModal from './addEditMedicationSaleModal/AddEditMedicationSellModal';

/* Table */
export default function MedicamentosTable() {
  /* Data state */
  const [medicamentosVendidos, setMedicamentosVendidos] = useState([
    {
      id: 1,
      nombre: 'Metformina 850mg',
      cantidad: 2,
      precioUnitario: 150,
      total: 300,
      paciente: 'Juan Pérez',
    },
    {
      id: 2,
      nombre: 'Atorvastatina 20mg',
      cantidad: 1,
      precioUnitario: 200,
      total: 200,
      paciente: 'María López',
    },
    {
      id: 3,
      nombre: 'Losartán 50mg',
      cantidad: 3,
      precioUnitario: 120,
      total: 360,
      paciente: 'Carlos Ruiz',
    },
    {
      id: 4,
      nombre: 'Omeprazol 20mg',
      cantidad: 1,
      precioUnitario: 80,
      total: 80,
      paciente: 'Pedro García',
    },
  ]);

  /* UI state */
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* Derived */
  const totalMedicamentos = medicamentosVendidos.reduce((sum, m) => sum + m.total, 0);

  /* Actions */
  const openAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleSaveMedicamento = (form) => {
    const cantidad = parseInt(form.cantidad);
    const precioUnitario = parseFloat(form.precioUnitario);
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      nombre: form.nombre,
      cantidad,
      precioUnitario,
      total: cantidad * precioUnitario,
      paciente: form.paciente,
    };

    if (editingItem) {
      setMedicamentosVendidos((prev) => prev.map((m) => (m.id === editingItem.id ? newItem : m)));
    } else {
      setMedicamentosVendidos((prev) => [...prev, newItem]);
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = () => {
    setMedicamentosVendidos((prev) => prev.filter((m) => m.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 md:px-6">
        <h2 className="text-base font-semibold text-gray-900 md:text-lg">Medicamentos Vendidos</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-3 font-semibold">Medicamento</th>
              <th className="px-4 py-3 text-center font-semibold">Cant.</th>
              <th className="px-4 py-3 text-right font-semibold">P. Unit.</th>
              <th className="px-4 py-3 text-right font-semibold">Total</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Paciente</th>
              <th className="px-4 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {medicamentosVendidos.map((m) => (
              <tr key={m.id} className="border-t border-gray-100 transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{m.nombre}</td>
                <td className="px-4 py-3 text-center text-gray-900">{m.cantidad}</td>
                <td className="px-4 py-3 text-right text-gray-600">
                  ${m.precioUnitario.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  ${m.total.toLocaleString()}
                </td>
                <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{m.paciente}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => openEditModal(m)}
                      className="rounded-lg p-1.5 transition hover:bg-blue-50 active:scale-95"
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(m)}
                      className="rounded-lg p-1.5 transition hover:bg-red-50 active:scale-95"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 font-medium text-gray-900">
              <td colSpan="3" className="px-4 py-3">
                Total Medicamentos
              </td>
              <td className="px-4 py-3 text-right">${totalMedicamentos.toLocaleString()}</td>
              <td className="hidden md:table-cell" />
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Modals */}
      {showModal && (
        <AddEditMedicationSellModal
          type="medicamento"
          editingItem={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSaveMedicamento={handleSaveMedicamento}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <DeleteMedSaleModal
          type="medicamento"
          item={itemToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
