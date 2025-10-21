"use client";

import { useState } from "react";
import { Calendar, Clock, User, Plus, Search, Edit2, X, Phone, Mail, AlertCircle } from "lucide-react";

export default function EmployeeAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [citaToCancel, setCitaToCancel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todas");

  const [citas, setCitas] = useState([
    { id: 1, fecha: "2024-10-21", hora: "09:00", paciente: "Juan Pérez", telefono: "555-0101", email: "juan@email.com", motivo: "Primera Consulta", estado: "Confirmada" },
    { id: 2, fecha: "2024-10-21", hora: "10:30", paciente: "María López", telefono: "555-0102", email: "maria@email.com", motivo: "Seguimiento", estado: "Pendiente" },
    { id: 3, fecha: "2024-10-21", hora: "11:00", paciente: "Carlos Ruiz", telefono: "555-0103", email: "carlos@email.com", motivo: "Control de Peso", estado: "Confirmada" },
    { id: 4, fecha: "2024-10-22", hora: "15:00", paciente: "Ana Martínez", telefono: "555-0104", email: "ana@email.com", motivo: "Consulta General", estado: "Pendiente" },
    { id: 5, fecha: "2024-10-22", hora: "16:30", paciente: "Pedro García", telefono: "555-0105", email: "pedro@email.com", motivo: "Seguimiento", estado: "Confirmada" },
  ]);

  const [citaForm, setCitaForm] = useState({
    fecha: "", hora: "", paciente: "", telefono: "", email: "", motivo: ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    const newCita = {
      id: editingCita ? editingCita.id : Date.now(),
      ...citaForm,
      estado: "Pendiente"
    };

    if (editingCita) {
      setCitas(citas.map(c => c.id === editingCita.id ? newCita : c));
    } else {
      setCitas([...citas, newCita]);
    }
    setShowModal(false);
    setCitaForm({ fecha: "", hora: "", paciente: "", telefono: "", email: "", motivo: "" });
  };

  const handleCancel = () => {
    setCitas(citas.map(c => c.id === citaToCancel.id ? { ...c, estado: "Cancelada" } : c));
    setShowCancelModal(false);
  };

  const filteredCitas = citas.filter(c => {
    const matchSearch = c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.telefono.includes(searchTerm);
    const matchFilter = filterEstado === "Todas" || c.estado === filterEstado;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Gestión de Citas</h1>
        <p className="text-sm md:text-base text-gray-600">Agendar y administrar citas de pacientes</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>Todas</option>
            <option>Confirmada</option>
            <option>Pendiente</option>
            <option>Cancelada</option>
          </select>
          <button
            onClick={() => {
              setEditingCita(null);
              setCitaForm({ fecha: "", hora: "", paciente: "", telefono: "", email: "", motivo: "" });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Agendar</span>
          </button>
        </div>
      </div>

      {/* Lista de citas */}
      <div className="grid grid-cols-1 gap-3">
        {filteredCitas.map((cita) => (
          <div key={cita.id} className={`bg-white border-2 rounded-xl p-4 transition ${
            cita.estado === "Cancelada" ? "border-gray-200 opacity-60" : "border-gray-200 hover:border-blue-300"
          }`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{cita.paciente}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    cita.estado === "Confirmada" ? "bg-green-100 text-green-800" :
                    cita.estado === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {cita.estado}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{cita.fecha}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{cita.hora}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{cita.telefono}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{cita.email}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{cita.motivo}</p>
              </div>

              {cita.estado !== "Cancelada" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCita(cita);
                      setCitaForm({
                        fecha: cita.fecha,
                        hora: cita.hora,
                        paciente: cita.paciente,
                        telefono: cita.telefono,
                        email: cita.email,
                        motivo: cita.motivo
                      });
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition active:scale-95"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setCitaToCancel(cita);
                      setShowCancelModal(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Agregar/Editar */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{editingCita ? "Editar" : "Agendar"} Cita</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <input type="date" required value={citaForm.fecha} onChange={(e) => setCitaForm({ ...citaForm, fecha: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <input type="time" required value={citaForm.hora} onChange={(e) => setCitaForm({ ...citaForm, hora: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                  <input type="text" required value={citaForm.paciente} onChange={(e) => setCitaForm({ ...citaForm, paciente: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nombre completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input type="tel" required value={citaForm.telefono} onChange={(e) => setCitaForm({ ...citaForm, telefono: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="555-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" required value={citaForm.email} onChange={(e) => setCitaForm({ ...citaForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="email@ejemplo.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Motivo</label>
                  <textarea required value={citaForm.motivo} onChange={(e) => setCitaForm({ ...citaForm, motivo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Motivo de la consulta"></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95">Cancelar</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95">{editingCita ? "Actualizar" : "Agendar"}</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Cancelar */}
      {showCancelModal && citaToCancel && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" onClick={() => setShowCancelModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">¿Estás seguro de que deseas cancelar esta cita?</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <p className="text-sm font-medium text-gray-900">{citaToCancel.paciente}</p>
                  <p className="text-sm text-gray-700">{citaToCancel.fecha} - {citaToCancel.hora}</p>
                  <p className="text-sm text-gray-600">{citaToCancel.motivo}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowCancelModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95">Mantener</button>
                  <button onClick={handleCancel} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95">Cancelar Cita</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}