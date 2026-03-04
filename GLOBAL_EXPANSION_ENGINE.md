# AMARISÉ — Global Expansion Engine

## Architecture
The country expansion system is config-driven via `src/config/countries.config.ts`. Adding a country requires zero code changes — just append an object to the `COUNTRIES` array.

## How to Add a New Country
1. Open `src/config/countries.config.ts`
2. Add a new `CountryConfig` object with `active: false`
3. Country auto-appears in Admin → Holding → Regions
4. Click "Activate Country" — one click provisioning

## What Happens on Activation
- Country becomes active in storefront selector
- Currency auto-enabled
- Shipping zones auto-assigned from config
- Tax logic applied from vatRate/dutyRate
- Regulatory banner auto-enabled
- All brands auto-activated via Brand × Region Matrix
- Analytics tracking auto-started
- Audit entry generated

## Backend Replacement Contract
- `getEffectiveCountries()` → GET /api/countries
- `activateCountry()` → POST /api/countries/:id/activate
- `deactivateCountry()` → POST /api/countries/:id/deactivate
- `updateCountryOverride()` → PATCH /api/countries/:id/overrides

## Data Ownership
- Country config: Platform Engineering
- Overrides: Operations Team
- Brand matrix: Commercial Director
