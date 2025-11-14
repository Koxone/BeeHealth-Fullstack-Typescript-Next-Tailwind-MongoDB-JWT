'use client';
import React, { useState, useMemo } from 'react';
import SearchAddBar from './SearchAddBar';
import ConsultationsTable from './ConsultationsTable';
import ConsultationsMobile from './ConsultationsMobile';
import EmptyState from './EmptyState';
import EmployeeDeleteConsultModal from '@/components/sections/employee/consultations/components/modals/employeeDeleteConsultModal/EmployeeDeleteConsultModal';

// Modals
import EmployeeCreateConsultModal from '@/components/sections/employee/consultations/components/modals/employeeCreateConsultModal/EmployeeCreateConsultModal';
import EmployeeEditConsultModal from '@/components/sections/employee/consultations/components/modals/employeeEditConsultModal/EmployeeEditConsultModal';

import { Search, Plus, FileText, Edit2, Trash2, AlertCircle } from 'lucide-react';

/* Helper date */
function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/* Autonomous component with full logic and modals */
export default function TodayConsultsTable() {
  /* Data state */
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      fecha: '2024-10-21',
      hora: '09:00',
      paciente: 'Juan Pérez',
      tipo: 'Primera Vez',
      costo: 1000,
      paymentMethod: 'Efectivo',
      avatar: 'JP',
    },
    {
      id: 2,
      fecha: '2024-10-21',
      hora: '10:30',
      paciente: 'María López',
      tipo: 'Subsecuente',
      costo: 600,
      paymentMethod: 'Tarjeta',
      avatar: 'ML',
    },
    {
      id: 3,
      fecha: '2024-10-21',
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Primera Vez',
      costo: 800,
      paymentMethod: 'Transferencia',
      avatar: 'CR',
    },
    {
      id: 4,
      fecha: '2024-10-21',
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Subsecuente',
      costo: 800,
      paymentMethod: 'Tarjeta',
      avatar: 'AM',
    },
    {
      id: 5,
      fecha: '2024-10-21',
      hora: '16:30',
      paciente: 'Pedro García',
      tipo: 'Subsecuente',
      costo: 600,
      paymentMethod: 'Tarjeta',
      avatar: 'PG',
    },
  ]);

  /* UI state */
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* Derived values */
  const filteredConsultas = useMemo(
    () => consultas.filter((c) => c.paciente.toLowerCase().includes(searchTerm.toLowerCase())),
    [consultas, searchTerm]
  );

  const totalIngresos = useMemo(() => consultas.reduce((acc, c) => acc + c.costo, 0), [consultas]);

  /* Open create */
  const openCreate = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  /* Open edit */
  const openEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  /* Ask delete */
  const askDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  /* Handle create */
  const handleCreate = (form) => {
    const payload = {
      id: Date.now(),
      fecha: todayISO(),
      hora: form.hora,
      paciente: form.paciente,
      tipo: form.tipo,
      costo: parseFloat(form.costo),
      pagado: form.pagado,
      avatar: form.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };
    setConsultas((prev) => [...prev, payload]);
    setShowModal(false);
  };

  /* Handle update */
  const handleUpdate = (form) => {
    if (!editingItem) return;
    const updated = {
      ...editingItem,
      hora: form.hora,
      paciente: form.paciente,
      tipo: form.tipo,
      costo: parseFloat(form.costo),
      pagado: form.pagado,
      avatar: form.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };
    setConsultas((prev) => prev.map((c) => (c.id === editingItem.id ? updated : c)));
    setShowModal(false);
    setEditingItem(null);
  };

  /* Handle delete */
  const handleDelete = () => {
    if (!itemToDelete) return;
    setConsultas((prev) => prev.filter((c) => c.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search and add */}
      <SearchAddBar
        value={searchTerm}
        onChange={setSearchTerm}
        onAdd={openCreate}
        icons={{ Search, Plus }}
      />

      {/* List */}
      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
        <ConsultationsTable
          rows={filteredConsultas}
          totals={{
            totalIngresos,
            cobradas: consultas.filter((c) => c.pagado).length,
            total: consultas.length,
          }}
          onEdit={openEdit}
          onDelete={askDelete}
        />

        <ConsultationsMobile
          rows={filteredConsultas}
          icons={{ Edit2, Trash2 }}
          onEdit={openEdit}
          onDelete={askDelete}
        />

        <EmptyState visible={filteredConsultas.length === 0} icons={{ FileText }} />
      </div>

      {/* Modals */}
      {showModal && !editingItem && (
        <EmployeeCreateConsultModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}

      {showModal && editingItem && (
        <EmployeeEditConsultModal
          editingItem={editingItem}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <EmployeeDeleteConsultModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          icons={{ AlertCircle }}
        />
      )}
    </div>
  );
}
