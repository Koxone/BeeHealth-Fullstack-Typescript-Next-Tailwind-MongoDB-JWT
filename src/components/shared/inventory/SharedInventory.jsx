'use client';

import { useState, useEffect, useMemo } from 'react';
import TabsBar from './components/TabsBar';
import SearchAddBar from './components/SearchAddBar';
import StatsBar from './components/StatsBar';
import MedicamentosTable from './components/MedicamentosTable';
import RecetasGrid from './components/RecetasGrid';
import SuministrosTable from './components/SuministrosTable';
import DeleteModal from './components/modals/deleteProductModal/DeleteModal';
import SharedSectionHeader from '@/components/shared/sections/SharedSectionHeader';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { getStockStatus, getCaducidadStatus } from './utils/helpers';
import CreateProductModal from './components/modals/addProductModal/CreateProductModal';
import EditProductModal from './components/modals/editProductModal/EditProductModal';

// Hooks
import { useGetFullInventory } from '@/hooks/useGetFullInventory';

export default function SharedInventory({ role }) {
  // UI State
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Custom Hooks
  const { inventory, loading, error, setInventory } = useGetFullInventory();

  // Filtered Meds
  const medicamentos = useMemo(
    () => inventory.filter((i) => i.product?.type === 'medicamento'),
    [inventory]
  );

  // Filtered Prescriptions
  const recetas = useMemo(() => inventory.filter((i) => i.product?.type === 'receta'), [inventory]);

  // Filtered Supplies
  const suministros = useMemo(
    () => inventory.filter((i) => i.product?.type === 'suministro'),
    [inventory]
  );

  // Search Meds
  const filteredMedicamentos = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return medicamentos.filter(
      (m) =>
        m.product.name.toLowerCase().includes(q) || m.product.category.toLowerCase().includes(q)
    );
  }, [medicamentos, searchTerm]);

  // Search Prescriptions
  const filteredRecetas = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return recetas.filter((r) => r.product.name.toLowerCase().includes(q));
  }, [recetas, searchTerm]);

  // Search Supplies
  const filteredSuministros = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return suministros.filter((s) => s.product.name.toLowerCase().includes(q));
  }, [suministros, searchTerm]);

  // Actions
  const openAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
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
      <SharedSectionHeader
        role={role}
        Icon="inventory"
        title="Gestión de Inventario"
        subtitle="Control de medicamentos, recetas y suministros"
      />

      {/* Tabs & Actions */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchAddBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAdd={openAddModal} />
      </div>

      {/* Stats */}
      <StatsBar medicamentos={medicamentos} suministros={suministros} recetas={recetas} />

      {/* Content */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {activeTab === 'medicamentos' && (
          <MedicamentosTable
            rows={filteredMedicamentos}
            getStockStatus={getStockStatus}
            getCaducidadStatus={getCaducidadStatus}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'recetas' && (
          <RecetasGrid
            rows={filteredRecetas}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'suministros' && (
          <SuministrosTable
            rows={filteredSuministros}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}
      </div>

      {/* Inventory Alerts */}
      <SharedInventoryAlerts role={role} inventory={inventory} />

      {/* Modals */}
      {showModal && !editingItem && (
        <CreateProductModal
          activeTab={activeTab}
          onClose={() => setShowModal(false)}
          onSubmit={(payload) => {
            setInventory((prev) => [...prev, payload]);
            setShowModal(false);
          }}
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
