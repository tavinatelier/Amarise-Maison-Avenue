/**
 * MOCK ADMIN CONFIGURATION
 * BACKEND HANDOFF: Replace with admin dashboard API or remote config service
 * 
 * This file simulates admin control without requiring a real admin panel.
 * Backend developers: Connect to CMS admin, LaunchDarkly, or internal tools.
 * 
 * NO UI ADMIN NEEDED - All controls are config-driven.
 */

// ============================================
// PRODUCT CONTROLS
// ============================================

/**
 * Product-level overrides
 * BACKEND HANDOFF: Replace with database/CMS product status
 */
export const PRODUCT_OVERRIDES: Record<string, {
  enabled: boolean;
  isPurchasable: boolean;
  status: 'active' | 'soft-launch' | 'archived' | 'hidden';
  stockOverride?: 'in-stock' | 'out-of-stock' | 'low-stock' | 'pre-order';
  priceOverride?: number;
  visibility?: 'public' | 'preview' | 'hidden';
}> = {
  // Example: Disable a specific product
  // 'product-id': { enabled: false, isPurchasable: false, status: 'hidden' },
  
  // Example: Put product in soft-launch (viewable but not purchasable)
  // 'new-product-id': { enabled: true, isPurchasable: false, status: 'soft-launch' },
  
  // Example: Mark as pre-order
  // 'upcoming-product': { enabled: true, isPurchasable: true, status: 'active', stockOverride: 'pre-order' },
};

// ============================================
// COLLECTION CONTROLS
// ============================================

/**
 * Collection-level overrides
 * BACKEND HANDOFF: Replace with collection scheduling API
 */
export const COLLECTION_OVERRIDES: Record<string, {
  enabled: boolean;
  visibility: 'public' | 'preview' | 'hidden';
  status: 'active' | 'soft-launch' | 'archived' | 'scheduled';
  showCountdown: boolean;
  launchDateOverride?: string; // ISO date
  endDateOverride?: string;    // ISO date
}> = {
  // Example: Hide an entire collection
  // 'collection-slug': { enabled: false, visibility: 'hidden', status: 'archived', showCountdown: false },
  
  // Example: Schedule a future collection with countdown
  // 'new-collection': { enabled: true, visibility: 'preview', status: 'scheduled', showCountdown: true, launchDateOverride: '2025-03-01' },
};

// ============================================
// CATEGORY CONTROLS
// ============================================

/**
 * Category-level toggles
 * BACKEND HANDOFF: Replace with CMS category settings
 */
export const CATEGORY_CONFIG = {
  beauty: {
    enabled: true,
    showPrices: true,
    allowPurchase: true,
  },
  atelier: {
    enabled: true,
    showPrices: true,
    allowPurchase: true,
  },
  lifestyle: {
    enabled: true,
    showPrices: true,
    allowPurchase: true,
  },
} as const;

// ============================================
// CONTENT CONTROLS
// ============================================

/**
 * Content section toggles
 * BACKEND HANDOFF: Replace with CMS publication status
 */
export const CONTENT_STATUS = {
  journal: {
    /** Enable/disable entire journal section */
    enabled: true,
    /** Show draft articles (for preview) */
    showDrafts: false,
  },
  lookbook: {
    enabled: true,
    currentSeason: 'spring-summer-2025',
    showArchived: false,
  },
  homepage: {
    enabled: true,
    /** Override hero section */
    heroOverride: null as null | {
      image: string;
      title: string;
      subtitle: string;
    },
  },
} as const;

// ============================================
// COMMERCE CONTROLS
// ============================================

/**
 * Global commerce toggles
 * BACKEND HANDOFF: Connect to payment gateway status
 */
export const COMMERCE_CONTROLS = {
  /** Master switch for all commerce */
  commerceEnabled: true,
  
  /** Enable/disable checkout globally */
  checkoutEnabled: true,
  
  /** Enable/disable add-to-bag globally */
  addToBagEnabled: true,
  
  /** Maintenance mode - disable all purchases */
  maintenanceMode: false,
  
  /** Soft-launch mode - viewable but not purchasable */
  softLaunchMode: false,
  
  /** Checkout redirect URL (for external checkout) */
  checkoutRedirectUrl: null as string | null,
  
  /** Maximum items per order */
  maxItemsPerOrder: 10,
  
  /** Minimum order value */
  minimumOrderValue: 0,
} as const;

// ============================================
// REGION & SHIPPING CONTROLS
// ============================================

/**
 * Region availability
 * BACKEND HANDOFF: Replace with shipping provider API
 */
export const REGION_CONTROLS = {
  enabledRegions: ['EU', 'US', 'UK', 'JP', 'AU'] as string[],
  defaultRegion: 'EU',
  
  /** Shipping restrictions by region */
  shippingRestrictions: {
    // 'product-id': ['JP', 'AU'], // Can't ship to these regions
  } as Record<string, string[]>,
  
  /** Tax included in prices */
  taxIncluded: {
    EU: true,
    US: false,
    UK: true,
    JP: true,
    AU: true,
  } as Record<string, boolean>,
} as const;

// ============================================
// PROMOTION CONTROLS
// ============================================

/**
 * Promotional overrides (no real promo logic, just display)
 * BACKEND HANDOFF: Replace with promotions service
 */
export const PROMO_CONFIG = {
  /** Show promotional banner */
  showBanner: false,
  bannerText: '',
  bannerLink: '',
  
  /** Free shipping threshold */
  freeShippingThreshold: 250,
  showFreeShippingMessage: true,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a product is enabled
 * BACKEND HANDOFF: This will be API-driven
 */
export const isProductEnabled = (productId: string): boolean => {
  const override = PRODUCT_OVERRIDES[productId];
  return override ? override.enabled : true;
};

/**
 * Check if a product is purchasable (considering all factors)
 */
export const isProductPurchasable = (productId: string): boolean => {
  // Check maintenance mode
  if (COMMERCE_CONTROLS.maintenanceMode) return false;
  
  // Check soft-launch mode
  if (COMMERCE_CONTROLS.softLaunchMode) return false;
  
  // Check commerce enabled
  if (!COMMERCE_CONTROLS.commerceEnabled) return false;
  
  // Check product override
  const override = PRODUCT_OVERRIDES[productId];
  if (override) {
    return override.enabled && override.isPurchasable;
  }
  
  return true;
};

/**
 * Get product status with overrides
 */
export const getProductStatus = (
  productId: string,
  defaultStatus: 'active' | 'soft-launch' | 'archived' = 'active'
): 'active' | 'soft-launch' | 'archived' | 'hidden' => {
  const override = PRODUCT_OVERRIDES[productId];
  return override?.status ?? defaultStatus;
};

/**
 * Check if a collection is visible
 */
export const isCollectionVisible = (collectionSlug: string): boolean => {
  const override = COLLECTION_OVERRIDES[collectionSlug];
  if (override) {
    return override.enabled && override.visibility !== 'hidden';
  }
  return true;
};

/**
 * Get collection status with overrides
 */
export const getCollectionStatus = (
  collectionSlug: string,
  defaultStatus: 'active' | 'soft-launch' | 'archived' | 'scheduled' = 'active'
) => {
  const override = COLLECTION_OVERRIDES[collectionSlug];
  return override?.status ?? defaultStatus;
};

/**
 * Check if commerce is available
 */
export const isCommerceAvailable = (): boolean => {
  return (
    COMMERCE_CONTROLS.commerceEnabled &&
    !COMMERCE_CONTROLS.maintenanceMode &&
    COMMERCE_CONTROLS.checkoutEnabled
  );
};

/**
 * Get checkout status message
 */
export const getCheckoutStatusMessage = (): string | null => {
  if (COMMERCE_CONTROLS.maintenanceMode) {
    return 'Checkout is temporarily unavailable';
  }
  if (!COMMERCE_CONTROLS.commerceEnabled) {
    return 'Shopping is currently disabled';
  }
  if (COMMERCE_CONTROLS.softLaunchMode) {
    return 'Preview mode - checkout coming soon';
  }
  return null;
};
