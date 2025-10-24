'use client';

/* imports */
import { useState } from 'react'; // state
import { DollarSign, Users, Pill, TrendingUp } from 'lucide-react';
import HeaderBar from './Components/HeaderBar';
import MetricsGrid from './Components/MetricsGrid';
import WeeklyIncomeChart from './Components/WeeklyIncomeChart';
import DistributionCard from './Components/DistributionCard';
import ConsultasTable from './Components/ConsultasTable';
import MedicamentosTable from './Components/MedicamentosTable';
import AddEditModal from './Components/AddEditModal';
import DeleteConfirmModal from './Components/DeleteConfirmModal';

/* demo data */
const ingresosSemanales = [
  { dia: 'Lun', consultas: 3200, medicamentos: 450 },
  { dia: 'Mar', consultas: 2800, medicamentos: 380 },
  { dia: 'Mié', consultas: 3600, medicamentos: 520 },
  { dia: 'Jue', consultas: 3000, medicamentos: 410 },
  { dia: 'Vie', consultas: 3800, medicamentos: 940 },
  { dia: 'Sáb', consultas: 2400, medicamentos: 320 },
  { dia: 'Dom', consultas: 0, medicamentos: 0 },
];

export default function DoctorAccounting() {
  /* ui state */
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('consulta');
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* data state */
  const [consultasHoy, setConsultasHoy] = useState([
    {
      id: 1,
      hora: '09:00',
      paciente: 'Juan Pérez',
      tipo: 'Consulta General',
      costo: 800,
      pagado: true,
    },
    {
      id: 2,
      hora: '10:00',
      paciente: 'María López',
      tipo: 'Seguimiento',
      costo: 600,
      pagado: true,
    },
    {
      id: 3,
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Primera Consulta',
      costo: 1000,
      pagado: true,
    },
    {
      id: 4,
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Consulta General',
      costo: 800,
      pagado: false,
    },
    {
      id: 5,
      hora: '16:00',
      paciente: 'Pedro García',
      tipo: 'Seguimiento',
      costo: 600,
      pagado: true,
    },
  ]);
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

  /* derived */
  const totalConsultas = consultasHoy.reduce((sum, c) => sum + c.costo, 0);
  const totalMedicamentos = medicamentosVendidos.reduce((sum, m) => sum + m.total, 0);
  const totalDia = totalConsultas + totalMedicamentos;
  const consultasPagadas = consultasHoy.filter((c) => c.pagado).length;
  const distribucionIngresos = [
    { name: 'Consultas', value: totalConsultas, color: '#3b82f6' },
    { name: 'Medicamentos', value: totalMedicamentos, color: '#10b981' },
  ];

  /* actions */
  const openAddModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  /* actions */
  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  /* actions */
  const handleSaveConsulta = (form) => {
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      hora: form.hora,
      paciente: form.paciente,
      tipo: form.tipo,
      costo: parseFloat(form.costo),
      pagado: !!form.pagado,
    };
    if (editingItem) {
      setConsultasHoy((prev) => prev.map((c) => (c.id === editingItem.id ? newItem : c)));
    } else {
      setConsultasHoy((prev) => [...prev, newItem]);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  /* actions */
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

  /* actions */
  const openDeleteModal = (type, item) => {
    setModalType(type);
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  /* actions */
  const handleDelete = () => {
    if (modalType === 'consulta') {
      setConsultasHoy((prev) => prev.filter((c) => c.id !== itemToDelete.id));
    } else {
      setMedicamentosVendidos((prev) => prev.filter((m) => m.id !== itemToDelete.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* header */}
      <HeaderBar selectedDate={selectedDate} onChangeDate={setSelectedDate} />

      {/* metrics */}
      <MetricsGrid
        totalDia={totalDia}
        totalConsultas={totalConsultas}
        totalMedicamentos={totalMedicamentos}
        consultasCount={consultasHoy.length}
        medsCount={medicamentosVendidos.length}
        promedio={consultasHoy.length > 0 ? (totalDia / consultasHoy.length).toFixed(0) : 0}
        consultasPagadas={`${consultasPagadas}/${consultasHoy.length}`}
        icons={{ DollarSign, Users, Pill, TrendingUp }}
      />

      {/* charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <WeeklyIncomeChart data={ingresosSemanales} />
        <DistributionCard data={distribucionIngresos} />
      </div>

      {/* tables */}
      <ConsultasTable
        items={consultasHoy}
        total={totalConsultas}
        pagadasBadge={consultasPagadas}
        onAdd={() => openAddModal('consulta')}
        onEdit={(it) => openEditModal('consulta', it)}
        onDelete={(it) => openDeleteModal('consulta', it)}
      />

      <MedicamentosTable
        items={medicamentosVendidos}
        total={totalMedicamentos}
        onAdd={() => openAddModal('medicamento')}
        onEdit={(it) => openEditModal('medicamento', it)}
        onDelete={(it) => openDeleteModal('medicamento', it)}
      />

      {/* modals */}
      {showModal && (
        <AddEditModal
          type={modalType}
          editingItem={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSaveConsulta={handleSaveConsulta}
          onSaveMedicamento={handleSaveMedicamento}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <DeleteConfirmModal
          type={modalType}
          item={itemToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
