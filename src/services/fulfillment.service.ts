/**
 * AMARISÉ — Fulfillment Simulation Service
 * 
 * BACKEND HANDOFF: Replace with real warehouse management + shipping API integration.
 */

import { getCountryById, CountryConfig } from '@/config/countries.config';

export interface FulfillmentCenter {
  id: string;
  name: string;
  countryId: string;
  city: string;
  capacityUtilization: number;
  activeOrders: number;
  maxDailyOrders: number;
  status: 'operational' | 'limited' | 'offline';
}

export const FULFILLMENT_CENTERS: FulfillmentCenter[] = [
  { id: 'fc-in', name: 'Mumbai Hub', countryId: 'IN', city: 'Mumbai', capacityUtilization: 62, activeOrders: 47, maxDailyOrders: 200, status: 'operational' },
  { id: 'fc-us', name: 'New York Hub', countryId: 'US', city: 'New York', capacityUtilization: 78, activeOrders: 124, maxDailyOrders: 500, status: 'operational' },
  { id: 'fc-gb', name: 'London Hub', countryId: 'GB', city: 'London', capacityUtilization: 55, activeOrders: 68, maxDailyOrders: 300, status: 'operational' },
  { id: 'fc-ca', name: 'Toronto Hub', countryId: 'CA', city: 'Toronto', capacityUtilization: 41, activeOrders: 32, maxDailyOrders: 150, status: 'operational' },
];

export interface FulfillmentAssignment {
  orderId: string;
  assignedCenter: FulfillmentCenter;
  estimatedShipDate: string;
  estimatedDelivery: string;
  reason: string;
}

/**
 * Assign fulfillment center for an order based on destination country.
 * Falls back to nearest available center if local is offline.
 */
export function assignFulfillment(orderId: string, destinationCountryId: string): FulfillmentAssignment {
  // Direct match
  let center = FULFILLMENT_CENTERS.find(fc => fc.countryId === destinationCountryId && fc.status === 'operational');
  let reason = 'Direct country match';

  // Fallback: nearest operational center with lowest utilization
  if (!center) {
    center = [...FULFILLMENT_CENTERS]
      .filter(fc => fc.status === 'operational')
      .sort((a, b) => a.capacityUtilization - b.capacityUtilization)[0];
    reason = `Fallback: ${center?.name} (lowest utilization)`;
  }

  if (!center) {
    center = FULFILLMENT_CENTERS[0];
    reason = 'Emergency fallback';
  }

  const now = new Date();
  const shipDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const country = getCountryById(destinationCountryId);
  const zone = country?.shippingZones[0];
  const deliveryDays = zone?.estimatedDays.max || 7;
  const deliveryDate = new Date(shipDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000);

  return {
    orderId,
    assignedCenter: center,
    estimatedShipDate: shipDate.toISOString().split('T')[0],
    estimatedDelivery: deliveryDate.toISOString().split('T')[0],
    reason,
  };
}

export function getFulfillmentCenters(): FulfillmentCenter[] {
  return FULFILLMENT_CENTERS;
}
