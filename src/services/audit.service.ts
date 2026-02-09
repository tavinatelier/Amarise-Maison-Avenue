/**
 * AMARISÉ Audit & Accountability Service
 * 
 * BACKEND HANDOFF: Replace mock data with immutable audit log storage.
 * Audit logs must NEVER be deletable or modifiable.
 */

// ============================================
// TYPES
// ============================================

export type AuditAction = 
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'archive'
  | 'restore'
  | 'view_pii'
  | 'export_data'
  | 'approve'
  | 'reject'
  | 'refund'
  | 'login'
  | 'logout'
  | 'permission_change'
  | 'price_change'
  | 'inventory_change'
  | 'status_change'
  | 'bulk_action';

export type ResourceType = 
  | 'product'
  | 'order'
  | 'customer'
  | 'content'
  | 'collection'
  | 'admin_user'
  | 'settings'
  | 'approval'
  | 'incident';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  
  // Actor
  adminId: string;
  adminEmail: string;
  adminRole: string;
  adminCountry: string;
  
  // Action
  action: AuditAction;
  resourceType: ResourceType;
  resourceId: string;
  resourceName?: string;
  
  // Change details
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  changedFields?: string[];
  
  // Context
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  
  // Flags
  isSensitive: boolean;
  requiresReview: boolean;
  countryScope: string[];
}

export interface AuditQuery {
  resourceType?: ResourceType;
  resourceId?: string;
  adminId?: string;
  action?: AuditAction;
  startDate?: string;
  endDate?: string;
  countryScope?: string[];
  limit?: number;
  offset?: number;
}

export interface AuditDiff {
  field: string;
  previousValue: unknown;
  newValue: unknown;
  changedAt: string;
  changedBy: string;
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-001',
    timestamp: '2024-01-15T14:32:00Z',
    adminId: 'admin-001',
    adminEmail: 'na.ops@amarise.com',
    adminRole: 'regional_admin',
    adminCountry: 'US',
    action: 'refund',
    resourceType: 'order',
    resourceId: 'ord-2024-1234',
    resourceName: 'Order #ORD-2024-1234',
    previousState: { status: 'paid', refundAmount: 0 },
    newState: { status: 'refunded', refundAmount: 2450 },
    changedFields: ['status', 'refundAmount'],
    reason: 'Customer received damaged item',
    isSensitive: true,
    requiresReview: false,
    countryScope: ['US'],
  },
  {
    id: 'audit-002',
    timestamp: '2024-01-15T11:15:00Z',
    adminId: 'admin-002',
    adminEmail: 'eu.ops@amarise.com',
    adminRole: 'regional_admin',
    adminCountry: 'GB',
    action: 'price_change',
    resourceType: 'product',
    resourceId: 'prod-elan-silk-dress',
    resourceName: 'Élan Silk Dress',
    previousState: { price: { EUR: 1850 } },
    newState: { price: { EUR: 1920 } },
    changedFields: ['price.EUR'],
    reason: 'Currency fluctuation adjustment',
    isSensitive: false,
    requiresReview: true,
    countryScope: ['FR', 'DE', 'IT'],
  },
  {
    id: 'audit-003',
    timestamp: '2024-01-15T09:00:00Z',
    adminId: 'admin-003',
    adminEmail: 'apac.ops@amarise.com',
    adminRole: 'regional_admin',
    adminCountry: 'JP',
    action: 'view_pii',
    resourceType: 'customer',
    resourceId: 'cust-789',
    resourceName: 'Customer #789',
    reason: 'Order support inquiry',
    isSensitive: true,
    requiresReview: false,
    countryScope: ['JP'],
  },
  {
    id: 'audit-004',
    timestamp: '2024-01-14T16:45:00Z',
    adminId: 'admin-001',
    adminEmail: 'na.ops@amarise.com',
    adminRole: 'regional_admin',
    adminCountry: 'US',
    action: 'publish',
    resourceType: 'content',
    resourceId: 'journal-winter-rituals',
    resourceName: 'Winter Rituals Journal',
    previousState: { status: 'draft' },
    newState: { status: 'published' },
    changedFields: ['status'],
    isSensitive: false,
    requiresReview: false,
    countryScope: ['US', 'CA'],
  },
];

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Create audit log entry
 * BACKEND HANDOFF: Replace with immutable database insert
 * CRITICAL: Logs must be write-only, never deletable
 */
export async function createAuditLog(
  entry: Omit<AuditLogEntry, 'id' | 'timestamp'>
): Promise<AuditLogEntry> {
  const newEntry: AuditLogEntry = {
    ...entry,
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  
  // BACKEND HANDOFF: Insert into immutable audit log storage
  console.log('[AUDIT] Created log:', newEntry.id, newEntry.action, newEntry.resourceType);
  
  return newEntry;
}

/**
 * Query audit logs
 * BACKEND HANDOFF: Replace with database query
 */
export async function queryAuditLogs(query: AuditQuery): Promise<AuditLogEntry[]> {
  let results = [...MOCK_AUDIT_LOGS];
  
  if (query.resourceType) {
    results = results.filter(log => log.resourceType === query.resourceType);
  }
  
  if (query.resourceId) {
    results = results.filter(log => log.resourceId === query.resourceId);
  }
  
  if (query.adminId) {
    results = results.filter(log => log.adminId === query.adminId);
  }
  
  if (query.action) {
    results = results.filter(log => log.action === query.action);
  }
  
  if (query.startDate) {
    results = results.filter(log => log.timestamp >= query.startDate!);
  }
  
  if (query.endDate) {
    results = results.filter(log => log.timestamp <= query.endDate!);
  }
  
  if (query.countryScope && query.countryScope.length > 0) {
    results = results.filter(log => 
      log.countryScope.some(c => query.countryScope!.includes(c))
    );
  }
  
  // Sort by timestamp descending
  results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Apply pagination
  const offset = query.offset || 0;
  const limit = query.limit || 50;
  
  return results.slice(offset, offset + limit);
}

/**
 * Get audit log by ID
 * BACKEND HANDOFF: Replace with database query
 */
export async function getAuditLog(id: string): Promise<AuditLogEntry | null> {
  return MOCK_AUDIT_LOGS.find(log => log.id === id) || null;
}

/**
 * Get resource history (all changes to a resource)
 * BACKEND HANDOFF: Replace with database query
 */
export async function getResourceHistory(
  resourceType: ResourceType,
  resourceId: string
): Promise<AuditLogEntry[]> {
  return queryAuditLogs({ resourceType, resourceId });
}

/**
 * Get admin activity log
 * BACKEND HANDOFF: Replace with database query
 */
export async function getAdminActivity(
  adminId: string,
  startDate?: string,
  endDate?: string
): Promise<AuditLogEntry[]> {
  return queryAuditLogs({ adminId, startDate, endDate });
}

/**
 * Get sensitive actions requiring review
 * BACKEND HANDOFF: Replace with database query
 */
export async function getSensitiveActions(
  countryScope?: string[]
): Promise<AuditLogEntry[]> {
  const logs = await queryAuditLogs({ countryScope });
  return logs.filter(log => log.isSensitive || log.requiresReview);
}

/**
 * Generate diff view for resource changes
 * BACKEND HANDOFF: May keep client-side
 */
export function generateDiff(
  previousState: Record<string, unknown>,
  newState: Record<string, unknown>
): AuditDiff[] {
  const diffs: AuditDiff[] = [];
  const allKeys = new Set([...Object.keys(previousState), ...Object.keys(newState)]);
  
  for (const key of allKeys) {
    const prevValue = previousState[key];
    const newValue = newState[key];
    
    if (JSON.stringify(prevValue) !== JSON.stringify(newValue)) {
      diffs.push({
        field: key,
        previousValue: prevValue,
        newValue: newValue,
        changedAt: new Date().toISOString(),
        changedBy: '', // Filled by caller
      });
    }
  }
  
  return diffs;
}

/**
 * Get audit summary for dashboard
 * BACKEND HANDOFF: Replace with database aggregation
 */
export async function getAuditSummary(
  startDate: string,
  endDate: string,
  countryScope?: string[]
): Promise<{
  totalActions: number;
  byAction: Record<AuditAction, number>;
  byResourceType: Record<ResourceType, number>;
  sensitiveActions: number;
}> {
  const logs = await queryAuditLogs({ startDate, endDate, countryScope });
  
  const byAction: Partial<Record<AuditAction, number>> = {};
  const byResourceType: Partial<Record<ResourceType, number>> = {};
  let sensitiveActions = 0;
  
  for (const log of logs) {
    byAction[log.action] = (byAction[log.action] || 0) + 1;
    byResourceType[log.resourceType] = (byResourceType[log.resourceType] || 0) + 1;
    if (log.isSensitive) sensitiveActions++;
  }
  
  return {
    totalActions: logs.length,
    byAction: byAction as Record<AuditAction, number>,
    byResourceType: byResourceType as Record<ResourceType, number>,
    sensitiveActions,
  };
}
