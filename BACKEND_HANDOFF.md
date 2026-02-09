# AMARISÉ Frontend - Backend Handoff Documentation

## Overview

This frontend is **100% ready for backend integration**. Backend engineers only need to replace mock service implementations with real API calls. **No UI changes required.**

---

## 📚 Complete Documentation Suite

### Core System Documentation

| Document | Purpose |
|----------|---------|
| [SYSTEM_RULES.md](./SYSTEM_RULES.md) | Order lifecycle, payment rules, inventory logic |
| [FAILURE_SCENARIOS.md](./FAILURE_SCENARIOS.md) | All error states and recovery flows |
| [SOURCE_OF_TRUTH.md](./SOURCE_OF_TRUTH.md) | Data ownership and conflict resolution |
| [ADMIN_ARCHITECTURE.md](./ADMIN_ARCHITECTURE.md) | Admin panel structure and permissions |
| [DATA_POLICY.md](./DATA_POLICY.md) | Privacy, GDPR, data retention |
| [ADMIN_AUDIT_RULES.md](./ADMIN_AUDIT_RULES.md) | Audit logging requirements |
| [ENVIRONMENTS.md](./ENVIRONMENTS.md) | Environment setup and deployment |
| [FRONTEND_FREEZE.md](./FRONTEND_FREEZE.md) | **READ FIRST** - What cannot be changed |
| [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md) | Event tracking specifications |

### Global Operations Documentation

| Document | Purpose |
|----------|---------|
| [GLOBAL_OPS_ARCHITECTURE.md](./GLOBAL_OPS_ARCHITECTURE.md) | Multi-country platform architecture |
| [APPROVAL_FLOWS.md](./APPROVAL_FLOWS.md) | Governance & approval chain logic |
| [INCIDENT_RESPONSE.md](./INCIDENT_RESPONSE.md) | Crisis mode & emergency controls |
| [COUNTRY_ISOLATION.md](./COUNTRY_ISOLATION.md) | Region-based access & visibility |
| [DATA_VISIBILITY_POLICY.md](./DATA_VISIBILITY_POLICY.md) | PII protection & reveal logging |
| [FOUNDER_OVERRIDE.md](./FOUNDER_OVERRIDE.md) | Super admin & founder safety controls |

---

## Quick Start for Backend Developers

1. **Read** [FRONTEND_FREEZE.md](./FRONTEND_FREEZE.md) first
2. **Replace mock data** in `src/services/*.service.ts`
3. **Configure feature flags** in `src/config/admin.config.ts`
4. **Connect real APIs** - all contracts are defined with TypeScript interfaces

---

## Architecture

```
src/
├── config/
│   ├── site.config.ts      # Feature flags, currency, regions
│   └── admin.config.ts     # Product/collection toggles (mock admin)
├── services/
│   ├── index.ts            # Central service exports
│   │
│   │ # Core Commerce Services
│   ├── commerce.service.ts # Cart, checkout operations
│   ├── payment.service.ts  # Payment intent, refund flows
│   ├── order.service.ts    # Order creation, shipping, tax
│   ├── product.service.ts  # Product details, variants, stock
│   ├── content.service.ts  # CMS content (pages, journal, lookbook)
│   │
│   │ # Global Operations Services
│   ├── region.service.ts   # Country isolation, scoped access
│   ├── approval.service.ts # Approval workflows, governance
│   ├── audit.service.ts    # Immutable audit logging
│   ├── incident.service.ts # Crisis mode, emergency controls
│   ├── handover.service.ts # Shift handover, ops continuity
│   ├── pii.service.ts      # PII masking, reveal logging
│   └── sop.service.ts      # SOPs, playbooks, knowledge base
│
├── data/mock/              # Mock JSON (replace with API responses)
└── types/content.ts        # Shared TypeScript interfaces
```

---

## Service Contracts

### Commerce (`commerce.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getCart()` | GET /cart | Fetch current cart |
| `addToCart()` | POST /cart/items | Add item |
| `removeFromCart()` | DELETE /cart/items/:id | Remove item |
| `createCheckoutSession()` | POST /checkout | Start checkout |

### Payments (`payment.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `createPaymentIntent()` | POST /payments/intents | Create payment |
| `confirmPayment()` | POST /payments/intents/:id/confirm | Process payment |
| `requestRefund()` | POST /payments/refunds | Issue refund |

### Orders (`order.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `createOrder()` | POST /orders | Create order |
| `getShippingOptions()` | GET /shipping/options | List shipping |
| `calculateTax()` | POST /tax/calculate | Calculate tax |

### Content (`content.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getHomepageContent()` | GET /pages/home | Homepage CMS |
| `getProductsByCategory()` | GET /products?category= | Product listings |
| `getJournalArticles()` | GET /journal | Blog articles |

---

## Global Operations Services

### Region Service (`region.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getAdminRegion()` | GET /admin/region | Get current admin's region scope |
| `getRegions()` | GET /regions | List all regions |
| `checkRegionAccess()` | GET /admin/access/:region | Verify region access |
| `getScopedData()` | GET /data?region= | Get region-filtered data |

### Approval Service (`approval.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `createApprovalRequest()` | POST /approvals | Request approval |
| `approveRequest()` | POST /approvals/:id/approve | Approve request |
| `rejectRequest()` | POST /approvals/:id/reject | Reject request |
| `getPendingApprovals()` | GET /approvals?status=pending | List pending |

### Audit Service (`audit.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `logAction()` | POST /audit/logs | Create audit entry |
| `getAuditLog()` | GET /audit/logs | Query audit history |
| `getEntityHistory()` | GET /audit/:entity/:id | Entity change history |

### Incident Service (`incident.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `activateIncidentMode()` | POST /incidents/activate | Enable crisis mode |
| `deactivateIncidentMode()` | POST /incidents/deactivate | Disable crisis mode |
| `getIncidentStatus()` | GET /incidents/status | Current incident state |
| `broadcastMessage()` | POST /incidents/broadcast | Emergency message |

### Handover Service (`handover.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `createHandover()` | POST /handovers | Create shift handover |
| `getActiveHandovers()` | GET /handovers/active | Current handovers |
| `acknowledgeHandover()` | POST /handovers/:id/ack | Mark acknowledged |

### PII Service (`pii.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `maskPII()` | - | Client-side masking |
| `requestReveal()` | POST /pii/reveal | Request PII reveal |
| `logReveal()` | POST /pii/logs | Log reveal action |

### SOP Service (`sop.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getSOPs()` | GET /sops | List all SOPs |
| `getPlaybook()` | GET /playbooks/:id | Get playbook |
| `searchKnowledge()` | GET /knowledge?q= | Search knowledge base |

---

## Admin Controls

All admin logic is config-driven in `src/config/admin.config.ts`:

- `PRODUCT_OVERRIDES` - Enable/disable individual products
- `COLLECTION_OVERRIDES` - Control collection visibility
- `COMMERCE_CONTROLS` - Global checkout toggle, maintenance mode
- `REGION_CONTROLS` - Shipping restrictions by region

See [ADMIN_ARCHITECTURE.md](./ADMIN_ARCHITECTURE.md) for full admin panel specification.

---

## Global Operations Admin Controls

Multi-country operations are managed through these services:

| Control | Service | Documentation |
|---------|---------|---------------|
| Country Isolation | `region.service.ts` | [COUNTRY_ISOLATION.md](./COUNTRY_ISOLATION.md) |
| Approval Chains | `approval.service.ts` | [APPROVAL_FLOWS.md](./APPROVAL_FLOWS.md) |
| Audit Logging | `audit.service.ts` | [ADMIN_AUDIT_RULES.md](./ADMIN_AUDIT_RULES.md) |
| Crisis Mode | `incident.service.ts` | [INCIDENT_RESPONSE.md](./INCIDENT_RESPONSE.md) |
| Shift Handover | `handover.service.ts` | [GLOBAL_OPS_ARCHITECTURE.md](./GLOBAL_OPS_ARCHITECTURE.md) |
| PII Protection | `pii.service.ts` | [DATA_VISIBILITY_POLICY.md](./DATA_VISIBILITY_POLICY.md) |
| Knowledge Base | `sop.service.ts` | [GLOBAL_OPS_ARCHITECTURE.md](./GLOBAL_OPS_ARCHITECTURE.md) |

---

## Mock Data Files → API Replacement

### Core Commerce

| Mock File | Replace With |
|-----------|--------------|
| `homepage.json` | CMS API (Sanity/Contentful) |
| `products.json` | Commerce API |
| `product-details.json` | Commerce + CMS API |
| `collections.json` | Commerce/Scheduling API |
| `journal.json` | CMS API |
| `lookbook.json` | CMS API |
| `discovery.json` | Recommendation API |
| `checkout.json` | Checkout API |

### Admin Operations

| Mock File | Replace With |
|-----------|--------------|
| `admin-dashboard.json` | Analytics API |
| `customers.json` | Customer API |
| `inventory.json` | Inventory API |
| `finance.json` | Finance API |
| `analytics.json` | Analytics API |
| `team.json` | IAM/User Management API |
| `system.json` | System Control API |

---

## Extended Services

### Customer Service (`customer.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getCustomers()` | GET /customers | List customers |
| `getCustomerById()` | GET /customers/:id | Customer detail |
| `updateCustomer()` | PATCH /customers/:id | Update customer |
| `exportCustomerData()` | GET /customers/:id/export | GDPR export |

### Inventory Service (`inventory.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getInventory()` | GET /inventory | List all SKUs |
| `getInventoryBySku()` | GET /inventory/:sku | SKU detail |
| `updateStock()` | PATCH /inventory/:sku | Adjust stock |
| `getStockMovements()` | GET /inventory/:sku/movements | Movement history |

### Finance Service (`finance.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getFinanceSummary()` | GET /finance/summary | Revenue overview |
| `getRevenueByCountry()` | GET /finance/revenue/by-country | Country breakdown |
| `getTaxSummary()` | GET /finance/taxes | Tax compliance |
| `generateReport()` | POST /finance/reports | Create report |

### Analytics Service (`analytics.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getFunnelData()` | GET /analytics/funnel | Conversion funnel |
| `getProductPerformance()` | GET /analytics/products | Product metrics |
| `getCountryMetrics()` | GET /analytics/countries | Regional data |

### Team Service (`team.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getTeamMembers()` | GET /team | List team |
| `getRoles()` | GET /team/roles | Role definitions |
| `getActivityLog()` | GET /team/activity | Admin actions |
| `assignRole()` | POST /team/:id/role | Update role |

### System Service (`system.service.ts`)
| Function | API Endpoint | Purpose |
|----------|--------------|---------|
| `getSystemStatus()` | GET /system/status | Current state |
| `toggleKillSwitch()` | POST /system/kill-switch | Emergency stop |
| `setMaintenanceMode()` | POST /system/maintenance | Planned downtime |
| `toggleFeatureFlag()` | POST /system/flags/:id | Feature control |

---

## Key References

- **System Rules**: See [SYSTEM_RULES.md](./SYSTEM_RULES.md) for order lifecycle, payment flows
- **Error Handling**: See [FAILURE_SCENARIOS.md](./FAILURE_SCENARIOS.md) for all failure states
- **Data Ownership**: See [SOURCE_OF_TRUTH.md](./SOURCE_OF_TRUTH.md) for conflict resolution
- **Analytics**: See [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md) for event contracts
- **Global Ops**: See [GLOBAL_OPS_ARCHITECTURE.md](./GLOBAL_OPS_ARCHITECTURE.md) for multi-country operations
- **Operations**: See [OPERATIONS_PLAYBOOK.md](./OPERATIONS_PLAYBOOK.md) for daily procedures
- **Finance**: See [FINANCE_DATA_CONTRACTS.md](./FINANCE_DATA_CONTRACTS.md) for financial specs
- **Team Access**: See [TEAM_ACCESS_MODEL.md](./TEAM_ACCESS_MODEL.md) for RBAC
- **System Controls**: See [SYSTEM_CONTROLS.md](./SYSTEM_CONTROLS.md) for control mechanisms

---

## Files NOT to Modify

See [FRONTEND_FREEZE.md](./FRONTEND_FREEZE.md) for complete list.

- `src/components/ui/*` - shadcn components
- `src/index.css` - Design tokens
- `tailwind.config.ts` - Theme
- Any component JSX/TSX structure

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 4.0 | 2024-01-09 | Added extended services & operations docs |
| 3.0 | 2024-01-04 | Added Global Ops services & documentation |
| 2.0 | 2024-01-02 | Added complete documentation suite |
| 1.0 | 2024-01-01 | Initial handoff documentation |
