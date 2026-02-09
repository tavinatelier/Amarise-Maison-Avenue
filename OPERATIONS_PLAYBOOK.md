# OPERATIONS PLAYBOOK

## AMARISÉ Global Commerce Operations Guide

This document outlines operational procedures for running the AMARISÉ global commerce platform.

---

## 1. DAILY OPERATIONS

### Morning Checklist (Per Region)

```
□ Review overnight orders in /admin/orders
□ Check inventory alerts in /admin/inventory
□ Review pending approvals in /admin/approvals
□ Check incident status in /admin/incidents
□ Review shift handover notes in /admin/team/activity
```

### Key Metrics to Monitor

| Metric | Location | Threshold |
|--------|----------|-----------|
| Order volume | /admin/dashboard | Compare to 7-day avg |
| Conversion rate | /admin/analytics/funnel | > 2.5% |
| Cart abandonment | /admin/analytics/funnel | < 70% |
| Low stock items | /admin/inventory | < 10 units |
| Pending refunds | /admin/refunds | Process within 24h |

---

## 2. SHIFT HANDOVER PROTOCOL

### Handover Requirements

1. **Outgoing Shift**
   - Complete all urgent approvals
   - Document open issues in /admin/team/activity
   - Update incident status if active
   - Log any customer escalations

2. **Incoming Shift**
   - Review handover notes
   - Check pending approvals queue
   - Verify no active incidents
   - Confirm payment gateway status

### Handover Note Format

```markdown
## Shift Handover: [DATE] [TIMEZONE]

### Open Issues
- [Issue description and status]

### Pending Actions
- [Action required and owner]

### Customer Escalations
- [Customer ID and issue summary]

### Notes for Next Shift
- [Any relevant context]
```

---

## 3. INCIDENT MANAGEMENT

### Severity Levels

| Level | Description | Response Time | Escalation |
|-------|-------------|---------------|------------|
| Critical | System down, payment failure | Immediate | Founder + All leads |
| High | Major feature broken | 15 minutes | Regional lead |
| Medium | Minor feature issue | 1 hour | Team lead |
| Low | Cosmetic/non-urgent | 4 hours | Standard queue |

### Incident Response Steps

1. **Detect** - Monitor alerts or customer reports
2. **Assess** - Determine severity and impact
3. **Activate** - Use /admin/incidents to enable incident mode
4. **Communicate** - Update status banner if needed
5. **Resolve** - Fix issue and verify
6. **Deactivate** - Disable incident mode
7. **Document** - Log in audit trail

### Freeze Controls

| Control | When to Use |
|---------|-------------|
| Freeze Checkout | Payment gateway issues |
| Freeze Refunds | Fraud investigation |
| Freeze Prices | Pricing errors detected |
| Freeze CMS | Content issues |

---

## 4. ORDER MANAGEMENT

### Order Status Flow

```
Pending → Confirmed → Processing → Shipped → Delivered
                ↓           ↓
            Cancelled    On Hold
```

### Handling Returns

1. Customer initiates return request
2. Review in /admin/returns
3. Approve/reject with reason
4. If approved, generate return label
5. Process refund on receipt

### Refund Processing

1. Review refund request in /admin/refunds
2. Verify order details and return status
3. Check customer history for patterns
4. Process partial or full refund
5. Document in audit log

---

## 5. INVENTORY MANAGEMENT

### Stock Level Thresholds

| Level | Units | Action |
|-------|-------|--------|
| Critical | < 5 | Immediate reorder |
| Low | 5-10 | Schedule reorder |
| Normal | 11-50 | Monitor |
| High | > 50 | Review demand |

### Inventory Actions

- **Archive**: Remove from active catalog
- **Discontinue**: End-of-life product
- **Restock**: Replenish inventory
- **Transfer**: Move between regions

---

## 6. CUSTOMER SERVICE

### GDPR Compliance

| Request Type | Location | SLA |
|--------------|----------|-----|
| Data Export | /admin/customers/:id | 30 days |
| Data Deletion | /admin/customers/:id | 30 days |
| Consent Update | /data-request | Immediate |

### Customer Risk Flags

| Flag | Meaning | Action |
|------|---------|--------|
| High Value | > €5000 lifetime | Priority support |
| Frequent Returns | > 30% return rate | Review orders |
| Chargeback Risk | Previous disputes | Manual review |

---

## 7. REGIONAL OPERATIONS

### Country-Specific Considerations

| Region | Currency | Tax | Special Rules |
|--------|----------|-----|---------------|
| EU | EUR | VAT included | GDPR strict |
| UK | GBP | VAT included | Post-Brexit duties |
| US | USD | Tax at checkout | State-specific |
| UAE | AED | No VAT | Customs declaration |

### Regional Pause Procedure

1. Navigate to /admin/system/flags
2. Toggle country-specific sales pause
3. Update maintenance banner if needed
4. Document reason in audit log
5. Notify affected customers

---

## 8. APPROVAL WORKFLOWS

### Approval Types

| Type | Approvers | Threshold |
|------|-----------|-----------|
| Price Change | Finance Lead | Any change |
| Discount > 20% | Regional Lead | > 20% off |
| Refund > €500 | Finance Lead | > €500 |
| New Product | Product Lead | All new SKUs |
| Content Update | Content Lead | Homepage/CMS |

### Approval Process

1. Request submitted automatically
2. Notification sent to approver
3. Review in /admin/approvals
4. Approve or reject with comment
5. Action executed or cancelled
6. Audit log updated

---

## 9. REPORTING

### Daily Reports

- Order summary by region
- Revenue vs target
- Inventory alerts
- Customer service tickets

### Weekly Reports

- Conversion funnel analysis
- Product performance
- Return rate trends
- Team activity summary

### Monthly Reports

- Financial reconciliation
- Tax summary by country
- Customer cohort analysis
- Inventory turnover

---

## 10. EMERGENCY CONTACTS

### Escalation Matrix

| Issue Type | Primary | Secondary |
|------------|---------|-----------|
| Payment | Finance Lead | Founder |
| Technical | Tech Lead | Founder |
| Customer | CS Lead | Regional Lead |
| Legal | Legal Counsel | Founder |
| PR/Crisis | Marketing Lead | Founder |

---

## BACKEND HANDOFF NOTES

All operations currently use mock data. Backend integration required for:

- Real-time order syncing
- Payment gateway webhooks
- Inventory management system
- CRM integration
- Email/notification service
- Analytics tracking

See `BACKEND_HANDOFF.md` for technical specifications.
