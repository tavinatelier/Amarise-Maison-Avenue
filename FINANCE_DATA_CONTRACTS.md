# FINANCE DATA CONTRACTS

## AMARISÉ Financial Data Specifications

This document defines the data contracts for all financial operations.

---

## 1. REVENUE DATA

### Revenue Summary Object

```typescript
interface RevenueSummary {
  gross: number;           // Total before deductions
  net: number;             // After refunds and fees
  refunds: number;         // Total refunded amount
  taxes: number;           // Total taxes collected
  fees: number;            // Payment processing fees
  currency: string;        // Base currency (EUR)
  period: {
    start: string;         // ISO 8601 date
    end: string;           // ISO 8601 date
  };
}
```

### Revenue by Country

```typescript
interface CountryRevenue {
  country: string;         // ISO 3166-1 alpha-2
  countryName: string;     // Display name
  revenue: number;         // Gross revenue in local currency
  revenueEUR: number;      // Converted to EUR
  orders: number;          // Order count
  averageOrder: number;    // AOV in local currency
  currency: string;        // Local currency code
  exchangeRate: number;    // Rate to EUR
}
```

---

## 2. TAX DATA

### Tax Summary

```typescript
interface TaxSummary {
  totalCollected: number;  // Total tax collected
  totalRemitted: number;   // Total paid to authorities
  pending: number;         // Awaiting remittance
  currency: string;        // EUR
}
```

### Tax by Country

```typescript
interface CountryTax {
  country: string;         // ISO 3166-1 alpha-2
  countryName: string;     // Display name
  vatNumber: string;       // Registration number
  taxCollected: number;    // Amount collected
  taxRemitted: number;     // Amount paid
  rates: {
    standard: number;      // Standard VAT rate
    reduced?: number;      // Reduced rate if applicable
    superReduced?: number; // Super reduced rate
    zero?: number;         // Zero-rated categories
  };
  nextFiling: string;      // ISO 8601 date
  status: 'current' | 'pending' | 'overdue';
}
```

---

## 3. REFUND DATA

### Refund Object

```typescript
interface Refund {
  id: string;              // Unique refund ID
  orderId: string;         // Related order ID
  customerId: string;      // Customer ID
  amount: number;          // Refund amount
  currency: string;        // Currency code
  reason: RefundReason;    // Categorized reason
  status: RefundStatus;    // Processing status
  requestedAt: string;     // ISO 8601 datetime
  processedAt?: string;    // ISO 8601 datetime
  processedBy?: string;    // Admin user ID
  notes?: string;          // Internal notes
}

type RefundReason = 
  | 'customer_request'
  | 'damaged_item'
  | 'wrong_item'
  | 'late_delivery'
  | 'quality_issue'
  | 'pricing_error'
  | 'duplicate_order'
  | 'other';

type RefundStatus = 
  | 'pending'
  | 'approved'
  | 'processing'
  | 'completed'
  | 'rejected';
```

---

## 4. PAYMENT DATA

### Payment Intent

```typescript
interface PaymentIntent {
  id: string;              // Payment intent ID
  orderId: string;         // Related order ID
  amount: number;          // Amount in smallest unit
  currency: string;        // Currency code
  status: PaymentStatus;   // Current status
  method: PaymentMethod;   // Payment method used
  createdAt: string;       // ISO 8601 datetime
  confirmedAt?: string;    // ISO 8601 datetime
  failureReason?: string;  // If failed
  metadata: Record<string, string>;
}

type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded';

type PaymentMethod = 
  | 'card'
  | 'bank_transfer'
  | 'apple_pay'
  | 'google_pay'
  | 'klarna';
```

---

## 5. CURRENCY DATA

### Exchange Rate

```typescript
interface ExchangeRate {
  from: string;            // Source currency
  to: string;              // Target currency
  rate: number;            // Exchange rate
  timestamp: string;       // ISO 8601 datetime
  source: string;          // Rate provider
}
```

### Supported Currencies

| Code | Name | Symbol | Decimal Places |
|------|------|--------|----------------|
| EUR | Euro | € | 2 |
| GBP | British Pound | £ | 2 |
| USD | US Dollar | $ | 2 |
| AED | UAE Dirham | د.إ | 2 |
| CHF | Swiss Franc | Fr. | 2 |
| JPY | Japanese Yen | ¥ | 0 |
| AUD | Australian Dollar | A$ | 2 |
| CAD | Canadian Dollar | C$ | 2 |

---

## 6. REPORT DATA

### Financial Report

```typescript
interface FinancialReport {
  id: string;              // Report ID
  type: ReportType;        // Report category
  period: ReportPeriod;    // Time period
  generatedAt: string;     // ISO 8601 datetime
  generatedBy: string;     // Admin user ID
  status: 'generating' | 'ready' | 'failed';
  downloadUrl?: string;    // If ready
  data: ReportData;        // Report contents
}

type ReportType = 
  | 'revenue_summary'
  | 'tax_report'
  | 'refund_report'
  | 'payment_reconciliation'
  | 'country_breakdown';

interface ReportPeriod {
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  start: string;           // ISO 8601 date
  end: string;             // ISO 8601 date
}
```

---

## 7. METRICS DATA

### Key Financial Metrics

```typescript
interface FinancialMetrics {
  revenue: {
    current: number;
    previous: number;
    change: number;        // Percentage change
    trend: 'up' | 'down' | 'stable';
  };
  aov: {                   // Average Order Value
    current: number;
    previous: number;
    change: number;
  };
  refundRate: {
    current: number;       // Percentage
    previous: number;
    change: number;
  };
  taxLiability: {
    current: number;
    pending: number;
    nextDue: string;       // ISO 8601 date
  };
}
```

---

## 8. API ENDPOINTS

### Revenue Endpoints

```
GET  /api/finance/revenue
GET  /api/finance/revenue/by-country
GET  /api/finance/revenue/by-period
```

### Tax Endpoints

```
GET  /api/finance/taxes
GET  /api/finance/taxes/by-country
GET  /api/finance/taxes/filing-schedule
```

### Refund Endpoints

```
GET  /api/finance/refunds
POST /api/finance/refunds/:id/approve
POST /api/finance/refunds/:id/reject
```

### Report Endpoints

```
GET  /api/finance/reports
POST /api/finance/reports/generate
GET  /api/finance/reports/:id/download
```

---

## 9. WEBHOOK EVENTS

### Financial Webhooks

| Event | Trigger | Payload |
|-------|---------|---------|
| `payment.succeeded` | Payment confirmed | PaymentIntent |
| `payment.failed` | Payment failed | PaymentIntent |
| `refund.requested` | Refund initiated | Refund |
| `refund.completed` | Refund processed | Refund |
| `report.ready` | Report generated | FinancialReport |

---

## 10. VALIDATION RULES

### Amount Validation

- All amounts in smallest currency unit (cents)
- Maximum transaction: €50,000
- Minimum transaction: €1
- Refund cannot exceed original amount

### Currency Validation

- Only supported currencies accepted
- Exchange rates updated every 15 minutes
- Multi-currency orders converted at checkout time

---

## BACKEND INTEGRATION NOTES

Current implementation uses mock data from:
- `src/data/mock/finance.json`
- `src/services/finance.service.ts`

Replace with real API calls maintaining these contracts.
