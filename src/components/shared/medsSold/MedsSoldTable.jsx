'use client';

import { useState } from 'react';
import { Pill, Users, DollarSign, Edit2, Trash2, Award } from 'lucide-react';

import DeleteMedSaleModal from './DeleteMedSaleModal';
import AddEditMedicationSellModal from './addEditMedicationSaleModal/AddEditMedicationSellModal';

export default function MedsSoldTable() {
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
  const totalMedicamentos = medicamentosVendidos.reduce((acc, m) => acc + m.total, 0);

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
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full">
        {/* HEADER */}
        <thead className="border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-indigo-50">
          <tr>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Medicamento</span>
              </div>
            </th>

            <th className="px-6 py-4 text-center">
              <span className="text-sm font-bold text-gray-900">Cant.</span>
            </th>

            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">P. Unit.</span>
              </div>
            </th>

            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Total</span>
              </div>
            </th>

            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Paciente</span>
              </div>
            </th>

            <th className="px-6 py-4 text-center">
              <span className="text-sm font-bold text-gray-900">Acciones</span>
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-200">
          {medicamentosVendidos.map((m, i) => (
            <tr
              key={m.id}
              style={{ animationDelay: `${i * 50}ms` }}
              className="group animate-fadeInUp transition hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50"
            >
              {/* Nombre */}
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-900">{m.nombre}</span>
              </td>

              {/* Cantidad */}
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-medium text-gray-700">{m.cantidad}</span>
              </td>

              {/* Precio Unitario */}
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-medium text-gray-700">
                  ${m.precioUnitario.toLocaleString()}
                </span>
              </td>

              {/* Total */}
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-bold text-neutral-700">
                  ${m.total.toLocaleString()}
                </span>
              </td>

              {/* Paciente */}
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-800">{m.paciente}</span>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEditModal(m)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-blue-200 hover:bg-blue-50 active:scale-95"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600 transition-transform group-hover/btn:rotate-12" />
                  </button>

                  <button
                    onClick={() => openDeleteModal(m)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-red-200 hover:bg-red-50 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 transition-transform group-hover/btn:scale-110" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        {/* FOOTER */}
        <tfoot className="w-full border-t-2 border-gray-200">
          <tr className="font-bold">
            <td colSpan="3" className="px-6 py-4 text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <span>Total General</span>
              </div>
            </td>

            <td className="px-6 py-4 text-right text-lg font-bold text-indigo-600">
              ${totalMedicamentos.toLocaleString()}
            </td>

            <td colSpan="2" />
          </tr>
        </tfoot>
      </table>

      {/* MODALS */}
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
