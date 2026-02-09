# AMARISÉ Incident Response Protocol

## Overview

This document defines the incident response procedures for AMARISÉ. All team members must be familiar with these protocols.

---

## 1. Incident Severity Levels

### Critical (P0)

**Definition**: Complete system failure or major security breach

**Examples**:
- Payment system down globally
- Data breach detected
- Website completely inaccessible
- All orders failing

**Response Time**: Immediate (< 5 minutes)
**Escalation**: Automatic to Founder

---

### High (P1)

**Definition**: Significant degradation affecting multiple customers

**Examples**:
- Payment failures in one region
- Checkout errors > 10% of attempts
- Major feature broken
- Shipping integration down

**Response Time**: < 15 minutes
**Escalation**: Regional Supervisor → Global Ops Lead

---

### Medium (P2)

**Definition**: Limited impact with workarounds available

**Examples**:
- Single payment method failing
- One country's shipping delayed
- CMS content not updating
- Analytics not tracking

**Response Time**: < 1 hour
**Escalation**: Regional Supervisor

---

### Low (P3)

**Definition**: Minor issues, no customer impact

**Examples**:
- Admin dashboard slow
- Internal tool bug
- Non-critical feature issue
- Documentation error

**Response Time**: < 24 hours
**Escalation**: None required

---

## 2. Emergency Controls

### Activation Criteria

| Control | When to Activate |
|---------|------------------|
| Incident Mode | Any P0 or P1 incident |
| Freeze Checkout | Payment system issues |
| Freeze Refunds | Fraud investigation |
| Freeze Price Changes | Pricing system bug |
| Freeze CMS | Content security issue |
| Internal Broadcast | All P0/P1 incidents |

### Activation Process

1. Navigate to Admin → Emergency Controls
2. Toggle required controls ON
3. Add reason/message
4. Confirm activation
5. System broadcasts to all admins

### Deactivation Process

1. Confirm incident resolved
2. Navigate to Admin → Emergency Controls
3. Toggle controls OFF
4. Document resolution in incident
5. Generate post-mortem

---

## 3. Incident Workflow

```
┌──────────────┐
│   DETECTED   │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌────────────────┐
│    OPEN      │────►│  Assign Owner  │
└──────┬───────┘     └────────────────┘
       │
       ▼
┌──────────────┐     ┌────────────────┐
│ INVESTIGATING│────►│ Gather Data    │
└──────┬───────┘     └────────────────┘
       │
       ▼
┌──────────────┐     ┌────────────────┐
│  MITIGATING  │────►│ Apply Fixes    │
└──────┬───────┘     └────────────────┘
       │
       ▼
┌──────────────┐     ┌────────────────┐
│   RESOLVED   │────►│ Confirm Fixed  │
└──────┬───────┘     └────────────────┘
       │
       ▼
┌──────────────┐     ┌────────────────┐
│ POST-MORTEM  │────►│ Document Learn │
└──────────────┘     └────────────────┘
```

---

## 4. Communication Protocol

### Internal Communication

| Severity | Channel | Frequency |
|----------|---------|-----------|
| Critical | Broadcast + Direct Contact | Every 15 min |
| High | Broadcast | Every 30 min |
| Medium | Incident Thread | Every 2 hours |
| Low | Incident Log | Daily |

### External Communication (Customers)

| Severity | Action | Approval Required |
|----------|--------|-------------------|
| Critical | Status page update | Global Ops Lead |
| High | Email if order affected | Regional Supervisor |
| Medium | No proactive communication | N/A |
| Low | No communication | N/A |

**CRITICAL RULE**: Never admit fault or liability without Legal approval

---

## 5. Escalation Matrix

```
┌─────────────────────────────────────────────────────────────┐
│                        FOUNDER                              │
│            (Critical incidents, data breaches)              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   GLOBAL OPS LEAD                           │
│         (P0/P1 not resolved in 30 min)                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                 REGIONAL SUPERVISOR                         │
│              (All P1/P2 incidents)                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   REGIONAL ADMIN                            │
│               (Initial responder)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Incident Categories

### Payment Failure
- Check payment provider status
- Review error logs
- Contact provider if widespread
- Enable backup payment method if available
- Document affected orders

### Shipping Delay
- Check carrier status
- Identify affected orders
- Proactive customer communication
- Offer compensation per policy
- Update shipping estimates

### Website Error
- Check error monitoring
- Identify affected pages/features
- Roll back recent deployments
- Engage engineering support
- Monitor recovery

### Fraud Alert
- Do NOT contact suspected customer
- Review flagged orders
- Escalate to fraud team
- Document findings
- Update fraud rules if needed

### Data Breach
- IMMEDIATELY activate incident mode
- Escalate to Founder
- Do NOT communicate externally
- Engage security team
- Begin legal notification process

---

## 7. Post-Mortem Template

### Incident Summary
- Incident ID
- Severity
- Duration
- Customers affected
- Revenue impact

### Timeline
- Detection time
- Response start
- Key milestones
- Resolution time

### Root Cause
- What happened
- Why it happened
- Contributing factors

### Impact
- Customer impact
- Financial impact
- Reputational impact

### Resolution
- Immediate fixes
- Long-term solutions
- Prevention measures

### Action Items
- Owner
- Deadline
- Status

---

## 8. Founder Override

In extreme circumstances, the Founder can:

1. **Lock All Admins**: Immediately revoke all admin access
2. **Read-Only Mode**: Prevent all modifications to the platform
3. **Global Kill Switch**: Halt all operations
4. **Cross-Region Access**: Override country isolation

**Access Requirements**:
- Founder-level credentials
- Multi-factor authentication
- All actions logged with enhanced detail

---

## 9. Training Requirements

All operations staff must:

1. Complete incident response training quarterly
2. Participate in tabletop exercises monthly
3. Know escalation contacts by heart
4. Have emergency access procedures documented

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Platform Team | Initial protocol |
