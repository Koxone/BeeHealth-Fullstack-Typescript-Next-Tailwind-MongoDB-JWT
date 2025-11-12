'use client';
import { useState, useEffect, useMemo } from 'react';

/* --- Types --- */
interface Product {
  _id: string;
  name: string;
  type: string;
  category: string;
  inStock: boolean;
  costPrice: number;
  salePrice: number;
  createdAt: string;
  updatedAt: string;
}

interface InventoryItem {
  _id: string;
  product: Product;
  productType: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  createdAt: string;
  updatedAt: string;
}

/* --- Hook: useInventory --- */
/* Fetches and manages inventory data from /api/inventory */
export function useGetFullInventory() {
  // Local states
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        const res = await fetch('/api/inventory', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('Error fetching inventory data');
        }

        const data: InventoryItem[] = await res.json();
        setInventory(data);
      } catch (err: any) {
        console.error('Inventory fetch error:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
        console.log('Fetch inventory request completed');
      }
    }

    fetchInventory();
  }, []);

  // --- Inventory Alerts logic ---
  const criticalItems = useMemo(
    () => inventory.filter((i) => i.quantity < i.minStock),
    [inventory]
  );
  const lowItems = useMemo(() => inventory.filter((i) => i.quantity === i.minStock), [inventory]);
  const totalAlerts = useMemo(
    () => criticalItems.length + lowItems.length,
    [criticalItems, lowItems]
  );

  // Return state and handlers
  return {
    inventory,
    loading,
    error,
    setInventory,
    criticalItems,
    lowItems,
    totalAlerts,
  };
}
