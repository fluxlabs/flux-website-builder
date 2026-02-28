# Research: Milestone 2 Refinement

## Admin Dashboard (Logs & Clients)
- **Essential Features:**
  - Searchable audit trails ("Who did what").
  - System error logs with stack traces.
  - Client "360 view" (Status, Intake data, Staging URL).
  - Manual controls for the AI pipeline (Retry, Pause).
- **Tech Recommendation:** Use a dedicated `logs` table in Supabase for audit/activity logs.

## Onboarding Wizard
- **Conversion Patterns:**
  - Segmentation: Ask "What are you building?" early.
  - Visual Feedback: Style selectors should use cards/previews.
  - Momentum: Use progress bars and smooth transitions.
  - "Magic" Moment: The generation loading screen should be highly visual to build anticipation.
- **Tech Recommendation:** React state-driven multi-step component with CSS transitions.

## Marketing (Pricing & Trust)
- **Pricing Strategy:**
  - 3-tier model (Starter/Pro/Agency) is industry standard.
  - "Free to try/Draft" lowers barrier.
  - Highlight "Time to Value" (48-72h).
- **Social Proof:**
  - Testimonials should focus on speed and ease of use.
  - Use "Built with Flux" badges/links.
- **SEO:**
  - Target keywords: "AI Website Builder", "Fast Website Design", "Small Business Website 48 hours".
