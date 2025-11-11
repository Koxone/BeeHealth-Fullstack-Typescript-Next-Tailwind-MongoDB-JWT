'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Package,
  Pill,
  Syringe,
  Plus,
  Search,
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
import DeleteModal from './components/modals/deleteProductModal/DeleteModal';
import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import GeneralInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/GeneralInventoryAlerts';
import { getStockStatus, getCaducidadStatus } from './utils/helpers';
import AddProductModal from './components/modals/addProductModal/AddProductModal';
import EditProductModal from './components/modals/editProductModal/EditProductModal';

export default function SharedInventory({ role }) {
  // UI State
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Data State
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch('/api/inventory');
        if (!res.ok) throw new Error('Error al obtener inventario');
        const data = await res.json();
        setInventory(data);
      } catch (err) {
        console.error('Error al cargar inventario:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);
  
  // Filtered groups
  const medicamentos = useMemo(
    () => inventory.filter((i) => i.product?.type === 'medicamento'),
    [inventory]
  );

  const recetas = useMemo(() => inventory.filter((i) => i.product?.type === 'receta'), [inventory]);

  const suministros = useMemo(
    () => inventory.filter((i) => i.product?.type === 'suministro'),
    [inventory]
  );

  // Filtered by search
  const filteredMedicamentos = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return medicamentos.filter(
      (m) =>
        m.product.name.toLowerCase().includes(q) || m.product.category.toLowerCase().includes(q)
    );
  }, [medicamentos, searchTerm]);

  const filteredRecetas = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return recetas.filter((r) => r.product.name.toLowerCase().includes(q));
  }, [recetas, searchTerm]);

  const filteredSuministros = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return suministros.filter((s) => s.product.name.toLowerCase().includes(q));
  }, [suministros, searchTerm]);

  // Derived totals
  const valorTotalMedicamentos = useMemo(
    () => medicamentos.reduce((sum, m) => sum + m.quantity * (m.product?.salePrice || 0), 0),
    [medicamentos]
  );

  const valorTotalSuministros = useMemo(
    () => suministros.reduce((sum, s) => sum + s.quantity * (s.product?.salePrice || 0), 0),
    [suministros]
  );

  // Actions
  const openAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const requestDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await fetch(`/api/inventory/${itemToDelete._id}`, { method: 'DELETE' });
      setInventory((prev) => prev.filter((i) => i._id !== itemToDelete._id));
    } catch (err) {
      console.error('Error eliminando item:', err);
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Cargando inventario...</p>
      </div>
    );
  }

  return (
    <div className="h-full space-y-6 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <GeneralSectionHeader
        role={role}
        Icon="inventory"
        title="Gestión de Inventario"
        subtitle="Control de medicamentos, recetas y suministros"
      />

      {/* Tabs & Actions */}
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

      {/* Stats */}
      <StatsBar
        valorTotalMedicamentos={valorTotalMedicamentos}
        valorTotalSuministros={valorTotalSuministros}
        counts={{
          meds: medicamentos.length,
          recs: recetas.length,
          sums: suministros.length,
        }}
      />

      {/* Content */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {activeTab === 'medicamentos' && (
          <MedicamentosTable
            rows={filteredMedicamentos}
            getStockStatus={getStockStatus}
            getCaducidadStatus={getCaducidadStatus}
            icons={{ Edit2, Trash2 }}
            onEdit={(item) => setEditingItem(item)}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'recetas' && (
          <RecetasGrid
            rows={filteredRecetas}
            getStockStatus={getStockStatus}
            icons={{ Edit2, Trash2 }}
            onEdit={(item) => setEditingItem(item)}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'suministros' && (
          <SuministrosTable
            rows={filteredSuministros}
            getStockStatus={getStockStatus}
            icons={{ Edit2, Trash2 }}
            onEdit={(item) => setEditingItem(item)}
            onDelete={requestDelete}
          />
        )}
      </div>

      {/* Inventory Alerts */}
      <GeneralInventoryAlerts role={role} />

      {/* Modals */}
      {showModal && !editingItem && (
        <AddProductModal
          activeTab={activeTab}
          onClose={() => setShowModal(false)}
          onSubmit={(payload) => {
            setInventory((prev) => [...prev, payload]);
            setShowModal(false);
          }}
          icons={{ X }}
        />
      )}

      {showModal && editingItem && (
        <EditProductModal
          activeTab={activeTab}
          item={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSubmit={(payload) => {
            setInventory((prev) => prev.map((i) => (i._id === payload._id ? payload : i)));
            setShowModal(false);
            setEditingItem(null);
          }}
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
