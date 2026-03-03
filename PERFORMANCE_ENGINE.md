# AMARISÉ Performance Engine

## Overview
Client-side performance mode system that adjusts animation quality based on device capabilities and user preferences.

## Modes
- **High**: All animations, parallax, blur, film grain, cinematic transitions
- **Standard**: Essential animations, no parallax or grain
- **Low**: Minimal animations, simplified transitions, no effects

## Mock Logic
- Mode persisted in `localStorage` key `amarise-perf-mode`
- Reduced motion persisted in `localStorage` key `amarise-reduced-motion`
- Device auto-detection via `navigator.deviceMemory`, `navigator.hardwareConcurrency`, `navigator.connection`
- Feature matrix determines which effects are active per mode

## Backend Replacement Contract
- No backend needed — this is purely client-side
- User preference could optionally be stored in user profile: `PUT /api/users/{id}/preferences`

## Data Ownership
- Performance settings owned by individual user (client-side)
- Admin can set default mode via System Settings

## Service Interface
`src/lib/performance.ts` — utility functions for animation settings.
`src/hooks/usePerformance.ts` — React hooks for performance-aware components.
