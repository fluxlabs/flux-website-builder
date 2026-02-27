# Product Requirements Document (PRD): Flux Website Builder

## 1. Project Overview
Flux Website Builder is a rapid-turnaround service that leverages a specialized AI Agent to autonomously build or rebuild websites for clients within 48-72 hours. The platform serves as both a marketing tool and an intake system to collect design preferences, assets, and requirements from potential clients, which are then fed directly into the AI generation pipeline.

## 2. Target Audience
- Small business owners needing a professional web presence quickly.
- Clients looking to modernize an outdated website.
- Entrepreneurs launching new ventures.

## 3. Core Features

### 3.1 Sales & Marketing Landing Page
- **Value Proposition:** Clear messaging about the 48-72 hour turnaround.
- **Service Tiers/Pricing:** Simple pricing models for new builds vs. rebuilds.
- **Portfolio/Testimonials:** Showcasing previous work (placeholders for now).
- **Call to Action (CTA):** "Start Your Build" leading to the intake form.

### 3.2 Client Intake Form (Multi-step)
- **Step 1: Basic Information**
  - Name, Email, Business Name.
  - Current Website URL (if applicable).
- **Step 2: Design & Aesthetics**
  - Links to 2-3 websites they like (Inspiration).
  - Preferred color palette (Color picker or hex codes).
  - Logo upload (File attachment).
- **Step 3: Content & Goals**
  - Primary goal of the site (e.g., Lead gen, E-commerce, Informational).
  - Key pages required (Home, About, Services, Contact, etc.).
- **Step 4: Submission & Confirmation**
  - Summary of information.
  - Success message with the 48-72 hour countdown.

### 3.3 Backend/Admin (Internal) & AI Pipeline
- **AI Builder Agent:** An autonomous AI system that ingests intake form data (colors, layout preferences, goals, assets) and generates the codebase for the new site.
- **Automated Deployment:** The AI Agent automatically provisions a Vercel project, pushes code, and deploys the generated site to a staging URL.
- Notification system (Email) when a new intake is submitted and when the AI staging site is ready.
- Simple dashboard to track active AI build statuses.

### 3.4 Hosting & DNS Management
- **Vercel Integration:** All sites are hosted on Vercel for high performance and reliability.
- **DNS Handover:** Assist clients with pointing their domain (A records, CNAMEs) to Vercel.
- **SSL Management:** Automated SSL certificates via Vercel for all client sites.

### 3.5 Post-Approval Client Guide
- **Interactive Guide:** A dedicated page or PDF generated after the client approves the build.
- **Step-by-Step DNS Instructions:** Clear, visual guide for common registrars (GoDaddy, Namecheap, etc.) on how to update DNS.
- **Maintenance FAQ:** Basic instructions on how to request minor changes or updates.

## 4. User Flow
1. **Discover:** User lands on the marketing site.
2. **Engage:** User clicks "Start Your Build."
3. **Inbound:** User completes the multi-step intake form.
4. **Onboarding:** User receives a confirmation email.
5. **Production:** The AI Agent ingests the request, generates the codebase, and deploys it to a staging environment within 48-72 hours.
6. **Review:** Client reviews the staging link on Vercel.
7. **Approval:** Client approves the build.
8. **Handover:** Client receives the "Launch Guide" with DNS instructions.
9. **Go-Live:** Client updates DNS, and the site goes live on their domain.

## 5. Technical Stack (Proposed)
- **Frontend (Intake):** React (TypeScript) for a modern, responsive UI.
- **AI Builder Agent:** Node.js/Python backend orchestrating LLM API calls (e.g., OpenAI, Anthropic, Gemini) to generate source code based on templates and prompts.
- **Hosting:** Vercel (Production & Staging environments via Vercel API integration for automatic project creation).
- **Styling:** Vanilla CSS (for clean, custom aesthetics).
- **Form Handling:** Formik or React Hook Form.
- **Backend:** Node.js (Express) or Vercel Serverless Functions for form processing and webhooks.
- **Storage:** Cloudinary or AWS S3 for logo/asset uploads.

## 6. Success Criteria
- Seamless intake process with high completion rates.
- Clear communication of the 48-72 hour delivery promise.
- Professional and trustworthy visual design.
