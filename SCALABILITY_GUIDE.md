# AMARISÉ — Scalability Guide

## Adding Countries
1. Add object to `COUNTRIES` array in `src/config/countries.config.ts`
2. No UI code changes required
3. Country auto-detected by all admin panels, analytics, selectors
4. One-click activation via admin

## Adding Brands
1. Add object to `BRANDS` array in `src/config/brandRegionMatrix.ts`
2. Matrix auto-generates entries for all countries
3. Toggle availability per country in admin

## Design Principles
- Zero hardcoded country values
- Config-driven everything
- Dynamic rendering from arrays
- localStorage persistence (replace with API)
- All mutations generate audit entries
