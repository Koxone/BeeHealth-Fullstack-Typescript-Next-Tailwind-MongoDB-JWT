'use client';

/* imports */
import { useState } from 'react'; /* state */
import {
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Edit2,
  X,
  Phone,
  Mail,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Filter,
} from 'lucide-react'; /* icons */

/* components */
import HeaderBar from './Components/HeaderBar';
import StatsGrid from './Components/StatsGrid';
import ControlsBar from './Components/ControlsBar';
import AppointmentCard from './Components/AppointmentCard';
import AddEditModal from './Components/AddEditModal';
import CancelModal from './Components/CancelModal';
import EmptyState from './Components/EmptyState';

/* container */
export default function EmployeeAppointments() {
  /* ui state */
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [citaToCancel, setCitaToCancel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todas');

  /* data state */
  const [citas, setCitas] = useState([
    {
      id: 1,
      fecha: '2024-10-21',
      hora: '09:00',
      paciente: 'Juan Pérez',
      telefono: '555-0101',
      email: 'juan@email.com',
      motivo: 'Primera Consulta',
      estado: 'Confirmada',
      avatar: 'JP',
    },
    {
      id: 2,
      fecha: '2024-10-21',
      hora: '10:30',
      paciente: 'María López',
      telefono: '555-0102',
      email: 'maria@email.com',
      motivo: 'Seguimiento',
      estado: 'Pendiente',
      avatar: 'ML',
    },
    {
      id: 3,
      fecha: '2024-10-21',
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      telefono: '555-0103',
      email: 'carlos@email.com',
      motivo: 'Control de Peso',
      estado: 'Confirmada',
      avatar: 'CR',
    },
    {
      id: 4,
      fecha: '2024-10-22',
      hora: '15:00',
      paciente: 'Ana Martínez',
      telefono: '555-0104',
      email: 'ana@email.com',
      motivo: 'Consulta General',
      estado: 'Pendiente',
      avatar: 'AM',
    },
    {
      id: 5,
      fecha: '2024-10-22',
      hora: '16:30',
      paciente: 'Pedro García',
      telefono: '555-0105',
      email: 'pedro@email.com',
      motivo: 'Seguimiento',
      estado: 'Confirmada',
      avatar: 'PG',
    },
  ]);

  /* form state */
  const [citaForm, setCitaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    telefono: '',
    email: '',
    motivo: '',
  });

  /* helpers */
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendiente':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelada':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  /* derived */
  const filteredCitas = citas.filter((c) => {
    const matchSearch =
      c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono.includes(searchTerm);
    const matchFilter = filterEstado === 'Todas' || c.estado === filterEstado;
    return matchSearch && matchFilter;
  });

  /* derived */
  const stats = {
    total: citas.length,
    confirmadas: citas.filter((c) => c.estado === 'Confirmada').length,
    pendientes: citas.filter((c) => c.estado === 'Pendiente').length,
    canceladas: citas.filter((c) => c.estado === 'Cancelada').length,
  };

  /* actions */
  const openCreate = () => {
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
    setShowModal(true);
  };

  /* actions */
  const openEdit = (cita) => {
    setEditingCita(cita);
    setCitaForm({
      fecha: cita.fecha,
      hora: cita.hora,
      paciente: cita.paciente,
      telefono: cita.telefono,
      email: cita.email,
      motivo: cita.motivo,
    });
    setShowModal(true);
  };

  /* actions */
  const handleSave = (e) => {
    e.preventDefault();
    const newCita = {
      id: editingCita ? editingCita.id : Date.now(),
      ...citaForm,
      estado: editingCita ? editingCita.estado : 'Pendiente',
      avatar: citaForm.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };
    setCitas((prev) =>
      editingCita ? prev.map((c) => (c.id === editingCita.id ? newCita : c)) : [...prev, newCita]
    );
    setShowModal(false);
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
  };

  /* actions */
  const askCancel = (cita) => {
    setCitaToCancel(cita);
    setShowCancelModal(true);
  };

  /* actions */
  const handleCancel = () => {
    setCitas((prev) =>
      prev.map((c) => (c.id === citaToCancel.id ? { ...c, estado: 'Cancelada' } : c))
    );
    setShowCancelModal(false);
    setCitaToCancel(null);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* header */}
      <HeaderBar />

      {/* stats */}
      <div className="mx-auto max-w-7xl">
        <StatsGrid stats={stats} icons={{ Calendar, CheckCircle, Clock, X }} />
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* controls */}
        <ControlsBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterEstado={filterEstado}
          setFilterEstado={setFilterEstado}
          onCreate={openCreate}
          icons={{ Search, Filter, Plus }}
        />

        {/* list */}
        {filteredCitas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredCitas.map((cita, index) => (
              <AppointmentCard
                key={cita.id}
                index={index}
                cita={cita}
                getEstadoBadge={getEstadoBadge}
                icons={{ Calendar, Clock, Phone, Mail, Sparkles, Edit2, X }}
                onEdit={() => openEdit(cita)}
                onAskCancel={() => askCancel(cita)}
              />
            ))}
          </div>
        ) : (
          <EmptyState icons={{ Calendar }} />
        )}
      </div>

      {/* modals */}
      {showModal && (
        <AddEditModal
          editingCita={editingCita}
          citaForm={citaForm}
          setCitaForm={setCitaForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
          icons={{ Plus, Edit2, X, Calendar, Clock, User, Phone, Mail, Sparkles }}
        />
      )}

      {showCancelModal && citaToCancel && (
        <CancelModal
          cita={citaToCancel}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancel}
          icons={{ AlertCircle }}
        />
      )}

      {/* animations */}
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
