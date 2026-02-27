# Feature Landscape

**Domain:** AI-Powered Website Builder (Flux)
**Researched:** 2024-10-24

## Table Stakes

Features users expect in any modern website builder.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Multi-step Intake | Guided onboarding, data collection. | Low | Core of the experience. |
| Responsive Design | Mobile-first is non-negotiable. | Low/Med | Handled by Tailwind + AI. |
| SEO Optimization | Meta tags, OpenGraph, fast performance. | Low | Handled by Next.js and AI metadata generation. |
| Asset Upload (Logo) | Basic personalization. | Low | Integration with Cloudinary or S3. |
| Domain Management | Essential for a professional site. | Med/High | Critical for handover (A records, CNAME). |

## Differentiators

Features that set Flux apart from competitors (like Wix ADI or Squarespace).

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| 48-72h Turnaround | Unmatched speed for high-quality custom sites. | High | Requires robust AI pipeline. |
| AI-Driven Customization | Not just templates; content and layouts generated from inspiration. | High | Deep prompt engineering. |
| Clean Code Access | Unlike "no-code" builders, users can get the full source. | Med | Vercel deployments + optional GitHub repo. |
| Staging Review Link | Early feedback on the AI-generated build. | Low/Med | Using Vercel subdomains (e.g., project-uuid.vercel.app). |
| Interactive "Launch Guide" | Eases the friction of DNS management for non-tech users. | Med | Personalized based on the client's registrar. |

## Anti-Features

Features to explicitly NOT build (in the MVP).

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Visual Drag-and-Drop | High complexity, competes with Wix/Webflow. | Use AI for all updates based on text prompts. |
| Built-in Domain Registrar | Huge legal/infra overhead. | Use Vercel's existing infrastructure + DNS instructions. |
| Complex E-commerce | Payment gateways, inventory management is hard for MVP. | Start with "Service-based" or "Lead-gen" (Contact Forms). |
| CMS Dashboard (Admin) | High maintenance for a 48h build. | Provide "Instructions for code-based edits" or "AI-update" service. |

## Feature Dependencies

```
Intake Form (Data) → AI Generator (Code)
AI Generator (Code) → Vercel Deployment (Staging URL)
Vercel Deployment → Client Approval (Approval Hook)
Client Approval → Launch Guide (Handover)
```

## MVP Recommendation

Prioritize:
1.  **Guided Intake Form:** With logo upload and "Inspiration" links.
2.  **Core AI Pipeline:** Component-based Next.js generator (Hero, Services, About, Footer).
3.  **Vercel Auto-Deploy:** Programmatic project creation and staging deployment.
4.  **Launch Guide:** Simple page with DNS record instructions.

Defer:
-   Multi-page blog (Start with single-page landing or 2-3 static pages).
-   Custom fonts (Use Google Fonts/Tailwind defaults first).
-   Advanced animations (Keep it clean and fast first).

## Sources
- [PRD.md](PRD.md)
- [Competitor analysis (Wix ADI, Durable, 10Web)](https://www.google.com/search?q=best+ai+website+builders+2024)
