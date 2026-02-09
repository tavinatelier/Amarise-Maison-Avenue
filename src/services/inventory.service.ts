/**
 * INVENTORY SERVICE
 * Handles inventory management, stock control, and supply chain operations
 * 
 * BACKEND HANDOFF: Replace mock implementations with real API calls
 * Expected endpoints:
 * - GET /api/inventory - List all inventory items
 * - GET /api/inventory/:sku - Get inventory details for SKU
 * - PUT /api/inventory/:sku - Update inventory
 * - POST /api/inventory/:sku/adjust - Adjust stock levels
 * - POST /api/inventory/:sku/archive - Archive/discontinue product
 * - GET /api/inventory/:sku/movements - Get stock movement history
 */

import inventoryData from '@/data/mock/inventory.json';

// Types
export type InventoryStatus = 'active' | 'low_stock' | 'out_of_stock' | 'archived';

export interface StockMovement {
  id: string;
  type: 'inbound' | 'outbound' | 'adjustment' | 'transfer';
  quantity: number;
  country: string;
  reason: string;
  timestamp: string;
  performedBy: string;
}

export interface InventoryItem {
  sku: string;
  productId: string;
  title: string;
  category: string;
  status: InventoryStatus;
  totalStock: number;
  stockByCountry: Record<string, number>;
  lowStockThreshold: number;
  reorderPoint: number;
  lastRestocked: string;
  movements: StockMovement[];
  archivedAt?: string;
  archivedReason?: string;
}

export interface Warehouse {
  code: string;
  name: string;
  country: string;
  isPrimary: boolean;
}

export interface InventorySummary {
  totalSKUs: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  archivedProducts: number;
  totalUnits: number;
  countriesServed: number;
}

export interface InventoryFilters {
  search?: string;
  status?: InventoryStatus;
  category?: string;
  country?: string;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getInventory(filters?: InventoryFilters): Promise<InventoryItem[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let items = inventoryData.inventory as InventoryItem[];
  
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    items = items.filter(i => 
      i.sku.toLowerCase().includes(search) ||
      i.title.toLowerCase().includes(search)
    );
  }
  
  if (filters?.status) {
    items = items.filter(i => i.status === filters.status);
  }
  
  if (filters?.category) {
    items = items.filter(i => i.category === filters.category);
  }
  
  return items;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getInventoryBySku(sku: string): Promise<InventoryItem | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const item = inventoryData.inventory.find(i => i.sku === sku) as InventoryItem | undefined;
  return item || null;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getInventorySummary(): Promise<InventorySummary> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return inventoryData.summary as InventorySummary;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getWarehouses(): Promise<Warehouse[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return inventoryData.warehouses as Warehouse[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function adjustStock(
  sku: string, 
  country: string, 
  adjustment: number, 
  reason: string
): Promise<StockMovement> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock implementation - would update database and create movement record
  return {
    id: `mov_${Date.now()}`,
    type: adjustment > 0 ? 'inbound' : 'outbound',
    quantity: adjustment,
    country,
    reason,
    timestamp: new Date().toISOString(),
    performedBy: 'current_user@amarise.com' // Would be from auth context
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function transferStock(
  sku: string,
  fromCountry: string,
  toCountry: string,
  quantity: number
): Promise<{ from: StockMovement; to: StockMovement }> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const timestamp = new Date().toISOString();
  
  return {
    from: {
      id: `mov_${Date.now()}_from`,
      type: 'transfer',
      quantity: -quantity,
      country: fromCountry,
      reason: `Transfer to ${toCountry}`,
      timestamp,
      performedBy: 'current_user@amarise.com'
    },
    to: {
      id: `mov_${Date.now()}_to`,
      type: 'transfer',
      quantity,
      country: toCountry,
      reason: `Transfer from ${fromCountry}`,
      timestamp,
      performedBy: 'current_user@amarise.com'
    }
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function archiveProduct(sku: string, reason: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Mock implementation - would update status and log audit entry
}

// BACKEND HANDOFF: Replace with actual API call
export async function reactivateProduct(sku: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Mock implementation - would update status and log audit entry
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateThresholds(
  sku: string, 
  lowStockThreshold: number, 
  reorderPoint: number
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Mock implementation - would update in database
}

// BACKEND HANDOFF: Replace with actual API call
export async function getStockMovements(sku: string, limit?: number): Promise<StockMovement[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const item = inventoryData.inventory.find(i => i.sku === sku);
  if (!item) return [];
  
  const movements = item.movements as StockMovement[];
  return limit ? movements.slice(0, limit) : movements;
}
