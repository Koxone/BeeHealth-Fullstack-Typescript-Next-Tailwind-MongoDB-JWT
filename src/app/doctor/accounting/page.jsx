"use client";

import { useState } from "react";
import { DollarSign, Users, Pill, TrendingUp, Calendar, Plus, Search, Filter, Download } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos de ejemplo
const consultasHoy = [
  { id: 1, hora: "09:00", paciente: "Juan Pérez", tipo: "Consulta General", costo: 800, pagado: true },
  { id: 2, hora: "10:00", paciente: "María López", tipo: "Seguimiento", costo: 600, pagado: true },
  { id: 3, hora: "11:00", paciente: "Carlos Ruiz", tipo: "Primera Consulta", costo: 1000, pagado: true },
  { id: 4, hora: "15:00", paciente: "Ana Martínez", tipo: "Consulta General", costo: 800, pagado: false },
  { id: 5, hora: "16:00", paciente: "Pedro García", tipo: "Seguimiento", costo: 600, pagado: true },
];

const medicamentosVendidos = [
  { id: 1, nombre: "Metformina 850mg", cantidad: 2, precioUnitario: 150, total: 300, paciente: "Juan Pérez" },
  { id: 2, nombre: "Atorvastatina 20mg", cantidad: 1, precioUnitario: 200, total: 200, paciente: "María López" },
  { id: 3, nombre: "Losartán 50mg", cantidad: 3, precioUnitario: 120, total: 360, paciente: "Carlos Ruiz" },
  { id: 4, nombre: "Omeprazol 20mg", cantidad: 1, precioUnitario: 80, total: 80, paciente: "Pedro García" },
];

const ingresosSemanales = [
  { dia: "Lun", consultas: 3200, medicamentos: 450 },
  { dia: "Mar", consultas: 2800, medicamentos: 380 },
  { dia: "Mié", consultas: 3600, medicamentos: 520 },
  { dia: "Jue", consultas: 3000, medicamentos: 410 },
  { dia: "Vie", consultas: 3800, medicamentos: 940 },
  { dia: "Sáb", consultas: 2400, medicamentos: 320 },
  { dia: "Dom", consultas: 0, medicamentos: 0 },
];

const distribucionIngresos = [
  { name: "Consultas", value: 18800, color: "#3b82f6" },
  { name: "Medicamentos", value: 3020, color: "#10b981" },
  { name: "Otros", value: 500, color: "#8b5cf6" },
];

export default function DoctorAccounting() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState("consulta"); // "consulta" o "medicamento"

  // Calcular totales
  const totalConsultas = consultasHoy.reduce((sum, c) => sum + c.costo, 0);
  const totalMedicamentos = medicamentosVendidos.reduce((sum, m) => sum + m.total, 0);
  const totalDia = totalConsultas + totalMedicamentos;
  const consultasPagadas = consultasHoy.filter(c => c.pagado).length;
  const consultasPendientes = consultasHoy.filter(c => !c.pagado).length;

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Contabilidad</h1>
          <p className="text-sm md:text-base text-gray-600">Control financiero del consultorio</p>
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition active:scale-95">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Hoy</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-1">${totalDia.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-blue-100">Total del día</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">{consultasHoy.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${totalConsultas.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Consultas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Pill className="w-8 h-8 text-purple-500" />
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium">{medicamentosVendidos.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${totalMedicamentos.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Medicamentos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded font-medium">+12%</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${(totalDia / consultasHoy.length).toFixed(0)}</p>
          <p className="text-xs md:text-sm text-gray-600">Promedio/paciente</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Ingresos semanales */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Ingresos de la Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ingresosSemanales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="consultas" fill="#3b82f6" name="Consultas" />
              <Bar dataKey="medicamentos" fill="#10b981" name="Medicamentos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución de ingresos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Distribución</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribucionIngresos}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {distribucionIngresos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {distribucionIngresos.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultas del día */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Consultas del Día</h2>
          <button
            onClick={() => openAddModal("consulta")}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Hora</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Tipo</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Costo</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              {consultasHoy.map((consulta) => (
                <tr key={consulta.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-900">{consulta.hora}</td>
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
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="py-3 px-2 text-sm text-gray-900">Total Consultas</td>
                <td className="py-3 px-2 text-sm text-gray-900 text-right">${totalConsultas.toLocaleString()}</td>
                <td className="py-3 px-2 text-center text-xs text-gray-600">{consultasPagadas}/{consultasHoy.length}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Medicamentos vendidos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Medicamentos Vendidos</h2>
          <button
            onClick={() => openAddModal("medicamento")}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Medicamento</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Cant.</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">P. Unit.</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Paciente</th>
              </tr>
            </thead>
            <tbody>
              {medicamentosVendidos.map((med) => (
                <tr key={med.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-900">{med.nombre}</td>
                  <td className="py-3 px-2 text-sm text-gray-900 text-center">{med.cantidad}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 text-right">${med.precioUnitario}</td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right">${med.total}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">{med.paciente}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="py-3 px-2 text-sm text-gray-900">Total Medicamentos</td>
                <td className="py-3 px-2 text-sm text-gray-900 text-right">${totalMedicamentos.toLocaleString()}</td>
                <td className="hidden md:table-cell"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

