/**
 * AMARISÉ — One-Click Country Expansion Service
 * 
 * BACKEND HANDOFF: Replace localStorage with API calls to country management service.
 * Handles country activation, deactivation, and auto-provisioning.
 */

import { CountryConfig, COUNTRIES } from '@/config/countries.config';

const STORAGE_KEY = 'amarise-country-overrides';

export interface CountryOverride {
  active: boolean;
  checkoutFrozen: boolean;
  shippingBlackout: boolean;
  complianceBannerEnabled: boolean;
  taxOverride?: number;
  launchDate?: string;
  softLaunch: boolean;
}

function getOverrides(): Record<string, CountryOverride> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveOverrides(overrides: Record<string, CountryOverride>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

/**
 * Get effective country state (config merged with overrides)
 */
export function getEffectiveCountries(): (CountryConfig & { overrides: CountryOverride })[] {
  const overrides = getOverrides();
  return COUNTRIES.map(c => ({
    ...c,
    active: overrides[c.id]?.active ?? c.active,
    overrides: overrides[c.id] || {
      active: c.active,
      checkoutFrozen: false,
      shippingBlackout: false,
      complianceBannerEnabled: true,
      softLaunch: false,
    },
  }));
}

/**
 * One-click country activation
 */
export function activateCountry(countryId: string): void {
  const overrides = getOverrides();
  overrides[countryId] = {
    ...(overrides[countryId] || {}),
    active: true,
    checkoutFrozen: false,
    shippingBlackout: false,
    complianceBannerEnabled: true,
    softLaunch: false,
  };
  saveOverrides(overrides);
}

/**
 * Deactivate country
 */
export function deactivateCountry(countryId: string): void {
  const overrides = getOverrides();
  overrides[countryId] = {
    ...(overrides[countryId] || {}),
    active: false,
    checkoutFrozen: true,
    shippingBlackout: true,
    complianceBannerEnabled: false,
    softLaunch: false,
  };
  saveOverrides(overrides);
}

/**
 * Update country override
 */
export function updateCountryOverride(countryId: string, update: Partial<CountryOverride>): void {
  const overrides = getOverrides();
  overrides[countryId] = { ...(overrides[countryId] || { active: false, checkoutFrozen: false, shippingBlackout: false, complianceBannerEnabled: true, softLaunch: false }), ...update };
  saveOverrides(overrides);
}

/**
 * Get active country IDs
 */
export function getActiveCountryIds(): string[] {
  return getEffectiveCountries().filter(c => c.active).map(c => c.id);
}
