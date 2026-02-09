/**
 * CUSTOMER SERVICE
 * Handles customer data operations, GDPR compliance, and customer intelligence
 * 
 * BACKEND HANDOFF: Replace mock implementations with real API calls
 * Expected endpoints:
 * - GET /api/customers - List customers with filters
 * - GET /api/customers/:id - Get customer details
 * - PUT /api/customers/:id - Update customer
 * - POST /api/customers/:id/gdpr/export - Request GDPR data export
 * - POST /api/customers/:id/gdpr/delete - Request account deletion
 * - GET /api/customers/:id/orders - Get customer order history
 */

import customersData from '@/data/mock/customers.json';

// Types
export interface CustomerGDPRStatus {
  consentMarketing: boolean;
  consentAnalytics: boolean;
  dataExportRequested: boolean;
  deletionRequested: boolean;
  lastUpdated: string;
}

export interface CustomerAddress {
  id: string;
  type: 'shipping' | 'billing';
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  country: string;
  countryCode: string;
  currency: string;
  totalOrders: number;
  totalSpent: number;
  tier: 'new' | 'standard' | 'vip' | 'elite';
  createdAt: string;
  lastOrderAt: string | null;
  gdprStatus: CustomerGDPRStatus;
  riskLevel: 'low' | 'medium' | 'high';
  notes: string;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
}

export interface CustomerFilters {
  search?: string;
  tier?: string;
  country?: string;
  riskLevel?: string;
  page?: number;
  perPage?: number;
}

export interface CustomerListResponse {
  customers: Customer[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getCustomers(filters?: CustomerFilters): Promise<CustomerListResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let customers = customersData.customers as Customer[];
  
  // Apply filters
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    customers = customers.filter(c => 
      c.firstName.toLowerCase().includes(search) ||
      c.lastName.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search)
    );
  }
  
  if (filters?.tier) {
    customers = customers.filter(c => c.tier === filters.tier);
  }
  
  if (filters?.country) {
    customers = customers.filter(c => c.country === filters.country);
  }
  
  if (filters?.riskLevel) {
    customers = customers.filter(c => c.riskLevel === filters.riskLevel);
  }
  
  return {
    customers,
    pagination: {
      page: filters?.page || 1,
      perPage: filters?.perPage || 20,
      total: customers.length,
      totalPages: Math.ceil(customers.length / (filters?.perPage || 20))
    }
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getCustomerById(customerId: string): Promise<Customer | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const customer = customersData.customers.find(c => c.id === customerId) as Customer | undefined;
  return customer || null;
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateCustomer(customerId: string, updates: Partial<Customer>): Promise<Customer> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const customer = customersData.customers.find(c => c.id === customerId) as Customer;
  if (!customer) {
    throw new Error('Customer not found');
  }
  
  // Mock update - in reality this would persist to database
  return { ...customer, ...updates };
}

// BACKEND HANDOFF: Replace with actual API call
export async function requestDataExport(customerId: string): Promise<{ requestId: string; estimatedCompletion: string }> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    requestId: `gdpr_export_${Date.now()}`,
    estimatedCompletion: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString() // 72 hours
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function requestAccountDeletion(customerId: string, reason?: string): Promise<{ requestId: string; scheduledDeletion: string }> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    requestId: `gdpr_delete_${Date.now()}`,
    scheduledDeletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateCustomerNotes(customerId: string, notes: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Mock implementation - would update in database
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateCustomerRisk(customerId: string, riskLevel: 'low' | 'medium' | 'high', reason: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Mock implementation - would update in database and log audit entry
}

export function getCustomerFilters() {
  return customersData.filters;
}
