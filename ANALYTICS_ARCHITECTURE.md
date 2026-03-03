# AMARISÉ Analytics Architecture

## Overview
The Analytics Command Center provides CEO-level intelligence across revenue, conversions, country performance, traffic, devices, and product heatmaps.

## Mock Logic
- All data sourced from `src/data/mock/analytics.json`
- Revenue trend generated via `generateRevenueTrend()` with randomized values
- Simulated real-time revenue tick every 5 seconds
- Time range filters regenerate trend data client-side

## Backend Replacement Contract
- `GET /api/analytics/revenue?range={7d|30d|90d|1y}&country={code}` → Revenue trend data
- `GET /api/analytics/funnel?range={range}` → Conversion funnel stages
- `GET /api/analytics/countries?sort={revenue|growth}` → Country performance
- `GET /api/analytics/traffic` → Traffic source breakdown
- `GET /api/analytics/devices` → Device breakdown
- `GET /api/analytics/products/heatmap` → Product revenue heatmap
- `GET /api/analytics/aov?range={range}` → AOV trend

## Data Ownership
- Analytics data owned by Data/BI team
- Country performance cross-references with Region Engine
- Product heatmap cross-references catalog service

## Service Interface
Located at `src/services/analytics.service.ts` — all functions marked with `BACKEND HANDOFF` comments.
