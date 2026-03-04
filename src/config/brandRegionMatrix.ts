/**
 * AMARISÉ — Brand × Country Matrix
 * 
 * BACKEND HANDOFF: Replace with database-driven brand-region availability.
 * Controls brand visibility, pricing multipliers, and launch scheduling per country.
 */

export type BrandCountryStatus = 'active' | 'frozen' | 'soft-launch' | 'scheduled' | 'inactive';

export interface BrandCountryEntry {
  brandId: string;
  countryId: string;
  status: BrandCountryStatus;
  pricingMultiplier: number;
  launchDate?: string;
  checkoutEnabled: boolean;
  navVisible: boolean;
  homepageVisible: boolean;
}

export interface BrandConfig {
  id: string;
  name: string;
  pillar: string;
  description: string;
}

export const BRANDS: BrandConfig[] = [
  { id: 'amarise-atelier', name: 'AMARISÉ Atelier', pillar: 'atelier', description: 'Haute couture and bespoke design' },
  { id: 'amarise-beauty', name: 'AMARISÉ Beauty', pillar: 'beauty', description: 'Luxury skincare and cosmetics' },
  { id: 'amarise-objects', name: 'AMARISÉ Objects', pillar: 'lifestyle', description: 'Refined home and lifestyle objects' },
  { id: 'amarise-archive', name: 'AMARISÉ Archive', pillar: 'archive', description: 'Vintage and limited editions' },
];

const STORAGE_KEY = 'amarise-brand-region-matrix';

function getDefaultMatrix(): BrandCountryEntry[] {
  const activeCountries = ['IN', 'US', 'GB', 'CA'];
  const entries: BrandCountryEntry[] = [];
  for (const brand of BRANDS) {
    for (const countryId of activeCountries) {
      entries.push({
        brandId: brand.id,
        countryId,
        status: 'active',
        pricingMultiplier: 1.0,
        checkoutEnabled: true,
        navVisible: true,
        homepageVisible: true,
      });
    }
    // Inactive countries
    for (const countryId of ['AE', 'FR', 'JP']) {
      entries.push({
        brandId: brand.id,
        countryId,
        status: 'inactive',
        pricingMultiplier: 1.0,
        checkoutEnabled: false,
        navVisible: false,
        homepageVisible: false,
      });
    }
  }
  return entries;
}

export function getMatrix(): BrandCountryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return getDefaultMatrix();
}

export function saveMatrix(matrix: BrandCountryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matrix));
}

export function updateMatrixEntry(brandId: string, countryId: string, updates: Partial<BrandCountryEntry>): BrandCountryEntry[] {
  const matrix = getMatrix();
  const idx = matrix.findIndex(e => e.brandId === brandId && e.countryId === countryId);
  if (idx >= 0) {
    matrix[idx] = { ...matrix[idx], ...updates };
  } else {
    matrix.push({ brandId, countryId, status: 'inactive', pricingMultiplier: 1.0, checkoutEnabled: false, navVisible: false, homepageVisible: false, ...updates });
  }
  saveMatrix(matrix);
  return matrix;
}

export function getBrandAvailability(brandId: string, countryId: string): BrandCountryEntry | undefined {
  return getMatrix().find(e => e.brandId === brandId && e.countryId === countryId);
}

export function getActiveBrandsForCountry(countryId: string): BrandCountryEntry[] {
  return getMatrix().filter(e => e.countryId === countryId && (e.status === 'active' || e.status === 'soft-launch'));
}
