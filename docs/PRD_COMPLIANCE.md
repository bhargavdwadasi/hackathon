# PRD Compliance Checklist

Status key: `Done`, `Partial`, `Not started`.

## Mandatory disclosure

| Requirement | Status | Notes |
|---|---:|---|
| Persistent footer disclosure on every page | Done | Implemented in app shell. |
| First-visit interstitial | Not started | Needs dismissible state. |
| AI provenance line on every AI output | Not started | Phase 2 only; no AI output exists yet. |
| No government marks / gov domain / real IDs / real payment rails | Partial | Current copy avoids these. Needs lint/test guard. |

## Phase 1 product primitives

| Requirement | Status | Notes |
|---|---:|---|
| Capability Matrix | Partial | Seeded 12 states x current service list with deterministic API. PRD asks 8 journeys x 12 states minimum, plus richer row fields. |
| The Ledger | Partial | Route placeholder exists. Entities/state machine not implemented yet. |
| Pre-flight before payment | Not started | Needs journey state machine and document checks. |
| Verifiable Notice | Partial | Route placeholder exists. Deterministic notice lookup not implemented yet. |

## Information architecture

| Requirement | Status | Notes |
|---|---:|---|
| Home, services, A-Z, search, check, verdict URLs | Done | Implemented. |
| Persistent mobile bottom nav | Done | Implemented. |
| Persistent desktop left rail | Done | Implemented. |
| Breadcrumbs below top-level pages | Partial | Implemented on current routes; must continue for all new routes. |
| State selector visible everywhere | Done | Header selector sets `raah_state` cookie. |
| Language selector visible everywhere | Partial | Selector exists; English/Hindi content switching is not implemented yet. |
| Every page reachable within three taps | Partial | Current routes satisfy this for the first slice; future journeys must preserve it. |
| Keyword + synonym search with no AI | Partial | Basic aliases exist; PRD asks broader English/Hindi synonym coverage. |

## Responsive, performance and resilience

| Requirement | Status | Notes |
|---|---:|---|
| 360 px mobile baseline | Partial | CSS is responsive; needs screenshot/device verification. |
| JS-disabled core flows | Partial | Current forms are server routes; needs formal Playwright/No-JS test. |
| Lighthouse CI and size budgets | Not started | Build reports First Load JS around 106 kB, above PRD's strict initial budget. |
| Offline/PWA/resume | Not started | Needs service worker and draft persistence. |
| Autosave | Not started | Journey forms not implemented yet. |

## Journeys

| Journey | Status | Notes |
|---|---:|---|
| J1: Can I do this online? | Partial | Directory, check form, verdict page and API are implemented. Needs richer verdict states and no-JS test pass. |
| J2: Learner's licence | Not started |  |
| J3: Driving licence renewal | Not started |  |
| J4: Change address on DL | Not started | Next recommended journey. |
| J5: Change address on RC | Not started | Build with J4 as combined flow. |
| J6: Hypothecation removal | Not started | Capability verdict exists only. |
| J7: Ownership transfer | Not started | Capability verdict exists only. |
| J8: Challan verify/pay/dispute | Not started | Capability verdict and verify placeholder exist only. |

## Mock backend

| Requirement | Status | Notes |
|---|---:|---|
| Entities and deterministic seed | Not started | Needed before real journeys. |
| Application state machine with fee last | Not started | Next architectural step. |
| Payments ledger and reconciliation chaos mode | Not started |  |
| Documents, notices, slots, grievances APIs | Not started |  |
| `AI_ENABLED` flag exposed and respected | Partial | Copy says false; actual env flag and UI toggle not wired. |

## Accessibility and language

| Requirement | Status | Notes |
|---|---:|---|
| Semantic forms and labels | Partial | Current forms have labels; full axe pass needed. |
| Hindi strings for every string | Not started | Language selector is only preference state today. |
| Class-8 plain language check | Not started |  |

## Current build verification

| Check | Status |
|---|---:|
| `npm run typecheck` | Passing |
| `npm run build` | Passing before selector update; rerun required after this file change |
| Route smoke tests | Passing before selector update; rerun required after this file change |
