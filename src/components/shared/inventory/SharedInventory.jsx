'use client';

import { useState, useMemo } from 'react';
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
import ToggleProductModal from './components/modals/toggleProductModal/ToggleProductModal';
import TransactionHistoryModal from './components/modals/transactionHistoryModal/TransactionHistoryModal';

export default function SharedInventory({ role }) {
  // Fetch Full Inventory Items
  const { inventory, loading, setInventory } = useGetFullInventory();

  // States
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [itemToToggle, setItemToToggle] = useState(null);

  // Modal Render States
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
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

  // Toggle Product Modal Handler
  const requestToggle = (item) => {
    setItemToToggle(item);
    setShowToggleModal(true);
  };

  // Transaction History Modal Handler
  const openHistoryModal = (item) => {
    setItemToToggle(item);
    setShowHistoryModal(true);
  };

  const confirmToggle = async () => {
    if (!itemToToggle) return;

    try {
      const res = await fetch('/api/inventory/toggle', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          inventoryId: itemToToggle._id,
          inStock: !itemToToggle.product.inStock,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setInventory((prev) =>
          prev.map((i) =>
            i._id === data.inventory._id
              ? { ...i, product: { ...i.product, inStock: data.inventory.product.inStock } }
              : i
          )
        );
      } else {
        console.error('Error toggling item:', data.error);
      }
    } catch (err) {
      console.error('Error toggling item:', err);
    } finally {
      setShowToggleModal(false);
      setItemToToggle(null);
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
            onDelete={requestToggle}
            onHistory={openHistoryModal}
          />
        )}

        {activeTab === 'recetas' && (
          <RecetasGrid
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onHistory={openHistoryModal}
            onDelete={requestToggle}
          />
        )}

        {activeTab === 'suministros' && (
          <SuministrosTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestToggle}
            onHistory={openHistoryModal}
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

      {/* Toggle Product Modal */}
      {showToggleModal && (
        <ToggleProductModal
          item={itemToToggle}
          onClose={() => setShowToggleModal(false)}
          onConfirm={confirmToggle}
        />
      )}

      {/* Restock Product Modal */}
      {showRestockModal && (
        <RestockProductModal
          activeTab={activeTab}
          onClose={() => setShowRestockModal(false)}
          filteredItems={filteredItems}
          onRestock={(updatedItem) => {
            setInventory((prev) =>
              prev.map((i) =>
                i._id === updatedItem._id ? { ...i, quantity: updatedItem.quantity } : i
              )
            );
          }}
        />
      )}

      {/* Transaction History Modal */}
      {showHistoryModal && (
        <TransactionHistoryModal item={itemToToggle} onClose={() => setShowHistoryModal(false)} />
      )}
    </div>
  );
}
