'use client';

import { useState } from 'react';
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
  Sparkles,
  Award,
} from 'lucide-react';

export default function EmployeeConsultations() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const [consultaForm, setConsultaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    tipo: '',
    costo: '',
    pagado: true,
  });

  const totalIngresos = consultas.reduce((sum, c) => sum + c.costo, 0);
  const totalPagado = consultas.filter((c) => c.pagado).reduce((sum, c) => sum + c.costo, 0);
  const totalPendiente = consultas.filter((c) => !c.pagado).reduce((sum, c) => sum + c.costo, 0);

  const handleSave = (e) => {
    e.preventDefault();
    const newConsulta = {
      id: editingItem ? editingItem.id : Date.now(),
      ...consultaForm,
      costo: parseFloat(consultaForm.costo),
      avatar: consultaForm.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };

    if (editingItem) {
      setConsultas(consultas.map((c) => (c.id === editingItem.id ? newConsulta : c)));
    } else {
      setConsultas([...consultas, newConsulta]);
    }
    setShowModal(false);
    setEditingItem(null);
    setConsultaForm({ fecha: '', hora: '', paciente: '', tipo: '', costo: '', pagado: true });
  };

  const handleDelete = () => {
    setConsultas(consultas.filter((c) => c.id !== itemToDelete.id));
    setShowDeleteModal(false);
  };

  const filteredConsultas = consultas.filter((c) =>
    c.paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const porcentajeCobrado =
    totalIngresos > 0 ? ((totalPagado / totalIngresos) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 pt-6 pb-8 md:rounded-2xl">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 p-3 shadow-lg">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Control de Consultas
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Registro y gestión de cobros de consultas
              </p>
            </div>
          </div>

          {/* Métricas mejoradas */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-700 p-5 text-white shadow-lg md:col-span-1">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-3 flex items-center justify-between">
                  <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                    Total
                  </span>
                </div>
                <p className="mb-1 text-3xl font-bold">${totalIngresos.toLocaleString()}</p>
                <p className="text-sm text-indigo-100">Ingresos totales</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-xl bg-emerald-100 p-2">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  {consultas.filter((c) => c.pagado).length}
                </span>
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">
                ${totalPagado.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">Cobrado</p>
              <div className="mt-2 flex items-center gap-1">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-600 transition-all duration-500"
                    style={{ width: `${porcentajeCobrado}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-emerald-600">{porcentajeCobrado}%</span>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-xl bg-amber-100 p-2">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                  {consultas.filter((c) => !c.pagado).length}
                </span>
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">
                ${totalPendiente.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">Pendiente</p>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-xl bg-blue-100 p-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {consultas.length}
                </span>
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">
                ${consultas.length > 0 ? Math.round(totalIngresos / consultas.length) : 0}
              </p>
              <p className="text-sm font-medium text-gray-600">Promedio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Búsqueda y agregar mejorados */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              />
            </div>
            <button
              onClick={() => {
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
              }}
              className="group flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
              <span>Registrar Consulta</span>
            </button>
          </div>
        </div>

        {/* Lista de consultas mejorada */}
        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
          {/* Header de la lista */}
          <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Registro de Consultas</h2>
                <p className="text-sm text-indigo-100">
                  {filteredConsultas.length} consulta{filteredConsultas.length !== 1 ? 's' : ''}{' '}
                  registrada{filteredConsultas.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-bold text-gray-900">Fecha</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-bold text-gray-900">Paciente</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-bold text-gray-900">Tipo</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-bold text-gray-900">Costo</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-gray-900">Estado</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-gray-900">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredConsultas.map((consulta, index) => (
                  <tr
                    key={consulta.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="group animate-fadeInUp transition-all duration-200 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 transition-all duration-200 group-hover:bg-blue-500">
                          <Calendar className="h-4 w-4 text-blue-600 transition-colors duration-200 group-hover:text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{consulta.fecha}</p>
                          <p className="text-xs text-gray-500">{consulta.hora}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md">
                          {consulta.avatar}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {consulta.paciente}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{consulta.tipo}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-indigo-600">${consulta.costo}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${
                          consulta.pagado
                            ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                            : 'border-amber-200 bg-amber-100 text-amber-700'
                        }`}
                      >
                        {consulta.pagado ? (
                          <CheckCircle className="h-3.5 w-3.5" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}
                        {consulta.pagado ? 'Pagado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(consulta);
                            setConsultaForm({
                              fecha: consulta.fecha,
                              hora: consulta.hora,
                              paciente: consulta.paciente,
                              tipo: consulta.tipo,
                              costo: consulta.costo.toString(),
                              pagado: consulta.pagado,
                            });
                            setShowModal(true);
                          }}
                          className="group/btn rounded-xl border-2 border-transparent p-2 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 active:scale-95"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600 transition-transform duration-200 group-hover/btn:rotate-12" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(consulta);
                            setShowDeleteModal(true);
                          }}
                          className="group/btn rounded-xl border-2 border-transparent p-2 transition-all duration-200 hover:border-red-200 hover:bg-red-50 active:scale-95"
                        >
                          <Trash2 className="h-4 w-4 text-red-600 transition-transform duration-200 group-hover/btn:scale-110" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-gray-200 bg-linear-to-r from-gray-50 to-indigo-50">
                <tr className="font-bold">
                  <td colSpan="3" className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-indigo-600" />
                      <span>Total General</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-lg text-indigo-600">
                    ${totalIngresos.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-semibold text-gray-600">
                      {consultas.filter((c) => c.pagado).length}/{consultas.length} cobradas
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 p-4 md:hidden">
            {filteredConsultas.map((consulta, index) => (
              <div
                key={consulta.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fadeInUp rounded-xl border-2 border-gray-200 bg-linear-to-br from-indigo-50 to-purple-50 p-4 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-md">
                      {consulta.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{consulta.paciente}</p>
                      <p className="text-xs text-gray-600">{consulta.tipo}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
                      consulta.pagado
                        ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                        : 'border-amber-200 bg-amber-100 text-amber-700'
                    }`}
                  >
                    {consulta.pagado ? 'Pagado' : 'Pendiente'}
                  </span>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white p-3">
                    <p className="mb-1 text-xs text-gray-600">Fecha</p>
                    <p className="text-sm font-bold text-gray-900">{consulta.fecha}</p>
                    <p className="text-xs text-gray-500">{consulta.hora}</p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="mb-1 text-xs text-gray-600">Costo</p>
                    <p className="text-xl font-bold text-indigo-600">${consulta.costo}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(consulta);
                      setConsultaForm({
                        fecha: consulta.fecha,
                        hora: consulta.hora,
                        paciente: consulta.paciente,
                        tipo: consulta.tipo,
                        costo: consulta.costo.toString(),
                        pagado: consulta.pagado,
                      });
                      setShowModal(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100 active:scale-95"
                  >
                    <Edit2 className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setItemToDelete(consulta);
                      setShowDeleteModal(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredConsultas.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                <FileText className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">No se encontraron consultas</h3>
              <p className="text-gray-600">
                Intenta con otra búsqueda o registra una nueva consulta
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Agregar/Editar mejorado */}
      {showModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-gray-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 overflow-hidden rounded-t-3xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-5">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                      {editingItem ? (
                        <Edit2 className="h-6 w-6 text-white" />
                      ) : (
                        <Plus className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {editingItem ? 'Editar' : 'Registrar'} Consulta
                      </h2>
                      <p className="text-sm text-indigo-100">
                        {editingItem ? 'Actualiza los detalles' : 'Nueva consulta médica'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-xl p-2 transition-all duration-200 hover:bg-white/20"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-5 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                      Fecha
                    </label>
                    <input
                      type="date"
                      required
                      value={consultaForm.fecha}
                      onChange={(e) => setConsultaForm({ ...consultaForm, fecha: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      Hora
                    </label>
                    <input
                      type="time"
                      required
                      value={consultaForm.hora}
                      onChange={(e) => setConsultaForm({ ...consultaForm, hora: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Users className="h-4 w-4 text-indigo-600" />
                    Paciente
                  </label>
                  <input
                    type="text"
                    required
                    value={consultaForm.paciente}
                    onChange={(e) => setConsultaForm({ ...consultaForm, paciente: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    placeholder="Nombre del paciente"
                  />
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    Tipo de Consulta
                  </label>
                  <select
                    required
                    value={consultaForm.tipo}
                    onChange={(e) => setConsultaForm({ ...consultaForm, tipo: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Primera Consulta">Primera Consulta</option>
                    <option value="Consulta General">Consulta General</option>
                    <option value="Seguimiento">Seguimiento</option>
                    <option value="Control de Peso">Control de Peso</option>
                    <option value="Urgencia">Urgencia</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <DollarSign className="h-4 w-4 text-indigo-600" />
                    Costo
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={consultaForm.costo}
                      onChange={(e) => setConsultaForm({ ...consultaForm, costo: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-8 text-lg font-bold transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                      placeholder="800"
                    />
                  </div>
                </div>

                <div className="rounded-xl border-2 border-indigo-200 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      id="pagado"
                      checked={consultaForm.pagado}
                      onChange={(e) =>
                        setConsultaForm({ ...consultaForm, pagado: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500/20"
                    />
                    <div className="flex flex-1 items-center gap-2">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                      <span className="text-sm font-bold text-gray-900">Consulta pagada</span>
                    </div>
                  </label>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 active:scale-95"
                  >
                    {editingItem ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Eliminar mejorado */}
      {showDeleteModal && itemToDelete && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative overflow-hidden rounded-t-3xl bg-linear-to-r from-red-600 to-rose-600 px-6 py-5">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Eliminar Consulta</h2>
                    <p className="text-sm text-rose-100">Esta acción no se puede deshacer</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 p-6">
                <p className="text-base text-gray-700">
                  ¿Estás seguro de que deseas eliminar esta consulta del registro?
                </p>

                <div className="rounded-xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-red-50 p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-red-500 to-rose-600 font-bold text-white shadow-lg">
                      {itemToDelete.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 font-bold text-gray-900">{itemToDelete.paciente}</p>
                      <p className="text-sm text-gray-600">
                        {itemToDelete.fecha} • {itemToDelete.tipo}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="mb-1 text-xs text-gray-500">Costo de la consulta</p>
                    <p className="text-2xl font-bold text-red-600">${itemToDelete.costo}</p>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 rounded-xl bg-linear-to-r from-red-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-200 hover:from-red-700 hover:to-rose-700 active:scale-95"
                  >
                    Sí, Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
