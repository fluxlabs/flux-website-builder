# PLAN: Phase 3 - Vercel Automation

## Goal
Automate the deployment of AI-generated sites to Vercel via the Vercel and GitHub APIs.

## Tasks

### 3.1 GitHub & Vercel API Integration (AUTO-01, AUTO-02)
- **Task**: Setup Octokit (GitHub) and Vercel API clients with required tokens.
- **Task**: Implement `createRepo(name)` to programmatically create a new private GitHub repository for each client.
- **Task**: Implement `deployToVercel(repoUrl)` to trigger a Vercel deployment and receive the staging URL.
- **Verification**: Manually confirm a test repository is created and a Vercel project is successfully linked.

### 3.2 Automated Deployment Pipeline (AUTO-03)
- **Task**: Integrate the deployment logic into the `generator/manifest.ts` script.
- **Task**: Add a step to `manifest.ts` to push the generated build directory to the new GitHub repo.
- **Task**: Implement a polling mechanism to wait for the Vercel deployment to complete and capture the live staging URL.
- **Verification**: Running `npm run manifest <intake-id>` results in a live Vercel URL printed to the console.

### 3.3 CRM Status & Notification Update (AUTO-04)
- **Task**: Update the Supabase `intakes` table with the new `staging_url` upon successful deployment.
- **Task**: Mark the intake status as `client_review` in the CRM.
- **Task**: (Optional) Send an automated email to the client with their new staging link via Resend.
- **Verification**: Check the Flux Admin Dashboard to see the staging URL linked to the correct client card.

## Success Criteria
1. The entire process from intake to a live staging URL is 100% automated.
2. The system can handle multiple concurrent deployments.
3. Every build successfully compiles and deploys without manual intervention.

## Definition of Done
- [ ] Vercel and GitHub API integrations are robust.
- [ ] Staging URLs are automatically updated in the CRM.
- [ ] E2E test from intake submission to live URL is successful.
