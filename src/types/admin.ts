/**
 * ADMIN TYPES - TypeScript interfaces for admin panel
 * BACKEND HANDOFF: These types match expected API responses
 */

// Dashboard types
export interface DashboardData {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    currency: string;
  };
  orders: {
    pending: number;
    processing: number;
    shipped: number;
    completed: number;
    refunded: number;
  };
  products: {
    totalActive: number;
    lowStock: number;
    outOfStock: number;
  };
  topCountries: Array<{
    country: string;
    countryCode: string;
    orders: number;
    revenue: number;
  }>;
}

// Product admin types
export type ProductState = 'draft' | 'preview' | 'published' | 'disabled' | 'archived';

export interface ProductAdminData {
  id: string;
  title: string;
  slug: string;
  state: ProductState;
  category: string;
  price: Record<string, number>;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// Order admin types
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type FulfillmentStatus = 'unfulfilled' | 'processing' | 'shipped' | 'delivered';

export interface OrderAdminData {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    email: string;
    name: string;
  };
  items: Array<{
    id: string;
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  createdAt: string;
  updatedAt: string;
}

// Customer admin types
export interface CustomerAdminData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  country: string;
  totalOrders: number;
  totalSpent: number;
  currency: string;
  createdAt: string;
  lastOrderAt: string | null;
}

// Approval types
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ApprovalType = 'price_change' | 'refund' | 'product_publish' | 'cms_publish' | 'country_override';

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  status: ApprovalStatus;
  requestedBy: {
    id: string;
    name: string;
    email: string;
  };
  reviewedBy?: {
    id: string;
    name: string;
    email: string;
  };
  resourceType: string;
  resourceId: string;
  changes: Record<string, { from: any; to: any }>;
  reason: string;
  reviewNotes?: string;
  createdAt: string;
  reviewedAt?: string;
}

// Audit types
export interface AuditEntry {
  id: string;
  timestamp: string;
  adminId: string;
  adminEmail: string;
  action: string;
  resourceType: 'product' | 'order' | 'customer' | 'cms' | 'settings';
  resourceId: string;
  changes: Array<{
    field: string;
    oldValue: any;
    newValue: any;
  }>;
}

// Incident types
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface IncidentStatus {
  isActive: boolean;
  severity: IncidentSeverity;
  message?: string;
  activatedAt?: string;
  activatedBy?: string;
  freezeCheckout: boolean;
  freezeRefunds: boolean;
  freezePrices: boolean;
  freezeCMS: boolean;
}
