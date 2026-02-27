# Technology Stack

**Project:** Flux Website Builder
**Researched:** 2024-10-24

## Recommended Stack

### Core Framework (Client Facing & Builder)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 14/15 (App Router) | Main Platform & Generated Sites | Industry standard, optimized for Vercel, excellent DX. |
| TypeScript | Latest | Type Safety | Crucial for managing complex AI-generated code structures. |
| Tailwind CSS | 3.x | Styling | Utility-first, easy for AI to generate and manipulate. |

### AI Infrastructure
| Technology | Purpose | Why |
|------------|---------|-----|
| OpenAI API (GPT-4o) | Code Generation | High reliability, excellent at structured JSON and React code. |
| Anthropic API (Claude 3.5 Sonnet) | Alternative/Back-up | Exceptional at complex coding tasks and following long instructions. |
| LangChain | Orchestration | Useful for chaining prompts (Plan -> Component -> Layout). |

### Backend & Database
| Technology | Purpose | Why |
|------------|---------|-----|
| Node.js (Vercel Functions) | API & Backend | Serverless, scales automatically, matches the frontend stack. |
| Prisma | ORM | Type-safe database access. |
| Supabase (PostgreSQL) | Database | Quick setup, built-in Auth, and great for rapid prototyping. |

### Deployment & Infrastructure
| Technology | Purpose | Why |
|------------|---------|-----|
| Vercel API | Project & Deployment Automation | Programmatic control over the entire hosting lifecycle. |
| GitHub API | Repository Management | Programmatically create repos for client sites (optional but recommended). |
| Cloudinary | Asset Storage | Robust API for image manipulation and hosting (logos, assets). |

### Supporting Libraries
| Library | Purpose | When to Use |
|---------|---------|-------------|
| React Hook Form | Intake Form | Managing the multi-step intake process efficiently. |
| Zod | Schema Validation | Validating intake data and AI-generated JSON. |
| Resend | Email Notifications | Sending "Staging Ready" and "Launch Guide" emails. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Code Gen | GPT-4o / Claude 3.5 | Fine-tuned Llama 3 | High overhead for hosting and fine-tuning; frontier models are better at general React. |
| Database | Supabase | MongoDB | Relational data (Clients -> Projects -> Deployments) is better suited for SQL. |
| Deployment | Vercel | Netlify | Vercel has a more mature API for programmatic project management and "Next.js-first" features. |

## Installation

```bash
# Initialize Platform
npx create-next-app@latest flux-platform --typescript --tailwind --eslint

# AI & API Dependencies
npm install openai @langchain/openai @vercel/sdk zod resend

# Database
npm install @prisma/client supabase
npm install -D prisma
```

## Sources
- [Vercel API Documentation](https://vercel.com/docs/rest-api)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
