# AMARISÉ Data Policy & Privacy Documentation

## Overview

This document defines what customer data is collected, why it's collected, how it's stored, and retention policies. Backend engineers implement these policies. Legal team reviews for compliance.

---

## 1. Data Collection Inventory

### Customer Account Data

| Field | Collected | Purpose | Legal Basis | Retention |
|-------|-----------|---------|-------------|-----------|
| Email | Required | Account, orders, communication | Contract | Account lifetime + 7 years |
| Password (hashed) | Required | Authentication | Contract | Account lifetime |
| First Name | Required | Personalization, shipping | Contract | Account lifetime + 7 years |
| Last Name | Required | Shipping, invoicing | Contract | Account lifetime + 7 years |
| Phone | Optional | Delivery updates | Consent | Account lifetime |
| Date of Birth | Optional | Age verification (if needed) | Legal obligation | Account lifetime |

### Shipping & Billing Data

| Field | Collected | Purpose | Legal Basis | Retention |
|-------|-----------|---------|-------------|-----------|
| Street Address | Required | Delivery | Contract | 7 years (tax) |
| City | Required | Delivery | Contract | 7 years (tax) |
| Postal Code | Required | Delivery, tax | Contract | 7 years (tax) |
| Country | Required | Delivery, tax, compliance | Contract | 7 years (tax) |
| State/Province | Conditional | Required for US/CA | Contract | 7 years (tax) |

### Order Data

| Field | Collected | Purpose | Legal Basis | Retention |
|-------|-----------|---------|-------------|-----------|
| Order ID | Generated | Order tracking | Contract | 7 years |
| Order Items | Required | Fulfillment | Contract | 7 years |
| Order Total | Calculated | Payment, accounting | Contract | 7 years |
| Payment Method | Reference only | Record keeping | Contract | 7 years |
| Shipping Method | Required | Fulfillment | Contract | 7 years |
| Order Notes | Optional | Customer requests | Consent | 7 years |

### Marketing Data

| Field | Collected | Purpose | Legal Basis | Retention |
|-------|-----------|---------|-------------|-----------|
| Newsletter Opt-in | Optional | Marketing emails | Consent | Until withdrawn |
| SMS Opt-in | Optional | SMS marketing | Consent | Until withdrawn |
| Marketing Preferences | Optional | Personalization | Consent | Until withdrawn |

### Technical Data

| Field | Collected | Purpose | Legal Basis | Retention |
|-------|-----------|---------|-------------|-----------|
| IP Address | Automatic | Security, fraud prevention | Legitimate interest | 30 days |
| Browser/Device | Automatic | Analytics, UX | Legitimate interest | Anonymized after 30 days |
| Session Data | Automatic | Cart persistence | Contract | Session + 30 days |
| Cookies | Conditional | Analytics, preferences | Consent | Per cookie policy |

---

## 2. Data NOT Collected

AMARISÉ explicitly does NOT collect:

- Full payment card numbers (handled by payment provider)
- Government ID numbers (unless legally required)
- Biometric data
- Health data
- Religious/political views
- Sexual orientation
- Racial/ethnic origin
- Trade union membership
- Genetic data

---

## 3. Data Storage & Security

### Encryption Requirements

```yaml
At Rest:
  - All PII encrypted with AES-256
  - Encryption keys rotated annually
  - Database-level encryption enabled
  
In Transit:
  - TLS 1.3 minimum
  - HSTS enabled
  - Certificate pinning for mobile apps
  
Passwords:
  - bcrypt hashing (cost factor 12+)
  - Never stored in plaintext
  - Never logged
```

### Access Control

```yaml
Customer Data Access:
  - super_admin: Full access (audited)
  - admin: Read access, limited write
  - editor: No direct access
  - viewer: No access
  
Technical Access:
  - Database: Named service accounts only
  - Logs: Anonymized PII
  - Backups: Encrypted, restricted access
```

---

## 4. Data Retention Schedule

### Active Data

| Data Type | Retention Period | After Expiry |
|-----------|------------------|--------------|
| Active account | Indefinite while active | N/A |
| Order data | 7 years from order date | Archive or delete |
| Payment references | 7 years from transaction | Delete |
| Support tickets | 3 years from resolution | Delete |
| Newsletter subscription | Until unsubscribe | Delete immediately |

### Inactive Accounts

```yaml
Definition: No login or order for 24 months

Process:
  1. Month 23: Send "We miss you" email
  2. Month 24: Send "Account will be archived" email
  3. Month 25: Archive account data
  4. Month 25 + 7 years: Delete archived data
  
Archived State:
  - Account cannot login
  - Data retained for legal compliance
  - Can be restored upon request
```

### Deletion Requests (GDPR Right to Erasure)

```yaml
Immediate Deletion:
  - Newsletter preferences
  - Marketing data
  - Non-essential cookies
  
Retained (Legal Obligation):
  - Order history (7 years for tax)
  - Invoice data (7 years for tax)
  - Fraud prevention data (as required)
  
Anonymization (Alternative):
  - Replace PII with anonymized identifiers
  - Retain order data for analytics
  - Customer cannot be re-identified
```

---

## 5. Third-Party Data Sharing

### Payment Providers

```yaml
Shared Data:
  - Name
  - Email
  - Billing address
  - Order total
  - Currency
  
Purpose: Process payment
Legal Basis: Contract performance
Provider Responsibility: PCI-DSS compliance
```

### Shipping Carriers

```yaml
Shared Data:
  - Recipient name
  - Shipping address
  - Phone (for delivery)
  - Package weight/dimensions
  
Purpose: Delivery
Legal Basis: Contract performance
```

### Analytics (if enabled)

```yaml
Shared Data:
  - Anonymized user ID
  - Page views
  - Events (non-PII)
  
Purpose: Product improvement
Legal Basis: Legitimate interest
Opt-out: Cookie preferences
```

### No Data Sold

AMARISÉ does NOT sell customer data to:
- Advertisers
- Data brokers
- Third-party marketers
- Any other parties

---

## 6. Customer Rights

### Right to Access

```yaml
Request: Customer requests their data
Response Time: 30 days
Format: JSON export or PDF
Content: All data categories above
```

### Right to Rectification

```yaml
Request: Customer corrects their data
Process: Self-service in account settings
Exceptions: Cannot modify order history
```

### Right to Erasure

```yaml
Request: Customer requests deletion
Response Time: 30 days
Exceptions: Legal retention requirements
Alternative: Anonymization offered
```

### Right to Portability

```yaml
Request: Customer wants data transferred
Format: Machine-readable (JSON)
Content: Customer-provided data only
```

### Right to Object

```yaml
Scope: Marketing communications
Process: Unsubscribe link in all emails
Effect: Immediate cessation of marketing
```

---

## 7. Data Breach Protocol

### Detection & Response

```yaml
Step 1 - Detection:
  - Automated monitoring alerts
  - Manual discovery reporting
  - Third-party notification
  
Step 2 - Containment (< 1 hour):
  - Isolate affected systems
  - Preserve evidence
  - Activate incident team
  
Step 3 - Assessment (< 24 hours):
  - Determine scope
  - Identify affected data
  - Assess risk level
  
Step 4 - Notification (< 72 hours):
  - Notify authorities (if required)
  - Notify affected customers (if high risk)
  - Document decisions
  
Step 5 - Remediation:
  - Fix vulnerability
  - Prevent recurrence
  - Update policies if needed
```

### Notification Templates

```yaml
Authority Notification:
  - Nature of breach
  - Categories of data
  - Approximate number affected
  - Contact details
  - Consequences
  - Measures taken
  
Customer Notification:
  - Plain language description
  - What data was affected
  - What we're doing
  - What they should do
  - Contact for questions
```

---

## 8. Cookie Policy

### Essential Cookies

| Cookie | Purpose | Duration | Consent |
|--------|---------|----------|---------|
| session_id | Session management | Session | Not required |
| cart_token | Cart persistence | 30 days | Not required |
| csrf_token | Security | Session | Not required |

### Functional Cookies

| Cookie | Purpose | Duration | Consent |
|--------|---------|----------|---------|
| currency_pref | Currency selection | 1 year | Recommended |
| region_pref | Region selection | 1 year | Recommended |
| recently_viewed | Product history | 30 days | Recommended |

### Analytics Cookies

| Cookie | Purpose | Duration | Consent |
|--------|---------|----------|---------|
| _ga | Google Analytics | 2 years | Required |
| _gid | Google Analytics | 24 hours | Required |

---

## 9. Compliance Checklist

### GDPR (EU)

- [x] Lawful basis documented
- [x] Privacy policy accessible
- [x] Cookie consent mechanism
- [x] Data subject rights process
- [x] Data breach procedure
- [x] DPO appointed (if required)
- [x] Records of processing
- [x] Third-party DPAs in place

### CCPA (California)

- [x] "Do Not Sell" disclosure
- [x] Privacy policy with categories
- [x] Consumer rights process
- [x] Opt-out mechanism

### PCI-DSS

- [x] No card data storage
- [x] Payment provider compliant
- [x] Secure transmission

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial data policy |
