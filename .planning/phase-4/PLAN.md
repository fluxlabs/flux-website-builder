# PLAN: Phase 4 - Approval & Handover

## Goal
Finalize the client experience with approval workflows and a professional launch guide.

## Tasks

### 4.1 Client Review Portal (HAND-01, HAND-02)
- **Task**: Create a dynamic `/review/[id]` route for clients to view their staging site.
- **Task**: Implement a "Visionary Review" UI that displays the staging site in an iframe alongside an approval sidebar.
- **Task**: Add an "Approve & Launch" button that triggers the status change to `approved`.
- **Verification**: Navigating to `/review/<intake-id>` displays the correct client's staging URL.

### 4.2 Automated Launch & DNS Guide (HAND-03, HAND-04)
- **Task**: Implement a post-approval transition that marks the site as `live`.
- **Task**: Generate a dynamic "Launch Guide" page for the client.
- **Task**: Create clear, visual DNS instructions (A records, CNAMEs) based on Vercel deployment data.
- **Verification**: Approval leads to a guide that clearly explains how to point a custom domain.

### 4.3 Final Polishing & Project Closure (HAND-05)
- **Task**: Conduct a final UI audit across all client-facing pages.
- **Task**: Ensure build logs and success metrics are correctly stored for project closure.
- **Task**: (Optional) Implement a final "Success" email with the Launch Guide link.
- **Verification**: Complete E2E flow from marketing lander -> intake -> AI build -> deployment -> approval -> launch guide.

## Success Criteria
1. Clients can independently review and approve their websites.
2. The handover process is professional, clear, and high-end.
3. The system correctly tracks the transition from 'staging' to 'live'.

## Definition of Done
- [ ] Review portal is functional and secure.
- [ ] Launch guide is dynamically generated.
- [ ] Final E2E system test is successful.
