/**
 * AMARISÉ — Global Country Configuration (Single Source of Truth)
 * 
 * BACKEND HANDOFF: Replace with database-driven country registry.
 * To add a new country: simply add an object to the COUNTRIES array.
 * The system auto-detects and supports it across all surfaces.
 */

export type LuxuryTier = 'core' | 'premium' | 'emerging';

export interface ShippingZone {
  id: string;
  name: string;
  estimatedDays: { min: number; max: number };
  cost: number;
}

export interface CountryConfig {
  id: string;
  name: string;
  code: string;
  currency: string;
  currencySymbol: string;
  vatRate: number;
  shippingZones: ShippingZone[];
  fulfillmentCenter: string;
  active: boolean;
  luxuryTier: LuxuryTier;
  complianceNotes: string;
  regulatoryBanner: string;
  locale: string;
  timezone: string;
  pricingMultiplier: number;
  dutyRate: number;
  freeShippingThreshold: number;
}

export const COUNTRIES: CountryConfig[] = [
  {
    id: 'IN',
    name: 'India',
    code: 'IN',
    currency: 'INR',
    currencySymbol: '₹',
    vatRate: 18,
    shippingZones: [
      { id: 'in-metro', name: 'Metro Cities', estimatedDays: { min: 2, max: 4 }, cost: 500 },
      { id: 'in-tier2', name: 'Tier 2 Cities', estimatedDays: { min: 4, max: 7 }, cost: 800 },
      { id: 'in-remote', name: 'Remote Areas', estimatedDays: { min: 7, max: 14 }, cost: 1200 },
    ],
    fulfillmentCenter: 'Mumbai, Maharashtra',
    active: true,
    luxuryTier: 'emerging',
    complianceNotes: 'GST applicable. Import duties on luxury goods may apply.',
    regulatoryBanner: 'Prices inclusive of GST. Import duties calculated at checkout.',
    locale: 'en-IN',
    timezone: 'Asia/Kolkata',
    pricingMultiplier: 1.0,
    dutyRate: 12,
    freeShippingThreshold: 25000,
  },
  {
    id: 'US',
    name: 'United States',
    code: 'US',
    currency: 'USD',
    currencySymbol: '$',
    vatRate: 0,
    shippingZones: [
      { id: 'us-standard', name: 'Standard', estimatedDays: { min: 3, max: 5 }, cost: 15 },
      { id: 'us-express', name: 'Express', estimatedDays: { min: 1, max: 2 }, cost: 35 },
      { id: 'us-overnight', name: 'Overnight', estimatedDays: { min: 1, max: 1 }, cost: 65 },
    ],
    fulfillmentCenter: 'New York, NY',
    active: true,
    luxuryTier: 'core',
    complianceNotes: 'State sales tax varies. No federal VAT.',
    regulatoryBanner: 'Sales tax calculated based on delivery address.',
    locale: 'en-US',
    timezone: 'America/New_York',
    pricingMultiplier: 1.08,
    dutyRate: 0,
    freeShippingThreshold: 500,
  },
  {
    id: 'GB',
    name: 'United Kingdom',
    code: 'GB',
    currency: 'GBP',
    currencySymbol: '£',
    vatRate: 20,
    shippingZones: [
      { id: 'gb-standard', name: 'Royal Mail Standard', estimatedDays: { min: 3, max: 5 }, cost: 8 },
      { id: 'gb-express', name: 'DPD Express', estimatedDays: { min: 1, max: 2 }, cost: 18 },
      { id: 'gb-sameday', name: 'London Same Day', estimatedDays: { min: 0, max: 0 }, cost: 45 },
    ],
    fulfillmentCenter: 'London, England',
    active: true,
    luxuryTier: 'core',
    complianceNotes: 'VAT included in displayed prices. GDPR-compliant data handling required.',
    regulatoryBanner: 'All prices include VAT at 20%.',
    locale: 'en-GB',
    timezone: 'Europe/London',
    pricingMultiplier: 0.86,
    dutyRate: 0,
    freeShippingThreshold: 350,
  },
  {
    id: 'CA',
    name: 'Canada',
    code: 'CA',
    currency: 'CAD',
    currencySymbol: 'C$',
    vatRate: 13,
    shippingZones: [
      { id: 'ca-standard', name: 'Canada Post Standard', estimatedDays: { min: 4, max: 7 }, cost: 20 },
      { id: 'ca-express', name: 'Express', estimatedDays: { min: 2, max: 3 }, cost: 40 },
      { id: 'ca-priority', name: 'Priority', estimatedDays: { min: 1, max: 2 }, cost: 60 },
    ],
    fulfillmentCenter: 'Toronto, Ontario',
    active: true,
    luxuryTier: 'premium',
    complianceNotes: 'HST/GST/PST varies by province. Luxury tax may apply.',
    regulatoryBanner: 'HST/GST calculated at checkout based on province.',
    locale: 'en-CA',
    timezone: 'America/Toronto',
    pricingMultiplier: 1.45,
    dutyRate: 5,
    freeShippingThreshold: 600,
  },
  // ═══ FUTURE COUNTRIES — Just add objects here ═══
  {
    id: 'AE',
    name: 'United Arab Emirates',
    code: 'AE',
    currency: 'AED',
    currencySymbol: 'د.إ',
    vatRate: 5,
    shippingZones: [
      { id: 'ae-standard', name: 'Standard', estimatedDays: { min: 2, max: 4 }, cost: 30 },
      { id: 'ae-express', name: 'Express', estimatedDays: { min: 1, max: 1 }, cost: 60 },
    ],
    fulfillmentCenter: 'Dubai, UAE',
    active: false,
    luxuryTier: 'premium',
    complianceNotes: 'VAT at 5%. No personal income tax.',
    regulatoryBanner: 'Prices include 5% VAT.',
    locale: 'en-AE',
    timezone: 'Asia/Dubai',
    pricingMultiplier: 3.97,
    dutyRate: 5,
    freeShippingThreshold: 1500,
  },
  {
    id: 'FR',
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    currencySymbol: '€',
    vatRate: 20,
    shippingZones: [
      { id: 'fr-standard', name: 'Colissimo Standard', estimatedDays: { min: 3, max: 5 }, cost: 10 },
      { id: 'fr-express', name: 'Chronopost Express', estimatedDays: { min: 1, max: 2 }, cost: 25 },
    ],
    fulfillmentCenter: 'Paris, France',
    active: false,
    luxuryTier: 'core',
    complianceNotes: 'TVA at 20%. GDPR-compliant.',
    regulatoryBanner: 'Tous les prix incluent la TVA à 20%.',
    locale: 'fr-FR',
    timezone: 'Europe/Paris',
    pricingMultiplier: 1.0,
    dutyRate: 0,
    freeShippingThreshold: 400,
  },
  {
    id: 'JP',
    name: 'Japan',
    code: 'JP',
    currency: 'JPY',
    currencySymbol: '¥',
    vatRate: 10,
    shippingZones: [
      { id: 'jp-standard', name: 'Standard', estimatedDays: { min: 3, max: 5 }, cost: 1500 },
      { id: 'jp-express', name: 'Express', estimatedDays: { min: 1, max: 2 }, cost: 3000 },
    ],
    fulfillmentCenter: 'Tokyo, Japan',
    active: false,
    luxuryTier: 'premium',
    complianceNotes: 'Consumption tax at 10%.',
    regulatoryBanner: '価格には10%の消費税が含まれています。',
    locale: 'ja-JP',
    timezone: 'Asia/Tokyo',
    pricingMultiplier: 160,
    dutyRate: 8,
    freeShippingThreshold: 50000,
  },
];

// ═══ Helpers ═══

export function getActiveCountries(): CountryConfig[] {
  return COUNTRIES.filter(c => c.active);
}

export function getAllCountries(): CountryConfig[] {
  return COUNTRIES;
}

export function getCountryById(id: string): CountryConfig | undefined {
  return COUNTRIES.find(c => c.id === id);
}

export function getCountryByCurrency(currency: string): CountryConfig | undefined {
  return COUNTRIES.find(c => c.currency === currency && c.active);
}
