# AMARISÉ Executive Dashboard

## Overview
CEO-level strategic command center providing a unified view of global revenue, risk indicators, freeze status, compliance, and quick override actions.

## Mock Logic
- Revenue aggregated from `analytics.json` country performance data
- Risk score calculated from: freeze states, low stock count, sold out count, pending orders
- Risk levels: low (0-5), moderate (6-20), elevated (21-40), critical (40+)
- Region ranking sorted by revenue descending
- Recent audit entries pulled from Zustand store

## Panels
- Strategic KPIs (revenue, markets, approvals, inventory alerts)
- Freeze Status (global, inventory, country-level)
- Compliance Status (approvals, emergency banner, maintenance)
- Performance Mode overview
- Region Revenue Ranking with bar visualization
- Quick Override Actions (emergency freeze, governance, analytics, inventory links)

## Backend Replacement Contract
- `GET /api/executive/overview` → Aggregated KPI data
- `GET /api/executive/risk-score` → Calculated risk assessment
- `GET /api/executive/region-ranking` → Revenue by region
- All override actions delegate to existing governance endpoints

## Data Ownership
- Executive dashboard is read-only aggregation layer
- Override actions delegate to respective domain services
- Restricted to Founder/Director roles

## Service Interface
No dedicated service — aggregates from existing services and Zustand store.
