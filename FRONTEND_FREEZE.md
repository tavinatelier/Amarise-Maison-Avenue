# AMARISÉ Frontend Freeze Contract

## Overview

This document establishes a **binding contract** between frontend and backend teams. The frontend is FROZEN. Backend engineers MUST adapt to the existing frontend structure. No frontend changes are permitted without explicit approval.

---

## 1. Frozen Components

### UI Components (DO NOT MODIFY)

```
src/components/
├── common/
│   ├── HeroSection.tsx          ✅ FROZEN
│   ├── OptimizedImage.tsx       ✅ FROZEN
│   ├── PageLoader.tsx           ✅ FROZEN
│   ├── ProductCard.tsx          ✅ FROZEN
│   ├── RevealSection.tsx        ✅ FROZEN
│   ├── ScrollToTop.tsx          ✅ FROZEN
│   ├── ScrollToTopOnNavigate.tsx ✅ FROZEN
│   └── SectionHeader.tsx        ✅ FROZEN
├── layout/
│   ├── Footer.tsx               ✅ FROZEN
│   ├── Header.tsx               ✅ FROZEN
│   └── Layout.tsx               ✅ FROZEN
├── product/
│   ├── AddToRitualButton.tsx    ✅ FROZEN
│   ├── ProductGallery.tsx       ✅ FROZEN
│   ├── ProductIngredients.tsx   ✅ FROZEN
│   └── RelatedProducts.tsx      ✅ FROZEN
├── ritual-bag/
│   ├── RitualBagButton.tsx      ✅ FROZEN
│   ├── RitualBagContext.tsx     ✅ FROZEN
│   └── RitualBagDrawer.tsx      ✅ FROZEN
├── seo/
│   └── SEOHead.tsx              ✅ FROZEN
├── states/
│   ├── EmptyState.tsx           ✅ FROZEN
│   ├── ErrorState.tsx           ✅ FROZEN
│   └── LoadingSkeleton.tsx      ✅ FROZEN
├── governance/
│   └── VisibilityGate.tsx       ✅ FROZEN
└── ui/                          ✅ ALL FROZEN (shadcn)
```

### Pages (DO NOT MODIFY)

```
src/pages/
├── About.tsx                    ✅ FROZEN
├── Archive.tsx                  ✅ FROZEN
├── Atelier.tsx                  ✅ FROZEN
├── Beauty.tsx                   ✅ FROZEN
├── Discover.tsx                 ✅ FROZEN
├── Index.tsx                    ✅ FROZEN
├── Journal.tsx                  ✅ FROZEN
├── Lifestyle.tsx                ✅ FROZEN
├── NotFound.tsx                 ✅ FROZEN
├── Sustainability.tsx           ✅ FROZEN
├── atelier/                     ✅ ALL FROZEN
├── beauty/                      ✅ ALL FROZEN
├── discover/                    ✅ ALL FROZEN
└── lifestyle/                   ✅ ALL FROZEN
```

### Routes (DO NOT MODIFY)

```typescript
// src/App.tsx - Route structure is FROZEN

const FROZEN_ROUTES = [
  '/',                           // Homepage
  '/beauty',                     // Beauty collection
  '/beauty/radiance-serum',      // Product detail
  '/beauty/veil-lip-ritual',     // Product detail
  '/beauty/rituals',             // Category page
  '/beauty/ingredients-philosophy', // Editorial
  '/atelier',                    // Atelier collection
  '/atelier/collections',        // Category page
  '/atelier/lookbook',           // Lookbook
  '/atelier/craft-design',       // Editorial
  '/atelier/elan-silk-dress',    // Product detail
  '/lifestyle',                  // Lifestyle collection
  '/lifestyle/objects',          // Category page
  '/lifestyle/accessories',      // Category page
  '/lifestyle/lumiere-candle',   // Product detail
  '/lifestyle/calma-vessel',     // Product detail
  '/journal',                    // Journal listing
  '/about',                      // About page
  '/sustainability',             // Sustainability page
  '/archive',                    // Archive page
  '/discover',                   // Discover hub
  '/discover/ritual/:slug',      // Ritual detail
  '/discover/mood/:slug',        // Mood detail
  '/discover/story/:slug',       // Story detail
];
```

---

## 2. Design System (DO NOT MODIFY)

### CSS Variables

```css
/* src/index.css - ALL FROZEN */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;

  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;

  --primary: 222.1 83.2% 9.9%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 22.7% 8.3%;
  --secondary-foreground: 210 40% 98%;

  --muted: 210 22.7% 8.3%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --accent: 210 22.7% 8.3%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;

  --ring: 222.2 84% 4.9%;

  --radius: 0.5rem;
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts - FROZEN
// All theme extensions, colors, fonts, spacing FROZEN
```

### Typography

```yaml
Font Family: Frozen
Font Sizes: Frozen
Font Weights: Frozen
Line Heights: Frozen
Letter Spacing: Frozen
```

### Spacing & Layout

```yaml
Container Widths: Frozen
Section Padding: Frozen
Grid Systems: Frozen
Breakpoints: Frozen
```

---

## 3. Data Contracts (BACKEND MUST IMPLEMENT)

### Product Data Shape

```typescript
// Backend MUST return data matching this shape
interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'beauty' | 'atelier' | 'lifestyle';
  subcategory: string;
  price: string;          // Formatted: "€180"
  priceValue: number;     // Numeric: 180
  currency: string;       // "EUR"
  image: string;          // URL
  images: string[];       // Array of URLs
  status: 'published' | 'draft' | 'archived';
  inStock: boolean;
  stockLevel: number;
  tags: string[];
}
```

### Collection Data Shape

```typescript
interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  products: string[];     // Product IDs
  status: 'active' | 'upcoming' | 'archived';
  launchDate: string | null;
  endDate: string | null;
}
```

### Journal Article Shape

```typescript
interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;        // Rich text / Markdown
  image: string;
  author: string;
  category: string;
  publishedAt: string;
  readTime: string;
}
```

### Cart Item Shape

```typescript
interface CartItem {
  id: string;
  productId: string;
  title: string;
  variant: string | null;
  price: number;
  quantity: number;
  image: string;
}
```

---

## 4. API Endpoints (BACKEND IMPLEMENTS)

Backend MUST implement these endpoints with EXACT response shapes:

### Products

```yaml
GET /api/products
Response: Product[]

GET /api/products/:slug
Response: Product

GET /api/products?category=beauty
Response: Product[]
```

### Collections

```yaml
GET /api/collections
Response: Collection[]

GET /api/collections/:slug
Response: Collection
```

### Cart

```yaml
GET /api/cart
Response: { items: CartItem[], total: number }

POST /api/cart/items
Body: { productId: string, quantity: number, variant?: string }
Response: CartItem

PATCH /api/cart/items/:id
Body: { quantity: number }
Response: CartItem

DELETE /api/cart/items/:id
Response: { success: true }
```

### Content

```yaml
GET /api/content/homepage
Response: HomepageContent

GET /api/journal
Response: JournalArticle[]

GET /api/journal/:slug
Response: JournalArticle
```

---

## 5. Service Layer (REPLACE ONLY)

Backend engineers replace ONLY the implementation inside service files:

```typescript
// src/services/content.service.ts
// REPLACE the mock implementation, KEEP the function signature

// BEFORE (mock)
export async function getProducts(): Promise<Product[]> {
  const data = await import('../data/mock/products.json');
  return data.products;
}

// AFTER (real API)
export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  return response.json();
}
```

### Files to Replace

```
src/services/
├── commerce.service.ts     ← Replace mock with real cart/checkout API
├── content.service.ts      ← Replace mock with real CMS API
├── order.service.ts        ← Replace mock with real order API
├── payment.service.ts      ← Replace mock with real payment API
└── product.service.ts      ← Replace mock with real product API
```

---

## 6. Configuration (EXTEND ONLY)

Backend may ADD to configuration, never remove or rename:

```typescript
// src/config/site.config.ts
// Backend may add new feature flags
// Backend may NOT rename existing flags
// Backend may NOT remove existing flags

// ✅ ALLOWED
FEATURES.commerce.stripeEnabled = true;  // New flag

// ❌ NOT ALLOWED
FEATURES.commerce.checkout = false;      // Renamed
delete FEATURES.commerce.checkoutEnabled; // Removed
```

---

## 7. What Backend CAN Do

### Allowed Modifications

```yaml
Service Implementations:
  - Replace mock data fetching with real API calls
  - Add error handling for API failures
  - Add authentication headers
  
Configuration:
  - Add new feature flags
  - Add new environment variables
  - Update API endpoints
  
New Files:
  - Add new service utilities
  - Add API client configuration
  - Add authentication hooks
  
Data:
  - Update mock data for testing
  - Add new mock data files
```

### Allowed Additions

```yaml
Hooks:
  - useAuth (authentication)
  - useUser (current user)
  - useOrders (order history)
  
Context:
  - AuthContext
  - UserContext
  
Services:
  - auth.service.ts
  - user.service.ts
```

---

## 8. What Backend CANNOT Do

### Forbidden Modifications

```yaml
UI Components:
  - ❌ Change component props
  - ❌ Change component styling
  - ❌ Change component structure
  - ❌ Add new UI components to pages

Pages:
  - ❌ Change page layouts
  - ❌ Change page content structure
  - ❌ Add new sections
  - ❌ Remove sections

Routes:
  - ❌ Rename routes
  - ❌ Remove routes
  - ❌ Change route parameters

Styling:
  - ❌ Modify CSS variables
  - ❌ Modify Tailwind config
  - ❌ Add new colors
  - ❌ Change typography
```

---

## 9. Change Request Process

If backend requires frontend changes:

```yaml
Step 1: Document Request
  - What change is needed
  - Why it's necessary
  - Impact assessment

Step 2: Review
  - Frontend team reviews
  - Design team reviews (if visual)
  - Approve or reject

Step 3: Implementation
  - Frontend team implements
  - Backend does NOT implement

Step 4: Verification
  - Both teams verify
  - Document the change
```

---

## 10. Compliance Verification

Before backend deployment, verify:

```yaml
Checklist:
  - [ ] No UI component files modified
  - [ ] No page files modified (except adding data fetching)
  - [ ] No route changes
  - [ ] No CSS/Tailwind changes
  - [ ] Service function signatures unchanged
  - [ ] Data shapes match contracts
  - [ ] New config flags only (no removals)
  - [ ] All tests passing
```

---

## Signatures

This contract is effective immediately. Both teams acknowledge:

- Frontend is FROZEN as of this document
- Backend adapts to frontend, not vice versa
- Changes require formal approval
- Violations require incident report

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial freeze contract |
