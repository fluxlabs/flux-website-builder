# RESEARCH: Phase 1 - Foundation & Intake

## Goal
Establish the project base and build the intake system for data collection.

## Tech Stack Decisions
- **Framework**: Next.js (App Router) for SEO, performance, and built-in API routes.
- **Language**: TypeScript for type safety and better DX with the AI Agent generation.
- **Styling**: Vanilla CSS (CSS Modules) to match the user's preference for clean, custom aesthetics without Tailwind.
- **Form Handling**: React Hook Form for efficient multi-step form management.
- **Database**: Supabase (Postgres) for quick setup of tables for intake data.
- **Storage**: Cloudinary for client logo uploads.
- **Email Notifications**: Resend for simplicity and performance.

## Key Challenges
1. **Multi-step Form State**: Managing state across steps without page reloads while ensuring data isn't lost.
   - *Solution*: Use a persistent state (Zustand or React Context) or URL-based step management.
2. **File Uploads**: Securely handling logo uploads and associating them with the intake record.
   - *Solution*: Use Cloudinary's upload widget or a signed upload API route.
3. **Database Schema**: Designing a flexible schema that can store all client preferences for the AI Agent to consume in Phase 2.
   - *Solution*: A JSONB column in the `intakes` table for specific "Design & Aesthetics" fields to allow flexibility.

## Implementation Details

### Landing Page (MKT-01, MKT-02, MKT-03)
- Hero section with clear value prop ("Website in 48-72 Hours").
- Pricing section (Build vs. Rebuild).
- Portfolio placeholders.
- Sticky CTA "Start Your Build".

### Multi-step Form (INTAKE-01 to INTAKE-04)
- **Step 1**: Basic Info (Name, Email, Business Name, Current URL).
- **Step 2**: Design & Aesthetics (Links, Color palette via color picker, Logo upload).
- **Step 3**: Content & Goals (Primary goal, Page list).
- **Step 4**: Confirmation (Summary + Countdown).

### Backend (INTAKE-05, SETUP-02)
- API route `POST /api/intake` to save to Supabase.
- Integration with Resend to send a "We're building your site!" email to the client and a notification to the admin.

## Next Steps
- Create `PLAN.md` with specific tasks for scaffolding, UI implementation, and backend integration.
