/**
 * FINANCE SERVICE
 * Handles financial data, revenue reporting, tax calculations, and currency management
 * 
 * BACKEND HANDOFF: Replace mock implementations with real API calls
 * Expected endpoints:
 * - GET /api/finance/overview - Get financial overview
 * - GET /api/finance/by-country - Get country breakdown
 * - GET /api/finance/monthly-trend - Get monthly revenue trend
 * - GET /api/finance/quarterly-reports - Get quarterly reports
 * - GET /api/finance/tax-rates - Get tax rates by country
 * - POST /api/finance/export - Export financial data
 */

import financeData from '@/data/mock/finance.json';

// Types
export interface FinanceOverview {
  period: string;
  grossRevenue: number;
  netRevenue: number;
  refunds: number;
  taxesCollected: number;
  shippingRevenue: number;
  discountsApplied: number;
  currency: string;
}

export interface CountryFinance {
  country: string;
  countryCode: string;
  grossRevenue: number;
  netRevenue: number;
  orders: number;
  refunds: number;
  taxRate: number;
  taxesCollected: number;
  avgOrderValue: number;
}

export interface MonthlyTrend {
  month: string;
  grossRevenue: number;
  netRevenue: number;
  refunds: number;
}

export interface QuarterlyReport {
  quarter: string;
  startDate: string;
  endDate: string;
  grossRevenue: number;
  netRevenue: number;
  refunds: number;
  status: 'in_progress' | 'finalized';
}

export interface TaxRates {
  [countryCode: string]: {
    standard: number;
    reduced?: number;
    superReduced?: number;
    zero?: number;
  };
}

export interface CurrencyImpact {
  baseCurrency: string;
  rates: {
    [currency: string]: {
      rate: number;
      change: number;
    };
  };
  hedgingPositions: Array<{
    currency: string;
    amount: number;
    expiresAt: string;
  }>;
}

export interface PaymentMethodBreakdown {
  [method: string]: {
    transactions: number;
    volume: number;
    percentage: number;
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getFinanceOverview(): Promise<FinanceOverview> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return financeData.overview as FinanceOverview;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getCountryFinance(): Promise<CountryFinance[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return financeData.byCountry as CountryFinance[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function getMonthlyTrend(months?: number): Promise<MonthlyTrend[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const data = financeData.monthlyTrend as MonthlyTrend[];
  return months ? data.slice(-months) : data;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getQuarterlyReports(): Promise<QuarterlyReport[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return financeData.quarterlyReports as QuarterlyReport[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function getTaxRates(): Promise<TaxRates> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return financeData.taxRates as TaxRates;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getCurrencyImpact(): Promise<CurrencyImpact> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return financeData.currencyImpact as CurrencyImpact;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getPaymentMethods(): Promise<PaymentMethodBreakdown> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return financeData.paymentMethods as PaymentMethodBreakdown;
}

// BACKEND HANDOFF: Replace with actual API call
export async function exportFinanceReport(
  type: 'monthly' | 'quarterly' | 'annual',
  period: string,
  format: 'csv' | 'pdf' | 'xlsx'
): Promise<{ downloadUrl: string; expiresAt: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock implementation - would generate and return download URL
  return {
    downloadUrl: `https://api.amarise.com/exports/finance_${type}_${period}.${format}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function getRevenueComparison(
  period1: string,
  period2: string
): Promise<{
  period1: { period: string; revenue: number };
  period2: { period: string; revenue: number };
  change: number;
  changePercentage: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock implementation
  return {
    period1: { period: period1, revenue: 285400 },
    period2: { period: period2, revenue: 242100 },
    change: 43300,
    changePercentage: 17.9
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function calculateTax(
  amount: number,
  countryCode: string,
  productCategory?: string
): Promise<{ taxAmount: number; rate: number; type: string }> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const rates = financeData.taxRates as TaxRates;
  const countryRates = rates[countryCode];
  
  if (!countryRates) {
    return { taxAmount: 0, rate: 0, type: 'exempt' };
  }
  
  const rate = countryRates.standard;
  return {
    taxAmount: amount * (rate / 100),
    rate,
    type: 'standard'
  };
}
