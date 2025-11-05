'use client';
import React, { useState, useMemo } from 'react';
import SearchAddBar from './SearchAddBar';
import ConsultationsTable from './ConsultationsTable';
import ConsultationsMobile from './ConsultationsMobile';
import EmptyState from './EmptyState';
import AddEditTodaysConsultModal from './AddEditTodaysConsultModal';
import DeleteTodaysConsultModal from '@/components/shared/todayConsults/DeleteTodaysConsultModal';
import {
  Search,
  Plus,
  Calendar,
  Users,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  Edit2,
  Trash2,
  Award,
  CreditCard,
  X,
  AlertCircle,
} from 'lucide-react';

/* Autonomous component with full logic and modals */
export default function TodayConsultsTable() {
  // Data state
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      fecha: '2024-10-21',
      hora: '09:00',
      paciente: 'Juan Pérez',
      tipo: 'Primera Consulta',
      costo: 1000,
      pagado: true,
      avatar: 'JP',
    },
    {
      id: 2,
      fecha: '2024-10-21',
      hora: '10:30',
      paciente: 'María López',
      tipo: 'Seguimiento',
      costo: 600,
      pagado: true,
      avatar: 'ML',
    },
    {
      id: 3,
      fecha: '2024-10-21',
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Control de Peso',
      costo: 800,
      pagado: false,
      avatar: 'CR',
    },
    {
      id: 4,
      fecha: '2024-10-21',
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Consulta General',
      costo: 800,
      pagado: true,
      avatar: 'AM',
    },
    {
      id: 5,
      fecha: '2024-10-21',
      hora: '16:30',
      paciente: 'Pedro García',
      tipo: 'Seguimiento',
      costo: 600,
      pagado: true,
      avatar: 'PG',
    },
  ]);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form state
  const [consultaForm, setConsultaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    tipo: '',
    costo: '',
    pagado: true,
  });

  // Derived values
  const filteredConsultas = useMemo(
    () => consultas.filter((c) => c.paciente.toLowerCase().includes(searchTerm.toLowerCase())),
    [consultas, searchTerm]
  );

  const totalIngresos = useMemo(() => consultas.reduce((acc, c) => acc + c.costo, 0), [consultas]);

  // Handlers
  const openCreate = () => {
    setEditingItem(null);
    setConsultaForm({
      fecha: '',
      hora: '',
      paciente: '',
      tipo: '',
      costo: '',
      pagado: true,
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setConsultaForm({
      fecha: item.fecha,
      hora: item.hora,
      paciente: item.paciente,
      tipo: item.tipo,
      costo: String(item.costo),
      pagado: item.pagado,
    });
    setShowModal(true);
  };

  const askDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      id: editingItem ? editingItem.id : Date.now(),
      ...consultaForm,
      costo: parseFloat(consultaForm.costo),
      avatar: consultaForm.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };
    setConsultas((prev) =>
      editingItem ? prev.map((c) => (c.id === editingItem.id ? payload : c)) : [...prev, payload]
    );
    setShowModal(false);
    setEditingItem(null);
    setConsultaForm({
      fecha: '',
      hora: '',
      paciente: '',
      tipo: '',
      costo: '',
      pagado: true,
    });
  };

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
          icons={{
            Calendar,
            Users,
            FileText,
            DollarSign,
            CheckCircle,
            Clock,
            Edit2,
            Trash2,
            Award,
          }}
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
      {showModal && (
        <AddEditTodaysConsultModal
          type="consulta"
          editingItem={editingItem}
          form={consultaForm}
          setForm={setConsultaForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
          icons={{ X, Edit2, Plus, Calendar, Clock, Users, FileText, DollarSign, CreditCard }}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <DeleteTodaysConsultModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          icons={{ AlertCircle }}
        />
      )}
    </div>
  );
}
