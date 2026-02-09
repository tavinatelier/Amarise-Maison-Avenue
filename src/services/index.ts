/**
 * SERVICES INDEX
 * Central export point for all service modules
 * 
 * BACKEND HANDOFF: These services define the contract between UI and backend.
 * Replace mock implementations in individual service files.
 */

// Commerce operations (cart, checkout, availability)
export * from './commerce.service';

// Content operations (CMS, products, articles)
export * from './content.service';

// Order operations (lifecycle, fulfillment, shipping)
export * from './order.service';

// Payment operations (intents, refunds, webhooks)
export * from './payment.service';

// Product operations (inventory, variants, pricing)
export * from './product.service';

// Global Ops: Region & country isolation
export * from './region.service';

// Global Ops: Approval workflows
export * from './approval.service';

// Global Ops: Audit logging
export * from './audit.service';

// Global Ops: Incident & crisis management
export * from './incident.service';

// Global Ops: PII protection
export * from './pii.service';

// Global Ops: SOP & knowledge base
export * from './sop.service';

// Extended Admin: Customer intelligence
export * from './customer.service';

// Extended Admin: Inventory control
export * from './inventory.service';

// Extended Admin: Finance intelligence (named exports to avoid calculateTax conflict with order.service)
export {
  getFinanceOverview,
  getCountryFinance,
  getMonthlyTrend,
  getQuarterlyReports,
  getTaxRates,
  getCurrencyImpact,
  getPaymentMethods,
  exportFinanceReport,
  getRevenueComparison,
  type FinanceOverview,
  type CountryFinance,
  type MonthlyTrend,
  type QuarterlyReport,
  type TaxRates,
  type CurrencyImpact,
  type PaymentMethodBreakdown
} from './finance.service';

// Extended Admin: Analytics dashboards
export * from './analytics.service';

// Extended Admin: Team management (named exports to avoid HandoverNote conflict with handover.service)
export {
  getTeamMembers,
  getTeamMemberById,
  getRoles,
  getActivityLog,
  getHandoverNotes,
  inviteTeamMember,
  updateTeamMember,
  deactivateMember,
  reactivateMember,
  formatTimezone,
  type TeamRole,
  type MemberStatus,
  type TeamMember,
  type RoleDefinition,
  type ActivityLogEntry
} from './team.service';

// Extended Admin: System control
export * from './system.service';
