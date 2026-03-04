# AMARISÉ — Fulfillment Simulation

## Centers
- Mumbai Hub (India)
- New York Hub (USA)
- London Hub (UK)
- Toronto Hub (Canada)

## Assignment Logic
1. Match order destination to country's fulfillment center
2. If center offline, fallback to lowest-utilization operational center
3. Estimate ship date: +1 day from order
4. Estimate delivery: ship date + shipping zone max days

## Backend Replacement
- `assignFulfillment()` → POST /api/fulfillment/assign
- `getFulfillmentCenters()` → GET /api/fulfillment/centers
