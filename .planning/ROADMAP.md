# Roadmap: Flux Website Builder

## Phases

- [ ] **Phase 1: Foundation & Intake** - Project setup, marketing landing page, and multi-step client intake form.
- [ ] **Phase 2: AI Generation Pipeline** - Core AI Builder Agent capable of generating valid Next.js code from intake data.
- [ ] **Phase 3: Vercel Automation** - Programmatic repo creation and automated Vercel deployment to staging URLs.
- [ ] **Phase 4: Approval & Handover** - Client approval workflow and automated launch guide with DNS instructions.

## Phase Details

### Phase 1: Foundation & Intake
**Goal**: Establish the project base and build the intake system for data collection.
**Depends on**: Nothing
**Requirements**: SETUP-01, SETUP-02, MKT-01, MKT-02, MKT-03, MKT-04, INTAKE-01, INTAKE-02, INTAKE-03, INTAKE-04, INTAKE-05
**Success Criteria**:
  1. Marketing landing page clearly conveys the value proposition.
  2. Users can complete the multi-step intake form with all required details.
  3. Form submissions are successfully stored in the database.
  4. Users receive a confirmation message after submission.
**Plans**: TBD

### Phase 2: AI Generation Pipeline
**Goal**: Develop the AI Agent that generates professional-grade website code.
**Depends on**: Phase 1
**Requirements**: AI-01, AI-02, AI-03, AI-04
**Success Criteria**:
  1. AI Agent generates a functional Next.js project based on a stored intake record.
  2. AI output passes a local build/compilation check (no syntax/Tailwind errors).
  3. Generated site layout and styles reflect user preferences (colors, goals).
**Plans**: TBD

### Phase 3: Vercel Automation
**Goal**: Scale the delivery process by automating repository creation and deployments.
**Depends on**: Phase 2
**Requirements**: AUTO-01, AUTO-02, AUTO-03, AUTO-04, HAND-01
**Success Criteria**:
  1. System automatically provisions a new GitHub repository for each intake submission.
  2. Generated code is automatically pushed to the client repository.
  3. Vercel deployment is triggered programmatically via API.
  4. Staging URL is visible in the internal status dashboard.
**Plans**: TBD

### Phase 4: Approval & Handover
**Goal**: Finalize the client experience with approval workflows and launch instructions.
**Depends on**: Phase 3
**Requirements**: HAND-02, HAND-03, HAND-04, HAND-05
**Success Criteria**:
  1. Client can view the staging site and approve the build via a button.
  2. Approval triggers the generation of an interactive Launch Guide.
  3. Instructions for DNS pointing (A/CNAME) are clear and visual.
  4. Client site is successfully live on a custom domain with SSL.
**Plans**: TBD

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Intake | 3/3 | Completed | Feb 26, 2026 |
| 2. AI Generation Pipeline | 3/3 | Completed | Feb 26, 2026 |
| 3. Vercel Automation | 3/3 | Completed | Feb 26, 2026 |
| 4. Approval & Handover | 3/3 | Completed | Feb 26, 2026 |
