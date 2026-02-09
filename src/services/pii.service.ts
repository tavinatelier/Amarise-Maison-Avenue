/**
 * AMARISÉ PII (Personally Identifiable Information) Service
 * 
 * BACKEND HANDOFF: Replace mock data with real database.
 * PII access must be logged and time-limited.
 */

// ============================================
// TYPES
// ============================================

export type PIIField = 'email' | 'phone' | 'address' | 'full_name' | 'payment_info';
export type PIIAccessReason = 
  | 'order_support'
  | 'refund_processing'
  | 'shipping_inquiry'
  | 'fraud_investigation'
  | 'legal_request'
  | 'customer_request'
  | 'data_export';

export interface PIIAccessRequest {
  id: string;
  adminId: string;
  adminEmail: string;
  customerId: string;
  field: PIIField;
  reason: PIIAccessReason;
  reasonDetails?: string;
  requestedAt: string;
  expiresAt: string;
  revealedValue?: string;
  wasRevealed: boolean;
}

export interface PIIAccessLog {
  id: string;
  adminId: string;
  adminEmail: string;
  customerId: string;
  field: PIIField;
  reason: PIIAccessReason;
  reasonDetails?: string;
  accessedAt: string;
  adminCountry: string;
  customerCountry: string;
  ipAddress?: string;
}

export interface CustomerPIIData {
  customerId: string;
  
  // Masked by default
  email: string;
  emailMasked: string;
  
  phone?: string;
  phoneMasked?: string;
  
  fullName: string;
  fullNameMasked: string;
  
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  addressMasked?: string;
  
  // Never revealed directly
  paymentInfoExists: boolean;
}

export interface PIIPolicy {
  country: string;
  maxRevealDurationMinutes: number;
  requiresReason: boolean;
  requiresApproval: boolean;
  logRetentionDays: number;
  restrictedFields: PIIField[];
}

// ============================================
// MOCK DATA
// ============================================

const PII_POLICIES: PIIPolicy[] = [
  {
    country: 'GB',
    maxRevealDurationMinutes: 5,
    requiresReason: true,
    requiresApproval: false,
    logRetentionDays: 365,
    restrictedFields: ['payment_info'],
  },
  {
    country: 'FR',
    maxRevealDurationMinutes: 5,
    requiresReason: true,
    requiresApproval: false,
    logRetentionDays: 365,
    restrictedFields: ['payment_info'],
  },
  {
    country: 'DE',
    maxRevealDurationMinutes: 5,
    requiresReason: true,
    requiresApproval: false,
    logRetentionDays: 365,
    restrictedFields: ['payment_info'],
  },
  {
    country: 'US',
    maxRevealDurationMinutes: 15,
    requiresReason: true,
    requiresApproval: false,
    logRetentionDays: 180,
    restrictedFields: ['payment_info'],
  },
  {
    country: 'IN',
    maxRevealDurationMinutes: 10,
    requiresReason: true,
    requiresApproval: false,
    logRetentionDays: 180,
    restrictedFields: ['payment_info'],
  },
];

const MOCK_CUSTOMER_DATA: Record<string, CustomerPIIData> = {
  'cust-001': {
    customerId: 'cust-001',
    email: 'elena.volkov@example.com',
    emailMasked: 'e****@example.com',
    phone: '+1 555 123 4567',
    phoneMasked: '+1 *** *** **67',
    fullName: 'Elena Volkov',
    fullNameMasked: 'E**** V****',
    address: {
      line1: '123 Park Avenue',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
    },
    addressMasked: '*** **** *****, New York, NY',
    paymentInfoExists: true,
  },
  'cust-002': {
    customerId: 'cust-002',
    email: 'sophie.martin@example.fr',
    emailMasked: 's****@example.fr',
    phone: '+33 1 23 45 67 89',
    phoneMasked: '+33 * ** ** ** *9',
    fullName: 'Sophie Martin',
    fullNameMasked: 'S***** M*****',
    address: {
      line1: '15 Rue de Rivoli',
      city: 'Paris',
      postalCode: '75001',
      country: 'FR',
    },
    addressMasked: '** *** ** ******, Paris',
    paymentInfoExists: true,
  },
};

const MOCK_ACCESS_LOGS: PIIAccessLog[] = [];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Mask email address
 */
function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local[0]}****@${domain}`;
}

/**
 * Mask phone number
 */
function maskPhone(phone: string): string {
  return phone.replace(/\d(?=\d{2})/g, '*');
}

/**
 * Mask name
 */
function maskName(name: string): string {
  return name.split(' ').map(part => `${part[0]}${'*'.repeat(part.length - 1)}`).join(' ');
}

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get PII policy for country
 * BACKEND HANDOFF: Replace with database/config lookup
 */
export async function getPIIPolicy(country: string): Promise<PIIPolicy> {
  const policy = PII_POLICIES.find(p => p.country === country);
  return policy || {
    country,
    maxRevealDurationMinutes: 10,
    requiresReason: true,
    requiresApproval: false,
    logRetentionDays: 180,
    restrictedFields: ['payment_info'],
  };
}

/**
 * Get customer data (masked by default)
 * BACKEND HANDOFF: Replace with database query
 */
export async function getCustomerPII(
  customerId: string
): Promise<CustomerPIIData | null> {
  return MOCK_CUSTOMER_DATA[customerId] || null;
}

/**
 * Request PII reveal
 * BACKEND HANDOFF: Replace with database insert + policy check
 */
export async function requestPIIReveal(
  adminId: string,
  adminEmail: string,
  customerId: string,
  field: PIIField,
  reason: PIIAccessReason,
  reasonDetails?: string
): Promise<PIIAccessRequest> {
  const customer = await getCustomerPII(customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }
  
  const customerCountry = customer.address?.country || 'US';
  const policy = await getPIIPolicy(customerCountry);
  
  // Check if field is restricted
  if (policy.restrictedFields.includes(field)) {
    throw new Error(`Field ${field} cannot be revealed for ${customerCountry} customers`);
  }
  
  const now = new Date();
  const expiresAt = new Date(now.getTime() + policy.maxRevealDurationMinutes * 60 * 1000);
  
  const request: PIIAccessRequest = {
    id: `pii-${Date.now()}`,
    adminId,
    adminEmail,
    customerId,
    field,
    reason,
    reasonDetails,
    requestedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    wasRevealed: false,
  };
  
  // BACKEND HANDOFF: Insert into database
  console.log('[PII] Reveal requested:', request.id, field, customerId);
  
  return request;
}

/**
 * Reveal PII value
 * BACKEND HANDOFF: Replace with database query + audit log
 */
export async function revealPII(
  requestId: string,
  adminId: string,
  adminEmail: string,
  adminCountry: string
): Promise<{ value: string; expiresAt: string }> {
  // BACKEND HANDOFF: Validate request exists and not expired
  
  // Get customer data
  const customerId = 'cust-001'; // BACKEND HANDOFF: Get from request
  const field: PIIField = 'email'; // BACKEND HANDOFF: Get from request
  
  const customer = await getCustomerPII(customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }
  
  // Get actual value based on field type
  let value: string;
  const fieldType = field as PIIField;
  
  if (fieldType === 'email') {
    value = customer.email;
  } else if (fieldType === 'phone') {
    value = customer.phone || '';
  } else if (fieldType === 'full_name') {
    value = customer.fullName;
  } else if (fieldType === 'address') {
    value = customer.address 
      ? `${customer.address.line1}, ${customer.address.city}, ${customer.address.country}`
      : '';
  } else {
    throw new Error('Cannot reveal this field');
  }
  
  // Create access log
  const accessLog: PIIAccessLog = {
    id: `log-${Date.now()}`,
    adminId,
    adminEmail,
    customerId,
    field,
    reason: 'order_support', // BACKEND HANDOFF: Get from request
    accessedAt: new Date().toISOString(),
    adminCountry,
    customerCountry: customer.address?.country || 'US',
  };
  
  MOCK_ACCESS_LOGS.push(accessLog);
  
  // BACKEND HANDOFF: Insert audit log
  console.log('[PII] Revealed:', field, 'for', customerId, 'by', adminId);
  
  const policy = await getPIIPolicy(customer.address?.country || 'US');
  const expiresAt = new Date(Date.now() + policy.maxRevealDurationMinutes * 60 * 1000);
  
  return { value, expiresAt: expiresAt.toISOString() };
}

/**
 * Get PII access logs for customer
 * BACKEND HANDOFF: Replace with database query
 */
export async function getPIIAccessLogs(
  customerId: string
): Promise<PIIAccessLog[]> {
  return MOCK_ACCESS_LOGS.filter(log => log.customerId === customerId);
}

/**
 * Get admin PII access history
 * BACKEND HANDOFF: Replace with database query
 */
export async function getAdminPIIAccessHistory(
  adminId: string,
  startDate?: string,
  endDate?: string
): Promise<PIIAccessLog[]> {
  let logs = MOCK_ACCESS_LOGS.filter(log => log.adminId === adminId);
  
  if (startDate) {
    logs = logs.filter(log => log.accessedAt >= startDate);
  }
  
  if (endDate) {
    logs = logs.filter(log => log.accessedAt <= endDate);
  }
  
  return logs.sort((a, b) => 
    new Date(b.accessedAt).getTime() - new Date(a.accessedAt).getTime()
  );
}

/**
 * Check if admin can access PII for customer
 * BACKEND HANDOFF: Must be enforced server-side
 */
export async function canAccessPII(
  adminId: string,
  adminCountry: string,
  customerId: string,
  field: PIIField
): Promise<{ allowed: boolean; reason?: string }> {
  const customer = await getCustomerPII(customerId);
  if (!customer) {
    return { allowed: false, reason: 'Customer not found' };
  }
  
  const customerCountry = customer.address?.country || 'US';
  const policy = await getPIIPolicy(customerCountry);
  
  // Check restricted fields
  if (policy.restrictedFields.includes(field)) {
    return { allowed: false, reason: 'Field is restricted for this customer region' };
  }
  
  // BACKEND HANDOFF: Check admin's country access
  // For now, allow if same region or has global access
  
  return { allowed: true };
}

/**
 * Export customer data (GDPR/CCPA request)
 * BACKEND HANDOFF: Replace with actual data export
 */
export async function exportCustomerData(
  customerId: string,
  requestedBy: string,
  reason: string
): Promise<{ exportId: string; status: string }> {
  // BACKEND HANDOFF: Create export job, notify compliance team
  console.log('[PII] Export requested for', customerId, 'by', requestedBy);
  
  return {
    exportId: `export-${Date.now()}`,
    status: 'processing',
  };
}

/**
 * Delete customer data (Right to be forgotten)
 * BACKEND HANDOFF: Replace with actual data deletion workflow
 */
export async function requestDataDeletion(
  customerId: string,
  requestedBy: string,
  reason: string
): Promise<{ requestId: string; status: string; estimatedCompletion: string }> {
  // BACKEND HANDOFF: Create deletion job, requires approval
  console.log('[PII] Deletion requested for', customerId, 'by', requestedBy);
  
  return {
    requestId: `delete-${Date.now()}`,
    status: 'pending_approval',
    estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
