# AMARISÉ — Country Activation Flow

## Steps
1. Country object exists in `countries.config.ts` with `active: false`
2. Admin navigates to `/admin/holding/regions`
3. Clicks "Activate Country" button
4. System executes: currency enable → shipping assign → tax apply → banner enable → brand matrix update → audit log
5. Country immediately appears in storefront country selector
6. All active brands become available in the new country

## Deactivation
Reverses all activation steps. Checkout frozen, shipping blacked out, brands set to inactive.

## Governance Override
Via `/admin/holding/region-control`:
- Checkout freeze per country
- Shipping blackout per country
- Brand restriction per country
- Soft launch mode
- Compliance banner toggle
