'use client';

import { useState, useMemo } from 'react';
import {
  Package,
  Pill,
  Syringe,
  Plus,
  Search,
  AlertTriangle,
  Edit2,
  Trash2,
  Download,
  FileText,
  X,
} from 'lucide-react';

import TabsBar from './components/TabsBar';
import SearchAddBar from './components/SearchAddBar';
import StatsBar from './components/StatsBar';
import MedicamentosTable from './components/MedicamentosTable';
import RecetasGrid from './components/RecetasGrid';
import SuministrosTable from './components/SuministrosTable';
import AddEditModal from './components/AddEditModal';
import DeleteModal from './components/DeleteModal';
import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import GeneralInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/GeneralInventoryAlerts';

/* utils */
const getStockStatus = (stock, minimo) => {
  /* stock tag */
  if (stock < minimo) return { color: 'text-red-600', bg: 'bg-red-50', label: 'Bajo' };
  if (stock < minimo * 1.5) return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Medio' };
  return { color: 'text-green-600', bg: 'bg-green-50', label: 'Bueno' };
};

/* utils */
const getCaducidadStatus = (caducidad) => {
  /* expiry tag */
  const hoy = new Date();
  const fecha = new Date(caducidad);
  const dias = Math.floor((fecha - hoy) / (1000 * 60 * 60 * 24));
  if (dias < 30) return { color: 'text-red-600', bg: 'bg-red-50' };
  if (dias < 90) return { color: 'text-yellow-600', bg: 'bg-yellow-50' };
  return { color: 'text-gray-600', bg: 'bg-gray-50' };
};

/* container */
export default function SharedInventory({ role }) {
  /* ui state */
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* data state */
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
    { id: 1, nombre: 'Jeringas 5ml', stock: 60, minimo: 30, precio: 4 },
    { id: 2, nombre: 'Guantes Nitrilo', stock: 90, minimo: 50, precio: 2.5 },
    { id: 3, nombre: 'Algodón 250g', stock: 12, minimo: 20, precio: 3 },
  ]);

  /* forms state */
  const [medicamentoForm, setMedicamentoForm] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    minimo: '',
    precio: '',
    caducidad: '',
    ubicacion: '',
  });
  const [recetaForm, setRecetaForm] = useState({ tipo: '', stock: '', minimo: '' });
  const [suministroForm, setSuministroForm] = useState({
    nombre: '',
    stock: '',
    minimo: '',
    precio: '',
  });

  /* derived */
  const valorTotalMedicamentos = useMemo(
    () => medicamentos.reduce((sum, m) => sum + m.stock * m.precio, 0),
    [medicamentos]
  );
  const valorTotalSuministros = useMemo(
    () => suministros.reduce((sum, s) => sum + s.stock * s.precio, 0),
    [suministros]
  );

  /* derived */
  const filteredMedicamentos = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return medicamentos.filter(
      (m) =>
        m.nombre.toLowerCase().includes(q) ||
        m.categoria.toLowerCase().includes(q) ||
        m.ubicacion.toLowerCase().includes(q)
    );
  }, [medicamentos, searchTerm]);

  /* derived */
  const filteredRecetas = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return recetas.filter((r) => r.tipo.toLowerCase().includes(q));
  }, [recetas, searchTerm]);

  /* derived */
  const filteredSuministros = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return suministros.filter((s) => s.nombre.toLowerCase().includes(q));
  }, [suministros, searchTerm]);

  /* actions */
  const openAddModal = () => {
    setEditingItem(null);
    if (activeTab === 'medicamentos')
      setMedicamentoForm({
        nombre: '',
        categoria: '',
        stock: '',
        minimo: '',
        precio: '',
        caducidad: '',
        ubicacion: '',
      });
    if (activeTab === 'recetas') setRecetaForm({ tipo: '', stock: '', minimo: '' });
    if (activeTab === 'suministros')
      setSuministroForm({ nombre: '', stock: '', minimo: '', precio: '' });
    setShowModal(true);
  };

  /* actions */
  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === 'medicamentos') {
      setMedicamentoForm({
        nombre: item.nombre,
        categoria: item.categoria,
        stock: String(item.stock),
        minimo: String(item.minimo),
        precio: String(item.precio),
        caducidad: item.caducidad,
        ubicacion: item.ubicacion,
      });
    } else if (activeTab === 'recetas') {
      setRecetaForm({ tipo: item.tipo, stock: String(item.stock), minimo: String(item.minimo) });
    } else {
      setSuministroForm({
        nombre: item.nombre,
        stock: String(item.stock),
        minimo: String(item.minimo),
        precio: String(item.precio),
      });
    }
    setShowModal(true);
  };

  /* actions */
  const handleSave = (e) => {
    e.preventDefault();
    if (activeTab === 'medicamentos') {
      const payload = {
        id: editingItem ? editingItem.id : Date.now(),
        nombre: medicamentoForm.nombre.trim(),
        categoria: medicamentoForm.categoria.trim(),
        stock: Number(medicamentoForm.stock),
        minimo: Number(medicamentoForm.minimo),
        precio: Number(medicamentoForm.precio),
        caducidad: medicamentoForm.caducidad,
        ubicacion: medicamentoForm.ubicacion.trim(),
      };
      setMedicamentos((prev) =>
        editingItem ? prev.map((m) => (m.id === editingItem.id ? payload : m)) : [...prev, payload]
      );
    } else if (activeTab === 'recetas') {
      const payload = {
        id: editingItem ? editingItem.id : Date.now(),
        tipo: recetaForm.tipo.trim(),
        stock: Number(recetaForm.stock),
        minimo: Number(recetaForm.minimo),
      };
      setRecetas((prev) =>
        editingItem ? prev.map((r) => (r.id === editingItem.id ? payload : r)) : [...prev, payload]
      );
    } else {
      const payload = {
        id: editingItem ? editingItem.id : Date.now(),
        nombre: suministroForm.nombre.trim(),
        stock: Number(suministroForm.stock),
        minimo: Number(suministroForm.minimo),
        precio: Number(suministroForm.precio),
      };
      setSuministros((prev) =>
        editingItem ? prev.map((s) => (s.id === editingItem.id ? payload : s)) : [...prev, payload]
      );
    }
    setShowModal(false);
    setEditingItem(null);
  };

  /* actions */
  const requestDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  /* actions */
  const confirmDelete = () => {
    if (!itemToDelete) return;
    if (activeTab === 'medicamentos')
      setMedicamentos((prev) => prev.filter((m) => m.id !== itemToDelete.id));
    if (activeTab === 'recetas') setRecetas((prev) => prev.filter((r) => r.id !== itemToDelete.id));
    if (activeTab === 'suministros')
      setSuministros((prev) => prev.filter((s) => s.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  /* derived */
  const inventarioAlertas = useMemo(() => {
    const meds = medicamentos
      .filter((m) => m.stock < m.minimo)
      .map((m) => ({ tipo: 'medicamento', nombre: m.nombre, stock: m.stock, minimo: m.minimo }));
    const recs = recetas
      .filter((r) => r.stock < r.minimo)
      .map((r) => ({ tipo: 'receta', nombre: r.tipo, stock: r.stock, minimo: r.minimo }));
    const sums = suministros
      .filter((s) => s.stock < s.minimo)
      .map((s) => ({ tipo: 'suministro', nombre: s.nombre, stock: s.stock, minimo: s.minimo }));
    return [...meds, ...recs, ...sums];
  }, [medicamentos, recetas, suministros]);

  return (
    <div className="h-full space-y-6 overflow-x-hidden overflow-y-auto">
      {/* header */}
      <GeneralSectionHeader
        role={role}
        Icon="inventory"
        title="Gestión de Inventario"
        subtitle="Control de medicamentos, recetas y suministros"
      />

      {/* tabs and actions */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <TabsBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          icons={{ Package, Pill, FileText, Syringe }}
        />
        <SearchAddBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAdd={openAddModal}
          icons={{ Search, Plus, Download }}
        />
      </div>

      {/* stats */}
      <StatsBar
        valorTotalMedicamentos={valorTotalMedicamentos}
        valorTotalSuministros={valorTotalSuministros}
        counts={{ meds: medicamentos.length, recs: recetas.length, sums: suministros.length }}
      />

      {/* content */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {activeTab === 'medicamentos' && (
          <MedicamentosTable
            rows={filteredMedicamentos}
            getStockStatus={getStockStatus}
            getCaducidadStatus={getCaducidadStatus}
            icons={{ Edit2, Trash2 }}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'recetas' && (
          <RecetasGrid
            rows={filteredRecetas}
            getStockStatus={getStockStatus}
            icons={{ Edit2, Trash2 }}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'suministros' && (
          <SuministrosTable
            rows={filteredSuministros}
            getStockStatus={getStockStatus}
            icons={{ Edit2, Trash2 }}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}
      </div>

      {/* Inventory Alerts */}
      <GeneralInventoryAlerts role={role} />

      {/* modals */}
      {showModal && (
        <AddEditModal
          activeTab={activeTab}
          editingItem={editingItem}
          medicamentoForm={medicamentoForm}
          setMedicamentoForm={setMedicamentoForm}
          recetaForm={recetaForm}
          setRecetaForm={setRecetaForm}
          suministroForm={suministroForm}
          setSuministroForm={setSuministroForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
          icons={{ X }}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
