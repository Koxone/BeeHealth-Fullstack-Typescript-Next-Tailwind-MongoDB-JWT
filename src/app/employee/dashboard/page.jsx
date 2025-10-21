"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, Users, Package, AlertTriangle, TrendingUp,
  DollarSign, FileText, CheckCircle, XCircle, ChevronRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const citasHoyData = [
  { id: 1, hora: "09:00", paciente: "Juan Pérez", estado: "Confirmada", telefono: "555-0101" },
  { id: 2, hora: "10:30", paciente: "María López", estado: "Pendiente", telefono: "555-0102" },
  { id: 3, hora: "11:00", paciente: "Carlos Ruiz", estado: "Confirmada", telefono: "555-0103" },
  { id: 4, hora: "15:00", paciente: "Ana Martínez", estado: "Pendiente", telefono: "555-0104" },
  { id: 5, hora: "16:30", paciente: "Pedro García", estado: "Confirmada", telefono: "555-0105" },
];

const consultasSemanales = [
  { dia: "Lun", consultas: 5 },
  { dia: "Mar", consultas: 4 },
  { dia: "Mié", consultas: 6 },
  { dia: "Jue", consultas: 4 },
  { dia: "Vie", consultas: 7 },
  { dia: "Sáb", consultas: 3 },
  { dia: "Hoy", consultas: 5 },
];

export default function EmployeeDashboard() {
  const router = useRouter();
  const [citasHoy, setCitasHoy] = useState(citasHoyData);

  const alertasInventario = [
    { nombre: "Atorvastatina 20mg", stock: 12, minimo: 15 },
    { nombre: "Omeprazol 20mg", stock: 8, minimo: 25 },
    { nombre: "Alcohol 70%", stock: 8, minimo: 15 },
  ];

  const handleConfirmar = (id) => {
    setCitasHoy(citasHoy.map(c => c.id === id ? { ...c, estado: "Confirmada" } : c));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Panel de Recepción
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div 
          onClick={() => router.push("/employee/appointments")}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 md:p-6 text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition active:scale-95"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Hoy</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-1">{citasHoy.length}</p>
          <p className="text-xs md:text-sm text-blue-100">Citas programadas</p>
        </div>

        <div 
          onClick={() => router.push("/employee/appointments")}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 cursor-pointer hover:border-yellow-300 transition active:scale-95"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-500" />
            <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-medium">
              {citasHoy.filter(c => c.estado === "Pendiente").length}
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {citasHoy.filter(c => c.estado === "Pendiente").length}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Pendientes confirmar</p>
        </div>

        <div 
          onClick={() => router.push("/employee/consultations")}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 cursor-pointer hover:border-green-300 transition active:scale-95"
        >
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">5</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">$3,800</p>
          <p className="text-xs md:text-sm text-gray-600">Consultas hoy</p>
        </div>

        <div 
          onClick={() => router.push("/employee/inventory")}
          className={`rounded-xl shadow-sm border-2 p-4 md:p-6 cursor-pointer transition active:scale-95 ${
            alertasInventario.length > 0 
              ? "bg-red-50 border-red-200 hover:border-red-300" 
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className={`w-8 h-8 ${alertasInventario.length > 0 ? "text-red-500" : "text-gray-400"}`} />
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              alertasInventario.length > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"
            }`}>
              {alertasInventario.length > 0 ? "Revisar" : "OK"}
            </span>
          </div>
          <p className={`text-2xl md:text-3xl font-bold mb-1 ${alertasInventario.length > 0 ? "text-red-600" : "text-gray-900"}`}>
            {alertasInventario.length}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Alertas inventario</p>
        </div>
      </div>

      {/* Gráfica y alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Consultas de la Semana</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consultasSemanales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip />
              <Bar dataKey="consultas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Alertas de Inventario</h2>
            <button
              onClick={() => router.push("/employee/inventory")}
              className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm active:scale-95"
            >
              Ver más
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {alertasInventario.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                  <p className="text-xs text-red-600">Stock: {item.stock} / Mín: {item.minimo}</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citas de hoy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Citas de Hoy</h2>
          <button
            onClick={() => router.push("/employee/appointments")}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm active:scale-95"
          >
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {citasHoy.map((cita) => (
            <div key={cita.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{cita.paciente}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      cita.estado === "Confirmada" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {cita.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{cita.hora}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{cita.telefono}</span>
                    </div>
                  </div>
                </div>
                {cita.estado === "Pendiente" && (
                  <button
                    onClick={() => handleConfirmar(cita.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm active:scale-95"
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-sm p-4 md:p-6 text-white">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => router.push("/employee/appointments")}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <Calendar className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Agendar Cita</p>
          </button>
          <button
            onClick={() => router.push("/employee/consultations")}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <FileText className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Registrar Consulta</p>
          </button>
          <button
            onClick={() => router.push("/employee/inventory")}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <Package className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Ver Inventario</p>
          </button>
          <button
            onClick={() => router.push("/employee/patients")}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <Users className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Buscar Paciente</p>
          </button>
        </div>
      </div>
    </div>
  );
}