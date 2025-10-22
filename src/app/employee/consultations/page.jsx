'use client';

import { useState } from 'react';
import { DollarSign, Users, Plus, Search, Edit2, Trash2, AlertCircle, X } from 'lucide-react';

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
    },
    {
      id: 2,
      fecha: '2024-10-21',
      hora: '10:30',
      paciente: 'María López',
      tipo: 'Seguimiento',
      costo: 600,
      pagado: true,
    },
    {
      id: 3,
      fecha: '2024-10-21',
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Control de Peso',
      costo: 800,
      pagado: false,
    },
    {
      id: 4,
      fecha: '2024-10-21',
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Consulta General',
      costo: 800,
      pagado: true,
    },
    {
      id: 5,
      fecha: '2024-10-21',
      hora: '16:30',
      paciente: 'Pedro García',
      tipo: 'Seguimiento',
      costo: 600,
      pagado: true,
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
    };

    if (editingItem) {
      setConsultas(consultas.map((c) => (c.id === editingItem.id ? newConsulta : c)));
    } else {
      setConsultas([...consultas, newConsulta]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setConsultas(consultas.filter((c) => c.id !== itemToDelete.id));
    setShowDeleteModal(false);
  };

  const filteredConsultas = consultas.filter((c) =>
    c.paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Control de Consultas</h1>
        <p className="text-sm text-gray-600 md:text-base">Registro y cobro de consultas</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <DollarSign className="h-8 w-8 opacity-80" />
            <span className="rounded bg-white/20 px-2 py-1 text-xs">Total</span>
          </div>
          <p className="mb-1 text-2xl font-bold md:text-3xl">${totalIngresos.toLocaleString()}</p>
          <p className="text-xs text-blue-100 md:text-sm">Ingresos totales</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <Users className="h-8 w-8 text-green-500" />
            <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              {consultas.filter((c) => c.pagado).length}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            ${totalPagado.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Cobrado</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
            <span className="rounded bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
              {consultas.filter((c) => !c.pagado).length}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            ${totalPendiente.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Pendiente</p>
        </div>
      </div>

      {/* Búsqueda y agregar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
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
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Registrar</span>
        </button>
      </div>

      {/* Tabla de consultas */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">
                  Paciente
                </th>
                <th className="hidden px-2 py-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  Tipo
                </th>
                <th className="px-2 py-3 text-right text-sm font-semibold text-gray-700">Costo</th>
                <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                  Estado
                </th>
                <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultas.map((consulta) => (
                <tr key={consulta.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-2 py-3 text-sm text-gray-900">{consulta.fecha}</td>
                  <td className="px-2 py-3 text-sm text-gray-900">{consulta.paciente}</td>
                  <td className="hidden px-2 py-3 text-sm text-gray-600 md:table-cell">
                    {consulta.tipo}
                  </td>
                  <td className="px-2 py-3 text-right text-sm font-semibold text-gray-900">
                    ${consulta.costo}
                  </td>
                  <td className="px-2 py-3 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        consulta.pagado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {consulta.pagado ? 'Pagado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center gap-1">
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
                        className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                      >
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(consulta);
                          setShowDeleteModal(true);
                        }}
                        className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="px-2 py-3 text-sm text-gray-900">
                  Total
                </td>
                <td className="px-2 py-3 text-right text-sm text-gray-900">
                  ${totalIngresos.toLocaleString()}
                </td>
                <td className="px-2 py-3 text-center text-xs text-gray-600">
                  {consultas.filter((c) => c.pagado).length}/{consultas.length}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Modal Agregar/Editar */}
      {showModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Editar' : 'Registrar'} Consulta
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                      type="date"
                      required
                      value={consultaForm.fecha}
                      onChange={(e) => setConsultaForm({ ...consultaForm, fecha: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Hora</label>
                    <input
                      type="time"
                      required
                      value={consultaForm.hora}
                      onChange={(e) => setConsultaForm({ ...consultaForm, hora: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Paciente</label>
                  <input
                    type="text"
                    required
                    value={consultaForm.paciente}
                    onChange={(e) => setConsultaForm({ ...consultaForm, paciente: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del paciente"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tipo de Consulta
                  </label>
                  <select
                    required
                    value={consultaForm.tipo}
                    onChange={(e) => setConsultaForm({ ...consultaForm, tipo: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Primera Consulta">Primera Consulta</option>
                    <option value="Consulta General">Consulta General</option>
                    <option value="Seguimiento">Seguimiento</option>
                    <option value="Control de Peso">Control de Peso</option>
                    <option value="Urgencia">Urgencia</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Costo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={consultaForm.costo}
                    onChange={(e) => setConsultaForm({ ...consultaForm, costo: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="800"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pagado"
                    checked={consultaForm.pagado}
                    onChange={(e) => setConsultaForm({ ...consultaForm, pagado: e.target.checked })}
                    className="h-4 w-4 rounded text-blue-600"
                  />
                  <label htmlFor="pagado" className="text-sm text-gray-700">
                    Consulta pagada
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
                  >
                    {editingItem ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && itemToDelete && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Eliminar Consulta</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  ¿Estás seguro de que deseas eliminar esta consulta?
                </p>
                <div className="mb-6 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-900">
                    {itemToDelete.paciente} - {itemToDelete.fecha}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 active:scale-95"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
