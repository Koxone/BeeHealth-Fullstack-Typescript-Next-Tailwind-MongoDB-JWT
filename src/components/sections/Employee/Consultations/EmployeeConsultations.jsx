'use client';

/* imports */
import { useState, useMemo } from 'react'; /* state */
import {
  DollarSign,
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertCircle,
  X,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Award,
} from 'lucide-react'; /* icons */

/* components */
import HeaderBar from './Components/HeaderBar';
import MetricsGrid from './Components/MetricsGrid';
import SearchAddBar from './Components/SearchAddBar';
import ConsultationsTable from './Components/ConsultationsTable';
import ConsultationsMobile from './Components/ConsultationsMobile';
import EmptyState from './Components/EmptyState';
import AddEditModal from './Components/AddEditModal/AddEditModal';
import DeleteModal from './Components/DeleteModal';

/* container */
export default function EmployeeConsultations() {
  /* ui state */
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  /* data state */
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

  /* form state */
  const [consultaForm, setConsultaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    tipo: '',
    costo: '',
    pagado: true,
  });

  /* derived totals */
  const totalIngresos = useMemo(() => consultas.reduce((s, c) => s + c.costo, 0), [consultas]);
  const totalPagado = useMemo(
    () => consultas.filter((c) => c.pagado).reduce((s, c) => s + c.costo, 0),
    [consultas]
  );
  const totalPendiente = useMemo(
    () => consultas.filter((c) => !c.pagado).reduce((s, c) => s + c.costo, 0),
    [consultas]
  );
  const porcentajeCobrado = useMemo(
    () => (totalIngresos > 0 ? ((totalPagado / totalIngresos) * 100).toFixed(1) : 0),
    [totalIngresos, totalPagado]
  );

  /* derived filter */
  const filteredConsultas = useMemo(
    () => consultas.filter((c) => c.paciente.toLowerCase().includes(searchTerm.toLowerCase())),
    [consultas, searchTerm]
  );

  /* handlers */
  const openCreate = () => {
    setEditingItem(null);
    setConsultaForm({ fecha: '', hora: '', paciente: '', tipo: '', costo: '', pagado: true });
    setShowModal(true);
  };

  /* handlers */
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

  /* handlers */
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
    setConsultaForm({ fecha: '', hora: '', paciente: '', tipo: '', costo: '', pagado: true });
  };

  /* handlers */
  const askDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  /* handlers */
  const handleDelete = () => {
    if (!itemToDelete) return;
    setConsultas((prev) => prev.filter((c) => c.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden pb-8">
      {/* header */}
      <HeaderBar icons={{ DollarSign }} />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* metrics */}
        <MetricsGrid
          icons={{ TrendingUp, CheckCircle, AlertCircle, Users }}
          totals={{ totalIngresos, totalPagado, totalPendiente, count: consultas.length }}
          porcentajeCobrado={porcentajeCobrado}
        />

        {/* search and add */}
        <SearchAddBar
          value={searchTerm}
          onChange={setSearchTerm}
          onAdd={openCreate}
          icons={{ Search, Plus }}
        />

        {/* list */}
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
      </div>

      {/* modals */}
      {showModal && (
        <AddEditModal
          editingItem={editingItem}
          form={consultaForm}
          setForm={setConsultaForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
          icons={{ X, Edit2, Plus, Calendar, Clock, Users, FileText, DollarSign, CreditCard }}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          icons={{ AlertCircle }}
        />
      )}

      {/* animations */
      /* global keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
