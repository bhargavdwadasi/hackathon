# Raah Build Backlog

## Phase 1: working service, no AI

1. Foundation and navigation shell
   - Next.js app router, TypeScript, shared tokens, responsive mobile bottom nav and desktop rail.
   - Mandatory independent prototype disclosure on every page.
   - Persistent state and language selectors.
   - Core components: verdict badge, money, service row, error block, mock badge.

2. Capability Matrix and browse routes
   - Seed synthetic capability rows for 8 core journeys across 12 states.
   - `/services`, `/services/a-z`, `/search`, `/check`, `/check/[service]/[state]`.
   - Keyword and synonym search without AI.
   - `/api/capability` for deterministic lookups.

3. Mock backend and Ledger
   - Applications, payments, documents, notices, slots, grievances.
   - Fee-last state machine.
   - Chaos mode for debited-but-not-recorded payment.

4. First complete journeys
   - J4/J5 address change combined flow.
   - Ledger entries for two tracked applications and one payment.

5. Remaining Phase 1 journeys
   - J2 learner's licence, J3 renewal, J6 loan removal, J7 ownership transfer, J8 challan verify/pay/dispute.
   - Grievance-in-context and record correction.
   - Hindi string pass.

6. Hardening
   - JS-disabled pass for browse and J1.
   - Mobile 360 px pass.
   - Accessibility sweep.
   - `/about` with mock posture, AI flag, and limitations.

## Phase 2: AI layer, additive only

1. Task router over the existing search results page.
2. Adaptive eligibility interview over deterministic Capability Matrix verdicts.
3. Document pre-flight explanation.
4. Statutory form draft generation.
5. Notice/error explainer.
6. Grievance and dispute drafter.
7. Live language layer.
