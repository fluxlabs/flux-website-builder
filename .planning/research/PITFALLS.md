# Domain Pitfalls

**Domain:** AI-Powered Website Builder (Flux)
**Researched:** 2024-10-24

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Broken AI-Generated Code
**What goes wrong:** The LLM generates invalid JSX, misses closing tags, or hallucinates Tailwind classes.
**Why it happens:** LLMs are probabilistic; complex layouts or long prompts increase error rates.
**Consequences:** The Vercel deployment fails, and the 48-72 hour promise is broken.
**Prevention:** Use structured output (JSON schema) and a local validation step (e.g., `tsc --noEmit` or ESLint) before triggering the Vercel API.
**Detection:** Vercel API returns a build failure; monitoring tools alert the team.

### Pitfall 2: API Rate Limits (OpenAI/Vercel)
**What goes wrong:** The system stops generating or deploying sites during peak intake times.
**Why it happens:** Exceeding standard tier limits on OpenAI (Tokens/RPM) or Vercel (Project creation/Deployments).
**Consequences:** Backlog of client requests, missed deadlines.
**Prevention:** Implement a queuing system (e.g., BullMQ or serverless queues) to manage load and respect API limits. Upgrade to appropriate API tiers.
**Detection:** High rate of 429 (Too Many Requests) errors in the logs.

## Moderate Pitfalls

### Pitfall 1: Poor Image/Asset Handling
**What goes wrong:** Client logos are distorted, too large, or don't match the AI-generated color scheme.
**Prevention:** Use a service like Cloudinary to automatically crop, resize, and optimize images. Extract dominant colors from the logo to feed into the AI prompt.

### Pitfall 2: Client DNS Misconfiguration
**What goes wrong:** Clients don't know how to update their GoDaddy/Namecheap records, so the site never goes "live."
**Prevention:** Create highly visual, step-by-step instructions for the top 5 registrars in the "Launch Guide." Provide an automated way to verify DNS propagation via the Vercel API.

## Minor Pitfalls

### Pitfall 1: Generic/Repetitive Designs
**What goes wrong:** All generated sites look exactly the same.
**Prevention:** Ensure the "Inspiration Links" from the intake form are properly analyzed (using a scraping tool or vision model) to influence the generated design. Maintain a diverse library of base templates.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1: Intake UI | Form abandonment. | Keep it simple, progress bars, save-and-continue. |
| Phase 2: AI Pipeline | Unreliable JSON output. | Use OpenAI's `response_format: { type: "json_object" }` or strict function calling. |
| Phase 3: Vercel Deploy | Direct API upload complexity. | Start by programmatically creating a GitHub repo, then link Vercel to it. It's more stable than raw file uploads. |
| Phase 4: DNS Handover | Support requests. | Build a robust FAQ and automated DNS checking tool in the client dashboard. |

## Sources
- [Vercel Deployment Limits](https://vercel.com/docs/limits)
- [OpenAI Rate Limits](https://platform.openai.com/docs/guides/rate-limits)
- [Common React/Next.js Errors](https://nextjs.org/docs/messages)
