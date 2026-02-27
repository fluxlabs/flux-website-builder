# Research Summary: Flux Website Builder

**Domain:** AI-Powered Website Builder
**Researched:** 2024-10-24
**Overall confidence:** HIGH

## Executive Summary

The Flux Website Builder project is technically feasible in 2024 using a combination of frontier LLMs (GPT-4o/Claude 3.5), Next.js, and the Vercel API. The core challenge is not the code generation itself, but the orchestration of reliable, error-free builds and the automated handover process (DNS/Deployments). 

The research indicates that the most stable path for "Autonomous Deployment" is to programmatically create a GitHub repository for each client, push the AI-generated code there, and link it to a Vercel project via their API. This provides the client with a long-term asset (the source code) while leveraging Vercel's robust hosting and DNS management features.

## Key Findings

**Stack:** Next.js (App Router), Tailwind CSS, OpenAI GPT-4o/Claude 3.5, Vercel API, and Supabase (Postgres).
**Architecture:** Serverless events-driven architecture with an Orchestrator service managing the transition from Intake → AI Generation → Vercel Deployment.
**Critical pitfall:** AI-generated JSX can contain subtle syntax or Tailwind class errors that break the Vercel build. A local validation/compilation step is mandatory.

## Implications for Roadmap

Based on research, suggested phase structure:

1.  **Phase 1: Foundation & Intake (1-2 Weeks)** - Build the marketing landing page and multi-step intake form.
    - Addresses: Data collection (colors, goals, assets).
    - Avoids: Scope creep by sticking to a predefined form structure.

2.  **Phase 2: AI Generation Pipeline (2-3 Weeks)** - Develop the core AI Builder Agent using a component-based prompting strategy.
    - Addresses: Structured code generation, JSON schema validation.
    - Avoids: Pitfall 1 (Broken AI Code) via local TypeScript validation.

3.  **Phase 3: Vercel Automation (1-2 Weeks)** - Integrate the Vercel and GitHub APIs to automate project creation and staging deployments.
    - Addresses: Scaling the service and delivering the staging link.
    - Avoids: Manual deployment overhead.

4.  **Phase 4: Approval & Handover (1 Week)** - Build the client dashboard for approval and the interactive "Launch Guide."
    - Addresses: Domain management, DNS record instructions, and SSL provisioning.
    - Avoids: High volume of support requests during Go-Live.

**Phase ordering rationale:**
The intake form (Phase 1) is the source of truth for all subsequent steps. The AI Pipeline (Phase 2) is the most complex technical hurdle and must be solved before automation (Phase 3). Handover (Phase 4) is the final piece to close the loop on a successful client delivery.

**Research flags for phases:**
- Phase 2: Likely needs deeper research on specific prompt engineering techniques for "Inspiration Link" analysis (e.g., using a vision model or scraper).
- Phase 3: Requires careful management of Vercel/GitHub API tokens and permissions.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Standards like Next.js/Tailwind/OpenAI are well-documented and stable. |
| Features | HIGH | Table stakes are clear; differentiators (speed) are technically achievable. |
| Architecture | MEDIUM/HIGH | Pattern is sound, but orchestration of multi-pass AI generation is iterative. |
| Pitfalls | HIGH | Most pitfalls are related to API limits or code reliability, which are addressable. |

## Gaps to Address

- **Vision Integration:** How to accurately translate "Inspiration Links" or screenshots into design variables for the AI.
- **Client Ownership:** Deciding whether the client gets access to the GitHub repo or just the Vercel dashboard for simple updates.
- **Content Generation:** Automated generation of SEO-optimized copy (Home, About, Services) based on the intake form.
