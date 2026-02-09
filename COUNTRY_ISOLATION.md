# AMARISÉ Country Isolation Policy

## Overview

This document defines the country and region isolation requirements for AMARISÉ's multi-country operations. Isolation ensures data protection, regulatory compliance, and operational integrity.

---

## 1. Regional Structure

### Regions and Countries

| Region | Code | Countries | Headquarters |
|--------|------|-----------|--------------|
| North America | NA | US, CA | United States |
| Europe | EU | GB, FR, DE, IT | United Kingdom |
| Asia Pacific | APAC | JP, AU, IN | Japan |
| Middle East & Africa | MEA | AE | UAE |

### Operating Hours (Local Time)

| Region | Standard Hours | Extended Support |
|--------|----------------|------------------|
| NA | 09:00 - 18:00 EST | 07:00 - 21:00 |
| EU | 09:00 - 18:00 GMT/CET | 07:00 - 21:00 |
| APAC | 09:00 - 18:00 JST | 07:00 - 21:00 |
| MEA | 09:00 - 18:00 GST | 08:00 - 20:00 |

---

## 2. Data Isolation Rules

### Customer Data

| Data Type | Visibility | Cross-Region Access |
|-----------|------------|---------------------|
| Order Details | Own region only | Never |
| Customer PII | Own region only | Legal request only |
| Payment Info | Never visible | Never |
| Address | Own region only | Shipping coordination |
| Contact History | Own region only | Never |

### Product Data

| Data Type | Visibility | Cross-Region Edit |
|-----------|------------|-------------------|
| Product Catalog | All regions | Global admin only |
| Regional Pricing | Own region only | Own region only |
| Inventory | All regions (read) | Own region only |
| Product Content | All regions | Regional with approval |

### Order Data

| Data Type | Visibility | Cross-Region Access |
|-----------|------------|---------------------|
| Order List | Own region only | Never |
| Order Details | Own region only | Never |
| Shipping Status | Own region only | Cross-border coordination |
| Refund History | Own region only | Never |

---

## 3. Admin Access Levels

### Regional Admin

**Access Scope**:
- Own region's orders and customers
- Own region's pricing
- Own region's content drafts
- Own region's audit logs

**Cannot Access**:
- Other regions' data
- Global settings
- Other admins' permissions
- Founder controls

### Super Admin

**Access Scope**:
- All regions' data (read)
- Own region's data (write)
- Global product catalog
- Cross-region reporting
- All audit logs

**Cannot Access**:
- Founder controls
- Admin permission changes
- Emergency overrides

### Founder

**Access Scope**:
- Everything
- Emergency controls
- Admin management
- Global overrides
- Audit of all actions

---

## 4. Currency Isolation

### Currency by Region

| Region | Primary | Supported |
|--------|---------|-----------|
| NA | USD | USD, CAD |
| EU | EUR | EUR, GBP |
| APAC | JPY | JPY, AUD, INR, USD |
| MEA | AED | AED, USD |

### Currency Rules

1. Admins can only view/edit prices in their region's currencies
2. Currency conversion for display is client-side only
3. All transactions recorded in customer's local currency
4. Cross-currency refunds require approval

---

## 5. PII Protection by Region

### GDPR Regions (EU)

| Requirement | Implementation |
|-------------|----------------|
| Data minimization | Only collect necessary data |
| Right to access | Export within 30 days |
| Right to erasure | Delete within 30 days |
| Consent tracking | Explicit opt-in required |
| Breach notification | Within 72 hours |

**PII Reveal Rules**:
- Maximum 5-minute visibility
- Reason required
- All access logged
- 365-day log retention

### CCPA Regions (US)

| Requirement | Implementation |
|-------------|----------------|
| Right to know | Export within 45 days |
| Right to delete | Delete within 45 days |
| Opt-out of sale | Do not sell toggle |

**PII Reveal Rules**:
- Maximum 15-minute visibility
- Reason required
- All access logged
- 180-day log retention

### Other Regions

**PII Reveal Rules**:
- Maximum 10-minute visibility
- Reason required
- All access logged
- 180-day log retention

---

## 6. Tax Isolation

### Tax Rates by Country

| Country | Tax Type | Rate |
|---------|----------|------|
| US | Sales Tax | Varies by state |
| CA | GST/HST | 13% average |
| GB | VAT | 20% |
| FR | TVA | 20% |
| DE | MwSt | 19% |
| IT | IVA | 22% |
| JP | Consumption | 10% |
| AU | GST | 10% |
| IN | GST | 18% |
| AE | VAT | 5% |

### Tax Calculation Rules

1. Tax calculated at checkout based on shipping address
2. Tax included in displayed price for EU
3. Tax added at checkout for US/CA
4. Tax documentation generated automatically
5. Regional admins cannot modify tax rates

---

## 7. Shipping Isolation

### Shipping Zones

| From Region | To Region | Allowed | Notes |
|-------------|-----------|---------|-------|
| Any | Same | Yes | Standard |
| EU | EU | Yes | Duty-free |
| Non-EU | EU | Yes | Customs required |
| Any | Restricted | No | Sanctions list |

### Cross-Border Coordination

When order requires cross-border shipping:

1. Origin region creates order
2. Shipping handed to destination region for last-mile
3. Both regions can view shipping status
4. Customer communication from destination region

---

## 8. Reporting Isolation

### Available Reports by Role

| Report | Regional Admin | Super Admin | Founder |
|--------|---------------|-------------|---------|
| Regional Sales | Own | All | All |
| Regional Orders | Own | All | All |
| Customer Analytics | Own | All | All |
| Admin Activity | None | Own Region | All |
| Global Performance | None | Read | Full |
| Financial Summary | None | None | Full |

---

## 9. Isolation Enforcement

### Frontend Enforcement

- UI hides data outside admin's scope
- API requests include region context
- Navigation filtered by permissions

### Backend Enforcement (Required)

- Row-level security on all tables
- API validates region access
- Audit log for any cross-region attempt
- Automatic blocking of unauthorized access

**CRITICAL**: Frontend isolation is UX only. Backend MUST enforce all isolation rules.

---

## 10. Exceptions Process

### When Exceptions Are Allowed

1. Legal/compliance requests (with approval)
2. Cross-region customer transfer
3. Global incident investigation
4. Founder override

### Exception Request Process

1. Submit exception request with justification
2. Compliance officer reviews
3. If approved, temporary access granted
4. All access logged extensively
5. Access auto-revokes after period

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial policy |
