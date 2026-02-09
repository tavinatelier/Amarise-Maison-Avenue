/**
 * SYSTEM SERVICE
 * Handles system controls, feature flags, maintenance mode, and emergency operations
 * 
 * BACKEND HANDOFF: Replace mock implementations with real API calls
 * Expected endpoints:
 * - GET /api/system/status - Get system status
 * - POST /api/system/kill-switch - Toggle global kill switch
 * - GET /api/system/countries - Get country controls
 * - PUT /api/system/countries/:code - Update country controls
 * - GET /api/system/feature-flags - Get feature flags
 * - PUT /api/system/feature-flags/:id - Update feature flag
 * - GET /api/system/maintenance - Get maintenance schedule
 * - POST /api/system/maintenance - Schedule maintenance
 * - PUT /api/system/emergency-banner - Update emergency banner
 */

import systemData from '@/data/mock/system.json';

// Types
export interface GlobalStatus {
  systemOnline: boolean;
  maintenanceMode: boolean;
  incidentActive: boolean;
  lastHealthCheck: string;
}

export interface KillSwitchStatus {
  enabled: boolean;
  lastTriggered: string | null;
  triggeredBy: string | null;
  reason: string | null;
}

export interface CountryControl {
  countryCode: string;
  country: string;
  salesEnabled: boolean;
  checkoutEnabled: boolean;
  refundsEnabled: boolean;
  newRegistrationsEnabled: boolean;
  notes: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  enabledForCountries: string[];
  rolloutPercentage: number;
  createdAt: string;
}

export interface MaintenanceWindow {
  id: string;
  title: string;
  description: string;
  scheduledStart: string;
  scheduledEnd: string;
  affectedServices: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export interface EmergencyBanner {
  enabled: boolean;
  message: string;
  type: 'info' | 'warning' | 'error';
  showOnPages: string[];
  dismissible: boolean;
  lastUpdated: string | null;
  updatedBy: string | null;
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  uptime: number;
}

export interface SystemHealth {
  api: ServiceHealth;
  database: ServiceHealth;
  payments: ServiceHealth;
  email: ServiceHealth;
  cdn: ServiceHealth;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getGlobalStatus(): Promise<GlobalStatus> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return systemData.globalStatus as GlobalStatus;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getKillSwitchStatus(): Promise<KillSwitchStatus> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return systemData.killSwitch as KillSwitchStatus;
}

// BACKEND HANDOFF: Replace with actual API call
export async function toggleKillSwitch(enable: boolean, reason?: string): Promise<KillSwitchStatus> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock implementation - would trigger actual system shutdown
  return {
    enabled: enable,
    lastTriggered: enable ? new Date().toISOString() : null,
    triggeredBy: enable ? 'current_user@amarise.com' : null,
    reason: enable ? (reason || 'Manual activation') : null
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getCountryControls(): Promise<CountryControl[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return systemData.countryControls as CountryControl[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateCountryControl(
  countryCode: string,
  updates: Partial<Omit<CountryControl, 'countryCode' | 'country'>>
): Promise<CountryControl> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const control = systemData.countryControls.find(c => c.countryCode === countryCode) as CountryControl;
  if (!control) {
    throw new Error('Country not found');
  }
  
  return { ...control, ...updates };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getFeatureFlags(): Promise<FeatureFlag[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return systemData.featureFlags as FeatureFlag[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateFeatureFlag(
  flagId: string,
  updates: Partial<Pick<FeatureFlag, 'enabled' | 'enabledForCountries' | 'rolloutPercentage'>>
): Promise<FeatureFlag> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const flag = systemData.featureFlags.find(f => f.id === flagId) as FeatureFlag;
  if (!flag) {
    throw new Error('Feature flag not found');
  }
  
  return { ...flag, ...updates };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getMaintenanceSchedule(): Promise<MaintenanceWindow[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return systemData.maintenanceSchedule as MaintenanceWindow[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function scheduleMaintenance(window: Omit<MaintenanceWindow, 'id' | 'status'>): Promise<MaintenanceWindow> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    ...window,
    id: `maint_${Date.now()}`,
    status: 'scheduled'
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function cancelMaintenance(maintenanceId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Mock implementation
}

// BACKEND HANDOFF: Replace with actual API call
export async function getEmergencyBanner(): Promise<EmergencyBanner> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return systemData.emergencyBanner as EmergencyBanner;
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateEmergencyBanner(banner: Partial<EmergencyBanner>): Promise<EmergencyBanner> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    ...systemData.emergencyBanner as EmergencyBanner,
    ...banner,
    lastUpdated: new Date().toISOString(),
    updatedBy: 'current_user@amarise.com'
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getSystemHealth(): Promise<SystemHealth> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return systemData.systemHealth as SystemHealth;
}

// BACKEND HANDOFF: Replace with actual API call
export async function triggerHealthCheck(): Promise<SystemHealth> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return systemData.systemHealth as SystemHealth;
}

// Helper to check if a feature is enabled for a country
export function isFeatureEnabledForCountry(flag: FeatureFlag, countryCode: string): boolean {
  if (!flag.enabled) return false;
  if (flag.enabledForCountries.length === 0) return true;
  return flag.enabledForCountries.includes(countryCode);
}
