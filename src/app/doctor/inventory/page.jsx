'use client';

import { useState } from 'react';
import {
  Package,
  Pill,
  FileText,
  Syringe,
  Plus,
  Search,
  AlertTriangle,
  Edit2,
  Trash2,
  Download,
  X,
  AlertCircle,
} from 'lucide-react';

export default function DoctorInventory() {
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Estados
  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      nombre: 'Metformina 850mg',
      categoria: 'Antidiabético',
      stock: 45,
      minimo: 20,
      precio: 150,
      caducidad: '2025-06-15',
      ubicacion: 'A-1',
    },
    {
      id: 2,
      nombre: 'Atorvastatina 20mg',
      categoria: 'Estatina',
      stock: 12,
      minimo: 15,
      precio: 200,
      caducidad: '2024-12-20',
      ubicacion: 'A-2',
    },
    {
      id: 3,
      nombre: 'Losartán 50mg',
      categoria: 'Antihipertensivo',
      stock: 67,
      minimo: 30,
      precio: 120,
      caducidad: '2025-08-10',
      ubicacion: 'A-3',
    },
    {
      id: 4,
      nombre: 'Omeprazol 20mg',
      categoria: 'Antiácido',
      stock: 8,
      minimo: 25,
      precio: 80,
      caducidad: '2024-11-05',
      ubicacion: 'B-1',
    },
    {
      id: 5,
      nombre: 'Paracetamol 500mg',
      categoria: 'Analgésico',
      stock: 120,
      minimo: 50,
      precio: 50,
      caducidad: '2026-03-22',
      ubicacion: 'B-2',
    },
  ]);

  const [recetas, setRecetas] = useState([
    { id: 1, tipo: 'Receta Controlada', stock: 45, minimo: 20 },
    { id: 2, tipo: 'Receta Simple', stock: 180, minimo: 50 },
    { id: 3, tipo: 'Receta Especial', stock: 12, minimo: 15 },
  ]);

  const [suministros, setSuministros] = useState([
    { id: 1, nombre: 'Jeringas 5ml', stock: 200, minimo: 100, precio: 5 },
    { id: 2, nombre: 'Guantes de látex (caja)', stock: 15, minimo: 10, precio: 180 },
    { id: 3, nombre: 'Gasas estériles (paquete)', stock: 45, minimo: 20, precio: 85 },
    { id: 4, nombre: 'Alcohol 70% (litro)', stock: 8, minimo: 15, precio: 120 },
    { id: 5, nombre: 'Termómetros digitales', stock: 25, minimo: 10, precio: 250 },
  ]);

  // Formularios
  const [medicamentoForm, setMedicamentoForm] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    minimo: '',
    precio: '',
    caducidad: '',
    ubicacion: '',
  });

  const [recetaForm, setRecetaForm] = useState({
    tipo: '',
    stock: '',
    minimo: '',
  });

  const [suministroForm, setSuministroForm] = useState({
    nombre: '',
    stock: '',
    minimo: '',
    precio: '',
  });

  // Calcular alertas
  const medicamentosAlerta = medicamentos.filter((m) => m.stock < m.minimo);
  const recetasAlerta = recetas.filter((r) => r.stock < r.minimo);
  const suministrosAlerta = suministros.filter((s) => s.stock < s.minimo);
  const totalAlertas = medicamentosAlerta.length + recetasAlerta.length + suministrosAlerta.length;

  // Calcular valores
  const valorTotalMedicamentos = medicamentos.reduce((sum, m) => sum + m.stock * m.precio, 0);
  const valorTotalSuministros = suministros.reduce((sum, s) => sum + s.stock * s.precio, 0);

  const getStockStatus = (stock, minimo) => {
    if (stock < minimo) return { color: 'text-red-600', bg: 'bg-red-50', label: 'Bajo' };
    if (stock < minimo * 1.5)
      return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Medio' };
    return { color: 'text-green-600', bg: 'bg-green-50', label: 'Bueno' };
  };

  const getCaducidadStatus = (caducidad) => {
    const hoy = new Date();
    const fechaCaducidad = new Date(caducidad);
    const diasRestantes = Math.floor((fechaCaducidad - hoy) / (1000 * 60 * 60 * 24));

    if (diasRestantes < 30) return { color: 'text-red-600', bg: 'bg-red-50' };
    if (diasRestantes < 90) return { color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  // Abrir modal agregar
  const openAddModal = () => {
    setEditingItem(null);
    if (activeTab === 'medicamentos') {
      setMedicamentoForm({
        nombre: '',
        categoria: '',
        stock: '',
        minimo: '',
        precio: '',
        caducidad: '',
        ubicacion: '',
      });
    } else if (activeTab === 'recetas') {
      setRecetaForm({ tipo: '', stock: '', minimo: '' });
    } else {
      setSuministroForm({ nombre: '', stock: '', minimo: '', precio: '' });
    }
    setShowModal(true);
  };

  // Abrir modal editar
  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === 'medicamentos') {
      setMedicamentoForm({
        nombre: item.nombre,
        categoria: item.categoria,
        stock: item.stock.toString(),
        minimo: item.minimo.toString(),
        precio: item.precio.toString(),
        caducidad: item.caducidad,
        ubicacion: item.ubicacion,
      });
    } else if (activeTab === 'recetas') {
      setRecetaForm({
        tipo: item.tipo,
        stock: item.stock.toString(),
        minimo: item.minimo.toString(),
      });
    } else {
      setSuministroForm({
        nombre: item.nombre,
        stock: item.stock.toString(),
        minimo: item.minimo.toString(),
        precio: item.precio.toString(),
      });
    }
    setShowModal(true);
  };

  // Guardar medicamento
  const handleSaveMedicamento = (e) => {
    e.preventDefault();
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      nombre: medicamentoForm.nombre,
      categoria: medicamentoForm.categoria,
      stock: parseInt(medicamentoForm.stock),
      minimo: parseInt(medicamentoForm.minimo),
      precio: parseFloat(medicamentoForm.precio),
      caducidad: medicamentoForm.caducidad,
      ubicacion: medicamentoForm.ubicacion,
    };

    if (editingItem) {
      setMedicamentos(medicamentos.map((m) => (m.id === editingItem.id ? newItem : m)));
    } else {
      setMedicamentos([...medicamentos, newItem]);
    }
    setShowModal(false);
  };

  // Guardar receta
  const handleSaveReceta = (e) => {
    e.preventDefault();
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      tipo: recetaForm.tipo,
      stock: parseInt(recetaForm.stock),
      minimo: parseInt(recetaForm.minimo),
    };

    if (editingItem) {
      setRecetas(recetas.map((r) => (r.id === editingItem.id ? newItem : r)));
    } else {
      setRecetas([...recetas, newItem]);
    }
    setShowModal(false);
  };

  // Guardar suministro
  const handleSaveSuministro = (e) => {
    e.preventDefault();
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      nombre: suministroForm.nombre,
      stock: parseInt(suministroForm.stock),
      minimo: parseInt(suministroForm.minimo),
      precio: parseFloat(suministroForm.precio),
    };

    if (editingItem) {
      setSuministros(suministros.map((s) => (s.id === editingItem.id ? newItem : s)));
    } else {
      setSuministros([...suministros, newItem]);
    }
    setShowModal(false);
  };

  // Eliminar
  const handleDelete = () => {
    if (activeTab === 'medicamentos') {
      setMedicamentos(medicamentos.filter((m) => m.id !== itemToDelete.id));
    } else if (activeTab === 'recetas') {
      setRecetas(recetas.filter((r) => r.id !== itemToDelete.id));
    } else {
      setSuministros(suministros.filter((s) => s.id !== itemToDelete.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  // Filtrar por búsqueda
  const filteredMedicamentos = medicamentos.filter(
    (m) =>
      m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecetas = recetas.filter((r) =>
    r.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSuministros = suministros.filter((s) =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Inventario</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Gestión de medicamentos, recetas y suministros
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95">
          <Download className="h-5 w-5" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <Pill className="h-8 w-8 text-blue-500" />
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              {medicamentos.length}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            ${valorTotalMedicamentos.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Medicamentos</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <FileText className="h-8 w-8 text-green-500" />
            <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              {recetas.reduce((sum, r) => sum + r.stock, 0)}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">{recetas.length}</p>
          <p className="text-xs text-gray-600 md:text-sm">Tipos de Recetas</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <Syringe className="h-8 w-8 text-purple-500" />
            <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
              {suministros.length}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            ${valorTotalSuministros.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Suministros</p>
        </div>

        <div
          className={`rounded-xl border-2 p-4 shadow-sm md:p-6 ${
            totalAlertas > 0 ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <AlertTriangle
              className={`h-8 w-8 ${totalAlertas > 0 ? 'text-red-500' : 'text-gray-400'}`}
            />
            <span
              className={`rounded px-2 py-1 text-xs font-medium ${
                totalAlertas > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {totalAlertas > 0 ? 'Acción requerida' : 'Todo bien'}
            </span>
          </div>
          <p
            className={`mb-1 text-2xl font-bold md:text-3xl ${totalAlertas > 0 ? 'text-red-600' : 'text-gray-900'}`}
          >
            {totalAlertas}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Alertas de stock</p>
        </div>
      </div>

      {/* Alertas */}
      {totalAlertas > 0 && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-red-900">Stock Bajo Detectado</h3>
              <p className="text-sm text-red-700">
                {medicamentosAlerta.length > 0 && `${medicamentosAlerta.length} medicamento(s), `}
                {recetasAlerta.length > 0 && `${recetasAlerta.length} tipo(s) de receta(s), `}
                {suministrosAlerta.length > 0 && `${suministrosAlerta.length} suministro(s)`}{' '}
                necesitan reabastecimiento.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Barra de búsqueda */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en inventario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Agregar</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-3 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('medicamentos')}
            className={`flex items-center justify-center gap-2 px-2 py-3 font-medium transition ${
              activeTab === 'medicamentos'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Pill className="h-5 w-5" />
            <span className="text-sm md:text-base">Medicamentos</span>
          </button>
          <button
            onClick={() => setActiveTab('recetas')}
            className={`flex items-center justify-center gap-2 px-2 py-3 font-medium transition ${
              activeTab === 'recetas'
                ? 'bg-green-500 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm md:text-base">Recetas</span>
          </button>
          <button
            onClick={() => setActiveTab('suministros')}
            className={`flex items-center justify-center gap-2 px-2 py-3 font-medium transition ${
              activeTab === 'suministros'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Syringe className="h-5 w-5" />
            <span className="text-sm md:text-base">Suministros</span>
          </button>
        </div>

        {/* Contenido de Medicamentos */}
        {activeTab === 'medicamentos' && (
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">
                      Medicamento
                    </th>
                    <th className="hidden px-2 py-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                      Categoría
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-700 lg:table-cell">
                      Precio
                    </th>
                    <th className="hidden px-2 py-3 text-center text-sm font-semibold text-gray-700 md:table-cell">
                      Caducidad
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicamentos.map((med) => {
                    const stockStatus = getStockStatus(med.stock, med.minimo);
                    const caducidadStatus = getCaducidadStatus(med.caducidad);

                    return (
                      <tr key={med.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-2 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{med.nombre}</p>
                            <p className="text-xs text-gray-500">{med.ubicacion}</p>
                          </div>
                        </td>
                        <td className="hidden px-2 py-3 text-sm text-gray-600 md:table-cell">
                          {med.categoria}
                        </td>
                        <td className="px-2 py-3 text-center">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                          >
                            {med.stock} / {med.minimo}
                          </span>
                        </td>
                        <td className="hidden px-2 py-3 text-right text-sm text-gray-900 lg:table-cell">
                          ${med.precio}
                        </td>
                        <td className="hidden px-2 py-3 text-center md:table-cell">
                          <span
                            className={`inline-block rounded px-2 py-1 text-xs ${caducidadStatus.bg} ${caducidadStatus.color}`}
                          >
                            {med.caducidad}
                          </span>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEditModal(med)}
                              className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                            >
                              <Edit2 className="h-4 w-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => {
                                setItemToDelete(med);
                                setShowDeleteModal(true);
                              }}
                              className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
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
        {activeTab === 'recetas' && (
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecetas.map((receta) => {
                const stockStatus = getStockStatus(receta.stock, receta.minimo);

                return (
                  <div
                    key={receta.id}
                    className="rounded-lg border-2 border-gray-200 p-4 transition hover:border-green-300"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="rounded-lg bg-green-50 p-2">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditModal(receta)}
                          className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(receta);
                            setShowDeleteModal(true);
                          }}
                          className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{receta.tipo}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                      >
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
        {activeTab === 'suministros' && (
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">
                      Suministro
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-700 md:table-cell">
                      Precio
                    </th>
                    <th className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-700 lg:table-cell">
                      Valor Total
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuministros.map((sum) => {
                    const stockStatus = getStockStatus(sum.stock, sum.minimo);

                    return (
                      <tr key={sum.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-2 py-3 text-sm font-medium text-gray-900">
                          {sum.nombre}
                        </td>
                        <td className="px-2 py-3 text-center">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                          >
                            {sum.stock} / {sum.minimo}
                          </span>
                        </td>
                        <td className="hidden px-2 py-3 text-right text-sm text-gray-900 md:table-cell">
                          ${sum.precio}
                        </td>
                        <td className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-900 lg:table-cell">
                          ${(sum.stock * sum.precio).toLocaleString()}
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEditModal(sum)}
                              className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                            >
                              <Edit2 className="h-4 w-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => {
                                setItemToDelete(sum);
                                setShowDeleteModal(true);
                              }}
                              className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
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

      {/* Modal Agregar/Editar */}
      {showModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Editar' : 'Agregar'}{' '}
                  {activeTab === 'medicamentos'
                    ? 'Medicamento'
                    : activeTab === 'recetas'
                      ? 'Receta'
                      : 'Suministro'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {activeTab === 'medicamentos' && (
                <form onSubmit={handleSaveMedicamento} className="space-y-4 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.nombre}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, nombre: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Metformina 850mg"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Categoría
                    </label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.categoria}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, categoria: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Antidiabético"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={medicamentoForm.stock}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, stock: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={medicamentoForm.minimo}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, minimo: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Precio</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={medicamentoForm.precio}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, precio: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Fecha de Caducidad
                    </label>
                    <input
                      type="date"
                      required
                      value={medicamentoForm.caducidad}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, caducidad: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.ubicacion}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, ubicacion: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="A-1"
                    />
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
              )}

              {activeTab === 'recetas' && (
                <form onSubmit={handleSaveReceta} className="space-y-4 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tipo de Receta
                    </label>
                    <input
                      type="text"
                      required
                      value={recetaForm.tipo}
                      onChange={(e) => setRecetaForm({ ...recetaForm, tipo: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                      placeholder="Receta Controlada"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={recetaForm.stock}
                        onChange={(e) => setRecetaForm({ ...recetaForm, stock: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={recetaForm.minimo}
                        onChange={(e) => setRecetaForm({ ...recetaForm, minimo: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
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
                      className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 active:scale-95"
                    >
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'suministros' && (
                <form onSubmit={handleSaveSuministro} className="space-y-4 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      required
                      value={suministroForm.nombre}
                      onChange={(e) =>
                        setSuministroForm({ ...suministroForm, nombre: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                      placeholder="Jeringas 5ml"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={suministroForm.stock}
                        onChange={(e) =>
                          setSuministroForm({ ...suministroForm, stock: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={suministroForm.minimo}
                        onChange={(e) =>
                          setSuministroForm({ ...suministroForm, minimo: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Precio</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={suministroForm.precio}
                      onChange={(e) =>
                        setSuministroForm({ ...suministroForm, precio: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    />
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
                      className="flex-1 rounded-lg bg-purple-500 px-4 py-2 text-white transition hover:bg-purple-600 active:scale-95"
                    >
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              )}
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
                  <h2 className="text-xl font-bold text-gray-900">Confirmar Eliminación</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  ¿Estás seguro de que deseas eliminar este elemento?
                </p>
                <div className="mb-6 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activeTab === 'medicamentos' && itemToDelete.nombre}
                    {activeTab === 'recetas' && itemToDelete.tipo}
                    {activeTab === 'suministros' && itemToDelete.nombre}
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
