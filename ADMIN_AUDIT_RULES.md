# AMARISÉ Admin Audit Rules

## Overview

This document defines audit logging requirements for all admin actions. Backend engineers implement these logging mechanisms. Security team reviews logs periodically.

---

## 1. Audit Logging Requirements

### What MUST Be Logged

Every admin action that modifies data must generate an audit log entry containing:

```typescript
interface AuditLogEntry {
  // Identity
  id: string;                    // Unique log ID
  timestamp: string;             // ISO 8601 format
  
  // Actor
  adminId: string;               // Who performed action
  adminEmail: string;            // Email for readability
  adminRole: AdminRole;          // Role at time of action
  
  // Action
  action: AuditAction;           // What was done
  resourceType: ResourceType;    //
