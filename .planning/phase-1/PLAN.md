# PLAN: Phase 1 - Foundation & Intake

## Goal
Establish the project base and build the intake system for data collection.

## Tasks

### 1.1 Foundation & Scaffolding (SETUP-01, SETUP-02)
- **Task**: Initialize a new Next.js project with TypeScript and Vanilla CSS (CSS Modules).
- **Task**: Setup Supabase for data storage (Postgres) and Cloudinary for file uploads.
- **Task**: Configure environment variables for Supabase, Cloudinary, and Resend.
- **Verification**: `npm run dev` starts without errors. Successful database connection test.

### 1.2 Sales & Marketing Landing Page (MKT-01, MKT-02, MKT-03)
- **Task**: Implement the Hero section with clear value proposition and CTA.
- **Task**: Build the Pricing and Portfolio sections (using placeholders for portfolio items).
- **Task**: Add a global navigation with "Start Your Build" sticky CTA.
- **Verification**: Visual audit against responsive design requirements. CTA link leads to `/intake`.

### 1.3 Client Intake Form - Step 1 & 2 (INTAKE-01, INTAKE-02)
- **Task**: Create the `/intake` route with a multi-step form layout.
- **Task**: Implement Step 1: Basic Information (Name, Email, Business Name, Current URL).
- **Task**: Implement Step 2: Design & Aesthetics (Links, Color picker, Logo upload to Cloudinary).
- **Verification**: Form validation ensures all required fields are present. Logo upload returns a Cloudinary URL.

### 1.4 Client Intake Form - Step 3 & 4 (INTAKE-03, INTAKE-04)
- **Task**: Implement Step 3: Content & Goals (Primary goal selection, Page list checklists).
- **Task**: Implement Step 4: Confirmation & Submission (Summary of data, "Submit" button).
- **Verification**: Final step displays a summary of all previously entered information.

### 1.5 Backend Integration & Notifications (INTAKE-05)
- **Task**: Create `POST /api/intake` to save form data into the `intakes` table in Supabase.
- **Task**: Integrate Resend to send confirmation emails to the client and admin upon successful submission.
- **Task**: Redirect user to a success page with the 48-72 hour countdown.
- **Verification**: Database record is created with all fields. Email is received with correct client details.

## Success Criteria
1. Marketing landing page clearly conveys the value proposition.
2. Users can complete the multi-step intake form with all required details.
3. Form submissions are successfully stored in the database.
4. Users receive a confirmation message after submission.

## Definition of Done
- [ ] All Phase 1 tasks are complete.
- [ ] All success criteria are verified.
- [ ] Code is linted and passes TypeScript checks.
- [ ] Local build (`npm run build`) is successful.
- [ ] Staging deployment to Vercel is functional.
