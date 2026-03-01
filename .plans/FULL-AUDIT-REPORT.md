# Flux Website Builder — Full Audit Report
# Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>
# Scanned: 2026-02-28
# Agents used: project-scanner, dead-code-cleaner, frontend-developer, backend-architect, performance-engineer

---

## CRITICAL Issues (Fix Before Handling Real Customer Data)

### SEC-1: All Admin API Routes Are Completely Unauthenticated
**Files:** All 5 routes under `src/app/api/admin/`
- Anyone on the internet can call `GET /api/admin/intakes` and dump your entire client database (names, emails, phones, business data)
- Anyone can call `DELETE /api/admin/intakes?id=X` and destroy a client's GitHub repo + Vercel project
- Anyone can call `POST /api/admin/resend-email` and trigger emails from your Resend account
- The dashboard login is client-side only — direct API calls bypass it entirely
- **Fix:** Create `src/middleware.ts` protecting `/api/admin/*` and `/admin/*` routes with Supabase session validation

### SEC-2: Review Page Exposes ALL Client Data
**File:** `src/app/review/[id]/page.tsx:20-21`
- Fetches `GET /api/admin/intakes` (the full client list), then `.find()` by ID client-side
- Every customer who opens their review link can see all other customers' data in DevTools
- Any customer can approve any other project
- **Fix:** Create a dedicated `/api/review/[id]` route with a `review_token` for access control

### SEC-3: Public Log Endpoint Bypasses RLS
**File:** `src/app/api/admin/logs/route.ts:12-13`
- Uses `supabaseAdmin` (service role key, bypasses all RLS) when `intakeId` is provided
- Called from the public status page — any caller with a UUID can read internal system logs
- **Fix:** Create a separate `/api/status/[id]/logs` public route that returns only safe log data

### SEC-4: No Input Validation on Intake POST
**File:** `src/app/api/intake/route.ts:9-16`
- No email format validation, no field length limits, no sanitization
- A bad actor could submit `email: "<script>..."` which gets stored and rendered in admin HTML emails
- **Fix:** Add zod schema validation for all fields

### SEC-5: PATCH /api/admin/intakes Accepts Arbitrary Status Values
**File:** `src/app/api/admin/intakes/route.ts:35-49`
- `status` from request body written directly to DB with zero validation
- **Fix:** Validate against allowlist: `['new', 'ai_generating', 'client_review', 'approved', 'live', 'archived']`

### SEC-6: File Upload Has No Type/Size Validation
**File:** `src/app/api/upload/route.ts`
- No file type whitelist (accepts any file type)
- No file size limit
- **Fix:** Validate MIME type (image/png, image/jpeg, image/svg+xml, image/webp) and enforce 10MB max

### BUG-1: Wrong Supabase Client in Error Handler — Intakes Get Stuck
**File:** `generator/synthesize.ts:222`
- Outer catch block uses `supabase` (anon client) instead of `supabaseAdmin`
- In the worker context (no browser session), RLS blocks the update
- Intakes get permanently stuck in `ai_generating` status and never recover
- **Fix:** Change `supabase` to `supabaseAdmin` on line 222

### BUG-2: No Temp Directory Cleanup — Disk Fills Up
**File:** `generator/synthesize.ts`
- Build directory at `/tmp/flux-synthesis/<intakeId>` (~300-500MB each after npm install) is never deleted
- On a long-running worker, disk fills up
- **Fix:** Add `finally` block: `await fs.remove(buildDir)`

### BUG-3: Worker Queue Has No Deduplication — Duplicate Deploys
**File:** `generator/worker.ts:96-102`
- If Supabase Realtime fires multiple times for the same intake (connection drops/reconnects), same ID queued multiple times
- Creates duplicate GitHub repos and Vercel deployments
- **Fix:** Check `if (!queue.find(item => item.id === id))` before pushing

---

## HIGH Issues (Fix Before Launch)

### PERF-1: Status Page Polls Every 3s Forever — Never Stops
**File:** `src/app/status/[id]/page.tsx:72-76`
- Two sequential API calls every 3 seconds (waterfall pattern)
- Never stops even after build completes (step 5)
- A single visitor generates 40+ HTTP requests/minute to Supabase
- **Fix:** Stop polling when `currentStep === 5`, increase interval to 8s, use `Promise.all` for parallel fetches

### PERF-2: Admin Dashboard Double-Polling
**File:** `src/app/admin/dashboard/page.tsx:102-120`
- Intakes polled every 10s + logs polled every 3s simultaneously
- Logs poll runs even on Analytics tab with no selected intake
- ~46 Supabase reads/minute per admin session
- **Fix:** Only poll logs when a build is actively `ai_generating`

### PERF-3: Portfolio Images — Raw `<img>`, No Optimization
**File:** `src/components/Portfolio/Portfolio.tsx:43-51`
- 4 Unsplash images (~300-500KB each) loaded via `<Box component="img">`
- No lazy loading, no WebP/AVIF, no responsive srcset, no blur placeholder
- ~1.5MB of unoptimized images
- **Fix:** Switch to `next/image` with `fill` and configure `images.remotePatterns` in next.config

### PERF-4: `next.config.mjs` Is Completely Empty
**File:** `next.config.mjs`
- No `images.remotePatterns` (next/image won't work with external images)
- No security headers
- No `poweredByHeader: false`
- **Fix:** Add full config with image domains, security headers, compression

### PERF-5: Admin GET /api/admin/intakes — No Pagination, SELECT *
**File:** `src/app/api/admin/intakes/route.ts:8-12`
- Fetches every column of every non-archived intake with no limit
- At 1000 intakes: ~500KB payload every 10 seconds
- **Fix:** Add column selection (only what UI needs) + `limit(200)`

### PERF-6: Every Component Is "use client" — Including Static Ones
- `Footer.tsx`, `Pricing.tsx`, `Features.tsx`, `Navbar.tsx` all marked `"use client"` but have zero interactivity
- Forces full MUI + framer-motion client bundle on every static marketing page
- ~15 static pages that could be pre-rendered at build time
- **Fix:** Remove `"use client"` from static components, mark pages as `force-static`

### UI-1: Mobile Navigation Is Completely Broken
**File:** `src/components/Navbar/Navbar.tsx:91-93`
- Hamburger `<IconButton>` has no `onClick`, no state, no drawer
- Nav links hidden on mobile (`display: { xs: 'none', md: 'flex' }`)
- Mobile users have literally no way to navigate the site
- **Fix:** Add MUI `<Drawer>` with nav links, toggle on hamburger click

### UI-2: Contact Form Never Sends Data
**File:** `src/app/contact/page.tsx:16-23`
- `handleSubmit` uses `setTimeout` to fake success — no API call, no email sent, no data stored
- **Fix:** Create `/api/contact` POST route that sends via Resend

### UI-3: All Blog "Read Article" Links Point to `href="#"`
**File:** `src/app/blog/page.tsx:90`
- 3 placeholder posts with no `/blog/[slug]` route
- **Fix:** Either build blog detail pages or remove the links

### UI-4: Review Page Breaks on Mobile
**File:** `src/app/review/[id]/review.module.css`
- Sidebar hardcoded at `450px` width — overflows on tablets
- `overflow: hidden` on container kills all scrolling on mobile
- No responsive stacking for iframe + sidebar
- **Fix:** Add responsive breakpoints, stack vertically on mobile

### UI-5: OG Image Does Not Exist
**File:** `src/app/layout.tsx:18,31`
- References `/og-image.jpg` but there's no `public/` directory at all
- All social media shares show no preview image
- **Fix:** Create `public/og-image.jpg` (1200x630)

### UI-6: `alert()` and `confirm()` Used Throughout
**Files:** `src/app/intake/page.tsx:158,161`, `src/app/admin/dashboard/page.tsx` (6 locations)
- Blocking browser dialogs, unstyled, inaccessible
- **Fix:** Replace with MUI `<Snackbar>` toasts and `<Dialog>` confirmations

### PIPE-1: GitHub Token Visible in Process List
**File:** `generator/deploy.ts:47`
- Token embedded in git remote URL, visible in `ps aux` during `execSync`
- **Fix:** Use `GIT_ASKPASS` env var or write to temp `.netrc` file

### PIPE-2: npm install/build Have No Timeout
**File:** `generator/synthesize.ts:80-98`
- `execSync` calls with no timeout — if npm hangs, worker blocks forever
- **Fix:** Add `timeout: 180000` (3 minutes) to `execSync` options

### PIPE-3: Worker Has No Realtime Reconnect Handling
**File:** `generator/worker.ts:29-57`
- No error handler on Supabase Realtime subscription
- Connection drops silently miss new intakes
- **Fix:** Add `.subscribe((status) => { ... })` handler for reconnect

### PIPE-4: AI Output Injected Unsanitized Into Generated JSX
**File:** `generator/build.ts:66,96,101,118`
- `siteData.siteTitle` and content interpolated directly into TSX template literals
- Backticks, `${...}`, or JSX-breaking characters from Gemini break the build
- **Fix:** Sanitize all AI output before interpolation

### DB-1: `staging_url` Column Missing from Migration SQL
**File:** `supabase_migrations.sql`
- Used everywhere in code but not in schema file
- Fresh migration = broken app
- **Fix:** Add `staging_url text`, `deploy_hook text`, `build_time_ms bigint` to schema

### DB-2: Missing Indexes
**File:** `supabase_migrations.sql`
- No index on `intakes.status` (queried by worker and dashboard)
- No index on `intakes.created_at` (used for ordering)
- **Fix:** Add `CREATE INDEX idx_intakes_status ON intakes(status)` and `idx_intakes_created_at`

---

## MEDIUM Issues

### CODE-1: 8 Unused Imports Across Files
- `src/app/api/admin/intakes/route.ts:2` — `supabase` imported but only `supabaseAdmin` used
- `src/app/admin/login/page.tsx:17` — `LogIn` from lucide-react never rendered
- `src/app/admin/dashboard/page.tsx:31-38` — `User`, `Calendar`, `Plus`, `RefreshCcw` from lucide never used; `AnimatePresence` from framer-motion unused; `InputLabel` from MUI unused

### CODE-2: 3 Dead Components — Never Imported Anywhere
- `src/components/ui/BuildConsole.tsx` — defined, exported, zero consumers
- `src/components/ui/InfiniteMarquee.tsx` — same
- `src/components/ui/SpotlightCard.tsx` — same

### CODE-3: `Stack` Import at Bottom of File (2 files)
- `src/app/admin/login/page.tsx:152` — import after `export default`
- `src/app/legal/page.tsx:107` — import after `export default`
- Works due to module hoisting but is invalid placement

### CODE-4: 14+ `any` Type Usages
- `dashboard/page.tsx`: `useState<any[]>`, `useState<any>`, `let interval: any`
- `status/[id]/page.tsx:20`: `useState<any>(null)`
- `review/[id]/page.tsx:13`: `useState<any>(null)`
- `intake/page.tsx:79`: `handleChange(e: any)`
- `generator/worker.ts:73`: `return modeStr as any`
- No shared `Intake` type — each file uses `any` independently

### CODE-5: Cinematic Grain Overlay Copy-Pasted 5 Times
- `status/[id]/page.tsx`, `review/[id]/page.tsx`, `review/[id]/success/page.tsx`, `admin/login/page.tsx`, `intake/page.tsx`
- Extract to `<GrainOverlay />` shared component

### CODE-6: Duplicate `slugify` Function
- Defined in `generator/deploy.ts:65`
- Redefined inline in `src/app/api/admin/intakes/route.ts:69`
- **Fix:** Move to shared `src/lib/utils.ts`

### CODE-7: Duplicate Font Loading
- `Inter` loaded in both `src/app/layout.tsx:6` and `src/components/Providers.tsx:8`
- **Fix:** Load once, export, import in the other

### CODE-8: PII Logged to Production Stdout
- `src/app/api/intake/route.ts:18` — `console.log("Received intake request:", body)` logs full name, email, phone
- `src/app/api/admin/intakes/route.ts:14` — `console.log("Data:", data)` logs full client database
- **Fix:** Remove both

### CODE-9: Error Handling Swallows Failures Silently
- `admin/dashboard/page.tsx:129-130,138-139,151-152` — catch blocks only `console.error`, no user feedback
- `review/[id]/page.tsx:33-47` — approve failure shows nothing to user
- `api/admin/intakes/route.ts:77-95` — Vercel/GitHub delete failures return `{ success: true }`

### UI-7: No Per-Page SEO Metadata
- Every page shares root title "Flux | High-Performance AI Website Builder"
- All pages are `"use client"` so they can't export `metadata` objects
- **Fix:** Use `generateMetadata` or separate metadata into server components

### UI-8: No Accessible ARIA Attributes Anywhere
- Zero `aria-label`, `aria-live`, or `role` attributes in the entire codebase
- Hamburger button, form steps, status page log updates all lack accessibility
- Portfolio images missing `alt` text
- Color picker `<input>` has no label
- Goal cards (`<Card onClick>`) not keyboard navigable

### UI-9: Contrast Issues
- `color: '#444'` text on black backgrounds — fails WCAG contrast ratio
- `WebkitTextFillColor: 'transparent'` with no fallback color (16 occurrences) — text invisible if gradient fails

### UI-10: Missing Validation on Intake Form
- Steps 5, 6, 8 have no validation at all — can skip entirely
- Email field only checks truthiness, not format
- Phone field has no `type="tel"`, no masking, no validation

### PIPE-5: Hardcoded Production URLs in All Emails
- `synthesize.ts`, `intake/route.ts`, `resend-email/route.ts` all hardcode `https://fluxwebs.net/...`
- Dev/staging environments send links pointing to production
- **Fix:** Use `process.env.NEXT_PUBLIC_APP_URL`

### PIPE-6: Admin Email Hardcoded in Source
- `jeremy@fluxlabs.net` hardcoded in `synthesize.ts` and `intake/route.ts`
- **Fix:** Use `process.env.ADMIN_EMAIL`

### PIPE-7: createGitHubRepo Uses User Account But Lookups Use GITHUB_ORG
**File:** `generator/deploy.ts:12-28`
- Repo created under authenticated user's account, but 422 fallback fetches using `GITHUB_ORG`
- Mismatch will 404 if `GITHUB_ORG` differs from authenticated user

### PIPE-8: Logs API Accepts Unbounded `limit` Parameter
**File:** `src/app/api/admin/logs/route.ts:10`
- Caller can pass `limit=1000000` and dump entire logs table
- **Fix:** `Math.min(parseInt(limit), 500)`

### CONF-1: `.env.example` Missing Variables
- Missing: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Should add: `ADMIN_EMAIL`, `NEXT_PUBLIC_APP_URL`, `EMAIL_FROM`, `EMAIL_FROM_SYSTEM`
- `WHITELABEL_DOMAIN=fluxwebs.net` should be a placeholder, not the real value

### CONF-2: `manifest.log` (1.6MB) Tracked in Git
- Already in `.gitignore` as `*.log` but was committed before the rule was added
- **Fix:** `git rm --cached manifest.log`

### CONF-3: `tsconfig.json` Target Mismatch
- `"target": "es5"` but generator uses ESM, top-level await, modern patterns
- **Fix:** Update to `"es2022"` or `"esnext"`

### CONF-4: Seed Template Missing `@mui/material-nextjs` Dependency
**File:** `generator/templates/seed-nextjs/package.json`
- `build.ts` injects `@mui/material-nextjs/v15-appRouter` import but package not in seed deps
- Generated sites will fail to build
- **Fix:** Add to seed `package.json`

---

## LOW Issues

- `VisionPortal` component hidden on mobile with `display: none` but still mounted (wastes CPU)
- `JetBrains Mono` font referenced in `status.module.css` but never loaded via `next/font`
- `backdrop-filter` missing `-webkit-` prefix in CSS modules (Safari < 18)
- `logoMetrics` state in intake form is set but never read or submitted
- `scripts/` directory gitignored — utilities not version controlled
- Blog images use CSS `backgroundImage` — invisible to search crawlers
- Admin pipeline board columns fixed at 320px — unusable on mobile (but admin is desktop-only)

---

## Summary Counts

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Security | 6 | 1 | 1 | — |
| Bugs | 3 | — | — | — |
| Performance | — | 6 | — | 1 |
| UI/UX | — | 6 | 4 | 2 |
| Code Quality | — | — | 9 | 1 |
| Pipeline | — | 4 | 4 | — |
| Database | — | 2 | — | — |
| Config | — | 1 | 3 | — |
| **Total** | **9** | **20** | **21** | **4** |

**Grand total: 54 issues identified across 5 audit agents.**
