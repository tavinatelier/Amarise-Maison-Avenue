# AMARISÉ Data Visibility Policy

## Overview

This document defines data visibility rules for the AMARISÉ platform. All data access must follow these policies to ensure privacy, security, and regulatory compliance.

---

## 1. Data Classification

### Public Data

Data visible to all users (customers and admins):
- Product names and descriptions
- Published content (journal, lookbook)
- Company information
- Shipping countries and methods
- Return policy

### Internal Data

Data visible to authenticated admins only:
- Order details
- Customer lists
- Inventory levels
- Sales metrics
- Content drafts

### Confidential Data

Data with restricted access:
- Customer PII (email, phone, address)
- Payment information
- Admin credentials
- API keys
- Financial reports

### Highly Confidential

Data with founder-only access:
- Complete customer database exports
- Full financial records
- Admin access logs
- Security incident details
- Legal documents

---

## 2. PII Visibility Rules

### Default State: Masked

All PII displayed in masked format by default:

| Field | Masked Format | Example |
|-------|---------------|---------|
| Email | First char + **** @ domain | j****@example.com |
| Phone | Country code + **** + last 2 | +1 **** **67 |
| Name | First initial + **** | J**** D**** |
| Address | **** + city | **** New York, NY |

### Reveal Process

1. Admin clicks "Reveal" on masked field
2. System prompts for reason (required)
3. Admin selects from:
   - Order support
   - Refund processing
   - Shipping inquiry
   - Fraud investigation
   - Legal request
   - Customer request
4. Value revealed with countdown timer
5. Auto-hides after timeout
6. All reveals logged

### Reveal Duration by Region

| Region | Max Duration | Renewal Allowed |
|--------|--------------|-----------------|
| EU (GDPR) | 5 minutes | Once |
| US | 15 minutes | Twice |
| APAC | 10 minutes | Once |
| MEA | 10 minutes | Once |

---

## 3. Order Data Visibility

### Order List View

| Field | Regional Admin | Super Admin | Founder |
|-------|---------------|-------------|---------|
| Order ID | ✓ | ✓ | ✓ |
| Customer Name | Masked | Masked | Masked |
| Order Date | ✓ | ✓ | ✓ |
| Status | ✓ | ✓ | ✓ |
| Total | ✓ | ✓ | ✓ |
| Country | ✓ | ✓ | ✓ |

### Order Detail View

| Field | Regional Admin | Super Admin | Founder |
|-------|---------------|-------------|---------|
| All list fields | ✓ | ✓ | ✓ |
| Customer Email | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Customer Phone | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Shipping Address | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Payment Method | Last 4 only | Last 4 only | Last 4 only |
| Full Card Number | ✗ | ✗ | ✗ |

---

## 4. Customer Data Visibility

### Customer List View

| Field | Regional Admin | Super Admin | Founder |
|-------|---------------|-------------|---------|
| Customer ID | ✓ | ✓ | ✓ |
| Name | Masked | Masked | Masked |
| Email | Masked | Masked | Masked |
| Country | ✓ | ✓ | ✓ |
| Order Count | ✓ | ✓ | ✓ |
| Total Spent | ✓ | ✓ | ✓ |
| VIP Status | ✓ | ✓ | ✓ |

### Customer Detail View

| Field | Regional Admin | Super Admin | Founder |
|-------|---------------|-------------|---------|
| Full Name | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Email | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Phone | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Addresses | Masked (reveal) | Masked (reveal) | Masked (reveal) |
| Order History | ✓ | ✓ | ✓ |
| Communication Log | ✓ | ✓ | ✓ |
| Payment Methods | Last 4 only | Last 4 only | Last 4 only |

---

## 5. Financial Data Visibility

### Revenue & Sales

| Data | Regional Admin | Super Admin | Founder |
|------|---------------|-------------|---------|
| Daily Sales (own region) | ✓ | ✓ | ✓ |
| Daily Sales (all regions) | ✗ | ✓ | ✓ |
| Revenue Breakdown | ✗ | ✓ | ✓ |
| Profit Margins | ✗ | ✗ | ✓ |
| Cost Data | ✗ | ✗ | ✓ |

### Refunds & Losses

| Data | Regional Admin | Super Admin | Founder |
|------|---------------|-------------|---------|
| Refund Requests (own) | ✓ | ✓ | ✓ |
| Refund History (all) | ✗ | ✓ | ✓ |
| Loss Reports | ✗ | ✗ | ✓ |
| Fraud Losses | ✗ | ✗ | ✓ |

---

## 6. Admin Activity Visibility

### Who Can See What

| Log Type | Regional Admin | Super Admin | Founder |
|----------|---------------|-------------|---------|
| Own actions | ✓ | ✓ | ✓ |
| Team actions (own region) | ✗ | ✓ | ✓ |
| All admin actions | ✗ | ✗ | ✓ |
| PII access logs | ✗ | ✗ | ✓ |
| Failed access attempts | ✗ | ✗ | ✓ |

---

## 7. Content Visibility

### CMS Content States

| State | Public | Regional Admin | Super Admin | Founder |
|-------|--------|---------------|-------------|---------|
| Draft | ✗ | Own region | All | All |
| In Review | ✗ | Own region | All | All |
| Published | ✓ | All | All | All |
| Archived | ✗ | Own region | All | All |

### Product States

| State | Public | Regional Admin | Super Admin | Founder |
|-------|--------|---------------|-------------|---------|
| Draft | ✗ | All | All | All |
| Published | ✓ | All | All | All |
| Disabled | ✗ | All | All | All |
| Archived | ✗ | All | All | All |

---

## 8. Report Access

### Available Reports

| Report | Regional Admin | Super Admin | Founder |
|--------|---------------|-------------|---------|
| Regional Dashboard | Own | All | All |
| Order Reports | Own | All | All |
| Customer Reports | Own | All | All |
| Product Performance | All | All | All |
| Staff Performance | ✗ | Own team | All |
| Financial Reports | ✗ | ✗ | All |
| Audit Reports | ✗ | ✗ | All |
| Compliance Reports | ✗ | ✗ | All |

---

## 9. Data Export Rules

### Who Can Export What

| Data Type | Regional Admin | Super Admin | Founder |
|-----------|---------------|-------------|---------|
| Own orders | ✓ (masked PII) | ✓ | ✓ |
| All orders | ✗ | ✓ (masked PII) | ✓ |
| Customers | ✗ | ✗ | ✓ (approval) |
| Full database | ✗ | ✗ | ✗ |

### Export Approval Process

1. All exports logged
2. Customer data export requires 2 approvers
3. Full exports require founder + legal
4. Export files auto-delete after 24 hours
5. Download links single-use

---

## 10. API Access Visibility

### API Keys

| Key Type | Visibility |
|----------|------------|
| Public (publishable) | Safe to expose |
| Private (secret) | Never in frontend |
| Admin tokens | Per-session only |
| Service keys | Backend only |

### API Response Filtering

All API responses filtered by:
1. Caller's role
2. Caller's region
3. Data classification
4. Current permissions

---

## 11. Audit Trail

Every data access logged:

```typescript
{
  who: "admin-001",
  what: "view_order",
  resource: "ord-12345",
  fieldsAccessed: ["status", "total"],
  piiRevealed: false,
  when: "2024-01-15T10:30:00Z",
  fromRegion: "NA"
}
```

Logs retained:
- Standard access: 90 days
- PII access: 365 days
- Security events: 7 years

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial policy |
