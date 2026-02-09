/**
 * AMARISÉ Incident & Crisis Management Service
 * 
 * BACKEND HANDOFF: Replace mock data with real database.
 * Incident controls must be immediately effective globally.
 */

// ============================================
// TYPES
// ============================================

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'investigating' | 'mitigating' | 'resolved' | 'post_mortem';
export type IncidentCategory = 
  | 'payment_failure'
  | 'shipping_delay'
  | 'inventory_issue'
  | 'website_error'
  | 'fraud_alert'
  | 'customer_complaint'
  | 'data_breach'
  | 'vendor_issue'
  | 'other';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  category: IncidentCategory;
  
  // Ownership
  reportedBy: string;
  reportedByEmail: string;
  reportedAt: string;
  assignedTo?: string;
  assignedToEmail?: string;
  
  // Resolution
  resolvedAt?: string;
  resolvedBy?: string;
  resolution?: string;
  
  // Scope
  affectedCountries: string[];
  affectedOrders?: string[];
  affectedProducts?: string[];
  
  // Timeline
  updates: IncidentUpdate[];
  
  // Metrics
  customersAffected?: number;
  estimatedImpact?: number; // Revenue impact
}

export interface IncidentUpdate {
  id: string;
  incidentId: string;
  timestamp: string;
  author: string;
  authorEmail: string;
  message: string;
  statusChange?: IncidentStatus;
  isPublic: boolean;
}

export interface EmergencyControls {
  incidentModeActive: boolean;
  activatedAt?: string;
  activatedBy?: string;
  
  // Freezes
  freezePriceChanges: boolean;
  freezeRefunds: boolean;
  freezeCMSPublishing: boolean;
  freezeCheckout: boolean;
  freezeNewOrders: boolean;
  
  // Overrides
  maintenanceMessage?: string;
  redirectUrl?: string;
  
  // Broadcast
  internalBroadcast?: string;
  broadcastCreatedAt?: string;
  broadcastCreatedBy?: string;
}

// ============================================
// MOCK DATA
// ============================================

let EMERGENCY_CONTROLS: EmergencyControls = {
  incidentModeActive: false,
  freezePriceChanges: false,
  freezeRefunds: false,
  freezeCMSPublishing: false,
  freezeCheckout: false,
  freezeNewOrders: false,
};

const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    title: 'Payment Gateway Timeout - EU Region',
    description: 'Stripe payments experiencing 30% timeout rate in EU region',
    severity: 'high',
    status: 'resolved',
    category: 'payment_failure',
    reportedBy: 'admin-002',
    reportedByEmail: 'eu.ops@amarise.com',
    reportedAt: '2024-01-10T14:30:00Z',
    assignedTo: 'admin-002',
    assignedToEmail: 'eu.ops@amarise.com',
    resolvedAt: '2024-01-10T16:45:00Z',
    resolvedBy: 'admin-002',
    resolution: 'Stripe confirmed regional routing issue, resolved on their end',
    affectedCountries: ['GB', 'FR', 'DE', 'IT'],
    affectedOrders: ['ord-1001', 'ord-1002', 'ord-1003'],
    customersAffected: 23,
    estimatedImpact: 45000,
    updates: [
      {
        id: 'upd-001',
        incidentId: 'inc-001',
        timestamp: '2024-01-10T14:30:00Z',
        author: 'admin-002',
        authorEmail: 'eu.ops@amarise.com',
        message: 'Incident reported: Payment timeouts detected in EU',
        isPublic: false,
      },
      {
        id: 'upd-002',
        incidentId: 'inc-001',
        timestamp: '2024-01-10T15:00:00Z',
        author: 'admin-002',
        authorEmail: 'eu.ops@amarise.com',
        message: 'Contacted Stripe support, investigating',
        statusChange: 'investigating',
        isPublic: false,
      },
      {
        id: 'upd-003',
        incidentId: 'inc-001',
        timestamp: '2024-01-10T16:45:00Z',
        author: 'admin-002',
        authorEmail: 'eu.ops@amarise.com',
        message: 'Stripe confirmed and resolved routing issue',
        statusChange: 'resolved',
        isPublic: false,
      },
    ],
  },
];

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get current emergency controls
 * BACKEND HANDOFF: Replace with database/cache lookup
 */
export async function getEmergencyControls(): Promise<EmergencyControls> {
  return { ...EMERGENCY_CONTROLS };
}

/**
 * Activate incident mode
 * BACKEND HANDOFF: Must be immediately effective globally
 */
export async function activateIncidentMode(
  adminId: string,
  controls: Partial<EmergencyControls>
): Promise<EmergencyControls> {
  EMERGENCY_CONTROLS = {
    ...EMERGENCY_CONTROLS,
    ...controls,
    incidentModeActive: true,
    activatedAt: new Date().toISOString(),
    activatedBy: adminId,
  };
  
  // BACKEND HANDOFF: Update database, broadcast to all services
  console.log('[INCIDENT] Mode activated by', adminId);
  
  return { ...EMERGENCY_CONTROLS };
}

/**
 * Deactivate incident mode
 * BACKEND HANDOFF: Replace with database update
 */
export async function deactivateIncidentMode(adminId: string): Promise<EmergencyControls> {
  EMERGENCY_CONTROLS = {
    incidentModeActive: false,
    freezePriceChanges: false,
    freezeRefunds: false,
    freezeCMSPublishing: false,
    freezeCheckout: false,
    freezeNewOrders: false,
  };
  
  // BACKEND HANDOFF: Update database, broadcast to all services
  console.log('[INCIDENT] Mode deactivated by', adminId);
  
  return { ...EMERGENCY_CONTROLS };
}

/**
 * Set internal broadcast message
 * BACKEND HANDOFF: Replace with real-time broadcast system
 */
export async function setInternalBroadcast(
  message: string,
  adminId: string
): Promise<void> {
  EMERGENCY_CONTROLS.internalBroadcast = message;
  EMERGENCY_CONTROLS.broadcastCreatedAt = new Date().toISOString();
  EMERGENCY_CONTROLS.broadcastCreatedBy = adminId;
  
  // BACKEND HANDOFF: Broadcast to all admin sessions
  console.log('[INCIDENT] Broadcast set:', message);
}

/**
 * Clear internal broadcast
 * BACKEND HANDOFF: Replace with database update
 */
export async function clearInternalBroadcast(): Promise<void> {
  EMERGENCY_CONTROLS.internalBroadcast = undefined;
  EMERGENCY_CONTROLS.broadcastCreatedAt = undefined;
  EMERGENCY_CONTROLS.broadcastCreatedBy = undefined;
}

/**
 * Create new incident
 * BACKEND HANDOFF: Replace with database insert
 */
export async function createIncident(
  incident: Omit<Incident, 'id' | 'updates'>
): Promise<Incident> {
  const newIncident: Incident = {
    ...incident,
    id: `inc-${Date.now()}`,
    updates: [
      {
        id: `upd-${Date.now()}`,
        incidentId: `inc-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author: incident.reportedBy,
        authorEmail: incident.reportedByEmail,
        message: 'Incident created',
        isPublic: false,
      },
    ],
  };
  
  // BACKEND HANDOFF: Insert into database
  console.log('[INCIDENT] Created:', newIncident.id);
  
  return newIncident;
}

/**
 * Get all incidents
 * BACKEND HANDOFF: Replace with database query
 */
export async function getIncidents(
  status?: IncidentStatus[],
  countryScope?: string[]
): Promise<Incident[]> {
  let results = [...MOCK_INCIDENTS];
  
  if (status && status.length > 0) {
    results = results.filter(inc => status.includes(inc.status));
  }
  
  if (countryScope && countryScope.length > 0) {
    results = results.filter(inc =>
      inc.affectedCountries.some(c => countryScope.includes(c))
    );
  }
  
  return results.sort(
    (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
  );
}

/**
 * Get incident by ID
 * BACKEND HANDOFF: Replace with database query
 */
export async function getIncident(id: string): Promise<Incident | null> {
  return MOCK_INCIDENTS.find(inc => inc.id === id) || null;
}

/**
 * Add incident update
 * BACKEND HANDOFF: Replace with database insert
 */
export async function addIncidentUpdate(
  incidentId: string,
  update: Omit<IncidentUpdate, 'id' | 'incidentId' | 'timestamp'>
): Promise<IncidentUpdate> {
  const newUpdate: IncidentUpdate = {
    ...update,
    id: `upd-${Date.now()}`,
    incidentId,
    timestamp: new Date().toISOString(),
  };
  
  // BACKEND HANDOFF: Insert into database
  console.log('[INCIDENT] Update added to', incidentId);
  
  return newUpdate;
}

/**
 * Update incident status
 * BACKEND HANDOFF: Replace with database update
 */
export async function updateIncidentStatus(
  incidentId: string,
  status: IncidentStatus,
  adminId: string,
  adminEmail: string,
  message: string
): Promise<Incident> {
  const incident = await getIncident(incidentId);
  if (!incident) {
    throw new Error('Incident not found');
  }
  
  const updatedIncident: Incident = {
    ...incident,
    status,
    resolvedAt: status === 'resolved' ? new Date().toISOString() : incident.resolvedAt,
    resolvedBy: status === 'resolved' ? adminId : incident.resolvedBy,
  };
  
  // Add update
  await addIncidentUpdate(incidentId, {
    author: adminId,
    authorEmail: adminEmail,
    message,
    statusChange: status,
    isPublic: false,
  });
  
  // BACKEND HANDOFF: Update database
  console.log('[INCIDENT] Status updated:', incidentId, status);
  
  return updatedIncident;
}

/**
 * Check if action is blocked by emergency controls
 * BACKEND HANDOFF: Must be checked server-side
 */
export async function isActionBlocked(
  action: 'price_change' | 'refund' | 'cms_publish' | 'checkout' | 'new_order'
): Promise<{ blocked: boolean; reason?: string }> {
  const controls = await getEmergencyControls();
  
  if (!controls.incidentModeActive) {
    return { blocked: false };
  }
  
  const actionMap: Record<string, keyof EmergencyControls> = {
    price_change: 'freezePriceChanges',
    refund: 'freezeRefunds',
    cms_publish: 'freezeCMSPublishing',
    checkout: 'freezeCheckout',
    new_order: 'freezeNewOrders',
  };
  
  const controlKey = actionMap[action];
  if (controlKey && controls[controlKey]) {
    return {
      blocked: true,
      reason: `Action blocked: Emergency controls active since ${controls.activatedAt}`,
    };
  }
  
  return { blocked: false };
}

/**
 * Get active incidents count for dashboard
 * BACKEND HANDOFF: Replace with database count
 */
export async function getActiveIncidentsCount(): Promise<{
  total: number;
  bySeverity: Record<IncidentSeverity, number>;
}> {
  const activeStatuses: IncidentStatus[] = ['open', 'investigating', 'mitigating'];
  const incidents = await getIncidents(activeStatuses);
  
  const bySeverity: Record<IncidentSeverity, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };
  
  for (const inc of incidents) {
    bySeverity[inc.severity]++;
  }
  
  return { total: incidents.length, bySeverity };
}
