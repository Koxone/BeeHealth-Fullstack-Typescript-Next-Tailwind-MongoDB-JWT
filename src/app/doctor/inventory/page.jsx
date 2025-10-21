"use client";

import { useState } from "react";
import { Package, Pill, FileText, Syringe, Plus, Search, AlertTriangle, Edit2, Trash2, Download } from "lucide-react";

// Datos de ejemplo
const medicamentos = [
  { id: 1, nombre: "Metformina 850mg", categoria: "Antidiabético", stock: 45, minimo: 20, precio: 150, caducidad: "2025-06-15", ubicacion: "A-1" },
  { id: 2, nombre: "Atorvastatina 20mg", categoria: "Estatina", stock: 12, minimo: 15, precio: 200, caducidad: "2024-12-20", ubicacion: "A-2" },
  { id: 3, nombre: "Losartán 50mg", categoria: "Antihipertensivo", stock: 67, minimo: 30, precio: 120, caducidad: "2025-08-10", ubicacion: "A-3" },
  { id: 4, nombre: "Omeprazol 20mg", categoria: "Antiácido", stock: 8, minimo: 25, precio: 80, caducidad: "2024-11-05", ubicacion: "B-1" },
  { id: 5, nombre: "Paracetamol 500mg", categoria: "Analgésico", stock: 120, minimo: 50, precio: 50, caducidad: "2026-03-22", ubicacion: "B-2" },
];

const recetas = [
  { id: 1, tipo: "Receta Controlada", stock: 45, minimo: 20 },
  { id: 2, tipo: "Receta Simple", stock: 180, minimo: 50 },
  { id: 3, tipo: "Receta Especial", stock: 12, minimo: 15 },
];

const suministros = [
  { id: 1, nombre: "Jeringas 5ml", stock: 200, minimo: 100, precio: 5 },
  { id: 2, nombre: "Guantes de látex (caja)", stock: 15, minimo: 10, precio: 180 },
  { id: 3, nombre: "Gasas estériles (paquete)", stock: 45, minimo: 20, precio: 85 },
  { id: 4, nombre: "Alcohol 70% (litro)", stock: 8, minimo: 15, precio: 120 },
  { id: 5, nombre: "Termómetros digitales", stock: 25, minimo: 10, precio: 250 },
];

export default function DoctorInventory() {
  const [activeTab, setActiveTab] = useState("medicamentos"); // medicamentos, recetas, suministros
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Calcular alertas
  const medicamentosAlerta = medicamentos.filter(m => m.stock < m.minimo);
  const recetasAlerta = recetas.filter(r => r.stock < r.minimo);
  const suministrosAlerta = suministros.filter(s => s.stock < s.minimo);
  const totalAlertas = medicamentosAlerta.length + recetasAlerta.length + suministrosAlerta.length;

  // Calcular valor total del inventario
  const valorTotalMedicamentos = medicamentos.reduce((sum, m) => sum + (m.stock * m.precio), 0);
  const valorTotalSuministros = suministros.reduce((sum, s) => sum + (s.stock * s.precio), 0);
  const valorTotal = valorTotalMedicamentos + valorTotalSuministros;

  const getStockStatus = (stock, minimo) => {
    if (stock < minimo) return { color: "text-red-600", bg: "bg-red-50", label: "Bajo" };
    if (stock < minimo * 1.5) return { color: "text-yellow-600", bg: "bg-yellow-50", label: "Medio" };
    return { color: "text-green-600", bg: "bg-green-50", label: "Bueno" };
  };

  const getCaducidadStatus = (caducidad) => {
    const hoy = new Date();
    const fechaCaducidad = new Date(caducidad);
    const diasRestantes = Math.floor((fechaCaducidad - hoy) / (1000 * 60 * 60 * 24));
    
    if (diasRestantes < 30) return { color: "text-red-600", bg: "bg-red-50" };
    if (diasRestantes < 90) return { color: "text-yellow-600", bg: "bg-yellow-50" };
    return { color: "text-gray-600", bg: "bg-gray-50" };
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Inventario</h1>
          <p className="text-sm md:text-base text-gray-600">Gestión de medicamentos, recetas y suministros</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95">
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Pill className="w-8 h-8 text-blue-500" />
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{medicamentos.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${valorTotalMedicamentos.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Medicamentos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">{recetas.reduce((sum, r) => sum + r.stock, 0)}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{recetas.length}</p>
          <p className="text-xs md:text-sm text-gray-600">Tipos de Recetas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Syringe className="w-8 h-8 text-purple-500" />
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium">{suministros.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${valorTotalSuministros.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Suministros</p>
        </div>

        <div className={`rounded-xl shadow-sm border-2 p-4 md:p-6 ${
          totalAlertas > 0 ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className={`w-8 h-8 ${totalAlertas > 0 ? "text-red-500" : "text-gray-400"}`} />
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              totalAlertas > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"
            }`}>
              {totalAlertas > 0 ? "Acción requerida" : "Todo bien"}
            </span>
          </div>
          <p className={`text-2xl md:text-3xl font-bold mb-1 ${totalAlertas > 0 ? "text-red-600" : "text-gray-900"}`}>
            {totalAlertas}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Alertas de stock</p>
        </div>
      </div>

      {/* Alertas */}
      {totalAlertas > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">Stock Bajo Detectado</h3>
              <p className="text-sm text-red-700">
                {medicamentosAlerta.length > 0 && `${medicamentosAlerta.length} medicamento(s), `}
                {recetasAlerta.length > 0 && `${recetasAlerta.length} tipo(s) de receta(s), `}
                {suministrosAlerta.length > 0 && `${suministrosAlerta.length} suministro(s)`}
                {" "}necesitan reabastecimiento.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Barra de búsqueda */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en inventario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Agregar</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-3 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("medicamentos")}
            className={`flex items-center justify-center gap-2 py-3 px-2 font-medium transition ${
              activeTab === "medicamentos"
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Pill className="w-5 h-5" />
            <span className="text-sm md:text-base">Medicamentos</span>
          </button>
          <button
            onClick={() => setActiveTab("recetas")}
            className={`flex items-center justify-center gap-2 py-3 px-2 font-medium transition ${
              activeTab === "recetas"
                ? "bg-green-500 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm md:text-base">Recetas</span>
          </button>
          <button
            onClick={() => setActiveTab("suministros")}
            className={`flex items-center justify-center gap-2 py-3 px-2 font-medium transition ${
              activeTab === "suministros"
                ? "bg-purple-500 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Syringe className="w-5 h-5" />
            <span className="text-sm md:text-base">Suministros</span>
          </button>
        </div>

        {/* Contenido de Medicamentos */}
        {activeTab === "medicamentos" && (
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Medicamento</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Categoría</th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Stock</th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 hidden lg:table-cell">Precio</th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Caducidad</th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.map((med) => {
                    const stockStatus = getStockStatus(med.stock, med.minimo);
                    const caducidadStatus = getCaducidadStatus(med.caducidad);
                    
                    return (
                      <tr key={med.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{med.nombre}</p>
                            <p className="text-xs text-gray-500">{med.ubicacion}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">{med.categoria}</td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                            {med.stock} / {med.minimo}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-900 text-right hidden lg:table-cell">${med.precio}</td>
                        <td className="py-3 px-2 text-center hidden md:table-cell">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${caducidadStatus.bg} ${caducidadStatus.color}`}>
                            {med.caducidad}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 hover:bg-blue-50 rounded transition active:scale-95">
                              <Edit2 className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-1.5 hover:bg-red-50 rounded transition active:scale-95">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contenido de Recetas */}
        {activeTab === "recetas" && (
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recetas.map((receta) => {
                const stockStatus = getStockStatus(receta.stock, receta.minimo);
                
                return (
                  <div key={receta.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-blue-50 rounded transition active:scale-95">
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded transition active:scale-95">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{receta.tipo}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                        {receta.stock} / {receta.minimo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Contenido de Suministros */}
        {activeTab === "suministros" && (
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Suministro</th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Stock</th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Precio</th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 hidden lg:table-cell">Valor Total</th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {suministros.map((sum) => {
                    const stockStatus = getStockStatus(sum.stock, sum.minimo);
                    
                    return (
                      <tr key={sum.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm font-medium text-gray-900">{sum.nombre}</td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                            {sum.stock} / {sum.minimo}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-900 text-right hidden md:table-cell">${sum.precio}</td>
                        <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right hidden lg:table-cell">
                          ${(sum.stock * sum.precio).toLocaleString()}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 hover:bg-blue-50 rounded transition active:scale-95">
                              <Edit2 className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-1.5 hover:bg-red-50 rounded transition active:scale-95">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

