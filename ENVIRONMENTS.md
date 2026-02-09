# AMARISÉ Environment Strategy

## Overview

This document defines the environment structure, deployment strategy, and operational procedures for the AMARISÉ platform. Backend engineers configure these environments. DevOps manages deployment pipelines.

---

## 1. Environment Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT HIERARCHY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   LOCAL (Development)                                           │
│   └── Individual developer machines                             │
│       └── Hot reload, mock services                             │
│           └── No external dependencies required                 │
│                                                                  │
│   DEV (Development Server)                                      │
│   └── Shared development environment                            │
│       └── Latest main branch                                    │
│           └── Test data, sandbox APIs                           │
│                                                                  │
│   STAGING (Pre-Production)                                      │
│   └── Production mirror                                         │
│       └── Release candidates                                    │
│           └── Full integration testing                          │
│                                                                  │
│   PRODUCTION                                                    │
│   └── Live customer-facing                                      │
│       └── Blue-green deployment                                 │
│           └── Full monitoring and alerting                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Environment Configurations

### Local Development

```yaml
Purpose: Individual development and testing
URL: http://localhost:5173

Configuration:
  database: SQLite or local PostgreSQL
  payments: Stripe test mode
  email: Logged to console
  storage: Local filesystem
  auth: Mock authentication
  
Features:
  - Hot module replacement
  - Source maps enabled
  - Verbose logging
  - All feature flags enabled
  - Mock data available
  
Requirements:
  - Node.js 18+
  - npm or bun
  - Git
```

### Development Server

```yaml
Purpose: Shared development, integration testing
URL: https://dev.amarise.com

Configuration:
  database: PostgreSQL (dev instance)
  payments: Stripe test mode
  email: Sandbox (Mailtrap/Ethereal)
  storage: Cloud storage (dev bucket)
  auth: Real auth (test accounts)
  
Features:
  - Deployed from main branch
  - Auto-deploy on merge
  - Test data seeded daily
  - All feature flags configurable
  
Data:
  - Reset nightly
  - Seeded with test products
  - Test customer accounts
  - No real customer data
```

### Staging

```yaml
Purpose: Pre-production testing, UAT
URL: https://staging.amarise.com

Configuration:
  database: PostgreSQL (staging instance)
  payments: Stripe test mode
  email: Sandbox with capture
  storage: Cloud storage (staging bucket)
  auth: Production auth system
  
Features:
  - Deployed from release branches
  - Manual deploy trigger
  - Production-like data (anonymized)
  - Feature flags match production plan
  
Data:
  - Anonymized copy of production
  - Refreshed weekly
  - No real payment methods
  - No real emails sent
```

### Production

```yaml
Purpose: Live customer-facing environment
URL: https://amarise.com

Configuration:
  database: PostgreSQL (production cluster)
  payments: Stripe live mode
  email: Production email service
  storage: Cloud storage (production bucket)
  auth: Production auth system
  
Features:
  - Deployed from release tags
  - Blue-green deployment
  - Full monitoring
  - Alerting enabled
  
Data:
  - Real customer data
  - Encrypted at rest
  - Regular backups
  - Disaster recovery ready
```

---

## 3. Feature Flags

### Flag Categories

```typescript
interface FeatureFlags {
  // Commerce flags
  commerce: {
    checkoutEnabled: boolean;      // Master checkout toggle
    guestCheckout: boolean;        // Allow guest purchases
    preOrders: boolean;            // Pre-order functionality
    wishlist: boolean;             // Wishlist feature
    reviews: boolean;              // Product reviews
  };
  
  // Discovery flags
  discovery: {
    browseByRitual: boolean;       // Ritual-based browsing
    browseByMood: boolean;         // Mood-based browsing
    relatedProducts: boolean;      // Related products section
    recentlyViewed: boolean;       // Recently viewed tracking
  };
  
  // Content flags
  content: {
    journal: boolean;              // Journal section
    lookbook: boolean;             // Lookbook section
    stories: boolean;              // Product stories
  };
  
  // UI flags
  ui: {
    darkMode: boolean;             // Dark mode toggle
    animations: boolean;           // Motion effects
    launchCountdown: boolean;      // Collection countdown
    stockIndicator: boolean;       // Show stock levels
  };
  
  // Experimental
  experimental: {
    aiRecommendations: boolean;    // AI-powered suggestions
    arTryOn: boolean;              // AR product preview
    liveChat: boolean;             // Live chat support
  };
}
```

### Flag Configuration by Environment

| Flag | Local | Dev | Staging | Production |
|------|-------|-----|---------|------------|
| checkoutEnabled | true | true | true | true |
| guestCheckout | true | true | true | false |
| preOrders | true | true | true | false |
| wishlist | true | true | true | true |
| reviews | true | true | false | false |
| browseByRitual | true | true | true | true |
| journal | true | true | true | true |
| darkMode | true | true | false | false |
| aiRecommendations | true | true | false | false |

### Runtime Flag Management

```yaml
Storage: Database table or config service
Update: Admin panel or API
Cache: 5-minute TTL
Fallback: Default to 'false' if lookup fails
```

---

## 4. Deployment Strategy

### Blue-Green Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                    BLUE-GREEN DEPLOYMENT                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   STEP 1: Current State                                         │
│   ┌─────────┐                                                   │
│   │  BLUE   │ ◄─── Load Balancer ◄─── Traffic                  │
│   │ (Live)  │                                                   │
│   └─────────┘                                                   │
│   ┌─────────┐                                                   │
│   │  GREEN  │     (Idle)                                        │
│   │         │                                                   │
│   └─────────┘                                                   │
│                                                                  │
│   STEP 2: Deploy New Version                                    │
│   ┌─────────┐                                                   │
│   │  BLUE   │ ◄─── Load Balancer ◄─── Traffic                  │
│   │ (Live)  │                                                   │
│   └─────────┘                                                   │
│   ┌─────────┐                                                   │
│   │  GREEN  │     (Deploying v2.0)                              │
│   │  (v2.0) │                                                   │
│   └─────────┘                                                   │
│                                                                  │
│   STEP 3: Switch Traffic                                        │
│   ┌─────────┐                                                   │
│   │  BLUE   │     (Standby)                                     │
│   │ (v1.9)  │                                                   │
│   └─────────┘                                                   │
│   ┌─────────┐                                                   │
│   │  GREEN  │ ◄─── Load Balancer ◄─── Traffic                  │
│   │ (Live)  │                                                   │
│   └─────────┘                                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Deployment Checklist

```yaml
Pre-Deployment:
  - [ ] All tests passing
  - [ ] Code review approved
  - [ ] Changelog updated
  - [ ] Database migrations tested
  - [ ] Feature flags configured
  - [ ] Rollback plan documented

Deployment:
  - [ ] Deploy to inactive environment
  - [ ] Run smoke tests
  - [ ] Verify health checks
  - [ ] Switch traffic gradually (10% → 50% → 100%)
  - [ ] Monitor error rates

Post-Deployment:
  - [ ] Verify key user journeys
  - [ ] Check performance metrics
  - [ ] Review error logs
  - [ ] Update status page
  - [ ] Notify stakeholders
```

---

## 5. Rollback Procedures

### Automatic Rollback Triggers

```yaml
Error Rate:
  - Threshold: > 5% 5xx errors
  - Window: 5 minutes
  - Action: Automatic rollback

Response Time:
  - Threshold: p95 > 3s
  - Window: 5 minutes
  - Action: Alert, manual decision

Health Checks:
  - Threshold: 3 consecutive failures
  - Action: Remove from load balancer
```

### Manual Rollback Steps

```yaml
Step 1: Confirm Issue
  - Review error logs
  - Identify affected functionality
  - Assess customer impact

Step 2: Switch Traffic
  - Route traffic to previous version
  - Verify health of previous version
  - Monitor error rates

Step 3: Investigate
  - Keep new version running (no traffic)
  - Debug the issue
  - Prepare hotfix

Step 4: Document
  - Create incident report
  - Update runbooks
  - Schedule post-mortem
```

### Rollback Time Targets

| Severity | Detection | Decision | Execution | Total |
|----------|-----------|----------|-----------|-------|
| Critical | < 2 min | < 3 min | < 5 min | < 10 min |
| High | < 5 min | < 10 min | < 5 min | < 20 min |
| Medium | < 15 min | < 30 min | < 5 min | < 50 min |

---

## 6. Database Migration Strategy

### Migration Rules

```yaml
Forward Only:
  - Migrations are never deleted
  - Migrations are never modified after deployment
  - Rollback via new migration (reverse changes)

Backward Compatible:
  - New columns: nullable or with default
  - Column removal: deprecate first, remove later
  - Table removal: deprecate first, remove later

Testing:
  - All migrations tested locally
  - Migrations tested on staging with production-like data
  - Estimated execution time documented
```

### Migration Workflow

```
1. Create migration file
2. Test locally
3. Deploy to dev (auto-run)
4. Deploy to staging (manual verification)
5. Deploy to production (with deployment)
```

---

## 7. Environment Variables

### Required Variables

```yaml
All Environments:
  - DATABASE_URL
  - API_URL
  - SITE_URL
  
Production Only:
  - STRIPE_SECRET_KEY
  - EMAIL_API_KEY
  - STORAGE_BUCKET
  - ANALYTICS_ID
  
Development Only:
  - DEBUG=true
  - VERBOSE_LOGGING=true
```

### Secret Management

```yaml
Storage: Cloud secret manager (AWS Secrets Manager, etc.)
Access: Service accounts only
Rotation: Automated quarterly
Audit: All access logged
```

---

## 8. Monitoring & Observability

### Metrics to Track

```yaml
Application:
  - Request rate
  - Error rate
  - Response time (p50, p95, p99)
  - Active users
  
Business:
  - Orders per hour
  - Cart abandonment rate
  - Checkout completion rate
  - Revenue
  
Infrastructure:
  - CPU utilization
  - Memory usage
  - Database connections
  - Cache hit rate
```

### Alerting Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Error rate | > 1% | > 5% |
| p95 latency | > 1s | > 3s |
| CPU usage | > 70% | > 90% |
| Memory usage | > 75% | > 90% |
| Disk usage | > 70% | > 85% |

---

## 9. Disaster Recovery

### Backup Strategy

```yaml
Database:
  - Full backup: Daily at 03:00 UTC
  - Incremental: Every 6 hours
  - Retention: 30 days
  - Cross-region replication: Enabled

Files/Assets:
  - Continuous replication
  - Versioning enabled
  - Retention: 90 days

Configuration:
  - Version controlled (Git)
  - Secrets backed up separately
```

### Recovery Objectives

```yaml
RTO (Recovery Time Objective): 4 hours
RPO (Recovery Point Objective): 1 hour

Tier 1 (Core Commerce):
  - Checkout: RTO 1 hour
  - Product catalog: RTO 2 hours
  
Tier 2 (Supporting):
  - Journal: RTO 4 hours
  - Analytics: RTO 8 hours
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial environment strategy |
