# AMARISÉ Region Engine

## Overview
Multi-country storefront engine supporting 10 regions with currency conversion, tax calculation, and shipping availability simulation.

## Mock Logic
- Country data hardcoded in `src/services/region.service.ts`
- Currency conversion via `src/hooks/useCurrency.ts` with static rates
- Country selection persisted in localStorage
- Admin country freeze controls in Zustand store

## Supported Regions
- US, CA (North America)
- GB, FR, DE, IT (Europe)
- IN, JP, AU (Asia Pacific)
- AE (Middle East)

## Backend Replacement Contract
- `GET /api/regions` → All regions
- `GET /api/countries` → All countries with tax/shipping info
- `GET /api/countries/{code}/tax` → Tax rate
- `GET /api/countries/{code}/shipping` → Shipping availability
- `GET /api/currencies/convert?from={code}&to={code}&amount={n}` → Currency conversion
- `POST /api/admin/countries/{code}/freeze` → Country freeze toggle

## Data Ownership
- Country config owned by Operations team
- Tax rates owned by Finance team
- Shipping availability owned by Logistics team

## Service Interface
`src/services/region.service.ts` — all functions marked with `BACKEND HANDOFF` comments.
