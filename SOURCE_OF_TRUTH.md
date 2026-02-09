# AMARISÉ Source of Truth Matrix

## Overview

This document defines which system owns which data and decisions. Backend engineers MUST respect these boundaries. When conflicts arise, this document resolves them.

---

## Authority Matrix

| Domain | Source of Truth | Secondary Source | Conflict Resolution |
|--------|-----------------|------------------|---------------------|
| **Product Visibility** | CMS | None | CMS always wins |
| **Product Purchasability** | Inventory System | None | Inventory always wins |
| **Pricing** | Commerce/Pricing Service | None | Commerce always wins |
| **Order State** | Order Service | None | Order Service always wins |
| **Payment State** | Payment Provider | Order Service | Payment Provider is authoritative |
| **Customer Data** | Customer Service | Auth Service | Customer Service is authoritative |
| **Shipping Rates** | Carrier API | Cached rates | Carrier API when available |
| **Tax Calculation** | Tax Service | None | Tax Service always wins |
| **Content (Editorial)** | CMS | None | CMS always wins |
| **Inventory Levels** | Inventory System | None | Inventory always wins |
| **Admin Overrides** | Admin Config | None | Admin overrides all except payments |

---

## Detailed Ownership

### 1. Product Data

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCT DATA                              │
├─────────────────────────────────────────────────────────────────┤
│  FIELD                    │  OWNER              │  NOTES        │
├───────────────────────────┼─────────────────────┼───────────────┤
│  title                    │  CMS                │  Editable     │
│  description              │  CMS                │  Rich text    │
│  images                   │  CMS                │  Asset refs   │
│  story                    │  CMS                │  Editorial    │
│  price                    │  Commerce Service   │  Per currency │
│  stock_quantity           │  Inventory System   │  Real-time    │
│  visibility_state         │  CMS                │  Enum         │
│  purchasable              │  Inventory + CMS    │  Computed     │
│  category                 │  CMS                │  Reference    │
│  tags                     │  CMS                │  Array        │
│  variants                 │  Commerce Service   │  SKU-level    │
│  related_products         │  CMS                │  References   │
└───────────────────────────┴─────────────────────┴───────────────┘
```

**Computation Rules:**

```typescript
// Purchasability is computed, not stored
const isPurchasable = (product) => {
  const cmsAllows = product.visibility_state === 'published';
  const inventoryAllows = product.stock_quantity > 0 || product.preorder_enabled;
  const adminAllows = !PRODUCT_OVERRIDES[product.id]?.disabled;
  
  return cmsAllows && inventoryAllows && adminAllows;
};
```

---

### 2. Order Data

```
┌─────────────────────────────────────────────────────────────────┐
│                        ORDER DATA                                │
├─────────────────────────────────────────────────────────────────┤
│  FIELD                    │  OWNER              │  NOTES        │
├───────────────────────────┼─────────────────────┼───────────────┤
│  order_id                 │  Order Service      │  Immutable    │
│  customer_id              │  Order Service      │  Reference    │
│  line_items               │  Order Service      │  Snapshot     │
│  subtotal                 │  Order Service      │  Calculated   │
│  tax                      │  Tax Service        │  At creation  │
│  shipping_cost            │  Carrier API        │  At creation  │
│  total                    │  Order Service      │  Calculated   │
│  payment_status           │  Payment Provider   │  Via webhook  │
│  fulfillment_status       │  Fulfillment System │  Updated      │
│  shipping_address         │  Order Service      │  Snapshot     │
│  billing_address          │  Order Service      │  Snapshot     │
│  created_at               │  Order Service      │  Immutable    │
│  updated_at               │  Order Service      │  Auto         │
└───────────────────────────┴─────────────────────┴───────────────┘
```

**Snapshot Rule:**

```
Orders contain SNAPSHOTS of data at creation time.
If a product price changes AFTER order creation:
- Order keeps original price
- Customer pays original price
- No retroactive changes
```

---

### 3. Customer Data

```
┌─────────────────────────────────────────────────────────────────┐
│                       CUSTOMER DATA                              │
├─────────────────────────────────────────────────────────────────┤
│  FIELD                    │  OWNER              │  NOTES        │
├───────────────────────────┼─────────────────────┼───────────────┤
│  customer_id              │  Auth Service       │  Immutable    │
│  email                    │  Auth Service       │  Unique       │
│  password_hash            │  Auth Service       │  Encrypted    │
│  first_name               │  Customer Service   │  Editable     │
│  last_name                │  Customer Service   │  Editable     │
│  phone                    │  Customer Service   │  Optional     │
│  addresses                │  Customer Service   │  Array        │
│  preferences              │  Customer Service   │  JSON         │
│  order_history            │  Order Service      │  References   │
│  wishlist                 │  Customer Service   │  References   │
│  newsletter_subscribed    │  Customer Service   │  Boolean      │
│  created_at               │  Auth Service       │  Immutable    │
└───────────────────────────┴─────────────────────┴───────────────┘
```

---

### 4. Payment Data

```
┌─────────────────────────────────────────────────────────────────┐
│                       PAYMENT DATA                               │
├─────────────────────────────────────────────────────────────────┤
│  FIELD                    │  OWNER              │  NOTES        │
├───────────────────────────┼─────────────────────┼───────────────┤
│  payment_intent_id        │  Payment Provider   │  External     │
│  amount                   │  Payment Provider   │  Immutable    │
│  currency                 │  Payment Provider   │  Immutable    │
│  status                   │  Payment Provider   │  Via webhook  │
│  payment_method           │  Payment Provider   │  Reference    │
│  order_id                 │  Order Service      │  Our ref      │
│  refund_id                │  Payment Provider   │  If refunded  │
│  failure_reason           │  Payment Provider   │  If failed    │
│  created_at               │  Payment Provider   │  External     │
└───────────────────────────┴─────────────────────┴───────────────┘
```

**Authority Rule:**

```
Payment Provider is ALWAYS authoritative for payment status.
If our database says "paid" but provider says "failed":
- Provider is correct
- Update our database
- Handle accordingly
```

---

### 5. Content Data (CMS)

```
┌─────────────────────────────────────────────────────────────────┐
│                        CONTENT DATA                              │
├─────────────────────────────────────────────────────────────────┤
│  FIELD                    │  OWNER              │  NOTES        │
├───────────────────────────┼─────────────────────┼───────────────┤
│  homepage_sections        │  CMS                │  Ordered      │
│  navigation               │  CMS                │  Structured   │
│  footer                   │  CMS                │  Structured   │
│  journal_articles         │  CMS                │  Collection   │
│  lookbook_content         │  CMS                │  Collection   │
│  product_stories          │  CMS                │  Per product  │
│  collection_pages         │  CMS                │  Collection   │
│  seo_metadata             │  CMS                │  Per page     │
│  announcements            │  CMS                │  Banner data  │
│  static_pages             │  CMS                │  About, etc   │
└───────────────────────────┴─────────────────────┴───────────────┘
```

---

## Conflict Resolution Rules

### Rule 1: CMS vs Inventory

```
Scenario: CMS says "published", Inventory says "0 stock"
Resolution: 
- Product IS visible in catalog
- Product is NOT purchasable
- Show "Sold Out" state
Winner: Both respected (visibility ≠ purchasability)
```

### Rule 2: CMS vs Admin Override

```
Scenario: CMS says "published", Admin says "disabled"
Resolution:
- Product is NOT visible
- Admin override takes precedence for visibility
Winner: Admin override
```

### Rule 3: Order Service vs Payment Provider

```
Scenario: Order shows "paid", Payment Provider shows "refunded"
Resolution:
- Update order to "refunded"
- Payment Provider is authoritative
Winner: Payment Provider
```

### Rule 4: Cached Price vs Commerce Service

```
Scenario: Cart shows €100, Commerce Service says €120
Resolution:
- Update cart to €120
- Current price always wins
- No price locking until checkout confirmed
Winner: Commerce Service
```

### Rule 5: Shipping Quote vs Carrier API

```
Scenario: Cached shipping €10, Carrier API says €15
Resolution:
- Use Carrier API rate
- Update total
- If API unavailable, use cached with disclaimer
Winner: Carrier API (when available)
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
    ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
    │     CMS     │          │   Commerce  │          │    Order    │
    │   Service   │          │   Service   │          │   Service   │
    └─────────────┘          └─────────────┘          └─────────────┘
           │                        │                        │
           │                        │                        │
           ▼                        ▼                        ▼
    ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
    │  Contentful │          │  Inventory  │          │   Payment   │
    │  / Sanity   │          │   System    │          │  Provider   │
    └─────────────┘          └─────────────┘          └─────────────┘
```

---

## Admin Override Hierarchy

```
Priority 1 (Highest): Payment Provider responses
Priority 2: Admin emergency overrides (maintenance mode)
Priority 3: Admin product/collection overrides
Priority 4: CMS visibility states
Priority 5: Inventory levels
Priority 6 (Lowest): Cached data
```

---

## Update Propagation Rules

| Source Change | Propagates To | Timing |
|---------------|---------------|--------|
| CMS publish | Frontend catalog | < 1 minute |
| Price change | Cart totals | Immediate |
| Stock change | Product availability | Immediate |
| Order status | Customer email | < 5 minutes |
| Payment status | Order status | Immediate (webhook) |
| Admin override | All systems | Immediate |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial source of truth matrix |
