# SYSTEM CONTROLS

## AMARISÉ Platform Control & Safety Systems

This document defines the system control mechanisms for platform operations.

---

## 1. CONTROL HIERARCHY

```
┌────────────────────────────────────────────────────────┐
│                    GLOBAL CONTROLS                      │
│  (Affect entire platform across all regions)           │
├────────────────────────────────────────────────────────┤
│ • Global Kill Switch                                    │
│ • Maintenance Mode                                      │
│ • Incident Mode                                         │
│ • Feature Freeze                                        │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   REGIONAL CONTROLS                     │
│  (Affect specific countries/regions)                   │
├────────────────────────────────────────────────────────┤
│ • Country Sales Pause                                   │
│ • Regional Shipping Hold                                │
│ • Currency Disable                                      │
│ • Payment Method Disable                                │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   FEATURE CONTROLS                      │
│  (Affect specific functionality)                       │
├────────────────────────────────────────────────────────┤
│ • Checkout Freeze                                       │
│ • Refund Freeze                                         │
│ • Price Freeze                                          │
│ • CMS Freeze                                            │
│ • Registration Freeze                                   │
└────────────────────────────────────────────────────────┘
```

---

## 2. GLOBAL KILL SWITCH

### Purpose

Immediately disable all commerce operations platform-wide.

### Activation

```typescript
interface KillSwitch {
  enabled: boolean;
  activatedAt: string;
  activatedBy: string;
  reason: string;
  affectedSystems: string[];
  estimatedDuration: string;
  customerMessage: string;
}
```

### Behavior When Active

| System | Behavior |
|--------|----------|
| Storefront | Display maintenance page |
| Checkout | Disable completely |
| Payments | Reject all transactions |
| Orders | Freeze processing |
| Refunds | Queue for later |
| Admin | Limited access (view only) |

### Activation Requirements

- **Who Can Activate**: Founder, Global Admin (with Founder notification)
- **Notification**: Immediate alert to all Global roles
- **Audit**: Full logging with reason required
- **Auto-expire**: Optional, max 24 hours

### Deactivation Checklist

```markdown
□ Root cause identified
□ Fix implemented and verified
□ Payment gateway status confirmed
□ Order queue reviewed
□ Customer communication prepared
□ Team briefed
□ Monitoring enhanced
```

---

## 3. MAINTENANCE MODE

### Purpose

Planned downtime for updates, migrations, or maintenance.

### Configuration

```typescript
interface MaintenanceMode {
  enabled: boolean;
  scheduledStart: string;
  scheduledEnd: string;
  message: string;
  allowAdminAccess: boolean;
  bypassIPs: string[];
  affectedRegions: string[];  // Empty = all
}
```

### Scheduling Requirements

| Urgency | Notice Required | Approval |
|---------|-----------------|----------|
| Emergency | None | Global Admin |
| Urgent | 1 hour | Global Admin |
| Planned | 24 hours | Standard |
| Major | 1 week | Founder |

### Customer Communication

```typescript
interface MaintenanceNotification {
  channels: ['banner', 'email', 'status_page'];
  timing: {
    preNotification: '24h' | '1h' | '15m';
    during: 'maintenance_page';
    postNotification: 'service_restored';
  };
}
```

---

## 4. INCIDENT MODE

### Purpose

Activate emergency controls during operational incidents.

### Severity Levels

```typescript
type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

interface IncidentConfig {
  severity: IncidentSeverity;
  autoFreeze: {
    low: [];
    medium: ['prices'];
    high: ['prices', 'refunds'];
    critical: ['checkout', 'prices', 'refunds', 'cms'];
  };
}
```

### Incident Status Object

```typescript
interface IncidentStatus {
  isActive: boolean;
  severity: IncidentSeverity;
  message?: string;
  activatedAt?: string;
  activatedBy?: string;
  freezeCheckout: boolean;
  freezeRefunds: boolean;
  freezePrices: boolean;
  freezeCMS: boolean;
}
```

### Escalation Matrix

| Severity | Response Time | Escalation | Communication |
|----------|---------------|------------|---------------|
| Low | 4 hours | Team Lead | Internal only |
| Medium | 1 hour | Regional Lead | Status page |
| High | 15 minutes | Global Lead | Banner + Email |
| Critical | Immediate | Founder | All channels |

---

## 5. COUNTRY CONTROLS

### Country Sales Pause

```typescript
interface CountryPause {
  country: string;         // ISO code
  enabled: boolean;
  reason: CountryPauseReason;
  startedAt: string;
  estimatedResume?: string;
  affectedOrders: 'block_new' | 'block_all';
  customerMessage: string;
}

type CountryPauseReason = 
  | 'regulatory'
  | 'logistics'
  | 'payment_issues'
  | 'tax_compliance'
  | 'political'
  | 'natural_disaster'
  | 'other';
```

### Country-Specific Toggles

| Control | Description | Default |
|---------|-------------|---------|
| Sales Enabled | Accept new orders | true |
| Shipping Enabled | Process shipments | true |
| Currency Enabled | Accept local currency | true |
| COD Enabled | Cash on delivery | varies |
| Returns Enabled | Accept returns | true |

---

## 6. FEATURE FLAGS

### Flag Definition

```typescript
interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  enabledCountries: string[];  // Empty = all
  enabledRoles: string[];      // Empty = all
  startDate?: string;
  endDate?: string;
  rolloutPercentage: number;   // 0-100
}
```

### Standard Flags

| Flag ID | Description | Risk Level |
|---------|-------------|------------|
| new_checkout | New checkout flow | High |
| express_shipping | Express shipping option | Medium |
| gift_wrapping | Gift wrap service | Low |
| preorders | Pre-order capability | Medium |
| wishlist | Wishlist feature | Low |
| reviews | Product reviews | Low |
| live_chat | Live chat support | Medium |

### Rollout Strategy

```typescript
interface RolloutStrategy {
  type: 'percentage' | 'country' | 'user_segment';
  stages: {
    name: string;
    criteria: Record<string, any>;
    duration: string;
    successMetrics: string[];
  }[];
}
```

---

## 7. EMERGENCY CONTROLS

### Emergency Banner

```typescript
interface EmergencyBanner {
  enabled: boolean;
  type: 'info' | 'warning' | 'error';
  message: string;
  dismissible: boolean;
  showOn: ('storefront' | 'checkout' | 'account')[];
  countries: string[];     // Empty = all
  startDate?: string;
  endDate?: string;
}
```

### Quick Actions

| Action | Effect | Reversible |
|--------|--------|------------|
| Pause All Sales | Disable checkout globally | Yes |
| Pause Refunds | Queue all refund requests | Yes |
| Lock Prices | Prevent any price changes | Yes |
| Lock CMS | Prevent content updates | Yes |
| Pause Shipping | Hold all shipments | Yes |
| Emergency Banner | Display urgent message | Yes |

---

## 8. MONITORING & ALERTS

### System Health Checks

```typescript
interface HealthCheck {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  lastCheck: string;
  errorRate: number;
}
```

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Error Rate | > 1% | > 5% |
| Response Time | > 2s | > 5s |
| Failed Payments | > 2% | > 5% |
| Queue Depth | > 100 | > 500 |
| DB Connections | > 80% | > 95% |

### Alert Channels

```typescript
interface AlertConfig {
  channel: 'email' | 'sms' | 'slack' | 'pagerduty';
  severity: IncidentSeverity[];
  recipients: string[];
  throttle: string;        // e.g., '5m'
}
```

---

## 9. RECOVERY PROCEDURES

### Post-Incident Recovery

```markdown
## Recovery Checklist

### Immediate (0-1 hour)
□ Incident deactivated
□ Systems verified operational
□ Monitoring confirmed
□ Customer communication sent

### Short-term (1-24 hours)
□ Order queue processed
□ Failed payments retried
□ Customer complaints addressed
□ Team debriefed

### Long-term (1-7 days)
□ Root cause analysis complete
□ Prevention measures implemented
□ Documentation updated
□ Runbook improved
```

### Data Recovery

| Scenario | Recovery Method | RTO | RPO |
|----------|-----------------|-----|-----|
| DB failure | Restore from backup | 1 hour | 15 min |
| Payment failure | Manual reconciliation | 4 hours | 0 |
| Order loss | Reconstruct from logs | 2 hours | 5 min |
| CMS corruption | Restore version | 30 min | 1 hour |

---

## 10. COMPLIANCE CONTROLS

### GDPR Controls

| Control | Location | Purpose |
|---------|----------|---------|
| Data Export | /admin/customers/:id | Right to access |
| Data Deletion | /admin/customers/:id | Right to erasure |
| Consent Management | /data-request | Consent tracking |
| Cookie Controls | /cookies | Cookie preferences |

### PCI Compliance

| Control | Implementation |
|---------|----------------|
| Card data handling | Tokenization only |
| Access logging | Full audit trail |
| Network security | TLS 1.3 required |
| Key management | External vault |

---

## 11. IMPLEMENTATION STATUS

### Current (Mock)

All controls are UI-only with mock data:

- `/admin/system` - Main control panel
- `/admin/system/flags` - Feature flags
- `/admin/system/maintenance` - Maintenance mode

### Backend Requirements

```typescript
// Required API endpoints
POST /api/system/kill-switch
POST /api/system/maintenance
POST /api/system/incident
POST /api/system/country/:code/pause
POST /api/system/flags/:id/toggle

// Required webhooks
system.kill_switch.activated
system.maintenance.started
system.incident.activated
system.country.paused
```

See `BACKEND_HANDOFF.md` for integration specifications.
