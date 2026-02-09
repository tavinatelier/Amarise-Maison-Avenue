# TEAM ACCESS MODEL

## AMARISÉ Role-Based Access Control (RBAC)

This document defines the access control model for the admin platform.

---

## 1. ROLE HIERARCHY

```
                    ┌─────────────┐
                    │   FOUNDER   │
                    │ (Override)  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐
    │   GLOBAL    │ │   GLOBAL    │ │   GLOBAL    │
    │   ADMIN     │ │   FINANCE   │ │   OPS       │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
    ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐
    │  REGIONAL   │ │  REGIONAL   │ │  REGIONAL   │
    │  MANAGER    │ │  FINANCE    │ │  OPS        │
    └──────┬──────┘ └─────────────┘ └─────────────┘
           │
    ┌──────┴──────┐
    │  CUSTOMER   │
    │  SUPPORT    │
    └─────────────┘
```

---

## 2. ROLE DEFINITIONS

### Founder

```typescript
interface FounderRole {
  id: 'founder';
  name: 'Founder';
  level: 0;
  permissions: ['*'];  // All permissions
  override: true;      // Can override any decision
  countries: ['*'];    // All countries
}
```

### Global Admin

```typescript
interface GlobalAdminRole {
  id: 'global_admin';
  name: 'Global Admin';
  level: 1;
  permissions: [
    'dashboard.view',
    'orders.*',
    'products.*',
    'customers.*',
    'inventory.*',
    'team.view',
    'team.manage_regional',
    'approvals.view',
    'approvals.approve_standard',
    'incidents.view',
    'incidents.activate',
    'system.view',
    'audit.view'
  ];
  countries: ['*'];
}
```

### Global Finance

```typescript
interface GlobalFinanceRole {
  id: 'global_finance';
  name: 'Global Finance';
  level: 1;
  permissions: [
    'dashboard.view',
    'finance.*',
    'orders.view',
    'refunds.*',
    'customers.view',
    'approvals.view',
    'approvals.approve_financial',
    'audit.view'
  ];
  countries: ['*'];
}
```

### Global Ops

```typescript
interface GlobalOpsRole {
  id: 'global_ops';
  name: 'Global Operations';
  level: 1;
  permissions: [
    'dashboard.view',
    'orders.*',
    'inventory.*',
    'returns.*',
    'shipping.*',
    'approvals.view',
    'incidents.view',
    'incidents.activate',
    'audit.view'
  ];
  countries: ['*'];
}
```

### Regional Manager

```typescript
interface RegionalManagerRole {
  id: 'regional_manager';
  name: 'Regional Manager';
  level: 2;
  permissions: [
    'dashboard.view',
    'orders.view',
    'orders.update',
    'products.view',
    'customers.view',
    'customers.update',
    'inventory.view',
    'approvals.view',
    'approvals.request'
  ];
  countries: string[];  // Assigned countries only
}
```

### Customer Support

```typescript
interface CustomerSupportRole {
  id: 'customer_support';
  name: 'Customer Support';
  level: 3;
  permissions: [
    'dashboard.view',
    'orders.view',
    'customers.view',
    'customers.update_contact',
    'returns.view',
    'returns.create',
    'refunds.view',
    'refunds.request'
  ];
  countries: string[];  // Assigned countries only
}
```

---

## 3. PERMISSION MATRIX

### Dashboard & Analytics

| Permission | Founder | Global Admin | Global Finance | Global Ops | Regional | Support |
|------------|---------|--------------|----------------|------------|----------|---------|
| dashboard.view | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| analytics.view | ✓ | ✓ | ✓ | ✓ | ○ | ✗ |
| analytics.export | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

### Orders

| Permission | Founder | Global Admin | Global Finance | Global Ops | Regional | Support |
|------------|---------|--------------|----------------|------------|----------|---------|
| orders.view | ✓ | ✓ | ✓ | ✓ | ○ | ○ |
| orders.update | ✓ | ✓ | ✗ | ✓ | ○ | ✗ |
| orders.cancel | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ |
| orders.export | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |

### Products & Inventory

| Permission | Founder | Global Admin | Global Finance | Global Ops | Regional | Support |
|------------|---------|--------------|----------------|------------|----------|---------|
| products.view | ✓ | ✓ | ✗ | ✓ | ○ | ✗ |
| products.create | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| products.update | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| inventory.view | ✓ | ✓ | ✗ | ✓ | ○ | ✗ |
| inventory.update | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ |

### Customers

| Permission | Founder | Global Admin | Global Finance | Global Ops | Regional | Support |
|------------|---------|--------------|----------------|------------|----------|---------|
| customers.view | ✓ | ✓ | ✓ | ✗ | ○ | ○ |
| customers.update | ✓ | ✓ | ✗ | ✗ | ○ | ✗ |
| customers.delete | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| customers.export | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| customers.view_pii | ✓ | ✓ | ✓ | ✗ | ○ | ○ |

### Finance

| Permission | Founder | Global Admin | Global Finance | Global Ops | Regional | Support |
|------------|---------|--------------|----------------|------------|----------|---------|
| finance.view | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| finance.reports | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| refunds.view | ✓ | ✓ | ✓ | ✓ | ○ | ○ |
| refunds.approve | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |

### Team & System

| Permission | Founder | Global Admin | Global Finance | Global Ops | Regional | Support |
|------------|---------|--------------|----------------|------------|----------|---------|
| team.view | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| team.manage | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| system.view | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ |
| system.modify | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| incidents.activate | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ |

Legend: ✓ = Full Access, ○ = Regional Only, ✗ = No Access

---

## 4. COUNTRY-BASED ACCESS

### Regional Assignment

```typescript
interface RegionalAssignment {
  userId: string;
  regions: Region[];
}

interface Region {
  code: string;           // e.g., 'EU', 'MENA', 'APAC'
  countries: string[];    // ISO country codes
  timezone: string;       // Primary timezone
}
```

### Predefined Regions

| Region | Countries | Primary Timezone |
|--------|-----------|------------------|
| EU-West | FR, DE, ES, IT, NL, BE | Europe/Paris |
| EU-North | SE, NO, DK, FI | Europe/Stockholm |
| UK | GB, IE | Europe/London |
| MENA | AE, SA, QA, KW | Asia/Dubai |
| APAC | JP, AU, SG, HK | Asia/Tokyo |
| Americas | US, CA, MX | America/New_York |

---

## 5. DATA VISIBILITY RULES

### PII Access Levels

```typescript
type PIILevel = 'full' | 'masked' | 'hidden';

interface PIIVisibility {
  email: PIILevel;
  phone: PIILevel;
  address: PIILevel;
  paymentDetails: PIILevel;
}
```

### Visibility by Role

| Data Field | Founder | Global Admin | Global Finance | Regional | Support |
|------------|---------|--------------|----------------|----------|---------|
| Email | full | full | full | full | masked |
| Phone | full | full | masked | masked | masked |
| Address | full | full | masked | full | hidden |
| Payment | full | hidden | full | hidden | hidden |

### Masking Rules

```typescript
// Email: j***n@example.com
// Phone: +1 ***-***-4567
// Address: [City, Country only]
```

---

## 6. APPROVAL THRESHOLDS

### By Role

| Action | Support | Regional | Global Ops | Global Finance | Global Admin | Founder |
|--------|---------|----------|------------|----------------|--------------|---------|
| Refund ≤ €100 | Request | Approve | Approve | Approve | Approve | Approve |
| Refund ≤ €500 | Request | Request | Approve | Approve | Approve | Approve |
| Refund > €500 | Request | Request | Request | Approve | Approve | Approve |
| Price Change | ✗ | Request | Request | Approve | Approve | Approve |
| Discount ≤ 20% | ✗ | Approve | Approve | Approve | Approve | Approve |
| Discount > 20% | ✗ | Request | Request | Approve | Approve | Approve |

---

## 7. AUDIT REQUIREMENTS

### Logged Actions

All actions are logged with:

```typescript
interface AuditEntry {
  id: string;
  userId: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: Record<string, { before: any; after: any }>;
  ip: string;
  userAgent: string;
  timestamp: string;
  country: string;         // User's location
  targetCountry?: string;  // Affected country if applicable
}
```

### Retention Policy

| Data Type | Retention | Archive |
|-----------|-----------|---------|
| Login attempts | 90 days | 1 year |
| Data access | 1 year | 3 years |
| Data modification | 3 years | 7 years |
| Financial actions | 7 years | 10 years |
| Security events | 3 years | 7 years |

---

## 8. SESSION MANAGEMENT

### Session Rules

```typescript
interface SessionPolicy {
  maxDuration: number;     // 8 hours
  idleTimeout: number;     // 30 minutes
  maxConcurrent: number;   // 2 sessions
  mfaRequired: boolean;    // By role
  ipRestriction: boolean;  // Optional
}
```

### MFA Requirements

| Role | MFA Required | Methods |
|------|--------------|---------|
| Founder | Yes | TOTP, Hardware Key |
| Global Admin | Yes | TOTP, Hardware Key |
| Global Finance | Yes | TOTP, Hardware Key |
| Global Ops | Yes | TOTP |
| Regional | Yes | TOTP |
| Support | Optional | TOTP |

---

## 9. EMERGENCY ACCESS

### Break-Glass Procedure

1. Emergency declared via /admin/incidents
2. Founder notified immediately
3. Elevated access granted for 4 hours
4. All actions logged with emergency flag
5. Post-incident review required

### Founder Override

```typescript
interface FounderOverride {
  enabled: boolean;
  reason: string;
  activatedAt: string;
  expiresAt: string;
  actions: string[];       // Overridden actions
  auditRequired: boolean;  // Always true
}
```

---

## 10. IMPLEMENTATION NOTES

### Current State (Mock)

- Roles defined in `src/data/mock/team.json`
- Access checks in `src/services/team.service.ts`
- UI gates in components (visual only)

### Backend Requirements

- JWT with role claims
- Permission middleware
- Country-based filtering
- Audit logging service
- Session management
- MFA integration

See `BACKEND_HANDOFF.md` for integration details.
