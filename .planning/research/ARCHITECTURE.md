# Architecture Patterns

**Domain:** Flux Website Builder (AI-Powered)
**Researched:** 2024-10-24

## Recommended Architecture

A modern, serverless, events-driven architecture for rapid generation and deployment.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Platform UI** | Marketing site and Intake form (Next.js/React). | API Gateway, Database. |
| **Orchestrator** | Coordinates the intake, AI, and Vercel steps. | OpenAI/Claude, Vercel API, DB. |
| **AI Builder** | Generates the Next.js/Tailwind code snippets. | Orchestrator, LLM APIs. |
| **Vercel Adapter** | Handles project creation and deployment. | Vercel API, Orchestrator. |
| **Data Store** | Stores intake data, project status, and links. | Orchestrator, Platform UI. |

### Data Flow

1.  **Submission:** Client submits intake form via **Platform UI**.
2.  **Storage:** Intake data and assets are stored in **Postgres (Supabase)** and **Cloudinary**.
3.  **Prompting:** **Orchestrator** constructs multiple LLM prompts (Metadata, Layout, Components).
4.  **Generation:** **AI Builder** generates the code for each component and the main layout.
5.  **Assembly:** **Orchestrator** assembles the files into a local directory structure.
6.  **Deployment:** **Vercel Adapter** calls `POST /v13/deployments` to create a project and push files.
7.  **Notification:** **Orchestrator** triggers a "Staging Ready" email with the Vercel link.

## Patterns to Follow

### Pattern 1: Component-Based Code Generation
**What:** Instead of generating one large file, generate a `config.json` and individual components.
**When:** To handle complex layouts without hitting LLM token limits or causing "broken" code.
**Example:**
```typescript
// AI-generated Component Config
{
  "name": "Hero",
  "props": {
    "headline": "Empowering Small Businesses",
    "cta": "Get Started",
    "bgColor": "bg-blue-600"
  }
}
```

### Pattern 2: Multi-Pass Generation (Strategy Pattern)
**What:** Pass 1: Architecture (Define pages, layout). Pass 2: Component logic. Pass 3: Styling and Content.
**Why:** Improves reliability and coherence of the generated site.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Monolithic Prompting
**What:** Asking the AI to "Build me a whole website in one prompt."
**Why bad:** High failure rate, truncated output, "lazy" coding, and difficulty in debugging.
**Instead:** Use a pipeline of smaller, specific prompts.

### Anti-Pattern 2: No-Validation Deployment
**What:** Directly pushing AI code to Vercel without checks.
**Why bad:** Broken JSX or syntax errors will cause build failures on Vercel, frustrating the client.
**Instead:** Run a `next build` or `tsc` locally (or in a serverless function) before triggering Vercel.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---------|--------------|--------------|-------------|
| AI Costs | Manageable. | High (use caching/templates). | Specialized fine-tuned models. |
| Vercel Projects | Within limits. | Enterprise tier needed. | Custom infrastructure or self-hosting. |
| Build Speed | 5-10 mins. | Queueing system required. | Distributed build agents. |

## Sources
- [Vercel API Docs](https://vercel.com/docs/rest-api)
- [LangChain Architecture](https://python.langchain.com/docs/concepts/)
- [Modern SaaS Architecture Patterns (Next.js)](https://nextjs.org/docs/app/building-your-application/routing)
