# Flux Website Builder — Master Feature Plan
# Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>
# Created: 2026-02-28

## Overview

This plan covers all identified bugs, missing features, and improvements organized into 7 phases.
Each phase builds on the previous one. Estimated scope is provided per task.

---

## Phase 1: Bug Fixes & Quick Wins (Foundation)
> Priority: CRITICAL — Fix broken/incomplete features before adding new ones

### 1.1 Fix Mobile Navigation
- **File:** `src/components/Navbar/Navbar.tsx` (marketing site navbar)
- **Problem:** Hamburger `<Menu>` icon has no `onClick` handler, no mobile drawer
- **Solution:** Add MUI `<Drawer>` component with nav links, toggle on hamburger click
- **Scope:** Small (~50 lines)

### 1.2 Fix Contact Form Backend
- **File:** `src/app/contact/page.tsx`, new `src/app/api/contact/route.ts`
- **Problem:** `handleSubmit` uses `setTimeout` to fake success. No data sent anywhere.
- **Solution:** Create `/api/contact` POST route that sends email via Resend to `jeremy@fluxlabs.net` with form data (name, email, subject, message). Update the contact page to call this API.
- **Scope:** Small (~80 lines total)

### 1.3 Add Intake Form Save & Resume
- **File:** `src/app/intake/page.tsx`
- **Problem:** If user navigates away mid-form, all progress is lost
- **Solution:** Save `formData` + `currentStep` to `localStorage` on every step change. On mount, check for saved data and offer to resume. Add a "Start Fresh" button to clear saved state.
- **Scope:** Small (~40 lines)

### 1.4 Add manifest.log to .gitignore & Remove from Tracking
- **File:** `.gitignore`
- **Problem:** 1.6MB `manifest.log` committed to repo
- **Solution:** Add `manifest.log` to `.gitignore`, run `git rm --cached manifest.log`
- **Scope:** Trivial

### 1.5 Add Rate Limiting to /api/intake
- **File:** `src/app/api/intake/route.ts`
- **Problem:** No rate limiting — endpoint can be spammed
- **Solution:** Implement simple in-memory rate limiter (Map of IP → timestamp[]) with 5 requests per 15 minutes. No new dependency needed — use a simple Map + cleanup interval.
- **Scope:** Small (~40 lines)

### 1.6 Fix .env.example — Add Missing Cloudinary Vars
- **File:** `.env.example`
- **Problem:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` missing
- **Solution:** Add them to the file
- **Scope:** Trivial

### 1.7 Fix staging_url Missing from Migration SQL
- **File:** `supabase_migrations.sql`
- **Problem:** `staging_url` column used everywhere but not in schema file
- **Solution:** Add `staging_url text` to the intakes table definition, plus `deploy_hook text` and `build_time_ms bigint` which are also missing
- **Scope:** Trivial

### 1.8 Fix "Design" Synthesis Mode Stub
- **Files:** `generator/engine.ts`, `generator/synthesize.ts`
- **Problem:** "Rethink Design" does same thing as "Research Content"
- **Solution:** In `engine.ts`, create a separate `generateDesignData()` function that takes the existing intake data + any previous research and focuses the Gemini prompt specifically on visual layout, color palette alternatives, section ordering, and typography. In `synthesize.ts`, route the `design` mode to call this function then rebuild the site scaffold without re-running research.
- **Scope:** Medium (~100 lines)

### 1.9 Wire Up Unused Intake Fields
- **Files:** `generator/engine.ts`
- **Problem:** `employee_count`, `rebuildLogo`, `logoQuality` collected but never passed to AI
- **Solution:** Include `employee_count` in the Gemini prompt context (helps AI tailor content for business size). Log `rebuildLogo` flag for future use.
- **Scope:** Small (~15 lines)

---

## Phase 2: Security & API Hardening
> Priority: HIGH — Fix security gaps before adding payment/auth features

### 2.1 Secure Admin API Routes
- **Files:** `src/app/api/admin/intakes/route.ts`, `src/app/api/admin/logs/route.ts`, `src/app/api/admin/synthesize/route.ts`, `src/app/api/admin/seed/route.ts`, `src/app/api/admin/resend-email/route.ts`
- **Problem:** Admin API routes use `supabaseAdmin` with no authentication check. Anyone who knows the endpoint URL can call them.
- **Solution:** Create `src/lib/auth.ts` helper that extracts the Supabase session from request cookies, validates it, and confirms the user is an admin. Apply this check at the top of every `/api/admin/*` route. Return 401/403 if not authenticated.
- **Scope:** Medium (~120 lines total)

### 2.2 Secure the Review Page
- **File:** `src/app/review/[id]/page.tsx`
- **Problem:** Anyone with an intake ID can view and approve a build. The page fetches ALL intakes then filters client-side.
- **Solution:**
  - Add a `review_token` column to `intakes` (UUID, generated on creation)
  - Review page URL becomes `/review/[id]?token=[review_token]`
  - Create a dedicated `/api/review/[id]` route that validates the token before returning intake data
  - The approve action also requires the token
- **Scope:** Medium (~100 lines)

### 2.3 Server-Side Intake Validation
- **File:** `src/app/api/intake/route.ts`
- **Problem:** Minimal input validation on the intake API
- **Solution:** Validate: email format (regex), phone format, required fields (name, email, businessName, goal, pages), max lengths, sanitize HTML from text fields. Return 400 with specific error messages.
- **Scope:** Small (~60 lines)

### 2.4 Add Next.js Middleware for Route Protection
- **File:** New `src/middleware.ts`
- **Problem:** No middleware for route protection
- **Solution:** Create middleware that:
  - Protects `/admin/*` routes (except `/admin/login`) — redirects to login if no Supabase session
  - Protects `/api/admin/*` routes — returns 401 if no session
  - Adds security headers (X-Frame-Options, CSP, etc.)
- **Scope:** Medium (~80 lines)

---

## Phase 3: Payments & Client Portal
> Priority: HIGH — Revenue generation

### 3.1 Stripe Integration — Checkout Flow
- **New files:** `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/lib/stripe.ts`
- **Dependencies:** `stripe` npm package
- **Database:** Add columns to `intakes`: `stripe_session_id text`, `stripe_payment_status text`, `plan_name text`, `plan_price integer`
- **Solution:**
  - Create 3 Stripe Products/Prices matching the pricing page tiers ($1,499 / $2,999 / $4,999)
  - Modify intake form: after step 9 review, redirect to Stripe Checkout (not direct submit)
  - Stripe Checkout success URL → `/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}` which creates the intake and redirects to `/status/[id]`
  - Webhook handler at `/api/stripe/webhook` for `checkout.session.completed` — updates payment status
  - Don't start synthesis until payment is confirmed
- **Scope:** Large (~300 lines)
- **Env vars:** `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

### 3.2 Client Portal — Authentication
- **New files:** `src/app/portal/login/page.tsx`, `src/app/portal/page.tsx`, `src/app/portal/project/[id]/page.tsx`, `src/app/api/portal/auth/route.ts`
- **Solution:**
  - Use Supabase Auth magic links (passwordless) for client login — email-based, no password to remember
  - When an intake is submitted, create a Supabase Auth user for the client email (if not exists)
  - Client portal at `/portal` shows all their projects with status, staging URL, and actions
  - Individual project page at `/portal/project/[id]` shows build details, timeline, and action buttons
  - Middleware protects `/portal/*` routes
- **Scope:** Large (~400 lines)

### 3.3 Client Portal — Project Dashboard
- **Files:** `src/app/portal/page.tsx`, `src/app/portal/project/[id]/page.tsx`
- **Solution:**
  - Project list showing: business name, status badge, created date, staging URL (if ready)
  - Project detail page showing: build status timeline, intake summary, staging preview iframe
  - Move review/approve functionality into the portal (replaces the standalone `/review/[id]` page)
  - Show real build progress (same step tracker as `/status/[id]` but within the portal layout)
- **Scope:** Large (~350 lines)

---

## Phase 4: Revision System & Domain Management
> Priority: HIGH — Core product completion

### 4.1 Revision Request System
- **Database:** New `revisions` table:
  ```sql
  id uuid PK
  intake_id uuid FK -> intakes.id
  created_at timestamptz
  round integer (1, 2, 3...)
  status text (pending / in_progress / completed)
  notes text (client's feedback)
  changes_made text (what was changed - filled by admin/AI)
  ```
- **New files:** `src/app/api/portal/revisions/route.ts`, revision UI in portal project page
- **Solution:**
  - After reviewing staging site, client can click "Request Changes" instead of (or in addition to) "Approve"
  - Opens a form: textarea for feedback, optional screenshot upload (Cloudinary), category tags (Content, Design, Layout, Colors, Images)
  - Revision shows up in admin dashboard as a new status: `revision_requested`
  - Admin can view revision notes in the drawer, then trigger a targeted rebuild
  - Track revision rounds (max 2 for Starter, 3 for Business, unlimited for Enterprise)
  - After final approval, proceed to launch flow
- **Scope:** Large (~400 lines)

### 4.2 Domain Connection Wizard
- **New files:** `src/app/portal/project/[id]/domain/page.tsx`, `src/app/api/portal/domain/route.ts`
- **Database:** Add `custom_domain text` to `intakes`
- **Solution:**
  - After approval, show "Connect Your Domain" wizard in the portal
  - Step 1: Enter desired domain (e.g., `mybusiness.com`)
  - Step 2: Show DNS records to add (CNAME → `cname.vercel-dns.com` or A records)
  - Step 3: Use Vercel API to add the domain to the project, check verification status
  - Step 4: Poll for DNS propagation, show green check when verified
  - Auto-assign SSL (Vercel handles this)
  - Store `custom_domain` in intake record
- **Scope:** Medium (~250 lines)

### 4.3 Multiple Revision Rounds Tracking
- **Files:** Admin dashboard drawer, portal project page
- **Solution:**
  - Show revision history timeline in both admin and portal views
  - Each round shows: date, client notes, what was changed, status
  - Visual indicator of remaining revisions based on plan tier
  - Email notification to client when revision is complete
- **Scope:** Medium (~150 lines)

---

## Phase 5: Pipeline Quality & Automation
> Priority: MEDIUM — Improve generated site quality and operational efficiency

### 5.1 SEO Meta Generation in AI Pipeline
- **Files:** `generator/engine.ts`, `generator/build.ts`
- **Solution:**
  - Add to Gemini prompt: generate `metaTitle`, `metaDescription`, `ogImage` prompt for each page
  - In `build.ts`: inject `<Head>` / `metadata` export in each generated page with the AI-provided SEO data
  - Generate a `metadata` object in each page's `layout.tsx` or page file using Next.js App Router metadata API
- **Scope:** Medium (~100 lines)

### 5.2 Sitemap & Robots.txt Generation
- **Files:** `generator/build.ts`
- **Solution:**
  - Generate `src/app/sitemap.ts` in the built site that exports a sitemap function listing all pages
  - Generate `src/app/robots.ts` with standard allow-all + sitemap reference
  - Use the whitelabel domain for the sitemap URLs
- **Scope:** Small (~50 lines)

### 5.3 Automated Lighthouse Scoring
- **Files:** New `generator/lighthouse.ts`, `generator/synthesize.ts`
- **Dependencies:** `chrome-launcher`, `lighthouse` (or use PageSpeed Insights API — no dependency needed)
- **Database:** Add `lighthouse_score jsonb` to `intakes`
- **Solution:**
  - After deployment + DNS propagation, call Google PageSpeed Insights API with the staging URL
  - Store scores (performance, accessibility, best practices, SEO) in intake record
  - Replace hardcoded "100/100" on review page with real scores
  - Show scores in admin dashboard and client portal
- **Scope:** Medium (~120 lines)

### 5.4 Automated Accessibility Check
- **Files:** New `generator/accessibility.ts`, `generator/synthesize.ts`
- **Solution:**
  - Use PageSpeed Insights API (already called for Lighthouse) — extract accessibility score
  - Or use `axe-core` + Puppeteer to run accessibility audit on staging URL
  - Log any critical issues (missing alt text, contrast issues, missing labels)
  - Include a11y summary in the review page and admin dashboard
- **Scope:** Medium (~100 lines)

### 5.5 Build Pipeline Error Recovery
- **Files:** `generator/synthesize.ts`, admin dashboard
- **Problem:** If a build fails mid-deploy, the only option is to re-run the entire pipeline
- **Solution:**
  - Break the pipeline into checkpoints: `ai_complete`, `build_complete`, `deploy_complete`
  - Store checkpoint state in `system_logs` metadata
  - Add admin buttons: "Retry from Build", "Retry from Deploy" that skip already-completed stages
  - Worker checks for checkpoint state before starting
- **Scope:** Medium (~150 lines)

### 5.6 Build Queue Visibility
- **Files:** Admin dashboard, `generator/worker.ts`
- **Database:** Add `queue_position integer` or use system_logs
- **Solution:**
  - Worker logs queue state changes to `system_logs`
  - Admin dashboard shows: current build (with progress), queued items (with position), estimated wait
  - Status page shows queue position to client if waiting
- **Scope:** Medium (~100 lines)

### 5.7 Fix Seed Template — Missing @mui/material-nextjs Dependency
- **File:** `generator/templates/seed-nextjs/package.json`
- **Problem:** `build.ts` injects `@mui/material-nextjs/v15-appRouter` import but the package isn't in seed dependencies
- **Solution:** Add `@mui/material-nextjs` to the seed template's `package.json`
- **Scope:** Trivial

---

## Phase 6: Growth Features
> Priority: MEDIUM — Marketing, engagement, and upsell

### 6.1 Real Blog with MDX
- **New files:** `src/app/blog/[slug]/page.tsx`, `src/content/blog/*.mdx` (or Supabase-backed)
- **Dependencies:** `next-mdx-remote` or `@next/mdx`
- **Solution:**
  - Option A (Simple): MDX files in `/src/content/blog/` with frontmatter (title, date, excerpt, image)
  - Option B (Scalable): Blog posts stored in Supabase `blog_posts` table with rich text
  - Blog listing page reads posts, renders cards with excerpt
  - Blog detail page renders full MDX content
  - Add meta tags for SEO on each post
- **Scope:** Medium (~200 lines)

### 6.2 Notification System (Slack/Discord)
- **New file:** `src/lib/notifications.ts`
- **Solution:**
  - Create a central `notify()` function that sends to multiple channels
  - Slack webhook: POST to configured webhook URL with formatted message
  - Discord webhook: POST to configured webhook URL
  - Triggered on: new intake, build complete, build failed, client approved, revision requested
  - Configure via env vars: `SLACK_WEBHOOK_URL`, `DISCORD_WEBHOOK_URL`
- **Scope:** Small (~80 lines)

### 6.3 Template Selection in Intake
- **Files:** `src/app/intake/page.tsx`
- **Solution:**
  - Add a new step (between current step 4 and 5) showing the 6 template demos as selectable cards
  - Each card shows a screenshot preview and template name
  - Selection is optional — "Skip" to let AI decide
  - Pass selected template to `engine.ts` as a style reference in the Gemini prompt
  - Store `template_preference text` in intakes
- **Scope:** Medium (~100 lines)

### 6.4 A/B Hero Variant Generation
- **Files:** `generator/engine.ts`, review page
- **Solution:**
  - In the Gemini prompt, request 2 hero variants (different headline, CTA, layout approach)
  - Store both in `siteData.pages[0].heroVariants[]`
  - On the review page, show a toggle: "Hero A" / "Hero B" with side-by-side preview
  - Client picks their preferred variant before approving
  - Admin can also pick in the dashboard
- **Scope:** Medium (~150 lines)

### 6.5 Email Sequence Automation
- **New file:** `src/lib/email-sequences.ts`, new Supabase table or cron job
- **Solution:**
  - Define sequences:
    - 48h after staging_ready + no review → "Don't forget to review your site" nudge
    - 7 days after go-live → "How's your new site? Here are tips to get more traffic"
    - 30 days after go-live → "Ready for an upgrade? Add SEO, blog, or e-commerce"
  - Implementation: Vercel Cron Job (via `vercel.json` cron config) that runs daily
  - Checks intake dates/statuses, sends appropriate emails via Resend
  - Track sent emails in a `sent_emails` table to avoid duplicates
- **Scope:** Medium (~200 lines)

### 6.6 Referral System
- **Database:** New `referrals` table: `id, referrer_intake_id, referee_intake_id, code text, discount_percent integer, status text (pending/used/expired), created_at`
- **New files:** `src/app/api/referral/route.ts`, referral section in portal
- **Solution:**
  - After a client goes live, generate a unique referral code
  - Show in client portal: "Share your code for 10% off for your friend + 10% credit for you"
  - Intake form accepts optional `referralCode` field
  - Apply discount in Stripe checkout
- **Scope:** Medium (~200 lines)

### 6.7 Client Analytics Dashboard
- **New file:** `src/app/portal/project/[id]/analytics/page.tsx`
- **Solution:**
  - Use Vercel Analytics API (`/v1/analytics`) to pull page views, visitors, top pages for the client's project
  - Display in portal: line chart (last 30 days), top pages, visitor count
  - Requires Vercel Analytics to be enabled on generated projects (add to deploy step)
  - Alternatively: embed a simple analytics snippet (Plausible/Umami) in generated sites
- **Scope:** Medium (~200 lines)

### 6.8 Multi-Language Site Generation
- **Files:** `generator/engine.ts`, intake form
- **Solution:**
  - Add language selection to intake form (English, Spanish, French, etc.)
  - Pass language to Gemini prompt: "Generate all content in [language]"
  - Store `language text` in intakes
  - For bilingual: generate `/en/` and `/es/` route groups with a language switcher component
- **Scope:** Medium (~100 lines for single language, ~250 for bilingual)

---

## Phase 7: Content Management & Advanced Features
> Priority: LOWER — Nice-to-haves and differentiators

### 7.1 CMS-Lite for Generated Sites
- **Solution — Option A (Supabase-backed):**
  - Store generated page content in a `site_content` Supabase table
  - Generated sites fetch content from Supabase at build time (SSG) or runtime (SSR)
  - Client portal includes a simple WYSIWYG editor (TipTap or similar) for text/image editing
  - "Save" triggers a Vercel redeploy via the deploy hook
  - **Scope:** Very Large (~600+ lines, significant architecture change)

- **Solution — Option B (Git-based):**
  - Store editable content in JSON/MDX files in the generated repo
  - Client portal has a form-based editor that commits changes via GitHub API
  - Deploy hook triggers auto-rebuild
  - **Scope:** Large (~400 lines)

### 7.2 Portfolio of Real Builds
- **Files:** `src/components/Portfolio/Portfolio.tsx` or similar
- **Solution:**
  - Query live intakes (status: "live") from Supabase
  - Use a screenshot service (Vercel OG, Puppeteer, or screenshotone.com API) to capture live site thumbnails
  - Display as a grid on the marketing site
  - Client opt-in: add `show_in_portfolio boolean` to intakes (default false), client can toggle in portal
- **Scope:** Medium (~150 lines)

### 7.3 Real Testimonials System
- **Database:** New `testimonials` table: `id, intake_id, client_name, client_role, quote, rating, approved boolean`
- **Solution:**
  - After go-live + 14 days, send automated email asking for a testimonial
  - Simple form at `/testimonial/[intake_id]` for the client to submit
  - Admin approves in dashboard
  - Marketing site pulls approved testimonials from Supabase instead of hardcoded data
- **Scope:** Medium (~200 lines)

---

## Implementation Order (Recommended)

```
Phase 1 (Bug Fixes)          ████████░░  ~2 days
Phase 2 (Security)            ████████░░  ~2 days
Phase 3 (Payments & Portal)   ████████████████░░  ~4-5 days
Phase 4 (Revisions & Domains) ████████████░░  ~3-4 days
Phase 5 (Pipeline Quality)    ████████████░░  ~3-4 days
Phase 6 (Growth Features)     ████████████████████░░  ~5-6 days
Phase 7 (CMS & Advanced)      ████████████░░  ~3-4 days
```

## New Dependencies to Add

| Package | Phase | Purpose |
|---|---|---|
| `stripe` | 3 | Payment processing |
| `next-mdx-remote` | 6 | Blog content |
| — | — | All other features use existing deps |

## New Environment Variables

| Variable | Phase | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | 3 | Stripe server key |
| `STRIPE_PUBLISHABLE_KEY` | 3 | Stripe client key |
| `STRIPE_WEBHOOK_SECRET` | 3 | Stripe webhook verification |
| `SLACK_WEBHOOK_URL` | 6 | Slack notifications (optional) |
| `DISCORD_WEBHOOK_URL` | 6 | Discord notifications (optional) |

## New Database Tables

| Table | Phase | Purpose |
|---|---|---|
| `revisions` | 4 | Track revision requests and rounds |
| `sent_emails` | 6 | Prevent duplicate automated emails |
| `referrals` | 6 | Referral code tracking |
| `testimonials` | 7 | Client testimonials |
| `site_content` | 7 | CMS content storage (if Option A) |
| `blog_posts` | 6 | Blog content (if Supabase-backed) |

## New Columns on `intakes`

| Column | Phase | Purpose |
|---|---|---|
| `staging_url text` | 1 | Already exists in DB, just missing from migration |
| `deploy_hook text` | 1 | Already exists in DB, just missing from migration |
| `build_time_ms bigint` | 1 | Already exists in DB, just missing from migration |
| `review_token uuid` | 2 | Secure review page access |
| `stripe_session_id text` | 3 | Stripe checkout reference |
| `stripe_payment_status text` | 3 | Payment state tracking |
| `plan_name text` | 3 | Selected pricing tier |
| `plan_price integer` | 3 | Price paid (cents) |
| `custom_domain text` | 4 | Client's custom domain |
| `lighthouse_score jsonb` | 5 | Performance scores |
| `template_preference text` | 6 | Selected template style |
| `language text` | 6 | Content language |
| `show_in_portfolio boolean` | 7 | Portfolio opt-in |
