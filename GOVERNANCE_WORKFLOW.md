# AMARISÉ Governance Workflow

## Overview
Enterprise governance system with global/country/pillar freeze controls, approval chains, incident management, and founder override capabilities.

## Mock Logic
- All freeze states managed in Zustand with localStorage persistence
- Approval required toggle gates product/price changes
- Emergency banner is a string stored in Zustand
- Audit timeline automatically logs all governance actions

## Controls
- Global Commerce Freeze → Disables all purchases
- Country-Level Freeze → Per-country toggle
- Pillar-Level Freeze → Per-pillar (Women, Atelier, Beauty, etc.)
- Approval Required → Two-step publish workflow simulation
- Emergency Announcement → Site-wide banner

## Backend Replacement Contract
- `POST /api/governance/freeze/global` → Toggle global freeze
- `POST /api/governance/freeze/country/{code}` → Toggle country freeze
- `POST /api/governance/freeze/pillar/{slug}` → Toggle pillar freeze
- `PUT /api/governance/approvals` → Set approval requirement
- `PUT /api/governance/emergency-banner` → Set emergency message
- `GET /api/governance/status` → Full governance state

## Data Ownership
- Governance owned by Founder/Director roles only
- Country freezes require Director+ access
- Global freeze restricted to Founder role

## Service Interface
`src/pages/admin/GovernanceControl.tsx` — governance logic embedded in component, ready for extraction.
