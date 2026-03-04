# AMARISÉ — Brand × Region Matrix

## Structure
Each brand has an entry per country with: status, pricingMultiplier, checkoutEnabled, navVisible, homepageVisible.

## Statuses
- `active` — Full availability
- `frozen` — Visible but checkout disabled
- `soft-launch` — Limited visibility
- `scheduled` — Future launch date set
- `inactive` — Not available

## Admin Controls
- Toggle brand per country in `/admin/holding/regions`
- Bulk freeze/activate in `/admin/holding/region-control`

## Backend Replacement
- `getMatrix()` → GET /api/brand-region-matrix
- `updateMatrixEntry()` → PATCH /api/brand-region-matrix/:brandId/:countryId
