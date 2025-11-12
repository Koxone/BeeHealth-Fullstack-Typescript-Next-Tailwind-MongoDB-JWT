/* --- Service: Restock Product --- */
/* Sends a PATCH request to /api/inventory/restock to restock an inventory item */

export async function restockProduct({ inventoryId, quantity, reason }) {
  try {
    const res = await fetch('/api/inventory/restock', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inventoryId, quantity, reason }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || 'Error reabasteciendo el producto' };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error en restockProduct service:', error);
    return { success: false, error: error.message };
  }
}
