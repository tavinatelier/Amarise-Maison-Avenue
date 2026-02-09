/**
 * CENTRAL SITE CONFIGURATION
 * BACKEND HANDOFF: Replace with environment variables or remote config
 * 
 * This file contains all feature flags, region settings, and system toggles.
 * Backend developers: Connect to remote config service (LaunchDarkly, etc.)
 */

// ============================================
// FEATURE FLAGS
// ============================================

export const FEATURES = {
  /**
   * COMMERCE FEATURES
   * Toggle purchasing functionality across the site
   */
  commerce: {
    /** Enable/disable checkout flow entirely */
    checkoutEnabled: true,
    
    /** Enable/disable add to bag functionality */
    addToBagEnabled: true,
    
    /** Show prices on product cards */
    showPrices: true,
    
    /** Enable guest checkout (no account required) */
    guestCheckoutEnabled: true,
    
    /** Enable express checkout (Apple Pay, Google Pay) */
    expressCheckoutEnabled: false,
  },

  /**
   * DISCOVERY FEATURES
   * Toggle browsing and exploration modes
   */
  discovery: {
    /** Enable "Browse by Ritual" */
    browseByRitual: true,
    
    /** Enable "Browse by Mood" */
    browseByMood: true,
    
    /** Enable "Browse by Story" */
    browseByStory: true,
    
    /** Enable archive browsing */
    archiveEnabled: true,
  },

  /**
   * CONTENT FEATURES
   * Toggle content sections
   */
  content: {
    /** Enable Journal/Blog section */
    journalEnabled: true,
    
    /** Enable Lookbook section */
    lookbookEnabled: true,
    
    /** Enable Newsletter signup */
    newsletterEnabled: true,
  },

  /**
   * UI FEATURES
   * Toggle UI enhancements
   */
  ui: {
    /** Enable motion animations */
    animationsEnabled: true,
    
    /** Enable blur-up image loading */
    blurUpImages: true,
    
    /** Enable scroll-to-top button */
    scrollToTop: true,
    
    /** Enable reduced motion for accessibility */
    respectReducedMotion: true,
  },
} as const;


// ============================================
// REGION & CURRENCY CONFIGURATION
// ============================================

export const REGION = {
  /**
   * BACKEND HANDOFF: Detect from IP or user preference
   */
  default: 'EU',
  
  supported: ['EU', 'US', 'UK', 'JP', 'AU'] as const,
  
  current: 'EU', // BACKEND: Replace with detected/selected region
} as const;

export const CURRENCY = {
  /**
   * BACKEND HANDOFF: Connect to currency service
   */
  default: 'EUR',
  
  supported: {
    EU: { code: 'EUR', symbol: '€', position: 'before' },
    US: { code: 'USD', symbol: '$', position: 'before' },
    UK: { code: 'GBP', symbol: '£', position: 'before' },
    JP: { code: 'JPY', symbol: '¥', position: 'before' },
    AU: { code: 'AUD', symbol: 'A$', position: 'before' },
  } as const,
  
  /** Get current currency config based on region */
  getCurrent: () => CURRENCY.supported[REGION.current as keyof typeof CURRENCY.supported] || CURRENCY.supported.EU,
} as const;


// ============================================
// PRODUCT AVAILABILITY
// ============================================

export const AVAILABILITY = {
  /**
   * Global product availability status
   * BACKEND HANDOFF: Connect to inventory service
   */
  stockLevels: {
    /** Show "Low Stock" warning when inventory below this */
    lowStockThreshold: 5,
    
    /** Show "Out of Stock" at 0 */
    outOfStock: 0,
  },
  
  /**
   * Pre-order settings
   */
  preOrder: {
    enabled: true,
    label: 'Pre-order',
    estimatedShipText: 'Ships in 4-6 weeks',
  },
  
  /**
   * Waitlist for out-of-stock items
   */
  waitlist: {
    enabled: true,
    label: 'Join Waitlist',
  },
} as const;


// ============================================
// COLLECTION GOVERNANCE
// ============================================

export const COLLECTIONS = {
  /**
   * Collection visibility states
   * BACKEND HANDOFF: Connect to scheduling/CMS service
   */
  visibility: {
    /** Show countdown for upcoming launches */
    showLaunchCountdown: true,
    
    /** Show "Coming Soon" for soft-launch items */
    showComingSoon: true,
    
    /** Show archive section */
    showArchive: true,
    
    /** Days before launch to show preview */
    previewDaysBeforeLaunch: 7,
  },
  
  /**
   * Drop mechanics (limited releases)
   */
  drops: {
    enabled: true,
    showCountdown: true,
    showRemainingStock: false, // Keep it calm, not urgent
  },
} as const;


// ============================================
// API ENDPOINTS (PLACEHOLDER)
// ============================================

export const API = {
  /**
   * BACKEND HANDOFF: Replace with actual endpoints
   * These are placeholder URLs for documentation purposes
   */
  baseUrl: import.meta.env.VITE_API_URL || 'https://api.amarise.com',
  
  endpoints: {
    // Commerce
    products: '/products',
    collections: '/collections',
    cart: '/cart',
    checkout: '/checkout',
    
    // Content
    journal: '/journal',
    lookbook: '/lookbook',
    pages: '/pages',
    
    // Discovery
    rituals: '/discovery/rituals',
    moods: '/discovery/moods',
    stories: '/discovery/stories',
    
    // User (future)
    auth: '/auth',
    account: '/account',
    wishlist: '/wishlist',
  },
} as const;


// ============================================
// SEO & ANALYTICS
// ============================================

export const SEO = {
  siteName: 'AMARISÉ',
  titleTemplate: '%s | AMARISÉ',
  defaultTitle: 'AMARISÉ | Luxury Beauty, Fashion & Lifestyle',
  defaultDescription: 'Discover a world of refined elegance. AMARISÉ offers luxury beauty, atelier fashion, and curated lifestyle objects crafted with intention.',
  
  social: {
    twitter: '@amarise',
    instagram: '@amarise',
  },
} as const;

export const ANALYTICS = {
  /**
   * BACKEND HANDOFF: Enable when analytics is configured
   */
  enabled: false,
  googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
  
  /** Track these events */
  events: {
    productView: true,
    addToCart: true,
    checkout: true,
    search: false, // No search functionality
  },
} as const;


// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format price with currency symbol
 * BACKEND HANDOFF: Move to API response or i18n service
 */
export const formatPrice = (amount: number): string => {
  const currency = CURRENCY.getCurrent();
  const formatted = amount.toFixed(2);
  
  return currency.position === 'before' 
    ? `${currency.symbol}${formatted}`
    : `${formatted}${currency.symbol}`;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (
  category: keyof typeof FEATURES,
  feature: string
): boolean => {
  const featureCategory = FEATURES[category] as Record<string, boolean>;
  return featureCategory?.[feature] ?? false;
};

/**
 * Get collection visibility status based on dates
 */
export const getVisibilityStatus = (
  launchDate?: string,
  endDate?: string
): 'preview' | 'active' | 'archived' | 'hidden' => {
  const now = new Date();
  
  if (endDate && new Date(endDate) < now) {
    return 'archived';
  }
  
  if (launchDate) {
    const launch = new Date(launchDate);
    if (launch > now) {
      const daysUntilLaunch = Math.ceil((launch.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilLaunch <= COLLECTIONS.visibility.previewDaysBeforeLaunch ? 'preview' : 'hidden';
    }
  }
  
  return 'active';
};
