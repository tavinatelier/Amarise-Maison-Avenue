# AMARISÉ Analytics Events Specification

## Overview

This document defines all analytics events, their properties, and tracking requirements. Backend engineers implement event emission. Analytics team configures dashboards. No frontend SDK implementation required at this stage.

---

## 1. Event Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                      EVENT CATEGORIES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   PAGEVIEW          Page and screen views                       │
│   COMMERCE          Shopping and purchase events                │
│   ENGAGEMENT        User interaction events                     │
│   CONVERSION        Goal completion events                      │
│   ERROR             Error and failure events                    │
│   PERFORMANCE       Technical performance events                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Funnel Stages

### E-Commerce Funnel

```
┌──────────────┐
│   DISCOVER   │  Browse collections, search, explore
└──────┬───────┘
       ▼
┌──────────────┐
│    VIEW      │  View product detail page
└──────┬───────┘
       ▼
┌──────────────┐
│  ADD TO BAG  │  Add product to ritual bag
└──────┬───────┘
       ▼
┌──────────────┐
│   CHECKOUT   │  Begin checkout process
└──────┬───────┘
       ▼
┌──────────────┐
│   PAYMENT    │  Enter payment details
└──────┬───────┘
       ▼
┌──────────────┐
│  PURCHASE    │  Complete purchase
└──────────────┘
```

### Funnel Events

| Stage | Event Name | Trigger |
|-------|------------|---------|
| Discover | `collection_view` | User views collection page |
| Discover | `search` | User performs search |
| View | `product_view` | User views product detail |
| Add | `add_to_bag` | User adds item to bag |
| Add | `remove_from_bag` | User removes item |
| Checkout | `begin_checkout` | User enters checkout |
| Checkout | `add_shipping_info` | User enters shipping |
| Payment | `add_payment_info` | User enters payment |
| Purchase | `purchase` | Payment successful |

---

## 3. Event Specifications

### 3.1 Pageview Events

#### `page_view`

```typescript
interface PageViewEvent {
  event: 'page_view';
  properties: {
    page_path: string;          // "/beauty/radiance-serum"
    page_title: string;         // "Radiance Serum | AMARISÉ"
    page_type: PageType;        // "product" | "collection" | "editorial"
    referrer: string | null;    // Previous page or external referrer
    
    // Optional context
    collection?: string;        // "beauty"
    product_id?: string;        // If product page
    article_id?: string;        // If journal page
  };
}

type PageType = 
  | 'home'
  | 'collection'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'journal'
  | 'editorial'
  | 'about'
  | 'search'
  | 'archive'
  | 'error';
```

---

### 3.2 Commerce Events

#### `product_view`

```typescript
interface ProductViewEvent {
  event: 'product_view';
  properties: {
    product_id: string;         // "radiance-serum"
    product_name: string;       // "Radiance Serum"
    product_category: string;   // "beauty"
    product_price: number;      // 180
    product_currency: string;   // "EUR"
    product_variant?: string;   // "50ml"
    in_stock: boolean;          // true
    
    // Context
    source: string;             // "collection" | "search" | "related"
    position?: number;          // Position in list if from listing
  };
}
```

#### `add_to_bag`

```typescript
interface AddToBagEvent {
  event: 'add_to_bag';
  properties: {
    product_id: string;
    product_name: string;
    product_category: string;
    product_price: number;
    product_currency: string;
    product_variant?: string;
    quantity: number;
    
    // Cart state after add
    cart_total: number;
    cart_item_count: number;
    
    // Context
    source: string;             // Where add was triggered
  };
}
```

#### `remove_from_bag`

```typescript
interface RemoveFromBagEvent {
  event: 'remove_from_bag';
  properties: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity_removed: number;
    
    // Cart state after remove
    cart_total: number;
    cart_item_count: number;
  };
}
```

#### `view_bag`

```typescript
interface ViewBagEvent {
  event: 'view_bag';
  properties: {
    cart_total: number;
    cart_item_count: number;
    products: Array<{
      product_id: string;
      product_name: string;
      quantity: number;
      price: number;
    }>;
  };
}
```

#### `begin_checkout`

```typescript
interface BeginCheckoutEvent {
  event: 'begin_checkout';
  properties: {
    cart_total: number;
    cart_item_count: number;
    currency: string;
    products: Array<{
      product_id: string;
      product_name: string;
      quantity: number;
      price: number;
    }>;
    
    // Customer context (if logged in)
    customer_id?: string;
    is_returning_customer?: boolean;
  };
}
```

#### `add_shipping_info`

```typescript
interface AddShippingInfoEvent {
  event: 'add_shipping_info';
  properties: {
    shipping_country: string;   // "DE"
    shipping_method: string;    // "standard" | "express"
    shipping_cost: number;
    cart_total: number;
    currency: string;
  };
}
```

#### `add_payment_info`

```typescript
interface AddPaymentInfoEvent {
  event: 'add_payment_info';
  properties: {
    payment_method: string;     // "card" | "paypal" | "apple_pay"
    cart_total: number;
    currency: string;
  };
}
```

#### `purchase`

```typescript
interface PurchaseEvent {
  event: 'purchase';
  properties: {
    transaction_id: string;     // Order ID
    value: number;              // Total order value
    currency: string;
    tax: number;
    shipping: number;
    
    products: Array<{
      product_id: string;
      product_name: string;
      product_category: string;
      quantity: number;
      price: number;
    }>;
    
    // Customer context
    customer_id?: string;
    is_first_purchase: boolean;
    
    // Shipping context
    shipping_country: string;
    shipping_method: string;
    
    // Marketing attribution
    coupon?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}
```

---

### 3.3 Checkout Drop-off Events

#### `checkout_step_abandoned`

```typescript
interface CheckoutAbandonedEvent {
  event: 'checkout_step_abandoned';
  properties: {
    step: 'information' | 'shipping' | 'payment';
    cart_total: number;
    cart_item_count: number;
    time_in_step_seconds: number;
    
    // What was completed
    email_entered: boolean;
    shipping_entered: boolean;
    
    // Possible reasons (if detectable)
    last_interaction: string;   // Last element interacted with
  };
}
```

#### `checkout_error`

```typescript
interface CheckoutErrorEvent {
  event: 'checkout_error';
  properties: {
    step: string;
    error_type: string;         // "validation" | "api" | "payment"
    error_message: string;
    cart_total: number;
  };
}
```

---

### 3.4 Payment Events

#### `payment_failed`

```typescript
interface PaymentFailedEvent {
  event: 'payment_failed';
  properties: {
    failure_reason: string;     // "card_declined" | "insufficient_funds"
    payment_method: string;
    cart_total: number;
    currency: string;
    attempt_number: number;     // 1, 2, 3
  };
}
```

#### `payment_retry`

```typescript
interface PaymentRetryEvent {
  event: 'payment_retry';
  properties: {
    attempt_number: number;
    previous_failure_reason: string;
    payment_method: string;     // Same or different method
  };
}
```

---

### 3.5 Engagement Events

#### `newsletter_signup`

```typescript
interface NewsletterSignupEvent {
  event: 'newsletter_signup';
  properties: {
    source: string;             // "footer" | "popup" | "checkout"
    email_domain: string;       // Anonymized: "gmail.com"
  };
}
```

#### `wishlist_add`

```typescript
interface WishlistAddEvent {
  event: 'wishlist_add';
  properties: {
    product_id: string;
    product_name: string;
    product_price: number;
  };
}
```

#### `share`

```typescript
interface ShareEvent {
  event: 'share';
  properties: {
    content_type: 'product' | 'article' | 'lookbook';
    content_id: string;
    share_method: 'email' | 'facebook' | 'twitter' | 'pinterest' | 'copy_link';
  };
}
```

---

### 3.6 Geographic Metrics

#### `shipping_country_selected`

```typescript
interface ShippingCountryEvent {
  event: 'shipping_country_selected';
  properties: {
    country_code: string;
    country_name: string;
    is_supported: boolean;
    cart_total: number;
  };
}
```

#### `unsupported_country_attempt`

```typescript
interface UnsupportedCountryEvent {
  event: 'unsupported_country_attempt';
  properties: {
    country_code: string;
    country_name: string;
    cart_total: number;
    joined_waitlist: boolean;
  };
}
```

---

### 3.7 Product Performance Events

#### `product_impression`

```typescript
interface ProductImpressionEvent {
  event: 'product_impression';
  properties: {
    product_ids: string[];      // Products shown
    list_name: string;          // "homepage_featured" | "related_products"
    positions: number[];        // Position of each product
  };
}
```

#### `product_click`

```typescript
interface ProductClickEvent {
  event: 'product_click';
  properties: {
    product_id: string;
    product_name: string;
    list_name: string;
    position: number;
  };
}
```

---

### 3.8 Error Events

#### `error_occurred`

```typescript
interface ErrorEvent {
  event: 'error_occurred';
  properties: {
    error_type: 'api' | 'validation' | 'render' | 'network';
    error_message: string;
    page_path: string;
    component?: string;
    
    // Context
    user_action?: string;       // What user was trying to do
  };
}
```

---

## 4. User Properties

### Anonymous Users

```typescript
interface AnonymousUserProperties {
  user_id: null;
  anonymous_id: string;         // Client-generated UUID
  first_seen: string;           // ISO date
  session_count: number;
  country: string;              // From IP
  device_type: 'desktop' | 'tablet' | 'mobile';
  browser: string;
}
```

### Identified Users

```typescript
interface IdentifiedUserProperties {
  user_id: string;
  anonymous_id: string;         // Link to pre-login activity
  email_domain: string;         // Anonymized
  created_at: string;
  
  // Behavioral
  total_orders: number;
  total_spent: number;
  average_order_value: number;
  last_order_date: string | null;
  
  // Preferences
  preferred_currency: string;
  preferred_country: string;
  newsletter_subscribed: boolean;
}
```

---

## 5. Dashboard Requirements

### Core Dashboards

#### Revenue Dashboard

```yaml
Metrics:
  - Total revenue (daily/weekly/monthly)
  - Average order value
  - Revenue by product category
  - Revenue by country
  - Revenue by new vs returning
  
Visualizations:
  - Revenue trend line
  - Category breakdown pie chart
  - Geographic heat map
  - Customer cohort analysis
```

#### Funnel Dashboard

```yaml
Metrics:
  - Funnel conversion rates
  - Drop-off by stage
  - Time in each stage
  - Abandonment reasons
  
Visualizations:
  - Funnel visualization
  - Stage-by-stage conversion
  - Drop-off trend over time
  - Comparison by segment
```

#### Product Performance Dashboard

```yaml
Metrics:
  - Views per product
  - Add-to-bag rate
  - Purchase conversion
  - Revenue per product
  - Return rate (future)
  
Visualizations:
  - Product performance table
  - Best/worst performers
  - Category comparison
  - Trend over time
```

---

## 6. Implementation Notes

### Event Timing

```yaml
Real-time Required:
  - purchase
  - payment_failed
  - error_occurred
  
Batched (< 5 min):
  - page_view
  - product_view
  - product_impression
  
End of Session:
  - session_summary
  - checkout_step_abandoned
```

### Data Privacy

```yaml
Never Track:
  - Full email addresses
  - Full names
  - Payment card details
  - IP addresses (anonymize)
  - Precise location
  
Anonymize:
  - Email → domain only
  - Location → country level
  - User agent → parsed values
```

### Sampling (High Traffic)

```yaml
100% Sampling:
  - purchase
  - payment_failed
  - checkout_* events
  
10% Sampling (if needed):
  - page_view
  - product_impression
```

---

## 7. Integration Points

### Where Events Are Emitted

```typescript
// Frontend (via analytics library)
- page_view         → Router navigation
- product_view      → Product page mount
- add_to_bag        → Add button click
- view_bag          → Bag drawer open

// Backend (via server-side tracking)
- purchase          → Order confirmed webhook
- payment_failed    → Payment provider webhook
- refund            → Refund processed
```

### Event Validation

```yaml
Required Fields:
  - event (string, non-empty)
  - timestamp (ISO 8601)
  - anonymous_id OR user_id
  
Validation Rules:
  - Prices must be positive numbers
  - Currency must be valid ISO code
  - Product IDs must exist
  - Quantities must be positive integers
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial analytics specification |
