/**
 * AMARISÉ Approval & Governance Service
 * 
 * BACKEND HANDOFF: Replace mock data with real database.
 * Approval workflow must be atomic and auditable.
 */

// ============================================
// TYPES
// ============================================

export type ApprovalType = 
  | 'price_change'
  | 'refund'
  | 'product_publish'
  | 'content_publish'
  | 'country_override'
  | 'discount_creation'
  | 'inventory_adjustment'
  | 'customer_data_export';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled';

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  status: ApprovalStatus;
  
  // Request details
  requestedBy: string;
  requestedByEmail: string;
  requestedAt: string;
  expiresAt: string;
  
  // Review details
  reviewedBy?: string;
  reviewedByEmail?: string;
  reviewedAt?: string;
  
  // Content
  title: string;
  description: string;
  resourceType: string;
  resourceId: string;
  
  // Change details
  previousValue?: unknown;
  proposedValue?: unknown;
  
  // Metadata
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  rejectionReason?: string;
  countryScope: string[];
  
  // Thresholds
  requiresMultipleApprovers: boolean;
  approversRequired: number;
  currentApprovals: string[];
}

export interface ApprovalThreshold {
  type: ApprovalType;
  thresholdValue?: number; // e.g., refund amount
  requiresApproval: boolean;
  approversRequired: number;
  autoApproveBelow?: number;
  expiryHours: number;
}

// ============================================
// MOCK DATA
// ============================================

const APPROVAL_THRESHOLDS: ApprovalThreshold[] = [
  {
    type: 'price_change',
    requiresApproval: true,
    approversRequired: 2,
    expiryHours: 48,
  },
  {
    type: 'refund',
    thresholdValue: 500,
    requiresApproval: true,
    approversRequired: 1,
    autoApproveBelow: 100,
    expiryHours: 24,
  },
  {
    type: 'product_publish',
    requiresApproval: true,
    approversRequired: 1,
    expiryHours: 72,
  },
  {
    type: 'content_publish',
    requiresApproval: true,
    approversRequired: 1,
    expiryHours: 48,
  },
  {
    type: 'country_override',
    requiresApproval: true,
    approversRequired: 2,
    expiryHours: 24,
  },
  {
    type: 'discount_creation',
    requiresApproval: true,
    approversRequired: 1,
    autoApproveBelow: 10, // percentage
    expiryHours: 24,
  },
  {
    type: 'inventory_adjustment',
    requiresApproval: false,
    approversRequired: 0,
    expiryHours: 0,
  },
  {
    type: 'customer_data_export',
    requiresApproval: true,
    approversRequired: 2,
    expiryHours: 24,
  },
];

const MOCK_PENDING_APPROVALS: ApprovalRequest[] = [
  {
    id: 'apr-001',
    type: 'price_change',
    status: 'pending',
    requestedBy: 'admin-002',
    requestedByEmail: 'eu.ops@amarise.com',
    requestedAt: '2024-01-15T10:30:00Z',
    expiresAt: '2024-01-17T10:30:00Z',
    title: 'Élan Silk Dress - EU Price Adjustment',
    description: 'Adjusting EU pricing to reflect currency fluctuations',
    resourceType: 'product',
    resourceId: 'prod-elan-silk-dress',
    previousValue: { EUR: 1850 },
    proposedValue: { EUR: 1920 },
    priority: 'medium',
    countryScope: ['FR', 'DE', 'IT'],
    requiresMultipleApprovers: true,
    approversRequired: 2,
    currentApprovals: ['admin-005'],
  },
  {
    id: 'apr-002',
    type: 'refund',
    status: 'pending',
    requestedBy: 'admin-001',
    requestedByEmail: 'na.ops@amarise.com',
    requestedAt: '2024-01-15T14:00:00Z',
    expiresAt: '2024-01-16T14:00:00Z',
    title: 'Order #ORD-2024-1234 - Full Refund Request',
    description: 'Customer received damaged item, requesting full refund of $2,450',
    resourceType: 'order',
    resourceId: 'ord-2024-1234',
    previousValue: { status: 'paid', amount: 2450 },
    proposedValue: { status: 'refunded', amount: 0 },
    priority: 'high',
    notes: 'Photos of damage attached to order notes',
    countryScope: ['US'],
    requiresMultipleApprovers: false,
    approversRequired: 1,
    currentApprovals: [],
  },
  {
    id: 'apr-003',
    type: 'product_publish',
    status: 'pending',
    requestedBy: 'admin-003',
    requestedByEmail: 'apac.ops@amarise.com',
    requestedAt: '2024-01-14T08:00:00Z',
    expiresAt: '2024-01-17T08:00:00Z',
    title: 'New Collection: Spring Awakening',
    description: 'Publishing 12 new products for Spring 2024 collection',
    resourceType: 'collection',
    resourceId: 'col-spring-2024',
    priority: 'medium',
    countryScope: ['JP', 'AU', 'IN'],
    requiresMultipleApprovers: false,
    approversRequired: 1,
    currentApprovals: [],
  },
];

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get approval thresholds configuration
 * BACKEND HANDOFF: Replace with API call
 */
export async function getApprovalThresholds(): Promise<ApprovalThreshold[]> {
  return APPROVAL_THRESHOLDS;
}

/**
 * Check if action requires approval
 * BACKEND HANDOFF: Replace with API call
 */
export async function requiresApproval(
  type: ApprovalType,
  value?: number
): Promise<{ required: boolean; approversNeeded: number }> {
  const threshold = APPROVAL_THRESHOLDS.find(t => t.type === type);
  
  if (!threshold || !threshold.requiresApproval) {
    return { required: false, approversNeeded: 0 };
  }
  
  // Check auto-approve threshold
  if (threshold.autoApproveBelow && value !== undefined && value < threshold.autoApproveBelow) {
    return { required: false, approversNeeded: 0 };
  }
  
  return { required: true, approversNeeded: threshold.approversRequired };
}

/**
 * Create approval request
 * BACKEND HANDOFF: Replace with API call, must be atomic
 */
export async function createApprovalRequest(
  request: Omit<ApprovalRequest, 'id' | 'status' | 'expiresAt' | 'currentApprovals'>
): Promise<ApprovalRequest> {
  const threshold = APPROVAL_THRESHOLDS.find(t => t.type === request.type);
  const expiryHours = threshold?.expiryHours || 24;
  
  const newRequest: ApprovalRequest = {
    ...request,
    id: `apr-${Date.now()}`,
    status: 'pending',
    expiresAt: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
    currentApprovals: [],
  };
  
  // BACKEND HANDOFF: Insert into database
  console.log('[APPROVAL] Created request:', newRequest.id);
  
  return newRequest;
}

/**
 * Get pending approvals for admin
 * BACKEND HANDOFF: Replace with API call, filter by admin's permissions
 */
export async function getPendingApprovals(adminId: string): Promise<ApprovalRequest[]> {
  // BACKEND HANDOFF: Filter by admin's country/region access
  return MOCK_PENDING_APPROVALS.filter(a => a.status === 'pending');
}

/**
 * Get approval by ID
 * BACKEND HANDOFF: Replace with API call
 */
export async function getApproval(id: string): Promise<ApprovalRequest | null> {
  return MOCK_PENDING_APPROVALS.find(a => a.id === id) || null;
}

/**
 * Approve request
 * BACKEND HANDOFF: Replace with API call, must be atomic with audit log
 */
export async function approveRequest(
  requestId: string,
  approverId: string,
  approverEmail: string,
  notes?: string
): Promise<ApprovalRequest> {
  const request = await getApproval(requestId);
  if (!request) {
    throw new Error('Approval request not found');
  }
  
  if (request.status !== 'pending') {
    throw new Error('Request is no longer pending');
  }
  
  // Add to approvals list
  const updatedApprovals = [...request.currentApprovals, approverId];
  
  // Check if enough approvals
  const isFullyApproved = updatedApprovals.length >= request.approversRequired;
  
  const updatedRequest: ApprovalRequest = {
    ...request,
    status: isFullyApproved ? 'approved' : 'pending',
    reviewedBy: isFullyApproved ? approverId : undefined,
    reviewedByEmail: isFullyApproved ? approverEmail : undefined,
    reviewedAt: isFullyApproved ? new Date().toISOString() : undefined,
    currentApprovals: updatedApprovals,
    notes: notes || request.notes,
  };
  
  // BACKEND HANDOFF: Update database, create audit log
  console.log('[APPROVAL] Approved:', requestId, 'by', approverId);
  
  return updatedRequest;
}

/**
 * Reject request
 * BACKEND HANDOFF: Replace with API call, must be atomic with audit log
 */
export async function rejectRequest(
  requestId: string,
  rejecterId: string,
  rejecterEmail: string,
  reason: string
): Promise<ApprovalRequest> {
  const request = await getApproval(requestId);
  if (!request) {
    throw new Error('Approval request not found');
  }
  
  if (request.status !== 'pending') {
    throw new Error('Request is no longer pending');
  }
  
  const updatedRequest: ApprovalRequest = {
    ...request,
    status: 'rejected',
    reviewedBy: rejecterId,
    reviewedByEmail: rejecterEmail,
    reviewedAt: new Date().toISOString(),
    rejectionReason: reason,
  };
  
  // BACKEND HANDOFF: Update database, create audit log
  console.log('[APPROVAL] Rejected:', requestId, 'by', rejecterId);
  
  return updatedRequest;
}

/**
 * Cancel approval request
 * BACKEND HANDOFF: Replace with API call
 */
export async function cancelApprovalRequest(
  requestId: string,
  cancelledBy: string
): Promise<ApprovalRequest> {
  const request = await getApproval(requestId);
  if (!request) {
    throw new Error('Approval request not found');
  }
  
  if (request.requestedBy !== cancelledBy) {
    throw new Error('Only requester can cancel');
  }
  
  const updatedRequest: ApprovalRequest = {
    ...request,
    status: 'cancelled',
  };
  
  // BACKEND HANDOFF: Update database
  console.log('[APPROVAL] Cancelled:', requestId);
  
  return updatedRequest;
}

/**
 * Get approval history for resource
 * BACKEND HANDOFF: Replace with API call
 */
export async function getApprovalHistory(
  resourceType: string,
  resourceId: string
): Promise<ApprovalRequest[]> {
  // BACKEND HANDOFF: Query database
  return MOCK_PENDING_APPROVALS.filter(
    a => a.resourceType === resourceType && a.resourceId === resourceId
  );
}
