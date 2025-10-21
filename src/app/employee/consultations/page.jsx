"use client";

import { useState } from "react";
import { DollarSign, Users, Plus, Search, Edit2, Trash2, AlertCircle, X } from "lucide-react";

export default function EmployeeConsultations() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [consultas, setConsultas] = useState([
    { id: 1, fecha: "2024-10-21", hora: "09:00", paciente: "Juan Pérez", tipo: "Primera Consulta", costo: 1000, pagado: true },
    { id: 2, fecha: "2024-10-21", hora: "10:30", paciente: "María López", tipo: "Seguimiento", costo: 600, pagado: true },
    { id: 3, fecha: "2024-10-21", hora: "11:00", paciente: "Carlos Ruiz", tipo: "Control de Peso", costo: 800, pagado: false },
    { id: 4, fecha: "2024-10-21", hora: "15:00", paciente: "Ana Martínez", tipo: "Consulta General", costo: 800, pagado: true },
    { id: 5, fecha: "2024-10-21", hora: "16:30", paciente: "Pedro García", tipo: "Seguimiento", costo: 600, pagado: true },
  ]);

  const [consultaForm, setConsultaForm] = useState({
    fecha: "", hora: "", paciente: "", tipo: "", costo: "", pagado: true
  });

  const totalIngresos = consultas.reduce((sum, c) => sum + c.costo, 0);
  const totalPagado = consultas.filter(c => c.pagado).reduce((sum, c) => sum + c.costo, 0);
  const totalPendiente = consultas.filter(c => !c.pagado).reduce((sum, c) => sum + c.costo, 0);

  const handleSave = (e) => {
    e.preventDefault();
    const newConsulta = {
      id: editingItem ? editingItem.id : Date.now(),
      ...consultaForm,
      costo: parseFloat(consultaForm.costo)
    };

    if (editingItem) {
      setConsultas(consultas.map(c => c.id === editingItem.id ? newConsulta : c));
    } else {
      setConsultas([...consultas, newConsulta]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setConsultas(consultas.filter(c => c.id !== itemToDelete.id));
    setShowDeleteModal(false);
  };

  const filteredConsultas = consultas.filter(c =>
    c.paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Control de Consultas</h1>
        <p className="text-sm md:text-base text-gray-600">Registro y cobro de consultas</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-1">${totalIngresos.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-blue-100">Ingresos totales</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">{consultas.filter(c => c.pagado).length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${totalPagado.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Cobrado</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
            <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-medium">{consultas.filter(c => !c.pagado).length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${totalPendiente.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Pendiente</p>
        </div>
      </div>

      {/* Búsqueda y agregar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setConsultaForm({ fecha: "", hora: "", paciente: "", tipo: "", costo: "", pagado: true });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Registrar</span>
        </button>
      </div>

      {/* Tabla de consultas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Fecha</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Tipo</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Costo</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultas.map((consulta) => (
                <tr key={consulta.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-900">{consulta.fecha}</td>
                  <td className="py-3 px-2 text-sm text-gray-900">{consulta.paciente}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">{consulta.tipo}</td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right">${consulta.costo}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      consulta.pagado ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {consulta.pagado ? "Pagado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="py-3 px-2">
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
                            pagado: consulta.pagado
                          });
                          setShowModal(true);
                        }}
                        className="p-1.5 hover:bg-blue-50 rounded transition active:scale-95"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(consulta);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 hover:bg-red-50 rounded transition active:scale-95"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="py-3 px-2 text-sm text-gray-900">Total</td>
                <td className="py-3 px-2 text-sm text-gray-900 text-right">${totalIngresos.toLocaleString()}</td>
                <td className="py-3 px-2 text-center text-xs text-gray-600">{consultas.filter(c => c.pagado).length}/{consultas.length}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Modal Agregar/Editar */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{editingItem ? "Editar" : "Registrar"} Consulta</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <input type="date" required value={consultaForm.fecha} onChange={(e) => setConsultaForm({ ...consultaForm, fecha: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <input type="time" required value={consultaForm.hora} onChange={(e) => setConsultaForm({ ...consultaForm, hora: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                  <input type="text" required value={consultaForm.paciente} onChange={(e) => setConsultaForm({ ...consultaForm, paciente: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nombre del paciente" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Consulta</label>
                  <select required value={consultaForm.tipo} onChange={(e) => setConsultaForm({ ...consultaForm, tipo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Seleccionar</option>
                    <option value="Primera Consulta">Primera Consulta</option>
                    <option value="Consulta General">Consulta General</option>
                    <option value="Seguimiento">Seguimiento</option>
                    <option value="Control de Peso">Control de Peso</option>
                    <option value="Urgencia">Urgencia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Costo</label>
                  <input type="number" required min="0" step="0.01" value={consultaForm.costo} onChange={(e) => setConsultaForm({ ...consultaForm, costo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="800" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pagado" checked={consultaForm.pagado} onChange={(e) => setConsultaForm({ ...consultaForm, pagado: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" />
                  <label htmlFor="pagado" className="text-sm text-gray-700">Consulta pagada</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95">Cancelar</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95">{editingItem ? "Actualizar" : "Guardar"}</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && itemToDelete && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" onClick={() => setShowDeleteModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Eliminar Consulta</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar esta consulta?</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-900 font-medium">{itemToDelete.paciente} - {itemToDelete.fecha}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95">Cancelar</button>
                  <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}