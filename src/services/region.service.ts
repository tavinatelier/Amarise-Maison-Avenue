/**
 * AMARISÉ Region & Country Isolation Service
 * 
 * BACKEND HANDOFF: Replace mock data with real database queries.
 * All region logic must be enforced server-side.
 */

// ============================================
// TYPES
// ============================================

export type CountryCode = 'US' | 'GB' | 'FR' | 'DE' | 'IN' | 'AE' | 'JP' | 'AU' | 'CA' | 'IT';
export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'INR' | 'AED' | 'JPY' | 'AUD' | 'CAD';
export type RegionCode = 'NA' | 'EU' | 'APAC' | 'MEA';

export interface Country {
  code: CountryCode;
  name: string;
  region: RegionCode;
  defaultCurrency: CurrencyCode;
  supportedCurrencies: CurrencyCode[];
  timezone: string;
  taxRate: number;
  shippingEnabled: boolean;
  piiMaskingLevel: 'strict' | 'standard' | 'minimal';
}

export interface Region {
  code: RegionCode;
  name: string;
  countries: CountryCode[];
  headquarters: CountryCode;
  operatingHours: {
    start: string; // HH:MM format
    end: string;
  };
}

export interface AdminCountryAccess {
  adminId: string;
  allowedCountries: CountryCode[];
  allowedRegions: RegionCode[];
  allowedCurrencies: CurrencyCode[];
  canViewPII: boolean;
  canProcessRefunds: boolean;
  canModifyPricing: boolean;
  canPublishContent: boolean;
}

// ============================================
// MOCK DATA
// ============================================

const COUNTRIES: Record<CountryCode, Country> = {
  US: {
    code: 'US',
    name: 'United States',
    region: 'NA',
    defaultCurrency: 'USD',
    supportedCurrencies: ['USD'],
    timezone: 'America/New_York',
    taxRate: 0,
    shippingEnabled: true,
    piiMaskingLevel: 'standard',
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    region: 'EU',
    defaultCurrency: 'GBP',
    supportedCurrencies: ['GBP', 'EUR'],
    timezone: 'Europe/London',
    taxRate: 0.20,
    shippingEnabled: true,
    piiMaskingLevel: 'strict',
  },
  FR: {
    code: 'FR',
    name: 'France',
    region: 'EU',
    defaultCurrency: 'EUR',
    supportedCurrencies: ['EUR'],
    timezone: 'Europe/Paris',
    taxRate: 0.20,
    shippingEnabled: true,
    piiMaskingLevel: 'strict',
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    region: 'EU',
    defaultCurrency: 'EUR',
    supportedCurrencies: ['EUR'],
    timezone: 'Europe/Berlin',
    taxRate: 0.19,
    shippingEnabled: true,
    piiMaskingLevel: 'strict',
  },
  IN: {
    code: 'IN',
    name: 'India',
    region: 'APAC',
    defaultCurrency: 'INR',
    supportedCurrencies: ['INR', 'USD'],
    timezone: 'Asia/Kolkata',
    taxRate: 0.18,
    shippingEnabled: true,
    piiMaskingLevel: 'standard',
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    region: 'MEA',
    defaultCurrency: 'AED',
    supportedCurrencies: ['AED', 'USD'],
    timezone: 'Asia/Dubai',
    taxRate: 0.05,
    shippingEnabled: true,
    piiMaskingLevel: 'standard',
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    region: 'APAC',
    defaultCurrency: 'JPY',
    supportedCurrencies: ['JPY', 'USD'],
    timezone: 'Asia/Tokyo',
    taxRate: 0.10,
    shippingEnabled: true,
    piiMaskingLevel: 'strict',
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    region: 'APAC',
    defaultCurrency: 'AUD',
    supportedCurrencies: ['AUD', 'USD'],
    timezone: 'Australia/Sydney',
    taxRate: 0.10,
    shippingEnabled: true,
    piiMaskingLevel: 'standard',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    region: 'NA',
    defaultCurrency: 'CAD',
    supportedCurrencies: ['CAD', 'USD'],
    timezone: 'America/Toronto',
    taxRate: 0.13,
    shippingEnabled: true,
    piiMaskingLevel: 'standard',
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    region: 'EU',
    defaultCurrency: 'EUR',
    supportedCurrencies: ['EUR'],
    timezone: 'Europe/Rome',
    taxRate: 0.22,
    shippingEnabled: true,
    piiMaskingLevel: 'strict',
  },
};

const REGIONS: Record<RegionCode, Region> = {
  NA: {
    code: 'NA',
    name: 'North America',
    countries: ['US', 'CA'],
    headquarters: 'US',
    operatingHours: { start: '09:00', end: '18:00' },
  },
  EU: {
    code: 'EU',
    name: 'Europe',
    countries: ['GB', 'FR', 'DE', 'IT'],
    headquarters: 'GB',
    operatingHours: { start: '09:00', end: '18:00' },
  },
  APAC: {
    code: 'APAC',
    name: 'Asia Pacific',
    countries: ['IN', 'JP', 'AU'],
    headquarters: 'JP',
    operatingHours: { start: '09:00', end: '18:00' },
  },
  MEA: {
    code: 'MEA',
    name: 'Middle East & Africa',
    countries: ['AE'],
    headquarters: 'AE',
    operatingHours: { start: '09:00', end: '18:00' },
  },
};

// Mock admin access - BACKEND HANDOFF: Replace with database lookup
const MOCK_ADMIN_ACCESS: AdminCountryAccess[] = [
  {
    adminId: 'admin-001',
    allowedCountries: ['US', 'CA'],
    allowedRegions: ['NA'],
    allowedCurrencies: ['USD', 'CAD'],
    canViewPII: true,
    canProcessRefunds: true,
    canModifyPricing: false,
    canPublishContent: true,
  },
  {
    adminId: 'admin-002',
    allowedCountries: ['GB', 'FR', 'DE', 'IT'],
    allowedRegions: ['EU'],
    allowedCurrencies: ['GBP', 'EUR'],
    canViewPII: true,
    canProcessRefunds: true,
    canModifyPricing: false,
    canPublishContent: true,
  },
  {
    adminId: 'admin-003',
    allowedCountries: ['IN', 'JP', 'AU'],
    allowedRegions: ['APAC'],
    allowedCurrencies: ['INR', 'JPY', 'AUD', 'USD'],
    canViewPII: false,
    canProcessRefunds: false,
    canModifyPricing: false,
    canPublishContent: false,
  },
];

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get all countries
 * BACKEND HANDOFF: Replace with API call
 */
export async function getAllCountries(): Promise<Country[]> {
  return Object.values(COUNTRIES);
}

/**
 * Get country by code
 * BACKEND HANDOFF: Replace with API call
 */
export async function getCountry(code: CountryCode): Promise<Country | null> {
  return COUNTRIES[code] || null;
}

/**
 * Get all regions
 * BACKEND HANDOFF: Replace with API call
 */
export async function getAllRegions(): Promise<Region[]> {
  return Object.values(REGIONS);
}

/**
 * Get region by code
 * BACKEND HANDOFF: Replace with API call
 */
export async function getRegion(code: RegionCode): Promise<Region | null> {
  return REGIONS[code] || null;
}

/**
 * Get admin's country access
 * BACKEND HANDOFF: Replace with authenticated API call
 */
export async function getAdminAccess(adminId: string): Promise<AdminCountryAccess | null> {
  return MOCK_ADMIN_ACCESS.find(a => a.adminId === adminId) || null;
}

/**
 * Check if admin can access a specific country
 * BACKEND HANDOFF: Must be enforced server-side
 */
export async function canAdminAccessCountry(
  adminId: string,
  countryCode: CountryCode
): Promise<boolean> {
  const access = await getAdminAccess(adminId);
  if (!access) return false;
  return access.allowedCountries.includes(countryCode);
}

/**
 * Check if admin can access a specific region
 * BACKEND HANDOFF: Must be enforced server-side
 */
export async function canAdminAccessRegion(
  adminId: string,
  regionCode: RegionCode
): Promise<boolean> {
  const access = await getAdminAccess(adminId);
  if (!access) return false;
  return access.allowedRegions.includes(regionCode);
}

/**
 * Get countries accessible to admin
 * BACKEND HANDOFF: Replace with API call
 */
export async function getAdminCountries(adminId: string): Promise<Country[]> {
  const access = await getAdminAccess(adminId);
  if (!access) return [];
  return access.allowedCountries.map(code => COUNTRIES[code]).filter(Boolean);
}

/**
 * Get shipping countries for customer-facing
 * BACKEND HANDOFF: Replace with API call
 */
export async function getShippingCountries(): Promise<Country[]> {
  return Object.values(COUNTRIES).filter(c => c.shippingEnabled);
}

/**
 * Get tax rate for country
 * BACKEND HANDOFF: Replace with tax service API
 */
export async function getTaxRate(countryCode: CountryCode): Promise<number> {
  const country = COUNTRIES[countryCode];
  return country?.taxRate || 0;
}

/**
 * Format currency for display
 * BACKEND HANDOFF: May move to utility or keep client-side
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  locale?: string
): string {
  const localeMap: Record<CurrencyCode, string> = {
    USD: 'en-US',
    GBP: 'en-GB',
    EUR: 'de-DE',
    INR: 'en-IN',
    AED: 'ar-AE',
    JPY: 'ja-JP',
    AUD: 'en-AU',
    CAD: 'en-CA',
  };

  return new Intl.NumberFormat(locale || localeMap[currencyCode], {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Check if country supports GDPR-level privacy
 * BACKEND HANDOFF: Keep as utility
 */
export function requiresStrictPII(countryCode: CountryCode): boolean {
  const country = COUNTRIES[countryCode];
  return country?.piiMaskingLevel === 'strict';
}
