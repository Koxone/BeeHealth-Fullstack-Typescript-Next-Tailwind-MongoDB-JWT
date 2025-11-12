'use client';

import { useState, useEffect, useMemo } from 'react';
import TabsBar from './components/TabsBar';
import SearchAddBar from './components/SearchAddBar';
import StatsBar from './components/StatsBar';
import MedicamentosTable from './components/MedicamentosTable';
import RecetasGrid from './components/RecetasGrid';
import SuministrosTable from './components/SuministrosTable';
import SharedSectionHeader from '@/components/shared/sections/SharedSectionHeader';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { getStockStatus, getCaducidadStatus } from './utils/helpers';

// Custom Hooks
import { useGetFullInventory } from '@/hooks/useGetFullInventory';

// Modals
import RestockProductModal from './components/modals/restockProductModal/RestockProductModal';
import CreateProductModal from './components/modals/addProductModal/CreateProductModal';
import EditProductModal from './components/modals/editProductModal/EditProductModal';
import DeleteProductModal from './components/modals/deleteProductModal/DeleteProductModal';

export default function SharedInventory({ role }) {
  // Fetch Full Inventory Items
  const { inventory, loading, error, setInventory } = useGetFullInventory();

  // States
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Modal Render States
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Create Product Modal Handler
  const openAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  // Edit Product Modal Handler
  const openEditModal = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  // Restock Product Modal Handler
  const openRestockModal = (item) => {
    setShowRestockModal(true);
  };

  // Delete Product Modal Handler
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

  // Filtered Items based on Active Tab
  const filteredInventory = useMemo(() => {
    if (!inventory.length) return [];

    return inventory.filter((item) => {
      if (activeTab === 'medicamentos') return item.product?.type === 'medicamento';
      if (activeTab === 'recetas') return item.product?.type === 'receta';
      if (activeTab === 'suministros') return item.product?.type === 'suministro';
      return false;
    });
  }, [inventory, activeTab]);

  // Further filter by search term
  const filteredItems = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return filteredInventory.filter(
      (item) =>
        item.product?.name.toLowerCase().includes(q) ||
        item.product?.category?.toLowerCase().includes(q)
    );
  }, [filteredInventory, searchTerm]);

  // Loading State
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
        <SearchAddBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAdd={openAddModal}
          onRestock={openRestockModal}
        />
      </div>

      {/* Stats */}
      <StatsBar inventory={inventory} />

      {/* Content */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {activeTab === 'medicamentos' && (
          <MedicamentosTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            getCaducidadStatus={getCaducidadStatus}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'recetas' && (
          <RecetasGrid
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}

        {activeTab === 'suministros' && (
          <SuministrosTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        )}
      </div>

      {/* Inventory Alerts */}
      <SharedInventoryAlerts role={role} inventory={inventory} />

      {/* Create New Product Modal */}
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

      {/* Edit Product Modal */}
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

      {/* Delete Product Modal */}
      {showDeleteModal && (
        <DeleteProductModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}

      {/* Restock Product Modal */}
      {showRestockModal && (
        <RestockProductModal
          activeTab={activeTab}
          onClose={() => setShowRestockModal(false)}
          filteredItems={filteredItems}
          onRestock={(updatedItem) =>
            setInventory((prev) => prev.map((i) => (i._id === updatedItem._id ? updatedItem : i)))
          }
        />
      )}
    </div>
  );
}
