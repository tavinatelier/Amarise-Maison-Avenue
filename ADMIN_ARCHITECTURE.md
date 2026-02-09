# AMARISÉ Admin Panel Architecture

## Overview

This document defines the admin panel structure, logic, and data contracts. Backend engineers implement the actual admin functionality. Frontend admin UI follows this specification exactly.

---

## Admin Panel Sections

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Dashboard  │  │  Products   │  │   Orders    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Customers  │  │     CMS     │  │  Settings   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Dashboard Section

### Data Requirements

```typescript
interface DashboardData {
  // Revenue metrics
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    currency: string;
  };
  
  // Order metrics
  orders: {
    pending: number;
    processing: number;
    shipped: number;
    completed: number;
    refunded: number;
  };
  
  // Product metrics
  products: {
    totalActive: number;
    lowStock: number;
    outOfStock: number;
  };
  
  // Geographic metrics
  topCountries: Array<{
    country: string;
    countryCode: string;
    orders: number;
    revenue: number;
  }>;
  
  // Recent activity
  recentOrders: Order[];
  recentCustomers: Customer[];
}
```

### Mock Dashboard Data

```json
{
  "revenue": {
    "today": 2450.00,
    "thisWeek": 18750.00,
    "thisMonth": 67500.00,
    "thisYear": 425000.00,
    "currency": "EUR"
  },
  "orders": {
    "pending": 3,
    "processing": 7,
    "shipped": 12,
    "completed": 156,
    "refunded": 2
  },
  "products": {
    "totalActive": 24,
    "lowStock": 4,
    "outOfStock": 1
  },
  "topCountries": [
    { "country": "Germany", "countryCode": "DE", "orders": 45, "revenue": 12500 },
    { "country": "France", "countryCode": "FR", "orders": 38, "revenue": 9800 },
    { "country": "United Kingdom", "countryCode": "GB", "orders": 32, "revenue": 8500 }
  ]
}
```

---

## 2. Products Section

### Product States

```typescript
type ProductState = 'draft' | 'preview' | 'published' | 'disabled' | 'archived';

interface ProductAdminData {
  id: string;
  title: string;
  slug: string;
  state: ProductState;
  category: string;
  price: Record<string, number>; // { EUR: 180, USD: 195, GBP: 155 }
  stock: number;
  variants: ProductVariant[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
```

### State Transition Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCT STATE TRANSITIONS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│    ┌───────┐                                                    │
│    │ DRAFT │ ─────────────────────────────────┐                 │
│    └───┬───┘                                  │                 │
│        │ "Preview"                            │                 │
│        ▼                                      │                 │
│    ┌─────────┐                                │                 │
│    │ PREVIEW │ ◄──────────────────────────────┤                 │
│    └────┬────┘                                │                 │
│         │ "Publish"                           │ "Save as Draft" │
│         ▼                                     │                 │
│    ┌───────────┐      "Disable"          ┌────┴────┐            │
│    │ PUBLISHED │ ────────────────────▶   │ DISABLED │           │
│    └─────┬─────┘ ◄──────────────────────┴──────────┘            │
│          │ "Archive"           "Re-enable"                      │
│          ▼                                                      │
│    ┌──────────┐                                                 │
│    │ ARCHIVED │  (Terminal - cannot unpublish)                  │
│    └──────────┘                                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Admin Actions

| Action | From State | To State | Side Effects |
|--------|------------|----------|--------------|
| Save Draft | Any | draft | Updates content |
| Preview | draft | preview | Generates preview URL |
| Publish | draft, preview | published | Visible in catalog |
| Disable | published | disabled | Hidden from catalog |
| Re-enable | disabled | published | Visible again |
| Archive | published, disabled | archived | Moved to archive |

### Soft Delete vs Hard Delete

```yaml
Soft Delete (Preferred):
  - Product state → 'archived'
  - Product remains in database
  - Product appears in archive section
  - Historical orders maintain product reference
  - Can be restored to 'draft' if needed (special admin action)

Hard Delete (Restricted):
  - Only for products that were NEVER published
  - Only for draft state products
  - Requires confirmation
  - Cannot be undone
  - Audit log entry required
```

---

## 3. Orders Section

### Order Admin Interface

```typescript
interface OrderAdminData {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    email: string;
    name: string;
  };
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber: string | null;
  notes: AdminNote[];
  createdAt: string;
  updatedAt: string;
}
```

### Order Actions

| Action | Conditions | Side Effects |
|--------|------------|--------------|
| View Details | Always available | None |
| Add Note | Always available | Logs admin action |
| Update Fulfillment | paymentStatus = 'paid' | Updates status, optional email |
| Add Tracking | fulfillmentStatus = 'processing' | Updates to 'shipped', emails customer |
| Initiate Refund | paymentStatus = 'paid' | Creates refund request |
| Cancel Order | fulfillmentStatus = 'unfulfilled' | Refunds if paid, restores stock |

### Refund Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Request    │ ──▶ │   Review     │ ──▶ │   Process    │
│   Refund     │     │   (Admin)    │     │   Refund     │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Reject     │
                     │   (Reason)   │
                     └──────────────┘
```

---

## 4. Customers Section

### Customer Admin Interface

```typescript
interface CustomerAdminData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  country: string;
  totalOrders: number;
  totalSpent: number;
  currency: string;
  tags: string[];
  notes: AdminNote[];
  addresses: Address[];
  createdAt: string;
  lastOrderAt: string | null;
  newsletterSubscribed: boolean;
}
```

### Customer Actions

| Action | Purpose |
|--------|---------|
| View Profile | See all customer data |
| View Orders | See customer's order history |
| Add Note | Internal notes about customer |
| Add Tag | Segment customers (VIP, Wholesale, etc) |
| Export Data | GDPR data export |
| Anonymize | GDPR deletion request |

---

## 5. CMS Section

### CMS Admin Interface

```typescript
interface CMSAdminData {
  homepage: {
    heroSection: HeroContent;
    featuredProducts: string[]; // Product IDs
    editorialBlocks: EditorialBlock[];
    announcement: AnnouncementBar | null;
  };
  navigation: {
    mainNav: NavItem[];
    footerNav: FooterSection[];
  };
  pages: {
    about: PageContent;
    sustainability: PageContent;
    contact: PageContent;
  };
  settings: {
    siteName: string;
    seoDefaults: SEODefaults;
    socialLinks: SocialLink[];
  };
}
```

### Content Block Types

```typescript
type EditorialBlockType = 
  | 'text'           // Rich text content
  | 'image'          // Single image with caption
  | 'gallery'        // Image grid
  | 'quote'          // Pull quote
  | 'video'          // Embedded video
  | 'product-feature'// Featured product highlight
  | 'cta'            // Call to action
  | 'two-column';    // Side by side content

interface EditorialBlock {
  id: string;
  type: EditorialBlockType;
  content: Record<string, any>;
  order: number;
  visible: boolean;
}
```

---

## 6. Settings Section

### Settings Categories

```typescript
interface AdminSettings {
  // Commerce settings
  commerce: {
    checkoutEnabled: boolean;
    maintenanceMode: boolean;
    maxCartItems: number;
    cartExpiryMinutes: number;
  };
  
  // Regional settings
  regions: {
    defaultRegion: string;
    enabledRegions: string[];
    shippingRestrictions: Record<string, string[]>;
  };
  
  // Currency settings
  currencies: {
    defaultCurrency: string;
    enabledCurrencies: string[];
    displayFormat: 'symbol' | 'code';
  };
  
  // Notification settings
  notifications: {
    orderConfirmation: boolean;
    shippingUpdates: boolean;
    marketingEmails: boolean;
  };
  
  // Feature flags
  features: {
    wishlist: boolean;
    reviews: boolean;
    preOrders: boolean;
    guestCheckout: boolean;
  };
}
```

### Region-Based Visibility Rules

```typescript
interface RegionVisibility {
  productId: string;
  rules: {
    [regionCode: string]: {
      visible: boolean;
      purchasable: boolean;
      priceOverride?: number;
    };
  };
}

// Example
const regionVisibility: RegionVisibility = {
  productId: 'elan-silk-dress',
  rules: {
    'EU': { visible: true, purchasable: true },
    'US': { visible: true, purchasable: true, priceOverride: 195 },
    'JP': { visible: true, purchasable: false }, // Coming soon
    'CN': { visible: false, purchasable: false }  // Not available
  }
};
```

### Price Override Logic

```typescript
interface PriceOverride {
  productId: string;
  type: 'fixed' | 'percentage';
  value: number;
  reason: string;
  startDate: string | null;
  endDate: string | null;
  regions: string[] | 'all';
}

// Resolution order:
// 1. Active price override (if any)
// 2. Region-specific price
// 3. Default currency price
```

---

## 7. Access Control

### Admin Roles

```typescript
type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

interface AdminPermissions {
  super_admin: {
    all: true;
  };
  admin: {
    dashboard: ['read'];
    products: ['read', 'write', 'publish'];
    orders: ['read', 'write', 'refund'];
    customers: ['read', 'write'];
    cms: ['read', 'write', 'publish'];
    settings: ['read', 'write'];
  };
  editor: {
    dashboard: ['read'];
    products: ['read', 'write'];
    orders: ['read'];
    customers: ['read'];
    cms: ['read', 'write'];
    settings: ['read'];
  };
  viewer: {
    dashboard: ['read'];
    products: ['read'];
    orders: ['read'];
    customers: ['read'];
    cms: ['read'];
    settings: ['read'];
  };
}
```

---

## 8. Audit Logging

### Audit Log Entry

```typescript
interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminId: string;
  adminEmail: string;
  action: string;
  resourceType: 'product' | 'order' | 'customer' | 'cms' | 'settings';
  resourceId: string;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  ipAddress: string;
  userAgent: string;
}
```

### Actions That Generate Audit Logs

- Product state changes
- Price changes
- Order status changes
- Refund processing
- Customer data changes
- Settings modifications
- Admin user changes
- CMS publish actions

---

## 9. Extended Admin Modules

### Customer Intelligence (`/admin/customers`)

| Feature | Route | Purpose |
|---------|-------|---------|
| Customer List | `/admin/customers` | Searchable customer table |
| Customer Detail | `/admin/customers/:id` | Full profile, orders, GDPR |
| Risk Assessment | Detail page | Fraud/chargeback indicators |

### Inventory Control (`/admin/inventory`)

| Feature | Route | Purpose |
|---------|-------|---------|
| SKU Overview | `/admin/inventory` | Stock levels by product |
| SKU Detail | `/admin/inventory/:sku` | Movement history, alerts |
| Low Stock | List view | Automatic warning system |

### Finance Intelligence (`/admin/finance`)

| Feature | Route | Purpose |
|---------|-------|---------|
| Revenue Dashboard | `/admin/finance` | Gross/net, refunds, taxes |
| Reports | `/admin/finance/reports` | Monthly/quarterly exports |
| Tax Management | `/admin/finance/taxes` | Country tax compliance |

### Team Management (`/admin/team`)

| Feature | Route | Purpose |
|---------|-------|---------|
| Team List | `/admin/team` | Member overview |
| Roles | `/admin/team/roles` | Role definitions |
| Activity | `/admin/team/activity` | Action timeline |

### Analytics Dashboards (`/admin/analytics`)

| Feature | Route | Purpose |
|---------|-------|---------|
| Funnel | `/admin/analytics/funnel` | Conversion analysis |
| Products | `/admin/analytics/products` | Product performance |
| Countries | `/admin/analytics/countries` | Regional metrics |

### Order Operations (`/admin/orders`, `/admin/refunds`, `/admin/returns`)

| Feature | Route | Purpose |
|---------|-------|---------|
| Order Detail | `/admin/orders/:id` | Full order management |
| Refunds | `/admin/refunds` | Refund queue |
| Returns | `/admin/returns` | Return requests |

### System Control (`/admin/system`)

| Feature | Route | Purpose |
|---------|-------|---------|
| Control Panel | `/admin/system` | Kill switch, status |
| Feature Flags | `/admin/system/flags` | Toggle features |
| Maintenance | `/admin/system/maintenance` | Planned downtime |

---

## Mock Data Location

All mock admin data is located in:

**Config Files:**
- `src/config/admin.config.ts` - Product/collection/commerce controls

**Mock JSON Files:**
- `src/data/mock/admin-dashboard.json` - Dashboard metrics
- `src/data/mock/customers.json` - Customer data
- `src/data/mock/inventory.json` - SKU inventory
- `src/data/mock/finance.json` - Financial data
- `src/data/mock/analytics.json` - Analytics data
- `src/data/mock/team.json` - Team members
- `src/data/mock/system.json` - System state

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [OPERATIONS_PLAYBOOK.md](./OPERATIONS_PLAYBOOK.md) | Daily operations guide |
| [FINANCE_DATA_CONTRACTS.md](./FINANCE_DATA_CONTRACTS.md) | Financial data specs |
| [TEAM_ACCESS_MODEL.md](./TEAM_ACCESS_MODEL.md) | RBAC definitions |
| [SYSTEM_CONTROLS.md](./SYSTEM_CONTROLS.md) | Control mechanisms |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0 | 2024-01-09 | Platform Team | Added extended admin modules |
| 1.0 | 2024-01-02 | Platform Team | Initial admin architecture |
