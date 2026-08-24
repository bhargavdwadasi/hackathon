# Raah — Product Requirements Document
### A redesign of India's road-transport citizen services
**Version 1.0 · 23 August 2026 · Owner: Bhargav Dwadasi · For: Build What Moves India (submission 28 Aug 2026, 20:00 IST)**

> **Name is a placeholder.** "Raah" (राह — *path, way*) is a working name. It is not final and carries no claim to any existing mark.

---

## 0. Mandatory disclosure

Raah is an **independent concept prototype**. It is not affiliated with, endorsed by, or connected to the Ministry of Road Transport & Highways, the National Informatics Centre, any State Transport Department, or the Parivahan / Vahan / Sarathi / mParivahan services.

This disclosure is a **product requirement, not a footnote**. It is enforced in three places:

| Surface | Requirement |
|---|---|
| Every page | A persistent, non-dismissible strip in the footer: *"Raah is an independent design prototype. Not a government service. All data shown is synthetic."* |
| First visit | A one-time interstitial (dismissible, remembered) stating the same, plus what is mocked. |
| Every AI output | A machine-readable and visible provenance line naming the model and the fact the answer is generated against a synthetic rule corpus. |

**Hard prohibitions carried into the design system as lint rules:**

- No Government of India emblem, Ashoka Lion Capital, MoRTH logo, NIC logo, Digital India / G20 / Azadi ka Amrit Mahotsav marks, or tricolour ribbon device.
- No `.gov.in` domain, no visual imitation of one, no URL that could be mistaken for one.
- No real Aadhaar, PAN, licence, registration, chassis, engine, or challan numbers. Every identifier in seed data is drawn from a reserved synthetic range and is visibly flagged.
- No real payment rails. Checkout is a simulator that never leaves the prototype.
- No claim that any output has legal effect.

The visual identity is deliberately built to **not** resemble an Indian government portal, precisely so it cannot be screenshotted and passed off as one.

---

## 1. The problem, in one paragraph

India's road-transport portal handles roughly 25.7 million visits a month across 1,300+ RTOs, and is among the most disliked digital services in the country: 1.7/5 on Trustpilot for Sarathi, ~10% satisfaction across 8,433 RTO complaint reviews, and a Mission Mode assessment showing digitisation cut trips to the RTO only from 3.44 to 2.43. The failure is not missing features — the service inventory is enormous. The failure is that **the system will not tell you what is true before it takes your money.** You cannot find out whether your task is possible online in your state until you have selected a state, guessed at statutory vocabulary, authenticated through an OTP that may never arrive, paid a non-refundable fee, and been rejected weeks later by a human for a signature the form never checked for.

---

## 2. The one problem Raah solves

> **"Tell me the truth before I pay."**

Everything in this document is downstream of that sentence. Raah is not a prettier Parivahan. It is a service that **front-loads certainty**: what is possible for *you*, in *your* state, with *your* documents, at *what* cost, in *how* long — established before a rupee moves, and recoverable when something goes wrong.

### 2.1 The four product primitives

| # | Primitive | What it is | Which teardown finding it kills |
|---|---|---|---|
| 1 | **Capability Matrix** | A queryable dataset of `(service × state × authentication mode) → verdict, fee, documents, duration, statutory basis`. The artefact the teardown notes "does not appear to exist publicly." | "Online often means online form, offline outcome"; "service availability invisible until you have invested"; "federation makes every answer conditional" |
| 2 | **The Ledger** | One account, one chronological list of every application, payment attempt, document, due and notice — with a real status and an explicit next action on each. | "No unified view of the citizen"; "payment state is opaque"; "grievance redress is a dead end" |
| 3 | **Pre-flight** | Eligibility rules, document checks and signature/stamp detection run **before** the payment wall. Fee is always the last step. | "Rejections happen after the fee is paid"; "errors don't tell users what to do"; unsigned Form 35 rejections |
| 4 | **Verifiable Notice** | Every notice Raah sends carries a reference resolvable inside Raah. Anything not resolvable is, by construction, not from Raah. | "Impersonation ecosystem has outgrown the real site"; fake challan SMS; clone domains |

### 2.2 Design principles (used as tie-breakers in every review)

1. **Truth before payment.** If we cannot honestly answer "will this work?", we say so, in those words, and do not take money.
2. **Ask a human question, generate the statutory form.** Form 35 is a legal artefact, not an interview script. The citizen answers "Has your bank given you the loan-closure letter?"; Raah produces Form 35.
3. **The slow phone is the design target.** 360 px, 2 GB RAM, throttled 3G, Hindi. If it works there it works everywhere. Desktop is the *second* design, not the first.
4. **Never lose a person's work.** Every keystroke survives a dropped connection, a killed tab and a dead battery.
5. **State an error's cause, meaning and next action — always all three.** No string ships without all three.
6. **AI drafts; the citizen decides.** No AI output is submitted without the citizen seeing and being able to edit it.
7. **Mocked things say they are mocked.** In-product, at the point of use, not only in the README.
8. **Everything is reachable by tapping.** Search — and later, AI — is an accelerator, never a gate. No destination in Raah exists only behind a text field. A person who types nothing must still be able to reach every service, every verdict and every flow by browsing alone.
9. **The product is complete before AI is added.** Every capability ships in a deterministic form first. AI upgrades a feature that already works; it never *is* the feature.

---

## 3. Scope

### 3.1 In scope — eight citizen journeys, end to end

| # | Journey | Plain-language entry | Why it earns a slot |
|---|---|---|---|
| J1 | **Can I do this online?** — eligibility-first entry + Capability Matrix | "What do you need to do?" | The hero. Nothing like it exists today. |
| J2 | **Learner's licence** | "I want to start driving" | Highest-volume first-time journey; contains OTP, upload, payment, slot booking, test. |
| J3 | **Driving licence renewal** | "My licence is expiring" | The single most common repeat transaction; Form 1A over-40 branch. |
| J4 | **Change of address on DL** | "I've moved house" | Notified contactless; ideal demonstration of a genuinely fully-online path. |
| J5 | **Change of address on RC** | "I've moved house" (same entry, two records) | Proves the Ledger: one life event, two records, one flow. |
| J6 | **Hypothecation removal** | "I've paid off my car loan" | The teardown's canonical vocabulary failure; showcases Pre-flight signature detection. |
| J7 | **Transfer of vehicle ownership** | "I'm selling my vehicle" / "I'm buying one" | Two-sided flow, Forms 29 + 30, dues-clearance dependency. |
| J8 | **Challan: find, verify, pay or dispute** | "I got a fine" / "Is this message real?" | Second-highest traffic; carries the anti-scam verifier and the dispute drafter. |

**Cross-cutting systems (built once, used by all eight):** authentication ladder · payments ledger & receipts · document vault · notices & authenticity verification · grievance-in-context · record-correction · language layer · offline/resume engine.

### 3.2 Represented but not fully built (visible, honest stubs)

Fitness certificate · NOC inter-state · permits · fancy-number auction · PUCC · scrapping · tax payment & refund · trade certificate. Each shows a real Capability Matrix verdict and a labelled *"Not built in this prototype"* state rather than a dead link.

### 3.3 Two phases — the product first, AI second

Raah is built in two sequential phases, and **Phase 1 is a complete, shippable product on its own.**

| | Phase 1 — the working service | Phase 2 — the AI layer |
|---|---|---|
| Contains | All eight journeys end to end, the Capability Matrix, the Ledger, payments and reconciliation, documents, slots, notices, grievance, record-correction, full browse navigation, keyword search, Hindi + English, full accessibility and performance compliance | Task router, adaptive eligibility interview, document pre-flight vision checks, statutory form generation, notice/error explainer, grievance drafter, live language layer |
| AI dependency | **Zero.** No model call anywhere. No API key required. | Every feature is an *upgrade of a Phase 1 feature that already works* |
| Gate | Deployed, demoable and passing the full §8.7 test matrix before Phase 2 begins. Tagged as a release. | May not remove, hide or degrade any Phase 1 path |
| If it runs out of time | Ships as the submission | Simply absent; nothing breaks |

**The hard rule:** the entire product must pass its test matrix with `AI_ENABLED=false`. This is not a fallback posture — it is the definition of done for Phase 1, and it is verified in CI on every commit thereafter.

### 3.4 Explicitly out of scope

- **Trade & dealer console** (DSC/Java/Windows path) — named in the architecture as a separate product surface, deliberately not built. Splitting it is itself a recommendation.
- **Government-internal workflows** (RTO clerk, MVI, enforcement).
- **The public analytics dashboards** — treated as a stable public contract to be preserved, not redesigned.
- Native apps. Raah is a responsive web app, installable as a PWA. The brief requires browser-accessible, no downloads.

---

## 4. Users

| Persona | Profile | What breaks them today | What Raah must get right |
|---|---|---|---|
| **Sunita, 34, Nashik** — the once-every-few-years citizen | Redmi-class Android, 4 GB data/month, reads Marathi first, English haltingly. Has done one transaction in five years. | Statutory vocabulary; state selection; OTP; "payment pending"; not knowing whether to take a day off work. | Plain-language entry, an honest verdict, work that survives a dropped call, Marathi throughout including error strings. |
| **Imran, 27, Hyderabad** — the confident mobile-native | Recent phone, good connection, English + Telugu, will not call a helpline or visit an office if avoidable. | Discovering three URLs for one task; slot booking that returns "service not enabled in this RTO"; no way to prove he paid. | Speed, a real slot picker, receipts, status he can trust without re-checking. |
| **Ramesh, 58, rural Bihar** — assisted, low-literacy | Shared phone, 2G-3G, Hindi, currently uses an agent for everything (~70% historical agent dependence; ₹1,120 average against a ₹450 fee). | Everything. Aadhaar biometric requirement pushes him to a CSC. | A path that is legible when read aloud, an explicit "you will need help with this step" honesty, and an assisted-mode where a helper can act with consent and it is recorded. |

**Anti-persona:** the RTO agent. Raah should make the agent's margin smaller by removing the information asymmetry the agent sells — not by blocking assistance, which people legitimately need.

---

## 5. Information architecture

### 5.1 The rule

Navigation is organised by **what a person came to do, in the words they would use**. Statutory terms (hypothecation, homologation, reassignment of registration mark, AITP) become *searchable metadata*, never navigation labels. Every statutory term appears exactly once in the UI: inside a "the official name for this is…" disclosure, so a person can match it against a paper form.

### 5.2 Top level

```
/                       Ask: "What do you need to do?"  (search + 8 task cards)
/check                  J1 — Can I do this online?  (the Capability Matrix front end)
/check/[service]/[state]      A single honest verdict page (shareable, indexable)
/do/[journey]/...       The eight task flows
/me                     The Ledger — applications, payments, documents, dues
/me/applications/[id]   One application: timeline, next action, grievance, receipt
/me/payments            Payment ledger with verify + refund
/me/documents           Document vault
/verify                 Is this notice real?  (public, no login)
/challan                Challan lookup (public, no login)
/help/[topic]           Help, rendered inline at the point of need — never a separate silo
/about                  What this is, what is mocked, who built it
```

**No "Other Services". No "Informational Services". No menu named after an internal department.** Help is a component, not a destination — `/help/*` exists only so answers are linkable.

### 5.3 The eight life events

Written as sentences a person says, ranked by national volume. These are the home page's primary cards and also the top level of the service directory:

1. I got a fine → J8
2. My licence is expiring → J3
3. I want to start driving → J2
4. I've moved house → J4 + J5 (one entry, branches to which records to update)
5. I've paid off my vehicle loan → J6
6. I'm buying or selling a vehicle → J7
7. Something on my record is wrong → record-correction
8. Something else → search, backed by the AI task router (§9.1)

### 5.4 Browse-first navigation — no dead ends, no gates

**Requirement: every page in Raah is reachable within three taps of the home page, by tapping alone, with no text entered and no JavaScript running.** A person who does not know what to type, cannot type in English, is not sure what their task is called, or simply prefers to look — must be able to get anywhere.

Four independent ways in, all of which work with zero AI:

**a) Life-event cards (home page).** The eight sentences in §5.5. The fastest path for the 80% case.

**b) The service directory — `/services`.** Every service in the ecosystem, grouped into four categories a person recognises, each row showing its Capability Matrix verdict at a glance for the currently selected state. This is the page that replaces "Other Services", "Informational Services" and the alphabetical sitemap.

| Category | Contains |
|---|---|
| **Driving & licences** | Learner's licence · driving licence · renewal · duplicate · address change · add or surrender a vehicle class · international permit · driving schools |
| **Your vehicle** | Registration · transfer of ownership · address change on RC · loan / hypothecation · duplicate RC · re-registration · NOC for another state · fitness · scrapping |
| **Fines & compliance** | Challans · disputes · pollution certificate · tax · permits |
| **Records & problems** | Something is wrong on my record · a payment that didn't go through · a grievance · a document that never arrived |

Directory controls, all server-rendered and all working without JS: filter by state · show only *fully online* · show only *no visit required* · sort by fee or by duration. The filter state lives in the URL, so a filtered view is shareable.

**c) The A–Z index — `/services/a-z`.** A flat alphabetical list that deliberately includes **statutory vocabulary as aliases**, each resolving to the plain-language task:

> Hypothecation, termination of → **I've paid off my vehicle loan**
> Form 35 → **I've paid off my vehicle loan**
> Form 29 / Form 30 → **I'm buying or selling a vehicle**
> Reassignment of registration mark → **I'm moving my vehicle to another state**
> Non-transport / NR services → *what this actually means, and where to go*

This is how a person holding a paper form, an SMS, or a clerk's handwritten note finds their way in. It is also how the site becomes findable for the statutory queries the clone sites currently own. **Every statutory term that appears anywhere in Indian road-transport administration gets a row here, even for services Raah has not built** — pointing to an honest "not built in this prototype, here's what it is."

**d) Contextual links.** Every verdict page links to its sibling services, the same service in neighbouring states, and the life event it belongs to. Every application in the Ledger links to the services it depends on. Dead ends are a bug.

### 5.5 Persistent navigation chrome

| Surface | Mobile (≤ 768 px) | Desktop |
|---|---|---|
| Primary nav | Bottom bar, 5 items, always visible: **Home · Services · My Raah · Verify · Help** | Persistent left rail with the same 5, plus the service categories expanded |
| Breadcrumbs | On every page below the top level, truncating from the left, the last two levels always visible | Full trail |
| Back | Browser back always works and never loses form state; an explicit in-page "Back to …" on every flow step | Same |
| State selector | In the header on every page, persistent, remembered — because it changes every answer on the site | Same |
| Language | In the header on every page, including error pages | Same |

The teardown found the current portal has no global search, no breadcrumbs, and no reliable home affordance. All three are structural requirements here, and the breadcrumb is rendered server-side so it exists without JS.

### 5.6 Search — keyword first, AI second

Search is **two layers, and the first layer is complete on its own**:

| Layer | Phase | How it works | Works without JS | Works without AI |
|---|---|---|---|---|
| **1. Keyword + synonym index** | Phase 1 | A static index built at compile time over service names, statutory aliases, life-event phrasings, the A–Z terms and help topics — plus a hand-authored synonym table covering the top ~200 phrasings in English and Hindi (*"loan khatam", "bank ka naam", "NOC", "learning licence", "LL", "fine", "chalan", "challan"*). Server-rendered results page at `/search?q=`. | **Yes** | **Yes** |
| **2. Intent router** | Phase 2 | The model handles free-form sentences, mixed script, code-switching and misspellings that the index misses, and re-ranks. It writes into the *same* results page. | Yes (form POST) | Degrades to layer 1 |

**Rules:**
- The search field is never the only route to anything (§2.2, principle 8).
- An empty search shows the full service directory, not an empty state.
- Zero results is not permitted: the page always falls back to the four categories, the A–Z, and a "tell us what you were looking for" affordance.
- The search field never blocks, never spins without content behind it, and never requires a network round trip to show *something* useful.

### 5.7 What the home page does *not* have

No mega-menu. No carousel. No notices ticker. No "Latest Updates" panel competing with the task. No login wall — the challan lookup, the notice verifier and the whole Capability Matrix are usable signed-out, because the person who most needs them has not signed in.

---

## 6. The Capability Matrix (the spine)

### 6.1 Data model

```ts
type Verdict = "fully_online" | "online_then_visit" | "visit_required" | "not_available";

interface Capability {
  serviceId: string;          // "dl.renewal"
  stateCode: string;          // "MH"
  verdict: Verdict;
  authModes: ("aadhaar_otp" | "aadhaar_biometric" | "digilocker" | "in_person")[];
  fee: { statutory: number; portal: number; late?: LateFeeRule };
  documents: DocumentRequirement[];
  medianDurationDays: [number, number];   // p50 range
  visitCount: 0 | 1 | 2;
  statutoryBasis: string;     // "CMVR Rule 17; MoRTH notification 2021-03-…"
  confidence: "high" | "medium" | "low";
  lastVerified: string;       // ISO date
  notes: string;              // plain language, ≤200 chars
}
```

### 6.2 Product rules

- **Verdict is stated in four words before anything else on the page.** "Fully online." / "Online, then one visit." / "You must visit." / "Not available in your state."
- **`confidence` is shown, never hidden.** A `low`-confidence row renders as *"We're not certain — here's what we know and how to check."* Faking certainty is the failure mode we are fixing; we do not reproduce it.
- **`visitCount` is the headline metric**, because the Mission Mode baseline is 2.43 trips. Every verdict page states the expected number of visits.
- Every verdict page is a **shareable, crawlable URL** — deliberately competing with clone sites for the query "can I renew my DL online in Maharashtra".
- The matrix is **versioned and diffable**. A `lastVerified` older than 90 days downgrades confidence automatically.

### 6.3 Seed coverage for the prototype

8 journeys × 12 states (MH, DL, KA, TN, UP, GJ, WB, TS, KL, RJ, BR, AS) = 96 rows, hand-authored, each with a plausible `statutoryBasis` string and a mix of verdicts so every branch is demoable. All 12 states carry a visible *"synthetic — modelled on published guidance"* tag.

---

## 7. Design system

### 7.1 Identity direction

Raah's visual world is **Indian road infrastructure**, not government stationery: the milestone stone, the signage green and informatory blue, road-marking yellow, the reflective white of a lane line. Calm, high-contrast, no gradients, no ornament. It must read as a *utility that works*, and must be impossible to mistake for a `.gov.in` page.

### 7.2 Tokens

```
--ground        #EDEFF2   cool paper, slight blue bias
--surface       #FFFFFF
--surface-sunk  #E3E7EC
--rule          #C9D0D9
--ink           #0E1116
--ink-2         #4A5260
--ink-3         #767F8C
--accent        #1B4FA0   signage blue — actions, links, focus
--accent-soft   #DBE5F5
--marking       #E4B429   road-marking yellow — attention, never a button
--ok            #17694A   fully online
--warn          #A2601A   online then visit
--stop          #9C2B2B   visit required / error
--info          #2C5D77
```

Dark theme redefines every token; nothing is defined only inside a media query. Both themes are audited to WCAG 2.1 AA (4.5:1 body, 3:1 large text and UI boundaries) before ship.

**Verdict colour is semantic and consistent everywhere** — green/amber/red for the three verdicts, never reused for anything else, and never carried by colour alone (each verdict has an icon and a word).

### 7.3 Type

| Role | Face | Fallback | Use |
|---|---|---|---|
| Display | Familjen Grotesk 600/700 | `system-ui, "Segoe UI", Roboto` | Page titles, verdicts, numbers |
| Body | Public Sans 400/500/600 | `system-ui, Roboto, "Noto Sans"` | Everything read |
| Indic | Noto Sans Devanagari / Tamil / Telugu / Bengali / Gujarati / Kannada / Malayalam / Gurmukhi / Odia | `sans-serif` | Subset-loaded per active language only |
| Data | DM Mono 400/500 | `ui-monospace, "Roboto Mono"` | Reference numbers, amounts, timestamps |

**Font policy (performance-critical):** `font-display: swap`; fallback stacks are metric-matched with `size-adjust` so swap causes no layout shift; Indic subsets load **only** when that language is active; total font payload ≤ 60 KB for the active language. Latin faces are subset to the Latin-basic range.

### 7.4 Component library — the non-obvious ones

| Component | Contract |
|---|---|
| `VerdictCard` | Verdict word + icon + colour + visit count + fee + duration range + confidence + "how we know". Never renders without `confidence`. |
| `ErrorBlock` | Three required slots: **what happened**, **what it means**, **what to do next**. A build-time lint fails any `ErrorBlock` missing one. Never renders a raw code without a human sentence above it. |
| `SaveState` | Persistent, always-visible: "Saved 3 seconds ago · works offline". Turns amber when unsynced, never silent. |
| `StatutoryDisclosure` | `<details>` reading "The official name for this is *Form 35 — Notice of termination of an agreement of hire-purchase*." Present on every flow with a legal artefact. |
| `MockBadge` | Marks any mocked capability at the point of use, with a tooltip explaining what would happen in production. |
| `AuthLadder` | Renders the auth options available for this service+state as a ranked list with an explicit fallback path, never a single dead end. |
| `Money` | Tabular numerals, ₹ prefix, always with a breakdown affordance. Never shows a total without its components. |
| `LanguageSwitch` | Persists, applies to error strings and AI output, present in the header on every page including error pages. |

### 7.5 Copy standard

- Reading level target: **class 8**, measured. Sentences ≤ 20 words in flows.
- Buttons name the outcome: **Check my licence**, **Pay ₹400 and submit**, **Save and finish later**. Never "Submit", "OK", "Proceed".
- Never apologise; state the fact and the fix.
- Numbers in a sentence get a unit and a scale ("about 15 working days", not "15 days (approx.)").
- Every string is authored in English and Hindi at the same time. A string without a Hindi counterpart fails CI.

---

## 8. Responsive, performance and resilience — NON-NEGOTIABLE

This section is a gate, not an aspiration. **A build that misses these numbers does not ship, regardless of feature completeness.**

### 8.1 Device and network baseline

| | Baseline (must be excellent) | Secondary (must be excellent) |
|---|---|---|
| Viewport | **360 × 640 CSS px** | 1440 × 900, up to 1920 |
| Device | 2 GB RAM Android, Chrome, ~4× CPU throttle | Modern laptop |
| Network | **Throttled 3G: 400 kbps, 400 ms RTT** and Slow 4G | Cable |
| Language | Hindi | English |

Intermediate widths 361–1439 are handled by fluid layout, not a third design.

### 8.2 Performance budgets

| Metric | 3G budget | Slow 4G budget | Desktop |
|---|---|---|---|
| LCP | ≤ 4.0 s | ≤ 2.5 s | ≤ 1.5 s |
| INP | ≤ 200 ms | ≤ 200 ms | ≤ 100 ms |
| CLS | ≤ 0.02 | ≤ 0.02 | ≤ 0.02 |
| First-load JS (route) | **≤ 120 KB gzip** | same | same |
| Total transfer, first view | **≤ 300 KB** | ≤ 400 KB | — |
| Fonts, active language | ≤ 60 KB | ≤ 60 KB | — |
| Images above the fold | **0 raster images** | — | — |
| Lighthouse mobile Performance | **≥ 90** | — | ≥ 95 |
| Lighthouse Accessibility | **100** | — | 100 |

Budgets enforced in CI via Lighthouse CI + `size-limit`. A PR that exceeds a budget fails.

### 8.3 Rendering strategy

- **Server-rendered HTML first.** React Server Components; client JS only where interaction demands it.
- **Every core flow works with JavaScript disabled.** Forms are real `<form>` elements posting to server actions; the Capability Matrix, challan lookup, notice verification and all eight applications are completable without client JS. This is a direct answer to the teardown's finding that the current homepage hard-fails without JS. JS is enhancement: autosave, live validation, slot polling, AI assistance.
- No client-side data fetching for first paint. No layout shift from late-arriving content: skeletons reserve exact height.
- Icons are inline SVG sprites, ≤ 1.5 KB total. No icon font, no icon library.
- No raster images in the core product. Illustrations, where used, are inline SVG under 4 KB.
- Third-party scripts: **zero**. Analytics is a first-party endpoint.

### 8.4 Mobile layout rules

- Single column, 16 px gutters at 360 px, content max-width 34 rem.
- **Primary action is a sticky bottom bar** inside the thumb zone, with the fee and the action verb on it. It never covers the last field.
- Touch targets ≥ 48 × 48 px with ≥ 8 px separation.
- Inputs use correct `inputmode`, `autocomplete`, `enterkeyhint`; numeric fields open the numeric keypad.
- Font size ≥ 16 px on all inputs (prevents iOS zoom); body ≥ 17 px.
- **No horizontal page scroll at any width, ever.** Tables and long reference strings scroll inside their own container.
- One question per screen in the interview steps; a visible "step 3 of 7" with the remaining steps named, not just counted.
- The language switch and the save state are reachable without scrolling on every screen.

### 8.5 Desktop layout rules

Desktop is a genuine second design, not a stretched phone:

- Three-region shell: persistent left task rail (≤ 240 px), content column (max 44 rem for reading, wider for tables), right context rail carrying the Ledger summary, fee breakdown and help for the current step.
- Multi-column forms only where fields are genuinely peers (day/month/year, first/last).
- Keyboard-first: every flow completable without a mouse; `/` focuses search; visible focus rings throughout; a real skip-link.
- Tables get sticky headers, tabular numerals and column sorting.
- Verdict pages get a comparison view — the same service across neighbouring states side by side.

### 8.6 Resilience — "never lose a person's work"

| Rule | Implementation |
|---|---|
| Autosave | Every field change persisted to IndexedDB within 300 ms, keyed by draft ID; synced to server on reconnect. |
| Resume | Any draft resumable from any device via the Ledger; a "continue where you left off" card on `/me`. |
| Offline | Service worker caches the app shell, active drafts, the Capability Matrix for the user's state, and issued documents. Reads work offline; writes queue and replay with idempotency keys. |
| Optimistic UI | Forbidden for anything involving money or legal state. Payments and submissions show real server state only. |
| Timeouts | Every request has a stated timeout and a stated retry, both visible: "Still trying — 12 s. This can take up to a minute on a slow connection." |
| Session | Sessions do not expire mid-form. Expiry warns at 2 minutes with a one-tap extend, and never discards a draft. |
| Idempotency | Every mutation carries a client-generated idempotency key. A double-submit can never double-charge. |
| Low-data mode | A user-toggled and auto-detected (`Save-Data` header) mode: no non-essential SVG, no polling, coarser slot refresh, text-only receipts. |

### 8.7 Test matrix (must pass before submission)

360 px Android Chrome throttled 3G in Hindi · 360 px Android Chrome offline mid-form · 390 px iOS Safari · 768 px iPad portrait · 1440 px desktop Chrome keyboard-only · 1440 px desktop with JS disabled · 1920 px · 200% browser zoom · VoiceOver (iOS) and TalkBack (Android) on J1 and J8 · `prefers-reduced-motion` · forced-colours mode.

---

## 9. The AI layer (Phase 2)

**Requirement from the brief: the prototype must be powered by an OpenAI model, meaningfully.** AI in Raah is not a chatbot bolted to a portal, and it is not the product. It is a layer added **after** a complete, working service exists, and it does only the things that are genuinely hard without a language model.

### 9.0 The contract between the two phases

Every AI feature below is an **upgrade of a Phase 1 feature that already works end to end**. None of them is the only implementation of anything. The table is the acceptance test:

| # | Capability | Phase 1 — ships first, no AI | Phase 2 — what AI adds |
|---|---|---|---|
| 1 | Finding your task | Life-event cards, service directory, A–Z index with statutory aliases, keyword + synonym search (§5.4–5.6) | Free-form sentences in any language and script, code-switching, misspellings, re-ranking |
| 2 | Eligibility | Deterministic rules engine over the Capability Matrix; a fixed question set per service | Asks only the questions still unanswered — 3 questions instead of 15 — and explains the verdict in the person's language |
| 3 | Document checks | Client + server checks on file type, size, dimensions, page count, readability; a visual checklist the citizen ticks against a sample image of a correctly completed form | Vision model reads the document: signature present, bank stamp present, correct form number, matching registration number |
| 4 | Statutory forms | Deterministic field mapping from the interview answers into the form template; the citizen fills the residual free-text fields themselves | Generates the formal phrasing for free-text fields and handles the ambiguous mappings |
| 5 | Errors & notices | Every error string is hand-authored with cause / meaning / next action (§7.4 `ErrorBlock`). Notice authenticity is decided **deterministically** by resolving the reference against the Ledger — this never needed AI and never will | Explains a *pasted* unfamiliar message, and flags linguistic scam markers |
| 6 | Grievances | Structured form with a category picker, auto-attached context, and a fill-in-the-blanks template per failure type | Writes the draft in the person's own words, in English and their language |
| 7 | Language | Hindi and English fully static and reviewed, including every error string and every button | The other ten scheduled languages, glossary-constrained |

**Read row 5 carefully.** Notice authenticity — the anti-scam feature, arguably the highest public-value thing in the product — is *deterministic by design*. Whether a notice is real is a database lookup, not a judgement call. AI only explains. This is the pattern for the whole layer: the model never decides anything a rule can decide.

### 9.0.1 Global guardrails, applied to all seven features

- Every feature runs **server-side only**; no key ever reaches the browser.
- Every feature is **grounded in the synthetic rule corpus** (Capability Matrix + statutory form schemas + a small mock rules corpus). Retrieval first, generation second. A feature that cannot ground an answer returns "I don't know — here's who does", never a guess.
- Every output is **structured** (JSON schema / structured outputs), validated, and rendered by ordinary components. We never render free-form model prose as if it were service state.
- Every output is **editable by the citizen before it is used**, and shows the model name and a confidence.
- **Never** offers legal advice, never asserts an outcome, never fills a statutory field the citizen has not confirmed.
- **The Phase 1 implementation is the fallback**, not a stub written for the occasion. If the API is down, unkeyed, rate-limited, or `AI_ENABLED=false`, the product reverts to the path that shipped first and every journey still completes — with a quiet "AI assistance unavailable" note, never a blocked screen. This is verified in CI, not hoped for.
- **No AI feature may become a gate.** If a model call is in flight, the underlying form is still usable, still submittable, and still navigable. A person may dismiss any AI suggestion and continue.
- Latency budget: ≤ 1.2 s p50 for routing, ≤ 3 s for drafting; streamed where longer. A skeleton never blocks the underlying form — the citizen can always proceed manually.

### 9.1 Task router — "say it however you say it"

**Input:** free text or voice, any Indian language, e.g. *"gaadi ka loan khatam ho gaya, bank ka naam hatana hai"*.
**Output:** `{ serviceId, confidence, clarifyingQuestion?, alternatives[] }`
**Model:** small fast model, structured output, constrained to the known service list.
**Why AI:** the gap between how people describe their situation and the statutory taxonomy is the single largest navigation failure in the teardown. Keyword search cannot cross it; "hypothecation" appears nowhere in how a person speaks.
**Fallback:** synonym/keyword map covering the top 60 phrasings.

### 9.2 Eligibility interview

**Input:** service + state + a short adaptive Q&A (≤ 5 questions, one per screen).
**Output:** `{ verdict, reasons[], documentsNeeded[], estimatedFee, estimatedVisits, blockers[] }`
**Why AI:** it decides *which question to ask next* given what is already known, so a person answers 3 questions instead of 15. The verdict itself comes from the Capability Matrix, not the model — the model only sequences the interview and explains the result in the person's language.

### 9.3 Document pre-flight (vision)

**Input:** an uploaded photo/scan of Form 35, a NOC, an address proof, a photograph, a signature.
**Output:** `{ documentType, checks: [{id, pass, whatToFix}], overallReady: boolean, redactionsApplied }`
**Checks:** is a signature present in the signature block · is a bank stamp present · is the document type what was asked for · is the photo the right dimensions/background · is text legible · does the name string plausibly match the applicant · is it the right form number.
**Why AI:** this is the highest-value single feature in the product. Unsigned Form 35s and wrong documents are a routine rejection cause today, and the rejection arrives weeks after a non-refundable fee. Moving it to the moment of upload is the difference the whole thesis rests on.
**Guardrail:** advisory, never blocking — a citizen can always override with "I've checked, submit anyway", which is recorded. False negatives must not trap anyone.
**Privacy:** images are processed in-request and not retained; the prototype ships with a sample-document set so no real document is ever needed.

### 9.4 Statutory form generation

**Input:** the humane interview answers.
**Output:** a filled, printable Form 1 / 1A / 20 / 29 / 30 / 35 rendered as HTML→PDF, plus a per-field trace showing which answer produced which field.
**Why AI:** it maps colloquial answers onto statutory field semantics and generates the formal language the forms demand. Field mapping where deterministic is deterministic; the model handles the ambiguous residue and the formal phrasing.
**Guardrail:** the citizen sees the filled form field-by-field against their own answers before it is attached. Nothing is submitted unseen.

### 9.5 Notice & error explainer — "what does this mean?"

**Input:** a pasted SMS, an error string, a screenshot, or a challan reference.
**Output:** `{ isAuthentic: "verified" | "not_from_raah" | "cannot_tell", plainMeaning, whatToDoNext, scamIndicators[] }`
**Why AI:** two teardown findings at once. Cryptic strings ("Application number is approved. Slot booking is not allowed", literal "Undefined") become sentences; and fake challan SMS — a documented mass-scale fraud vector, one victim losing ₹6 lakh to a fake mParivahan APK — get a verdict. Authenticity is decided **deterministically** by resolving the reference against the Ledger; the model only explains and flags the linguistic scam markers (urgency, a link, a payment demand without a challan number).
**This is a public, no-login page** at `/verify`, because the person receiving a scam SMS is not logged in.

### 9.6 Grievance & dispute drafter

**Input:** the failed application's context (auto-attached) + the citizen's description of what went wrong, in their language.
**Output:** a formal grievance in English and in the citizen's language, with the correct facts, references, dates and amounts pre-filled, ready to edit and send.
**Why AI:** grievance redress today has ~10% satisfaction and a categorisation the government's own analysis calls "not citizen friendly". Most citizens cannot write the register the system responds to. Raah writes the draft; the citizen owns it.

### 9.7 Live language layer

**Input:** any UI string or AI output + target language (12 scheduled languages at minimum: Hindi, English, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese).
**Output:** translated string, resolved against a **fixed glossary** so statutory terms translate identically everywhere.
**Why AI:** the current estate is English-first with partial Hindi and untranslated jargon. Static translation of 12 languages is out of reach for a hackathon; a glossary-constrained model is not. Core navigation and all error strings are **statically translated and reviewed** for Hindi and English; the model covers the long tail and is cached aggressively per string hash.

---

## 10. Cross-cutting systems

### 10.1 Authentication ladder

There is no single auth. There is a **visible, ranked ladder with a stated fallback at every rung** — the opposite of today's dead end.

| Rung | Method | When offered | If it fails |
|---|---|---|---|
| 1 | Aadhaar OTP (simulated) | Default where the matrix allows | → rung 2, with an explanation of *why* it may have failed |
| 2 | DigiLocker (simulated) | Where documents are already issued | → rung 3 |
| 3 | Existing document + mobile OTP | Where the record's mobile is linked | → rung 4 |
| 4 | Biometric / assisted centre | Where the state requires it | Shows the nearest centre and states plainly: *"This step cannot be done from home in your state."* |

**Product rules:** the ladder is shown **before** the citizen starts, as part of the verdict — never discovered mid-flow. OTP validity is shown **beside the field**, not below the fold. A failed OTP offers resend, a different number path, and the fallback rung — never just "invalid".

**Prototype:** mock login credentials are published on `/about` per the brief. OTP is any 6 digits, with a deliberate "OTP failure" demo toggle.

### 10.2 Payments ledger

The single most damaging experience in the estate is debited-but-pending. Raah's answer:

- Fee is **always** the last step, after every check has passed. Nothing takes money it does not expect to succeed.
- Before payment: a full breakdown — statutory fee, portal fee, tax, total — with the statutory basis for each line.
- Every attempt is a **row in a ledger the citizen can see**: reference, timestamp, amount, method, status, and what happens next.
- A **"Verify this payment"** button that actually re-queries the mock gateway and reconciles, with the result written to the ledger. (CAG found ₹20,122.61 crore — 64% of receipts — collected online with no reconciliation software; this button is the design answer.)
- A **refund path exists and is a first-class flow** with a stated SLA — the module CAG found was never built.
- Every terminal state produces a receipt: on screen, as a PDF, and resolvable at a public URL by reference.
- Chaos toggle: "simulate a debited-but-not-recorded payment" so the recovery journey is demoable in 20 seconds.

### 10.3 The Ledger (`/me`)

One page, three sections, no tabs on mobile:

1. **Needs you** — applications with an action required, dues, expiring documents. Each with a named next action and a deadline.
2. **In progress** — every application with a real status, a timeline of what happened and what is next, and a stated expected date range.
3. **Done & documents** — issued documents, receipts, closed matters.

Rules: no status reads "Pending" without a reason and an expected date. Every item has a "Something's wrong here" affordance that opens grievance-in-context, pre-filled. The app-side wallet is explicitly a **cache**, never the source of truth — a direct response to mParivahan reviews reporting saved vehicles and documents vanishing.

### 10.4 Notices & authenticity

Every notice Raah sends (in-app, email, simulated SMS) contains a reference of the form `RAAH-<year>-<8 chars>` resolvable at `/verify/<ref>` — publicly, without login, showing what the notice was, when it was sent and what it asks for. Notices **never** contain a payment link. The verification page states this rule explicitly so the rule itself becomes the tell. `/verify` also accepts pasted text (§9.5).

### 10.5 Grievance in context

Raised from inside the thing that failed, never from a separate menu. Auto-attaches application ID, payment reference, timestamps, error codes, device and network conditions. Routed by the system, not by the citizen guessing a category. Shows an SLA clock and an automatic escalation step. Every grievance appears in the Ledger with a status.

### 10.6 Record correction

A first-class flow: *"Something on my record is wrong."* Pick the record, pick the field, state what it should be, attach evidence, track the correction. Today this leads to an RTO counter or an RTI request. Assume records **are** wrong — the CAG audit found ~95% of scanned legacy records never ported, 52,474 vehicles registered at two or more RTOs, registration dates recorded as year 0417.

---

## 11. The eight journeys

Each journey below gives: entry, screens, the AI touchpoints, the failure states that must be demoable, and what is mocked.

### J1 — "Can I do this online?"

**Entry:** home page, search, or a shared verdict URL.
**Screens:** (1) What do you need to do? → free text or task card. (2) Where? → state, with geolocation offer and last-used default; never a bare dropdown of 36 items — search-as-you-type with the 12 seeded states surfaced. (3) Up to 3 adaptive questions (Aadhaar-linked mobile? age band? document already issued?). (4) **Verdict.**

**The verdict page — the most important screen in the product:**

```
FULLY ONLINE                                   [green]
You can finish this from your phone.

0 visits to the RTO
₹400 total  (₹200 statutory + ₹200 portal)   [breakdown]
Usually 3–7 working days
You'll need: Aadhaar with a linked mobile · a photo · address proof

How you'll prove who you are:
  1. Aadhaar OTP                    available
  2. DigiLocker                     available
  If both fail: nearest assisted centre, 2.1 km

How we know: MoRTH contactless notification (2021) · CMVR Rule 17
Confidence: high · last verified 12 Aug 2026        [synthetic data]

           [ Start — takes about 12 minutes ]
```

For `visit_required`, the same page instead names what must be done in person, why, what to bring, and the nearest office with hours — the honest answer, delivered *before* payment.

**AI:** §9.1 router, §9.2 interview. **Mocked:** the matrix itself. **Failure states to demo:** low-confidence verdict; service not available in state; conflicting state rule.

### J2 — Learner's licence

**Entry:** "I want to start driving."
**Flow:** verdict → identity (auth ladder) → *interview* (name/DOB/address/blood group/declarations, one question per screen, plain language) → document upload with **live pre-flight** → review, including the generated **Form 1** shown field-by-field against the answers → **fee last** → slot booking for the LL test → test → result → digital licence in the Ledger and vault.

**Slot booking is designed as a booking product, not an error string.** Shows real availability across the 5 nearest RTOs with distances, next release time ("new slots open daily at 06:00"), a waitlist with cancellation notification, and — when full — capacity information in words: *"All slots at Andheri are taken for the next 14 days. Malad has 6 tomorrow, 9 km away."* Never "Service is not enabled in this RTO."

**AI:** §9.2, §9.3, §9.4. **Failure states to demo:** OTP not delivered → ladder fallback; unsigned/blurry document caught at upload; payment debited-not-recorded → verify → reconcile; all slots exhausted → waitlist.

### J3 — Driving licence renewal

**Entry:** "My licence is expiring" — and proactively, from the Ledger, 60/30/7 days before expiry.
**Flow:** verdict (branches on age ≥ 40 → Form 1A medical certificate required, and on expiry > 1 year → test required) → identity → confirm existing details, correct any that are wrong (feeds record-correction) → Form 1A upload with pre-flight where applicable → review → fee → status → issued.
**The point:** the branch logic is stated **up front** in the verdict — "You're 43, so you'll need a doctor's certificate (Form 1A). Here's what it looks like and who can sign it." Today this is discovered late.
**AI:** §9.2, §9.3, §9.4.

### J4 — Change of address on a driving licence

**Entry:** "I've moved house."
**Flow:** verdict → identity → new address (with pincode → district/state autofill and an explicit "is your new address in a different state?" branch, because that changes everything) → proof upload + pre-flight → review + generated form → fee → status.
**This is the flow that proves fully-online is real.** Zero visits, one screen of typing, four minutes. It is the demo's emotional payoff.

### J5 — Change of address on an RC

Same life event, second record. **Entered from the same card as J4**, which asks: *"Which records should we update? [✓] Driving licence [✓] Vehicle KA-01-XX-0000 [ ] Vehicle MH-12-XX-0000"* — then runs both as **one combined flow with one payment and two tracked applications** in the Ledger.

This is the single clearest demonstration of the Ledger's value: today these are two unrelated applications in two sub-systems, each requiring the address to be re-entered. Where a vehicle is in a different state from the licence, Raah says so and splits the verdict honestly.

### J6 — "I've paid off my vehicle loan" (hypothecation termination)

**Entry:** plain language only. The word "hypothecation" appears once, inside `StatutoryDisclosure`.
**Flow:** verdict — including the honest *"this is not activated online in your state"* branch, which the current portal has no page for → identity → pick the vehicle → **the critical step: upload the bank's NOC and Form 35, with pre-flight checking specifically for (a) a signature in the block, (b) a bank stamp, (c) the authorised signatory line, (d) the right form number, (e) matching registration number** → review + a plain-language summary of what will change on the RC → fee → status with an explicit note that the physical RC and the online record may diverge for a few days, and what to do if a buyer asks.

**Why this journey is in scope:** it is the teardown's cleanest illustration of every thesis at once — vocabulary failure, invisible state variation, and post-payment rejection for a missing signature that no software ever looked for.

### J7 — Buying or selling a vehicle (transfer of ownership)

**Entry:** "I'm selling my vehicle" or "I'm buying one" — the flow knows which side you are on.
**Flow:** verdict → identity → **dues check first**: pending challans, tax, hypothecation, fitness, NOC-if-interstate, each with a clear "clear this first" action linking into J8 or the relevant flow. Nothing else proceeds until dues are visible → seller files the notice (Form 29) → a **hand-off**: the buyer receives a verifiable notice and completes their side (Form 30) → both parties see one shared timeline → fee → status.
**The design idea:** a two-sided transaction gets a **shared application** both parties can see, rather than two people each guessing at the other's progress. Includes an explicit "the other party hasn't acted in 7 days" nudge and an abandonment path.

### J8 — Challans: find, verify, pay or dispute

**Entry:** public, no login, from the home page and from `/verify`. Also the destination for anyone who received an SMS.

**Three sub-flows:**

1. **Find** — by vehicle, licence or challan number. Results show what happened, where, when, the amount, the evidence photo (synthetic), and the deadline. Plain language: *"Your vehicle was recorded at 68 km/h in a 50 km/h zone on Linking Road, 3 August, 10:42."*
2. **Verify** — *"Is this message real?"* Paste the SMS. Deterministic reference resolution + §9.5 scam-marker analysis → a clear verdict, the scam indicators found, and what to do. Given fake challan sites that demand payment without ever asking for a challan number, and police advisories across states, this page is arguably the highest-public-value thing in the prototype.
3. **Pay or dispute** — payment through the ledger with a receipt; or dispute, with the AI drafter (§9.6), a stated ~15 working-day SLA, a visible clock, evidence upload, and escalation. The dispute is a Ledger item, not an email into a void.

**Also demoed:** the consequence surface — *"1 unpaid challan. In your state, 5 unpaid challans can suspend your licence. This is a state rule; here's the one that applies to you."* — because the teardown found these rules are routinely reported as national when they are not.

---

## 12. Mock backend

### 12.1 Stated posture

This is a **prototype with a simulated backend**, and it says so in-product. But it is a *serious* simulation: real HTTP contracts, real state machines, real persistence, real failure modes. Because the brief judges "holistic approach addressing backend and processes", the mock backend is a deliverable, not a shim.

### 12.2 Architecture

```
Next.js 15 (App Router) — Vercel
├── app/                      RSC pages, server actions (no-JS path)
├── app/api/                  Route handlers — the mock backend
│   ├── capability/           Capability Matrix queries
│   ├── applications/         Create, advance, read, timeline
│   ├── payments/             Intent, confirm, verify, refund
│   ├── documents/            Upload, pre-flight, vault
│   ├── challans/             Lookup, pay, dispute
│   ├── notices/              Issue, resolve, verify
│   ├── slots/                Availability, hold, book, waitlist
│   ├── grievances/           Raise, track, escalate
│   └── ai/                   Router, interview, preflight, form, explain, draft, translate
├── lib/mock-ministry/        The simulation
│   ├── seed/                 Deterministic synthetic fixtures
│   ├── state-machines/       Per-service lifecycle definitions
│   ├── chaos/                Injectable failure modes
│   └── clock/                Time acceleration for demos
└── data/                     capability-matrix.json, forms/, rules/, glossary/
```

**The `AI_ENABLED` flag.** A single environment flag gates the entire `app/api/ai/` surface and every AI affordance in the UI. With it off, the app is the complete Phase 1 product: no model calls, no API key needed, no degraded screens, no empty panels where an AI widget would be. CI runs the full test matrix in both states. The flag is also exposed on `/about` so a judge can toggle it and see for themselves that the service stands up without AI.

**Persistence:** Vercel KV or SQLite/Turso, keyed by a synthetic citizen ID. Deterministic seed so every demo run is identical. A **"Reset demo"** control on `/about`.

**Time acceleration:** a demo clock that can advance days in seconds, so a "3–7 working day" application can be shown resolving inside a 2-minute video. Visibly labelled.

### 12.3 Core entities

```ts
Citizen        { id, name, dob, mobile, aadhaarLast4(synthetic), addresses[], language, preferredState }
Licence        { id, citizenId, number(synthetic), classes[], issued, expires, status, holds[] }
Vehicle        { id, ownerId, regNumber(synthetic), make, model, fuel, registered,
                 hypothecation: { lenderName, status } | null, taxPaidTo, fitnessTo, insuranceTo }
Application    { id, citizenId, serviceId, stateCode, status, steps[], draft, documents[],
                 payments[], form, timeline[], expectedRange, nextAction, createdAt }
Payment        { id, applicationId, amount, breakdown[], method, status, gatewayRef,
                 idempotencyKey, attempts[], reconciledAt, refund? }
Document       { id, ownerId, type, uri, preflight: PreflightResult, issued?, expires? }
Challan        { id, number(synthetic), vehicleId?, licenceId?, offence, location, at,
                 amount, evidenceUri, status, dispute? }
Notice         { id, ref: "RAAH-2026-XXXXXXXX", channel, subject, body, issuedAt, resolvesTo }
Slot           { id, rtoId, service, startsAt, capacity, booked, releaseAt }
Grievance      { id, subjectRef, category, body, sla, status, escalations[], raisedAt }
CapabilityRow  { see §6.1 }
```

### 12.4 Application state machine

```
draft → eligibility_checked → identity_verified → documents_uploaded
      → preflight_passed → reviewed → payment_pending → payment_confirmed
      → submitted → under_review → [ approved | needs_correction | rejected ]
      → [ slot_pending → slot_booked → test_taken ] (J2 only)
      → issued → closed
```

Rules encoded in the machine, not in UI code:
- `payment_pending` is **unreachable** unless `preflight_passed`. Fee is structurally last.
- `needs_correction` **must** carry a field-level reason and a resume link; it can never be a bare status.
- Any transition failure writes a timeline entry the citizen can read.
- `payment_confirmed` without `submitted` within 60 s triggers auto-reconciliation and a visible ledger note.

### 12.5 API contracts (representative)

```http
GET  /api/capability?serviceId=dl.renewal&state=MH&age=43&aadhaarLinked=true
200  { verdict, visits, fee{}, documents[], authLadder[], durationDays[], confidence,
       statutoryBasis, lastVerified, notes }

POST /api/applications            { serviceId, stateCode }             → { id, status:"draft" }
PATCH /api/applications/:id       { draft:{...} }  (autosave, idempotent)
POST /api/applications/:id/advance { to:"reviewed" }                   → 200 | 409 {blockedBy[]}
GET  /api/applications/:id/timeline

POST /api/documents/preflight     multipart{file, expectedType, applicationId}
200  { documentType, checks:[{id,label,pass,whatToFix}], overallReady, confidence, model }

POST /api/payments/intent         { applicationId }                    → { paymentId, breakdown[] }
POST /api/payments/:id/confirm    { method, idempotencyKey }           → { status }
POST /api/payments/:id/verify                                          → { status, reconciled, ledgerEntry }
POST /api/payments/:id/refund     { reason }                           → { refundId, sla }

GET  /api/challans?vehicle=SYN-01-XX-0001
POST /api/challans/:id/dispute    { grounds, evidence[] }              → { grievanceId, sla }
POST /api/notices/verify          { ref } | { text }                   → { authentic, explanation, indicators[] }

GET  /api/slots?rto=&service=&from=&to=
POST /api/slots/:id/hold          (120 s hold)  → POST /api/slots/:id/book

POST /api/ai/route                { text, lang }   → { serviceId, confidence, alternatives[] }
POST /api/ai/explain              { text|ref }     → { authentic, plainMeaning, nextAction, indicators[] }
POST /api/ai/draft-grievance      { applicationId, description, lang } → { english, localised, facts[] }
```

Every response carries `{ _mock: true, _seed: "<hash>" }`. Every AI response carries `{ _model, _grounded, _fallbackUsed }`.

### 12.6 Chaos modes (the differentiator)

A control panel at `/about` toggles simulated real-world failures so the **recovery** design is demoable — this is what "holistic approach addressing backend and processes" means in practice:

| Toggle | Simulates | Recovery to demonstrate |
|---|---|---|
| `payment.debited_not_recorded` | Money leaves, status stays pending | Ledger row → **Verify this payment** → reconciled + receipt |
| `otp.undelivered` | OTP never arrives | Auth ladder falls to DigiLocker, with an explanation |
| `slots.exhausted` | No slots for 14 days | Capacity stated in words + waitlist + nearby RTO |
| `service.down` | Upstream 503 during office hours | Queued submission, honest ETA, no lost draft |
| `network.offline` | Connection drops mid-form | Autosave banner, offline queue, replay on reconnect |
| `record.mismatch` | Name on record ≠ name on document | Record-correction flow with evidence upload |
| `ai.unavailable` | No OpenAI key / API error | Deterministic fallback, journey still completes |

---

## 13. Trust & security posture (prototype-appropriate)

- No real PII is accepted. Fields that would take an Aadhaar/PAN accept only synthetic-range values and reject anything with a real check-digit pattern, with an explanatory message.
- Uploaded images are processed in-request, never persisted beyond the session, and the product ships with sample documents so nothing personal is needed for the demo.
- CSP with no third-party origins except the font host; no third-party scripts; no external analytics.
- All AI calls server-side; key in Vercel env; per-IP rate limits on the public `/verify` and `/challan` endpoints.
- Mock login credentials published on `/about` per the brief's requirement.

---

## 14. Accessibility & language

**Target: WCAG 2.1 Level AA, verified — not claimed.** GIGW 3.0 requires it; a 2016 audit found 31 of 957 central portals compliant.

- Semantic HTML first; ARIA only where semantics run out. Every form control has a real `<label>`.
- Keyboard: full operability, logical order, visible focus (3:1 against both adjacent colours), skip links, no traps.
- Screen readers: TalkBack and VoiceOver passes on J1, J4 and J8 before submission. Every async state change announced via a live region — the teardown found missing loaders and status indicators, which is exactly what screen readers depend on.
- Contrast: 4.5:1 body, 3:1 large text and UI boundaries, in **both** themes. Verdicts never carry meaning by colour alone.
- Zoom: usable at 200% and at 320 px equivalent width with no loss of content or function.
- Motion: everything behind `prefers-reduced-motion`.
- **No CAPTCHA anywhere.** Rate limiting and server-side checks instead. Legacy CAPTCHAs are a documented barrier across the current estate.
- Language: 12 scheduled languages; Hindi and English fully static and reviewed, including every error string; the rest via the glossary-constrained layer (§9.7). The language switch is in the header on every page, persists, and applies to AI output.
- Plain language: class-8 reading level, measured in CI on the top 200 strings.
- Assisted mode: an explicit flow where a helper completes a form with the citizen present, recorded as assisted — because ~70% of applicants historically used an agent, and pretending otherwise designs for a person who does not exist.

---

## 15. Success metrics

Lagging satisfaction scores are gameable. These are the measures that would prove the redesign worked, carried over from the teardown and instrumented in the prototype's own analytics:

| Metric | Baseline today | Target | Instrumented as |
|---|---|---|---|
| **Trips to the RTO per completed transaction** | 2.43 (Mission Mode) | ≤ 1.0 across the eight journeys; 0 for J4/J5 | Sum of `visitCount` on completed applications |
| Rejection after payment | Routine | **0** — structurally impossible | `payment_pending` requires `preflight_passed` |
| Time from debit to confirmed status | Days, sometimes never | ≤ 60 s, or an explicit reconciliation path | Ledger timestamps |
| Applications completed without an intermediary | ~30% | > 80% in usability testing | Assisted-mode flag |
| Task success, low-end Android, 3G, non-English | Unmeasured | ≥ 90% on J1, J4, J8 | Moderated test, 6 users |
| Time to an honest answer ("can I do this?") | Unbounded — discovered by failure | **< 60 seconds** | J1 funnel |
| First-session start on the official domain | Polluted by clones | n/a for a prototype; measured as `/verify` resolution rate | Notice verification events |

---

## 16. Demo & submission plan

### 16.1 The 2-minute video (brief: minute one = citizen experience, minute two = build choices)

**0:00–0:12** — Cold open on the problem, one sentence over a 360 px phone frame: *"To find out whether you can renew your licence online, the current system makes you pick a state, guess a legal term, pay a fee, and wait three weeks to be rejected."*
**0:12–0:35** — J1 on a throttled 3G phone in Hindi, **reached by tapping, not typing**: home → "I've paid off my vehicle loan" → state → two questions → verdict in under 20 seconds: fully online, 0 visits, ₹X, these documents. Then a two-second cut showing the same destination reached three other ways — the service directory, the A–Z index under "Hypothecation", and by typing a sentence — to make the point that nothing here is gated behind a search box.
**0:35–0:55** — J6 pre-flight: upload a Form 35 with no bank stamp. Caught in 2 seconds, before payment, with what to fix. *This is the money shot.*
**0:55–1:05** — Chaos toggle: payment debited, not recorded. Ledger → Verify → reconciled + receipt.
**1:05–1:15** — `/verify`: paste a fake challan SMS → "This did not come from Raah", with the reasons.
**1:15–2:00** — Build choices: the Capability Matrix as the artefact that doesn't exist; fee-structurally-last in the state machine; server-rendered, works with JS off and at 360 px on 3G. Then the phase argument, on screen: **toggle `AI_ENABLED` off and complete a whole journey anyway** — because a public service that stops working when a model call fails is not a public service. Close on where OpenAI does real work, where it deliberately doesn't, and a plain list of what is mocked.

### 16.2 The 250-word summary — outline

The one problem (truth before payment) · the four primitives · the eight journeys · the performance and accessibility stance · what AI does · what is mocked · the disclosure.

### 16.3 Mapping to the judging criteria

| Criterion | Where it is answered |
|---|---|
| Problem relevance & importance | §1, §15 baselines — 25.7M visits/month, 2.43 trips, ₹20,122 cr unreconciled |
| Functional completeness of the journey | §11 — eight journeys, each end-to-end including failure and recovery |
| Usability improvement over existing | §5 IA, §6 verdict, §7 copy standard, §8 performance, §14 accessibility |
| Thoughtful product design decisions | §2.2 principles, §12.4 fee-last state machine, §10.1 auth ladder |
| Holistic — backend and processes | §12 mock backend, state machines, reconciliation, refund path, chaos modes, §10.5 grievance routing |
| Transparent disclosure of limitations | §0, §17, `MockBadge` at point of use, `/about` |

---

## 17. Limitations — stated plainly

1. **The Capability Matrix is synthetic.** 96 hand-authored rows modelled on published guidance, not scraped from live systems. The real artefact would need state-by-state verification; building it is a recommendation, not a claim.
2. **No live government integration.** No Vahan, Sarathi, eChallan, DigiLocker, UIDAI or payment-gateway connection. All identifiers are synthetic.
3. **Authentication is simulated.** No real Aadhaar e-KYC, no real OTP.
4. **Payments are simulated.** No money moves. The gateway is a state machine.
5. **Document pre-flight is advisory and imperfect.** A vision model can miss a signature or flag a valid document. It is never blocking, and the citizen can always override.
6. **Language coverage is uneven.** Hindi and English are static and reviewed; the other ten are model-translated against a glossary and would need native review.
7. **No user research was conducted.** The journey maps derive from a desk-research teardown, not observed sessions. The teardown itself flags this. Five real journeys in two states should be walked before anything here is treated as validated.
8. **The trade/dealer console is not built.** Splitting it out is a recommendation; the recommendation is untested.
9. **Legal accuracy is not warranted.** Statutory citations are illustrative. Generated forms have no legal effect.

---

## 18. Build plan — product first, AI second

Two phases, five days. **Phase 1 is a complete product.** Phase 2 is additive and can be dropped entirely without breaking anything.

### 18.1 Phase gate

At the end of Day 4 the app is **deployed, publicly reachable, and passes the whole §8.7 test matrix with `AI_ENABLED=false`.** That build is tagged `v1-no-ai` and is a valid submission on its own. Only then does Phase 2 begin. If Phase 2 runs long, `v1-no-ai` ships.

### 18.2 Phase 1 — the working service (Days 1–4, zero AI)

| Day | Milestone | Definition of done |
|---|---|---|
| **1** | Foundation & navigation shell | Next.js 15 + TS + Tailwind; token layer, both themes, type and font strategy; `ErrorBlock`, `VerdictCard`, `SaveState`, `MockBadge`, `Money`, `AuthLadder`; the **full navigation chrome** — bottom bar, left rail, breadcrumbs, persistent state and language selectors; Lighthouse CI + `size-limit` budgets wired and green. |
| **2** | Capability Matrix, browse, J1 | 96-row matrix authored; `/api/capability`; **`/services` directory with filters, `/services/a-z` with statutory aliases**; keyword + synonym search index and `/search`; `/check` flow and the verdict page in all four states; shareable verdict URLs. **J1 and all browse routes complete with JavaScript disabled.** |
| **3** | Backend, Ledger, J4 + J5 | Mock ministry: entities, deterministic seed, state machines, chaos harness, demo clock; applications / payments / documents / notices / slots APIs; the Ledger; payment ledger with verify and refund; J4 and J5 end to end including the combined two-record flow. |
| **4** | The remaining journeys — **product complete** | J2 (incl. slots + waitlist), J3, J6 (deterministic document checks + the visual checklist), J7 (two-sided), J8 (find / verify / dispute — authenticity is deterministic, so this ships fully in Phase 1); grievance-in-context; record-correction; Hindi pass on every string. **Deploy. Tag `v1-no-ai`. Run the full test matrix.** |

### 18.3 Phase 2 — the AI layer (Day 5, morning)

Added in this order, each behind `AI_ENABLED` and each leaving its Phase 1 path intact. Stop wherever the clock runs out.

| Order | Feature | Why this order |
|---|---|---|
| 1 | **Document pre-flight (vision)** — §9.3 | Highest citizen value in the product and the strongest demo moment. Upgrades the Day-4 checklist. |
| 2 | **Task router** — §9.1 | Re-ranks the existing search results page. Cheap, visible, low risk. |
| 3 | **Notice & error explainer** — §9.5 | Layers explanation onto the already-working deterministic verifier. |
| 4 | **Grievance drafter** — §9.6 | Fills the existing form's free-text field. Self-contained. |
| 5 | **Adaptive eligibility interview** — §9.2 | Touches a working flow, so it carries the most regression risk. Later. |
| 6 | **Statutory form phrasing** — §9.4 | Only the residual free-text fields; mapping is already deterministic. |
| 7 | **Live language layer** — §9.7 | Ten additional languages. First to be cut. |

### 18.4 Day 5, afternoon — hardening and submission

Accessibility sweep (axe + TalkBack + VoiceOver on J1, J4, J8) · the §8.7 test matrix run **twice, once with `AI_ENABLED=true` and once false** · budgets green in both · `/about` with mock credentials, the chaos panel, the AI toggle, reset, and the limitations list · deploy · record the video · write the 250 words.

### 18.5 The resubmission window

The brief runs a Stage 2 mentorship week for the top 250 with a resubmission on **7 September**. That window — not the 28 August deadline — is where the remaining AI features, the extra languages, and real usability testing on a low-end device belong. Do not trade Phase 1 completeness for Phase 2 depth before the first deadline.

### 18.6 Sequencing rules for the implementation agent

1. **Build the state machine and the API contracts before any screen in a journey.** Every screen is a thin renderer over the machine; the thesis — fee last, pre-flight required, no lost work — lives in the machine, not the UI.
2. **Build navigation before flows.** A journey that cannot be reached by tapping is not done.
3. **No `app/api/ai/` code before Day 5.** If a Phase 1 feature feels like it needs a model, it has been scoped wrong — narrow it until a rule can do it.
4. **Every commit keeps `AI_ENABLED=false` green.** This is enforced in CI, not by discipline.
5. **Every new route is added to the service directory, the A–Z index and the search index in the same commit.** An orphan route fails review.

## 19. Open questions

1. Is the name Raah final, or does it need a mark and a wordmark before the video?
2. Solo or team of two — the brief allows a partner email.
3. Which OpenAI model tier for the vision pre-flight, given cost across a public demo, and does the public `/verify` endpoint need a hard daily cap?
4. Should the assisted-mode flow ship in v1, or be shown as a designed-but-unbuilt screen?
5. Is a Hindi voice input worth a day, given that it would materially help the Ramesh persona?
