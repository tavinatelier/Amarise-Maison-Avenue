/**
 * AMARISÉ Shift Handover & Ops Continuity Service
 * 
 * BACKEND HANDOFF: Replace mock data with real database.
 * Handover notes must persist across shifts and regions.
 */

// ============================================
// TYPES
// ============================================

export type HandoverPriority = 'low' | 'medium' | 'high' | 'urgent';
export type HandoverStatus = 'pending' | 'acknowledged' | 'resolved';
export type HandoverCategory = 
  | 'order_issue'
  | 'customer_escalation'
  | 'inventory_alert'
  | 'refund_pending'
  | 'fraud_review'
  | 'shipping_delay'
  | 'technical_issue'
  | 'general_note';

export interface HandoverNote {
  id: string;
  category: HandoverCategory;
  priority: HandoverPriority;
  status: HandoverStatus;
  
  // Content
  title: string;
  description: string;
  actionRequired?: string;
  
  // Ownership
  createdBy: string;
  createdByEmail: string;
  createdAt: string;
  forRegion: string;
  forShift: string; // e.g., "morning", "afternoon", "night"
  
  // Acknowledgment
  acknowledgedBy?: string;
  acknowledgedByEmail?: string;
  acknowledgedAt?: string;
  
  // Resolution
  resolvedBy?: string;
  resolvedByEmail?: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  
  // References
  relatedOrderId?: string;
  relatedCustomerId?: string;
  relatedIncidentId?: string;
  
  // Expiry
  expiresAt?: string;
}

export interface ShiftOwnership {
  region: string;
  shift: string;
  currentOwner: string;
  currentOwnerEmail: string;
  startedAt: string;
  endsAt: string;
  pendingItems: number;
}

export interface HandoverSummary {
  region: string;
  fromShift: string;
  toShift: string;
  generatedAt: string;
  generatedBy: string;
  
  // Counts
  pendingNotes: number;
  urgentItems: number;
  resolvedToday: number;
  
  // Key items
  topPriorityItems: HandoverNote[];
  
  // Metrics
  ordersProcessed: number;
  refundsProcessed: number;
  escalations: number;
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_HANDOVER_NOTES: HandoverNote[] = [
  {
    id: 'ho-001',
    category: 'customer_escalation',
    priority: 'urgent',
    status: 'pending',
    title: 'VIP Customer - Missing Package',
    description: 'Customer Elena V. (VIP tier) reports package not received. Tracking shows delivered but customer denies receipt.',
    actionRequired: 'Contact shipping carrier, escalate to supervisor if not resolved by EOD',
    createdBy: 'admin-001',
    createdByEmail: 'na.ops@amarise.com',
    createdAt: '2024-01-15T17:30:00Z',
    forRegion: 'NA',
    forShift: 'night',
    relatedOrderId: 'ord-2024-5678',
    relatedCustomerId: 'cust-vip-123',
  },
  {
    id: 'ho-002',
    category: 'refund_pending',
    priority: 'high',
    status: 'pending',
    title: 'Bulk Refund Approval Needed',
    description: '3 refund requests awaiting approval, total value $4,200. All from legitimate returns.',
    actionRequired: 'Review and approve in approval queue',
    createdBy: 'admin-002',
    createdByEmail: 'eu.ops@amarise.com',
    createdAt: '2024-01-15T16:00:00Z',
    forRegion: 'EU',
    forShift: 'morning',
  },
  {
    id: 'ho-003',
    category: 'inventory_alert',
    priority: 'medium',
    status: 'acknowledged',
    title: 'Low Stock - Radiance Serum',
    description: 'Radiance Serum down to 12 units in EU warehouse. Restock expected in 3 days.',
    createdBy: 'admin-002',
    createdByEmail: 'eu.ops@amarise.com',
    createdAt: '2024-01-15T10:00:00Z',
    forRegion: 'EU',
    forShift: 'afternoon',
    acknowledgedBy: 'admin-004',
    acknowledgedByEmail: 'eu.ops2@amarise.com',
    acknowledgedAt: '2024-01-15T14:00:00Z',
  },
];

const MOCK_SHIFT_OWNERSHIP: ShiftOwnership[] = [
  {
    region: 'NA',
    shift: 'day',
    currentOwner: 'admin-001',
    currentOwnerEmail: 'na.ops@amarise.com',
    startedAt: '2024-01-15T09:00:00Z',
    endsAt: '2024-01-15T17:00:00Z',
    pendingItems: 2,
  },
  {
    region: 'EU',
    shift: 'day',
    currentOwner: 'admin-002',
    currentOwnerEmail: 'eu.ops@amarise.com',
    startedAt: '2024-01-15T09:00:00Z',
    endsAt: '2024-01-15T17:00:00Z',
    pendingItems: 1,
  },
  {
    region: 'APAC',
    shift: 'day',
    currentOwner: 'admin-003',
    currentOwnerEmail: 'apac.ops@amarise.com',
    startedAt: '2024-01-15T09:00:00Z',
    endsAt: '2024-01-15T17:00:00Z',
    pendingItems: 0,
  },
];

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Create handover note
 * BACKEND HANDOFF: Replace with database insert
 */
export async function createHandoverNote(
  note: Omit<HandoverNote, 'id' | 'status'>
): Promise<HandoverNote> {
  const newNote: HandoverNote = {
    ...note,
    id: `ho-${Date.now()}`,
    status: 'pending',
  };
  
  // BACKEND HANDOFF: Insert into database
  console.log('[HANDOVER] Note created:', newNote.id);
  
  return newNote;
}

/**
 * Get handover notes for region/shift
 * BACKEND HANDOFF: Replace with database query
 */
export async function getHandoverNotes(
  region: string,
  shift?: string,
  status?: HandoverStatus[]
): Promise<HandoverNote[]> {
  let results = MOCK_HANDOVER_NOTES.filter(note => note.forRegion === region);
  
  if (shift) {
    results = results.filter(note => note.forShift === shift);
  }
  
  if (status && status.length > 0) {
    results = results.filter(note => status.includes(note.status));
  }
  
  return results.sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Get handover note by ID
 * BACKEND HANDOFF: Replace with database query
 */
export async function getHandoverNote(id: string): Promise<HandoverNote | null> {
  return MOCK_HANDOVER_NOTES.find(note => note.id === id) || null;
}

/**
 * Acknowledge handover note
 * BACKEND HANDOFF: Replace with database update
 */
export async function acknowledgeHandoverNote(
  noteId: string,
  adminId: string,
  adminEmail: string
): Promise<HandoverNote> {
  const note = await getHandoverNote(noteId);
  if (!note) {
    throw new Error('Handover note not found');
  }
  
  const updatedNote: HandoverNote = {
    ...note,
    status: 'acknowledged',
    acknowledgedBy: adminId,
    acknowledgedByEmail: adminEmail,
    acknowledgedAt: new Date().toISOString(),
  };
  
  // BACKEND HANDOFF: Update database
  console.log('[HANDOVER] Note acknowledged:', noteId);
  
  return updatedNote;
}

/**
 * Resolve handover note
 * BACKEND HANDOFF: Replace with database update
 */
export async function resolveHandoverNote(
  noteId: string,
  adminId: string,
  adminEmail: string,
  resolutionNotes: string
): Promise<HandoverNote> {
  const note = await getHandoverNote(noteId);
  if (!note) {
    throw new Error('Handover note not found');
  }
  
  const updatedNote: HandoverNote = {
    ...note,
    status: 'resolved',
    resolvedBy: adminId,
    resolvedByEmail: adminEmail,
    resolvedAt: new Date().toISOString(),
    resolutionNotes,
  };
  
  // BACKEND HANDOFF: Update database
  console.log('[HANDOVER] Note resolved:', noteId);
  
  return updatedNote;
}

/**
 * Get current shift ownership
 * BACKEND HANDOFF: Replace with database query
 */
export async function getShiftOwnership(region: string): Promise<ShiftOwnership | null> {
  return MOCK_SHIFT_OWNERSHIP.find(s => s.region === region) || null;
}

/**
 * Get all shift ownerships
 * BACKEND HANDOFF: Replace with database query
 */
export async function getAllShiftOwnerships(): Promise<ShiftOwnership[]> {
  return MOCK_SHIFT_OWNERSHIP;
}

/**
 * Start shift
 * BACKEND HANDOFF: Replace with database update
 */
export async function startShift(
  region: string,
  shift: string,
  adminId: string,
  adminEmail: string,
  durationHours: number = 8
): Promise<ShiftOwnership> {
  const now = new Date();
  const endsAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);
  
  const pendingNotes = await getHandoverNotes(region, undefined, ['pending']);
  
  const ownership: ShiftOwnership = {
    region,
    shift,
    currentOwner: adminId,
    currentOwnerEmail: adminEmail,
    startedAt: now.toISOString(),
    endsAt: endsAt.toISOString(),
    pendingItems: pendingNotes.length,
  };
  
  // BACKEND HANDOFF: Update database
  console.log('[HANDOVER] Shift started:', region, shift, adminId);
  
  return ownership;
}

/**
 * End shift and generate summary
 * BACKEND HANDOFF: Replace with database query + insert
 */
export async function endShift(
  region: string,
  adminId: string,
  toShift: string
): Promise<HandoverSummary> {
  const ownership = await getShiftOwnership(region);
  if (!ownership) {
    throw new Error('No active shift found');
  }
  
  const pendingNotes = await getHandoverNotes(region, undefined, ['pending']);
  const urgentNotes = pendingNotes.filter(n => n.priority === 'urgent' || n.priority === 'high');
  
  const summary: HandoverSummary = {
    region,
    fromShift: ownership.shift,
    toShift,
    generatedAt: new Date().toISOString(),
    generatedBy: adminId,
    pendingNotes: pendingNotes.length,
    urgentItems: urgentNotes.length,
    resolvedToday: 5, // BACKEND HANDOFF: Calculate from database
    topPriorityItems: urgentNotes.slice(0, 5),
    ordersProcessed: 12, // BACKEND HANDOFF: Calculate from database
    refundsProcessed: 2, // BACKEND HANDOFF: Calculate from database
    escalations: 1, // BACKEND HANDOFF: Calculate from database
  };
  
  // BACKEND HANDOFF: Store summary, end shift
  console.log('[HANDOVER] Shift ended:', region, ownership.shift);
  
  return summary;
}

/**
 * Get pending items count by region
 * BACKEND HANDOFF: Replace with database aggregation
 */
export async function getPendingItemsByRegion(): Promise<Record<string, number>> {
  const regions = ['NA', 'EU', 'APAC', 'MEA'];
  const counts: Record<string, number> = {};
  
  for (const region of regions) {
    const notes = await getHandoverNotes(region, undefined, ['pending']);
    counts[region] = notes.length;
  }
  
  return counts;
}
