/**
 * AMARISÉ SOP (Standard Operating Procedures) & Knowledge Service
 * 
 * BACKEND HANDOFF: Replace mock data with real CMS/database.
 * SOPs must be versioned and auditable.
 */

// ============================================
// TYPES
// ============================================

export type SOPCategory = 
  | 'order_management'
  | 'refunds_returns'
  | 'customer_service'
  | 'fraud_prevention'
  | 'shipping_logistics'
  | 'inventory_management'
  | 'content_publishing'
  | 'incident_response'
  | 'compliance'
  | 'onboarding';

export type SOPStatus = 'draft' | 'published' | 'archived';

export interface SOPDocument {
  id: string;
  title: string;
  category: SOPCategory;
  status: SOPStatus;
  
  // Content
  summary: string;
  content: string; // Markdown
  steps?: SOPStep[];
  
  // Versioning
  version: number;
  publishedAt?: string;
  publishedBy?: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  
  // Access
  accessLevel: 'all' | 'regional_admin' | 'super_admin' | 'founder';
  applicableRegions: string[]; // Empty = all regions
  
  // Linking
  relatedSOPs: string[];
  relatedIncidentTypes?: string[];
}

export interface SOPStep {
  order: number;
  title: string;
  description: string;
  warningNote?: string;
  requiresApproval?: boolean;
}

export interface SOPVersion {
  sopId: string;
  version: number;
  content: string;
  createdAt: string;
  createdBy: string;
  changeNotes: string;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  category: SOPCategory;
  
  // Quick reference
  whenToUse: string;
  keySteps: string[];
  escalationPath: string;
  
  // Links
  linkedSOPs: string[];
  linkedTemplates?: string[];
  
  // Metadata
  lastUpdatedAt: string;
  lastUpdatedBy: string;
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_SOPS: SOPDocument[] = [
  {
    id: 'sop-refund-standard',
    title: 'Standard Refund Process',
    category: 'refunds_returns',
    status: 'published',
    summary: 'Step-by-step process for handling standard refund requests',
    content: `
# Standard Refund Process

## Overview
This SOP covers the standard refund process for orders where the customer has received the item and wishes to return it.

## Prerequisites
- Order must be within 30-day return window
- Item must be unused and in original packaging
- Customer must have provided return reason

## Process Steps

### Step 1: Verify Eligibility
1. Check order date against 30-day policy
2. Verify item condition from customer photos
3. Confirm return reason is valid

### Step 2: Generate Return Label
1. Open shipping portal
2. Generate prepaid return label
3. Email label to customer

### Step 3: Process Refund
1. Wait for item receipt confirmation
2. Inspect returned item
3. Process refund through payment portal
4. Send confirmation email

## Escalation
If refund exceeds $500, escalate to regional supervisor for approval.

## Related Documents
- Return Policy
- Shipping Guidelines
- Customer Communication Templates
    `,
    steps: [
      { order: 1, title: 'Verify Eligibility', description: 'Check order date and return policy compliance' },
      { order: 2, title: 'Generate Return Label', description: 'Create prepaid shipping label for customer' },
      { order: 3, title: 'Process Refund', description: 'Complete refund after item inspection', requiresApproval: false },
    ],
    version: 3,
    publishedAt: '2024-01-01T00:00:00Z',
    publishedBy: 'admin-super',
    lastUpdatedAt: '2024-01-10T00:00:00Z',
    lastUpdatedBy: 'admin-super',
    accessLevel: 'all',
    applicableRegions: [],
    relatedSOPs: ['sop-refund-exception', 'sop-shipping-return'],
  },
  {
    id: 'sop-fraud-review',
    title: 'Fraud Review Process',
    category: 'fraud_prevention',
    status: 'published',
    summary: 'Guidelines for reviewing and handling suspected fraudulent orders',
    content: `
# Fraud Review Process

## Overview
This SOP outlines the process for reviewing orders flagged as potentially fraudulent.

## Red Flags
- Shipping address differs from billing address
- Multiple failed payment attempts
- Unusually large first-time order
- Expedited shipping to new address

## Review Steps

### Step 1: Initial Assessment
1. Review order details
2. Check customer history
3. Verify payment information matches

### Step 2: Additional Verification
1. Contact customer via phone
2. Request additional ID verification
3. Cross-reference with fraud database

### Step 3: Decision
- Approve: Clear order for fulfillment
- Reject: Cancel order, flag customer
- Escalate: Send to fraud team for review

## IMPORTANT
Never communicate fraud suspicions to the customer. Use neutral language.
    `,
    steps: [
      { order: 1, title: 'Initial Assessment', description: 'Review order and customer details', warningNote: 'Do not contact customer yet' },
      { order: 2, title: 'Verification', description: 'Perform additional verification steps' },
      { order: 3, title: 'Decision', description: 'Approve, reject, or escalate the order', requiresApproval: true },
    ],
    version: 2,
    publishedAt: '2024-01-05T00:00:00Z',
    publishedBy: 'admin-super',
    lastUpdatedAt: '2024-01-12T00:00:00Z',
    lastUpdatedBy: 'admin-super',
    accessLevel: 'regional_admin',
    applicableRegions: [],
    relatedSOPs: ['sop-order-cancel'],
    relatedIncidentTypes: ['fraud_alert'],
  },
  {
    id: 'sop-incident-response',
    title: 'Incident Response Protocol',
    category: 'incident_response',
    status: 'published',
    summary: 'Emergency response protocol for critical incidents',
    content: `
# Incident Response Protocol

## Severity Levels
- **Critical**: System down, data breach, major payment issues
- **High**: Significant degradation, multiple customer impact
- **Medium**: Limited impact, workarounds available
- **Low**: Minor issues, no customer impact

## Immediate Actions (Critical)
1. Activate incident mode in admin panel
2. Notify on-call supervisor
3. Create incident record
4. Begin investigation

## Communication
- Internal: Use incident broadcast
- External: Do not communicate until approved

## Escalation Path
1. Regional Admin → Regional Supervisor
2. Regional Supervisor → Global Ops Lead
3. Global Ops Lead → Founder (Critical only)
    `,
    version: 1,
    publishedAt: '2024-01-01T00:00:00Z',
    publishedBy: 'admin-super',
    lastUpdatedAt: '2024-01-01T00:00:00Z',
    lastUpdatedBy: 'admin-super',
    accessLevel: 'all',
    applicableRegions: [],
    relatedSOPs: [],
    relatedIncidentTypes: ['website_error', 'payment_failure', 'data_breach'],
  },
];

const MOCK_PLAYBOOKS: Playbook[] = [
  {
    id: 'pb-angry-customer',
    title: 'Handling Angry Customers',
    description: 'Quick reference for de-escalating upset customer situations',
    category: 'customer_service',
    whenToUse: 'Customer is frustrated, using hostile language, or threatening negative reviews',
    keySteps: [
      'Listen without interrupting',
      'Acknowledge their frustration',
      'Apologize for the inconvenience',
      'Offer concrete solution',
      'Follow up within 24 hours',
    ],
    escalationPath: 'Regional Admin → Customer Experience Lead → Founder (VIP only)',
    linkedSOPs: ['sop-refund-exception'],
    lastUpdatedAt: '2024-01-10T00:00:00Z',
    lastUpdatedBy: 'admin-super',
  },
  {
    id: 'pb-vip-handling',
    title: 'VIP Customer Handling',
    description: 'Special procedures for high-value and VIP customers',
    category: 'customer_service',
    whenToUse: 'Customer flagged as VIP tier or lifetime value > $10,000',
    keySteps: [
      'Prioritize response within 2 hours',
      'Offer premium solutions',
      'Provide direct contact for follow-up',
      'Document interaction thoroughly',
      'Notify supervisor of any issues',
    ],
    escalationPath: 'Immediate escalation to Regional Supervisor',
    linkedSOPs: ['sop-refund-exception'],
    lastUpdatedAt: '2024-01-08T00:00:00Z',
    lastUpdatedBy: 'admin-super',
  },
];

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get all SOPs
 * BACKEND HANDOFF: Replace with database query
 */
export async function getSOPs(
  category?: SOPCategory,
  status?: SOPStatus,
  accessLevel?: string
): Promise<SOPDocument[]> {
  let results = [...MOCK_SOPS];
  
  if (category) {
    results = results.filter(sop => sop.category === category);
  }
  
  if (status) {
    results = results.filter(sop => sop.status === status);
  }
  
  if (accessLevel) {
    const levelOrder = ['all', 'regional_admin', 'super_admin', 'founder'];
    const userLevel = levelOrder.indexOf(accessLevel);
    results = results.filter(sop => levelOrder.indexOf(sop.accessLevel) <= userLevel);
  }
  
  return results;
}

/**
 * Get SOP by ID
 * BACKEND HANDOFF: Replace with database query
 */
export async function getSOP(id: string): Promise<SOPDocument | null> {
  return MOCK_SOPS.find(sop => sop.id === id) || null;
}

/**
 * Search SOPs
 * BACKEND HANDOFF: Replace with full-text search
 */
export async function searchSOPs(query: string): Promise<SOPDocument[]> {
  const lowerQuery = query.toLowerCase();
  return MOCK_SOPS.filter(sop =>
    sop.title.toLowerCase().includes(lowerQuery) ||
    sop.summary.toLowerCase().includes(lowerQuery) ||
    sop.content.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get SOPs related to incident type
 * BACKEND HANDOFF: Replace with database query
 */
export async function getSOPsForIncidentType(incidentType: string): Promise<SOPDocument[]> {
  return MOCK_SOPS.filter(sop =>
    sop.relatedIncidentTypes?.includes(incidentType)
  );
}

/**
 * Get all playbooks
 * BACKEND HANDOFF: Replace with database query
 */
export async function getPlaybooks(category?: SOPCategory): Promise<Playbook[]> {
  if (category) {
    return MOCK_PLAYBOOKS.filter(pb => pb.category === category);
  }
  return MOCK_PLAYBOOKS;
}

/**
 * Get playbook by ID
 * BACKEND HANDOFF: Replace with database query
 */
export async function getPlaybook(id: string): Promise<Playbook | null> {
  return MOCK_PLAYBOOKS.find(pb => pb.id === id) || null;
}

/**
 * Create SOP draft
 * BACKEND HANDOFF: Replace with database insert
 */
export async function createSOPDraft(
  sop: Omit<SOPDocument, 'id' | 'status' | 'version' | 'publishedAt' | 'publishedBy'>
): Promise<SOPDocument> {
  const newSOP: SOPDocument = {
    ...sop,
    id: `sop-${Date.now()}`,
    status: 'draft',
    version: 1,
  };
  
  // BACKEND HANDOFF: Insert into database
  console.log('[SOP] Draft created:', newSOP.id);
  
  return newSOP;
}

/**
 * Publish SOP
 * BACKEND HANDOFF: Replace with database update + versioning
 */
export async function publishSOP(
  sopId: string,
  publisherId: string
): Promise<SOPDocument> {
  const sop = await getSOP(sopId);
  if (!sop) {
    throw new Error('SOP not found');
  }
  
  const publishedSOP: SOPDocument = {
    ...sop,
    status: 'published',
    version: sop.version + 1,
    publishedAt: new Date().toISOString(),
    publishedBy: publisherId,
  };
  
  // BACKEND HANDOFF: Update database, create version record
  console.log('[SOP] Published:', sopId, 'version', publishedSOP.version);
  
  return publishedSOP;
}

/**
 * Get SOP version history
 * BACKEND HANDOFF: Replace with database query
 */
export async function getSOPVersionHistory(sopId: string): Promise<SOPVersion[]> {
  // BACKEND HANDOFF: Query version history table
  return [
    {
      sopId,
      version: 1,
      content: 'Initial version',
      createdAt: '2024-01-01T00:00:00Z',
      createdBy: 'admin-super',
      changeNotes: 'Initial publication',
    },
  ];
}

/**
 * Get SOP categories with counts
 * BACKEND HANDOFF: Replace with database aggregation
 */
export async function getSOPCategories(): Promise<Array<{ category: SOPCategory; count: number }>> {
  const counts: Partial<Record<SOPCategory, number>> = {};
  
  for (const sop of MOCK_SOPS) {
    counts[sop.category] = (counts[sop.category] || 0) + 1;
  }
  
  return Object.entries(counts).map(([category, count]) => ({
    category: category as SOPCategory,
    count: count as number,
  }));
}

/**
 * Link SOP to order/customer/incident
 * BACKEND HANDOFF: Replace with database insert
 */
export async function linkSOPToResource(
  sopId: string,
  resourceType: 'order' | 'customer' | 'incident',
  resourceId: string,
  linkedBy: string
): Promise<void> {
  // BACKEND HANDOFF: Insert link record
  console.log('[SOP] Linked:', sopId, 'to', resourceType, resourceId);
}
