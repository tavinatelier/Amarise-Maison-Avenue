# AMARISÉ Global Operations Architecture

## Overview

This document defines the architecture for AMARISÉ's distributed, multi-country operating system. The platform enables teams across 5+ countries to operate WITHOUT founder presence while maintaining control, accountability, isolation, approval, safety, and continuity.

---

## 1. Multi-Country Isolation Layer

### Country-Bound Admin Logic

Every admin user is assigned:
- **Country/Region**: Primary operating country and region
- **Allowed Currencies**: Currencies they can view/modify prices in
- **Allowed Products**: Products they can manage
- **Allowed Customers**: Customers they can access

### Isolation Rules

| Admin Region | Can View | Can Edit | Cannot Access |
|--------------|----------|----------|---------------|
| NA (US, CA) | NA orders, customers, pricing | NA-scoped products | EU, APAC, MEA data |
| EU (GB, FR, DE, IT) | EU orders, customers, pricing | EU-scoped products | NA, APAC, MEA data |
| APAC (JP, AU, IN) | APAC orders, customers, pricing | APAC-scoped products | NA, EU, MEA data |
| MEA (AE) | MEA orders, customers, pricing | MEA-scoped products | NA, EU, APAC data |

### Service: `region.service.ts`

```typescript
// Key functions
canAdminAccessCountry(adminId, countryCode) → boolean
canAdminAccessRegion(adminId, regionCode) → boolean
getAdminCountries(adminId) → Country[]
requiresStrictPII(countryCode) → boolean
```

---

## 2. Approval & Governance Chains

### Approval-Required Actions

| Action Type | Threshold | Approvers Required | Expiry |
|-------------|-----------|-------------------|--------|
| Price Change | Any | 2 | 48 hours |
| Refund | > $500 | 1 | 24 hours |
| Product Publish | Any | 1 | 72 hours |
| Content Publish | Any | 1 | 48 hours |
| Country Override | Any | 2 | 24 hours |
| Discount > 10% | Any | 1 | 24 hours |
| Customer Data Export | Any | 2 | 24 hours |

### Approval UI Requirements

- **Requested by**: Admin name and email
- **Reviewed by**: Approver name and email
- **Status**: Pending / Approved / Rejected
- **Timestamp**: Request and review times
- **Reason/Notes**: Justification text
- **Diff View**: Before vs. after comparison

### Service: `approval.service.ts`

```typescript
// Key functions
requiresApproval(type, value?) → { required, approversNeeded }
createApprovalRequest(request) → ApprovalRequest
approveRequest(requestId, approverId, notes?) → ApprovalRequest
rejectRequest(requestId, rejecterId, reason) → ApprovalRequest
```

---

## 3. Audit & Accountability System

### Immutable Audit Logs

Every action generates an audit entry containing:
- **Actor**: Admin ID, email, role, country
- **Action**: Create, update, delete, publish, view_pii, refund, etc.
- **Resource**: Type and ID of affected resource
- **Change Details**: Before/after state, changed fields
- **Context**: Reason, IP address, session ID
- **Flags**: Is sensitive, requires review

### Audit Visibility

| Role | Can View |
|------|----------|
| Regional Admin | Own region's audit logs |
| Super Admin | All regions' audit logs |
| Founder | All logs + sensitive actions |

### Service: `audit.service.ts`

```typescript
// Key functions
createAuditLog(entry) → AuditLogEntry
queryAuditLogs(query) → AuditLogEntry[]
getResourceHistory(resourceType, resourceId) → AuditLogEntry[]
getSensitiveActions(countryScope?) → AuditLogEntry[]
```

---

## 4. Shift Handover System

### Purpose

Replace WhatsApp/Slack dependency with structured handover.

### Handover Note Structure

- **Category**: Order issue, customer escalation, refund pending, etc.
- **Priority**: Urgent, high, medium, low
- **Status**: Pending, acknowledged, resolved
- **Content**: Title, description, action required
- **References**: Related order, customer, or incident

### Shift Ownership

Each region has:
- Current shift owner
- Shift start/end times
- Pending items count
- Handover summary generation

### Service: `handover.service.ts`

```typescript
// Key functions
createHandoverNote(note) → HandoverNote
acknowledgeHandoverNote(noteId, adminId) → HandoverNote
resolveHandoverNote(noteId, adminId, resolution) → HandoverNote
endShift(region, adminId, toShift) → HandoverSummary
```

---

## 5. Incident & Crisis Mode

### Emergency Controls

| Control | Effect |
|---------|--------|
| Incident Mode | Activates all freezes |
| Freeze Price Changes | Blocks all pricing modifications |
| Freeze Refunds | Blocks all refund processing |
| Freeze CMS Publishing | Blocks content publishing |
| Freeze Checkout | Disables customer checkout |
| Freeze New Orders | Stops order acceptance |

### Incident Severity Levels

- **Critical**: System down, data breach, major payment issues
- **High**: Significant degradation, multiple customer impact
- **Medium**: Limited impact, workarounds available
- **Low**: Minor issues, no customer impact

### Override Hierarchy

1. Emergency controls override all roles
2. Exception: Super Admin can deactivate
3. Exception: Founder can override everything

### Service: `incident.service.ts`

```typescript
// Key functions
activateIncidentMode(adminId, controls) → EmergencyControls
deactivateIncidentMode(adminId) → EmergencyControls
setInternalBroadcast(message, adminId) → void
isActionBlocked(action) → { blocked, reason? }
```

---

## 6. PII Visibility Control

### Data Protection Rules

| Field | Default State | Reveal Duration | Requires |
|-------|---------------|-----------------|----------|
| Email | Masked | 5-15 min (by region) | Reason |
| Phone | Masked | 5-15 min | Reason |
| Address | Masked | 5-15 min | Reason |
| Full Name | Masked | 5-15 min | Reason |
| Payment Info | Never revealed | N/A | N/A |

### Region-Specific Policies

| Region | Max Reveal Duration | Log Retention |
|--------|---------------------|---------------|
| EU (GDPR) | 5 minutes | 365 days |
| US | 15 minutes | 180 days |
| APAC | 10 minutes | 180 days |

### Every Reveal Action is Logged

- Who revealed what
- For which customer
- Why (reason required)
- When and for how long

### Service: `pii.service.ts`

```typescript
// Key functions
requestPIIReveal(adminId, customerId, field, reason) → PIIAccessRequest
revealPII(requestId, adminId) → { value, expiresAt }
canAccessPII(adminId, customerId, field) → { allowed, reason? }
exportCustomerData(customerId, requestedBy, reason) → ExportJob
```

---

## 7. Knowledge & SOP System

### SOP Document Structure

- **Category**: Order management, refunds, customer service, etc.
- **Status**: Draft, published, archived
- **Content**: Markdown with step-by-step instructions
- **Access Level**: All, regional admin, super admin, founder
- **Versioning**: Full version history

### Playbooks

Quick-reference guides for common scenarios:
- When to use
- Key steps
- Escalation path
- Linked SOPs

### Linking

SOPs can be linked to:
- Orders (for context during processing)
- Customers (for handling guidance)
- Incidents (for response procedures)

### Service: `sop.service.ts`

```typescript
// Key functions
getSOPs(category?, status?, accessLevel?) → SOPDocument[]
searchSOPs(query) → SOPDocument[]
getSOPsForIncidentType(incidentType) → SOPDocument[]
publishSOP(sopId, publisherId) → SOPDocument
```

---

## 8. Founder Safety Net

### Founder-Only Controls

| Control | Purpose |
|---------|---------|
| Global Kill Switch | Immediately halt all operations |
| Emergency Access Override | Access any region regardless of isolation |
| Lock All Admins | Revoke all admin access instantly |
| Read-Only Platform Mode | Prevent all modifications |
| Cross-Region Audit View | See all audit logs globally |

### Access Requirements

- Only accounts with `founder` role
- Multi-factor authentication required
- All actions logged with enhanced detail
- Cannot be overridden by any other role

---

## 9. Service Architecture

### Core Services

| Service | Purpose | File |
|---------|---------|------|
| Region | Country isolation, currency, tax | `region.service.ts` |
| Approval | Governance workflows | `approval.service.ts` |
| Audit | Immutable action logging | `audit.service.ts` |
| Incident | Crisis management | `incident.service.ts` |
| Handover | Shift continuity | `handover.service.ts` |
| PII | Data protection | `pii.service.ts` |
| SOP | Knowledge management | `sop.service.ts` |

### Integration Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                     Admin UI Layer                          │
├─────────────────────────────────────────────────────────────┤
│  VisibilityGate  │  ApprovalFlow  │  AuditTrail            │
├─────────────────────────────────────────────────────────────┤
│                     Service Layer                           │
├─────────────────────────────────────────────────────────────┤
│ region │ approval │ audit │ incident │ handover │ pii │ sop │
├─────────────────────────────────────────────────────────────┤
│                  BACKEND HANDOFF LAYER                      │
│           (Replace mock data with real APIs)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Backend Handoff Notes

All services contain `// BACKEND HANDOFF:` comments indicating:
- Mock data to replace with database queries
- Logic to enforce server-side
- API contracts to implement

### Critical Server-Side Requirements

1. **Country isolation MUST be enforced server-side** - Frontend is for UX only
2. **Audit logs MUST be immutable** - Write-only storage
3. **PII access MUST be logged** - Every reveal recorded
4. **Approval workflows MUST be atomic** - No partial states
5. **Emergency controls MUST be immediately effective** - Cache invalidation required

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial architecture |
