# PLAN: Phase 5 - Admin Observability

## Goal
Provide internal visibility into the AI pipeline and client status to improve operational reliability and support.

## Tasks

### 5.1 System Logging Infrastructure (ADM-01)
- **Task**: Create a `system_logs` table in Supabase (id, timestamp, level, category, message, metadata).
- **Task**: Update existing API routes and background workers to log key lifecycle events.
- **Task**: Implement `GET /api/admin/logs` with pagination and filtering by category/level.
- **Verification**: Logs are visible in the Supabase dashboard after performing actions (e.g., submitting an intake).

### 5.2 Client & Intake Management (ADM-02)
- **Task**: Create a `/admin/clients` dashboard listing all intake submissions.
- **Task**: Implement search and filtering by client name, email, and status.
- **Task**: Build a detailed "Client Snapshot" view showing all raw intake data and associated deployment links.
- **Verification**: Admin can search for a client and see their full submission history and current build status.

### 5.3 Pipeline Controls & Recovery (ADM-03)
- **Task**: Implement a "Retry AI Generation" endpoint that resets the build status and re-triggers the worker.
- **Task**: Add buttons to the Client Snapshot view to trigger a retry or manually mark a step as "Complete".
- **Task**: Add a "Logs" tab to the Client Snapshot to show only logs related to that specific client.
- **Verification**: Triggering a "Retry" successfully restarts the AI generation process for a specific intake.

### 5.4 Operational Analytics (ADM-04)
- **Task**: Build a "Stats at a Glance" component (Total Intakes, Active Builds, Success Rate, Avg. Turnaround).
- **Task**: Implement basic data aggregation logic in Supabase or a serverless function.
- **Verification**: Dashboard reflects accurate, real-time metrics of the system's performance.

## Success Criteria
1. Admins can view a live log of AI generation steps.
2. A "Client List" view exists with filtering and status tracking.
3. Admins can manually trigger a rebuild if a generation fails.
4. Basic system health and volume metrics are visible.

## Definition of Done
- [ ] All Phase 5 tasks are complete.
- [ ] All success criteria are verified.
- [ ] Code is linted and passes TypeScript checks.
- [ ] Local build (`npm run build`) is successful.
- [ ] Staging deployment to Vercel is functional.
