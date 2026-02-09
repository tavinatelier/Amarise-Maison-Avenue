# AMARISÉ Approval Flows

## Overview

This document defines all approval workflows for the AMARISÉ platform. Approvals ensure accountability, prevent errors, and maintain operational integrity across regions.

---

## 1. Approval Types

### Price Changes

**Trigger**: Any modification to product pricing

| Field | Requirement |
|-------|-------------|
| Approvers Required | 2 |
| Expiry | 48 hours |
| Auto-Approve Threshold | None |
| Scope | By currency/region |

**Workflow**:
1. Regional admin submits price change request
2. System captures current vs. proposed pricing
3. Request sent to regional supervisor
4. Second approver from same or higher level reviews
5. Both approvals → Change applied
6. Either rejection → Change blocked, requester notified

---

### Refunds

**Trigger**: Refund request above threshold

| Field | Requirement |
|-------|-------------|
| Approvers Required | 1 |
| Expiry | 24 hours |
| Auto-Approve Threshold | $100 |
| Scope | By order region |

**Workflow**:
1. Ops agent initiates refund
2. If amount ≤ $100 → Auto-approved
3. If amount > $100 and ≤ $500 → Single approval
4. If amount > $500 → Regional supervisor approval
5. Approved → Refund processed
6. Rejected → Refund blocked, escalation path offered

---

### Product Publishing

**Trigger**: Publishing new product or reactivating archived product

| Field | Requirement |
|-------|-------------|
| Approvers Required | 1 |
| Expiry | 72 hours |
| Auto-Approve Threshold | None |
| Scope | Global |

**Workflow**:
1. Content team creates product in draft
2. Submits for publishing approval
3. Product manager or supervisor reviews
4. Checks: Images, descriptions, pricing, inventory
5. Approved → Product goes live
6. Rejected → Feedback provided, edits required

---

### Content Publishing

**Trigger**: Publishing CMS content (journal, lookbook, homepage sections)

| Field | Requirement |
|-------|-------------|
| Approvers Required | 1 |
| Expiry | 48 hours |
| Auto-Approve Threshold | None |
| Scope | By content region |

**Workflow**:
1. Content editor creates/edits content
2. Submits for review
3. Content supervisor reviews
4. Checks: Brand alignment, accuracy, legal compliance
5. Approved → Content published
6. Rejected → Revision notes provided

---

### Country Overrides

**Trigger**: Modifying country-specific settings (tax, shipping, visibility)

| Field | Requirement |
|-------|-------------|
| Approvers Required | 2 |
| Expiry | 24 hours |
| Auto-Approve Threshold | None |
| Scope | By affected country |

**Workflow**:
1. Regional admin requests override
2. Global ops lead reviews first
3. Compliance officer reviews second
4. Both approve → Override applied
5. Either rejects → Override blocked

---

### Discount Creation

**Trigger**: Creating discount codes or promotions

| Field | Requirement |
|-------|-------------|
| Approvers Required | 1 |
| Expiry | 24 hours |
| Auto-Approve Threshold | 10% discount |
| Scope | By region |

**Workflow**:
1. Marketing submits discount request
2. If ≤ 10% → Auto-approved
3. If > 10% → Regional supervisor approval
4. If > 30% → Global ops lead approval
5. Approved → Discount code activated
6. Rejected → Alternative suggested

---

### Customer Data Export

**Trigger**: GDPR/CCPA data export request

| Field | Requirement |
|-------|-------------|
| Approvers Required | 2 |
| Expiry | 24 hours |
| Auto-Approve Threshold | None |
| Scope | By customer region |

**Workflow**:
1. Customer requests data export
2. Ops agent creates export request
3. Compliance officer reviews
4. Data protection officer approves
5. Both approve → Export generated, sent to customer
6. Rejected → Legal review initiated

---

## 2. Approval States

```
                    ┌─────────────┐
                    │   PENDING   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │ APPROVED │  │ REJECTED │  │ EXPIRED  │
       └──────────┘  └──────────┘  └──────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  CANCELLED  │
                    └─────────────┘
```

- **Pending**: Awaiting review
- **Approved**: Fully approved, action executed
- **Rejected**: Denied with reason
- **Expired**: Not reviewed within time limit
- **Cancelled**: Requester withdrew request

---

## 3. Multi-Approver Logic

When multiple approvers are required:

1. First approver reviews and approves
2. Request remains in "pending" state
3. Second approver reviews and approves
4. Only when all required approvals received → Status becomes "approved"
5. Any single rejection → Status becomes "rejected"

### Conflict Resolution

- Same person cannot approve twice
- Requester cannot be an approver
- Higher-level admins can override lower-level rejections (with audit)

---

## 4. Approval UI Components

### Approval Request Card

```
┌─────────────────────────────────────────────────────────────┐
│ [HIGH PRIORITY]                                             │
│                                                             │
│ Price Change: Élan Silk Dress - EU Pricing                 │
│                                                             │
│ Requested by: eu.ops@amarise.com                           │
│ Requested: 2024-01-15 10:30 UTC                            │
│ Expires: 2024-01-17 10:30 UTC                              │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Change Details                                          │ │
│ │ EUR Price: €1,850 → €1,920                             │ │
│ │ Affected Countries: FR, DE, IT                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Approvals: 1/2                                             │
│ ✓ admin-005 approved (2024-01-15 14:00)                   │
│                                                             │
│ [Approve]  [Reject]  [View History]                        │
└─────────────────────────────────────────────────────────────┘
```

### Approval Queue

- Sorted by priority (urgent → low)
- Filtered by type, status, region
- Badge counts on navigation
- Email notifications for new requests

---

## 5. Audit Integration

Every approval action generates audit log:

```typescript
{
  action: 'approve' | 'reject',
  resourceType: 'approval',
  resourceId: 'apr-001',
  previousState: { status: 'pending' },
  newState: { status: 'approved' },
  reason: 'Pricing adjustment justified by market analysis',
  adminId: 'admin-005',
  timestamp: '2024-01-15T14:00:00Z'
}
```

---

## 6. Backend Handoff Notes

### API Endpoints Required

```
POST   /api/approvals              - Create approval request
GET    /api/approvals              - List approvals (filtered)
GET    /api/approvals/:id          - Get approval details
POST   /api/approvals/:id/approve  - Approve request
POST   /api/approvals/:id/reject   - Reject request
DELETE /api/approvals/:id          - Cancel request
```

### Database Schema

```sql
CREATE TABLE approval_requests (
  id UUID PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  requested_by UUID REFERENCES admins(id),
  requested_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  reviewed_by UUID REFERENCES admins(id),
  reviewed_at TIMESTAMP,
  resource_type VARCHAR(50),
  resource_id VARCHAR(100),
  previous_value JSONB,
  proposed_value JSONB,
  priority VARCHAR(20),
  notes TEXT,
  rejection_reason TEXT,
  country_scope TEXT[],
  approvers_required INTEGER DEFAULT 1,
  current_approvals UUID[]
);
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial flows |
