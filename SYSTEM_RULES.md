# AMARISÉ System Rules

## Overview

This document defines the authoritative business rules governing the AMARISÉ platform. Backend engineers MUST implement these rules exactly as specified. No interpretation required.

---

## 1. Order Lifecycle States

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CREATED   │ ──▶ │    PAID     │ ──▶ │  FULFILLED  │ ──▶ │  COMPLETED  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  ABANDONED  │     │  REFUNDED   │     │   RETURNED  │
└─────────────┘     └─────────────┘     └─────────────┘
```

### State Definitions

| State | Description | Allowed Transitions |
|-------|-------------|---------------------|
| `created` | Order initiated, awaiting payment | `paid`, `abandoned` |
| `paid` | Payment confirmed | `fulfilled`, `refunded` |
| `fulfilled` | Shipped to customer | `completed`, `returned` |
| `completed` | Delivery confirmed | Terminal state |
| `abandoned` | Payment not received within 30 min | Terminal state |
| `refunded` | Full refund issued | Terminal state |
| `returned` | Product returned post-delivery | `refunded` |

### Transition Rules

1. **created → paid**: Only when payment provider confirms success
2. **created → abandoned**: Automatic after 30 minutes with no payment
3. **paid → fulfilled**: When tracking number is assigned
4. **paid → refunded**: Admin-initiated only, requires reason
5. **fulfilled → completed**: 14 days after delivery confirmation OR customer confirms
6. **fulfilled → returned**: Customer initiates return within 30 days
7. **returned → refunded**: After warehouse confirms product receipt

---

## 2. Payment Rules

### Payment Success Flow

```
1. Customer submits payment
2. Payment provider returns success
3. Order state → PAID
4. Inventory decremented
5. Confirmation email sent
6. Order appears in admin
```

### Payment Failure Flow

```
1. Customer submits payment
2. Payment provider returns failure
3. Order state remains CREATED
4. Display failure message (see FAILURE_SCENARIOS.md)
5. Customer may retry (max 3 attempts)
6. After 3 failures → suggest alternative payment
7. After 30 minutes → order ABANDONED
```

### Duplicate Payment Prevention

```
Rule: One successful payment per order ID
Implementation:
- Generate idempotency key on checkout start
- Store with order record
- Payment provider rejects duplicate charges
- If duplicate webhook received → ignore, log event
```

---

## 3. Inventory Rules

### Stock Management

| Scenario | Behavior |
|----------|----------|
| Stock > 10 | Show "In Stock" |
| Stock 1-10 | Show "Only X left" |
| Stock = 0 | Show "Sold Out", disable purchase |
| Pre-order enabled | Show "Pre-Order", allow purchase |
| Waitlist enabled | Show "Join Waitlist" button |

### Inventory Reservation

```
1. Customer adds to cart → NO reservation
2. Customer enters checkout → Reserve for 15 minutes
3. Payment succeeds → Permanent decrement
4. Payment fails → Release reservation
5. Checkout abandoned → Release after 15 minutes
```

### Oversell Prevention

```
Rule: Never sell more than available stock
Implementation:
- Check stock at checkout entry
- Check stock before payment processing
- If stock depleted during checkout → show "Item no longer available"
- Partial fulfillment NOT allowed for AMARISÉ
```

---

## 4. Product Visibility Rules

### Visibility States

| State | Catalog | Search | Direct URL | Purchasable |
|-------|---------|--------|------------|-------------|
| `draft` | ❌ | ❌ | ❌ | ❌ |
| `preview` | ❌ | ❌ | ✅ | ❌ |
| `published` | ✅ | ✅ | ✅ | ✅ |
| `disabled` | ❌ | ❌ | Redirect | ❌ |
| `archived` | ❌ | ❌ | Archive page | ❌ |

### State Transition Rules

```
draft → preview      (Admin clicks "Preview")
preview → published  (Admin clicks "Publish")
published → disabled (Admin clicks "Disable")
disabled → published (Admin clicks "Re-enable")
published → archived (Admin clicks "Archive")
archived → published (NOT allowed - create new product)
```

---

## 5. Cart Rules

### Product Disabled While In Cart

```
Scenario: Customer has product in cart, admin disables product
Behavior:
1. Cart shows product with "No longer available" badge
2. Quantity controls disabled
3. Price greyed out
4. Checkout blocked until removed
5. "Remove" button prominently displayed
6. No error popups or alerts
```

### Price Change While In Cart

```
Scenario: Customer has product in cart, price changes
Behavior:
1. Cart shows updated price immediately
2. No notification (price is always current)
3. Original price NOT preserved
4. Checkout uses current price
```

### Out of Stock While In Cart

```
Scenario: Customer has product in cart, stock depletes
Behavior:
1. Cart shows "Sold Out" badge
2. Quantity locked
3. Checkout blocked until removed
4. Suggest similar products (if available)
```

---

## 6. Shipping Rules

### Supported Regions

```typescript
const SUPPORTED_REGIONS = {
  'EU': ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'LU'],
  'UK': ['GB'],
  'NORTH_AMERICA': ['US', 'CA'],
  'ASIA_PACIFIC': ['JP', 'AU', 'SG', 'HK', 'KR']
};
```

### Unsupported Country Handling

```
1. Customer enters unsupported shipping country
2. Display: "We don't ship to [Country] yet"
3. Show: "Join our waitlist for updates"
4. Collect email for notification
5. Do NOT block browsing or cart
6. Block only at checkout shipping step
```

### Shipping Method Rules

| Region | Standard | Express | Same Day |
|--------|----------|---------|----------|
| EU | 5-7 days | 2-3 days | ❌ |
| UK | 3-5 days | 1-2 days | London only |
| US | 7-10 days | 3-5 days | NY/LA only |
| Other | 10-15 days | 5-7 days | ❌ |

---

## 7. Refund Rules

### Automatic Refund Triggers

```
- Payment succeeded but fulfillment impossible (stock error)
- Customer cancels within 1 hour of payment
- Shipping carrier loses package (confirmed)
```

### Manual Refund Triggers (Admin Required)

```
- Customer requests refund (within 30 days)
- Product quality issue reported
- Duplicate charge confirmed
- Goodwill gesture
```

### Refund Timeline

```
Refund requested → 24 hours → Refund processed
Refund processed → 5-10 business days → Customer sees funds
```

---

## 8. Currency & Pricing Rules

### Price Display

```
- Always show currency symbol
- Always show 2 decimal places
- Use locale-appropriate formatting
- Price includes VAT for EU/UK
- Price excludes tax for US
```

### Currency Conversion

```
Rule: Prices are SET per currency, not converted
Implementation:
- Product has price_eur, price_usd, price_gbp
- Display currency based on region
- No real-time conversion
- Admin sets all prices manually
```

---

## 9. Email Trigger Rules

| Event | Email Type | Delay |
|-------|------------|-------|
| Order paid | Order confirmation | Immediate |
| Order fulfilled | Shipping notification | Immediate |
| Order delivered | Review request | 7 days |
| Cart abandoned | Recovery email | 4 hours |
| Wishlist item restocked | Back in stock | Immediate |
| Payment failed | Retry prompt | 15 minutes |

---

## 10. Rate Limiting Rules

| Action | Limit | Window |
|--------|-------|--------|
| Add to cart | 10 items | Per session |
| Checkout attempts | 5 | Per hour |
| Payment retries | 3 | Per order |
| Password reset | 3 | Per hour |
| Contact form | 2 | Per hour |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial system rules |
