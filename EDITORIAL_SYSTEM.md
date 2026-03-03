# AMARISÉ Editorial System

## Overview
Draft, schedule, and publish editorial content with future-date preview, expiry dates, and audit logging.

## Mock Logic
- Editorial items stored in component state (not persisted)
- Schedule/expiry checks are date-based comparisons
- "Preview as future date" filters items by simulated publish window
- All mutations logged to audit timeline via Zustand

## Backend Replacement Contract
- `GET /api/editorial` → List all editorial items
- `POST /api/editorial` → Create new editorial
- `PUT /api/editorial/{id}` → Update editorial
- `DELETE /api/editorial/{id}` → Delete editorial
- `POST /api/editorial/{id}/publish` → Publish immediately
- `POST /api/editorial/{id}/schedule` → Schedule publish
- `GET /api/editorial/preview?date={iso}` → Preview visibility at future date

## Data Ownership
- Content owned by Editorial/Content team
- Publishing permissions gated by role (Content Editor+)
- Audit logs captured for all publish/unpublish actions

## Service Interface
Future: `src/services/editorial.service.ts` — extract from component state to service layer.
