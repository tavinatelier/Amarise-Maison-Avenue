/**
 * ANALYTICS SERVICE
 * Handles analytics data, funnel metrics, product performance, and country insights
 * 
 * BACKEND HANDOFF: Replace mock implementations with real API calls
 * Expected endpoints:
 * - GET /api/analytics/funnel - Get funnel metrics
 * - GET /api/analytics/products - Get product performance
 * - GET /api/analytics/countries - Get country performance
 * - GET /api/analytics/traffic - Get traffic sources
 * - GET /api/analytics/devices - Get device breakdown
 */

import analyticsData from '@/data/mock/analytics.json';

// Types
export interface FunnelStage {
  name: string;
  value: number;
  dropOff: number;
}

export interface FunnelData {
  period: string;
  stages: FunnelStage[];
  conversionRate: number;
  cartAbandonmentRate: number;
  checkoutAbandonmentRate: number;
}

export interface ProductPerformance {
  productId: string;
  title: string;
  category: string;
  views: number;
  addToCart: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  avgRating: number;
  returnRate: number;
}

export interface CountryPerformance {
  country: string;
  countryCode: string;
  sessions: number;
  conversionRate: number;
  avgOrderValue: number;
  revenue: number;
  topProduct: string;
  growth: number;
}

export interface TrafficSource {
  sessions: number;
  percentage: number;
  conversionRate: number;
}

export interface TrafficSources {
  organic: TrafficSource;
  direct: TrafficSource;
  social: TrafficSource;
  email: TrafficSource;
  paid: TrafficSource;
}

export interface DeviceBreakdown {
  desktop: TrafficSource;
  mobile: TrafficSource;
  tablet: TrafficSource;
}

export type TimeRange = 'today' | '7d' | '30d' | 'quarter' | 'year' | 'custom';

// BACKEND HANDOFF: Replace with actual API call
export async function getFunnelData(timeRange?: TimeRange): Promise<FunnelData> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return analyticsData.funnel as FunnelData;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getProductPerformance(
  sortBy?: 'views' | 'revenue' | 'conversionRate',
  limit?: number
): Promise<ProductPerformance[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let products = analyticsData.productPerformance as ProductPerformance[];
  
  if (sortBy) {
    products = [...products].sort((a, b) => b[sortBy] - a[sortBy]);
  }
  
  return limit ? products.slice(0, limit) : products;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getCountryPerformance(
  sortBy?: 'revenue' | 'conversionRate' | 'growth'
): Promise<CountryPerformance[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let countries = analyticsData.countryPerformance as CountryPerformance[];
  
  if (sortBy) {
    countries = [...countries].sort((a, b) => b[sortBy] - a[sortBy]);
  }
  
  return countries;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getTrafficSources(): Promise<TrafficSources> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return analyticsData.trafficSources as TrafficSources;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getDeviceBreakdown(): Promise<DeviceBreakdown> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return analyticsData.deviceBreakdown as DeviceBreakdown;
}

// BACKEND HANDOFF: Replace with actual API call
export function getTimeRanges(): string[] {
  return analyticsData.timeRanges;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getConversionTrend(
  timeRange: TimeRange,
  granularity: 'hour' | 'day' | 'week'
): Promise<Array<{ timestamp: string; rate: number }>> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock implementation - generate sample data
  const points = granularity === 'hour' ? 24 : granularity === 'day' ? 30 : 12;
  const data: Array<{ timestamp: string; rate: number }> = [];
  
  for (let i = 0; i < points; i++) {
    data.push({
      timestamp: new Date(Date.now() - i * (granularity === 'hour' ? 3600000 : granularity === 'day' ? 86400000 : 604800000)).toISOString(),
      rate: 4.5 + Math.random() * 2
    });
  }
  
  return data.reverse();
}

// BACKEND HANDOFF: Replace with actual API call
export async function comparePerformance(
  metric: 'revenue' | 'orders' | 'conversion',
  period1: string,
  period2: string
): Promise<{
  period1: { label: string; value: number };
  period2: { label: string; value: number };
  change: number;
  changePercentage: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock comparison
  const value1 = metric === 'revenue' ? 285400 : metric === 'orders' ? 457 : 5.42;
  const value2 = metric === 'revenue' ? 242100 : metric === 'orders' ? 398 : 4.89;
  
  return {
    period1: { label: period1, value: value1 },
    period2: { label: period2, value: value2 },
    change: value1 - value2,
    changePercentage: ((value1 - value2) / value2) * 100
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getAbandonmentReasons(): Promise<Array<{ reason: string; count: number; percentage: number }>> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    { reason: 'Shipping costs too high', count: 245, percentage: 32.5 },
    { reason: 'Just browsing', count: 198, percentage: 26.3 },
    { reason: 'Found better price elsewhere', count: 112, percentage: 14.9 },
    { reason: 'Payment method not available', count: 89, percentage: 11.8 },
    { reason: 'Checkout too complicated', count: 67, percentage: 8.9 },
    { reason: 'Other', count: 42, percentage: 5.6 }
  ];
}
