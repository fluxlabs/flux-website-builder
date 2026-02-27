# PLAN: Phase 2 - AI Generation Pipeline

## Goal
Develop an AI Agent that generates professional, buildable Next.js code based on intake data.

## Tasks

### 2.1 Component Library Scaffolding (AI-01)
- **Task**: Define a "Seed" project structure for client sites (Next.js + TypeScript).
- **Task**: Create a library of reusable, theme-able components (Nav, Hero, Feature sections).
- **Task**: Build a "Style Injector" that converts intake brand colors into CSS variables.
- **Verification**: Manually confirm the Seed project builds locally with a test theme.

### 2.2 Content Generation Engine (AI-02, AI-03)
- **Task**: Create a Python or Node.js service that connects to the Gemini 1.5 Pro API.
- **Task**: Build "Vision-to-Copy" prompts that turn intake data (Brand Voice, Goals) into headlines, body text, and button CTAs.
- **Task**: Implement a structured output format (JSON) that the generator can parse to populate the Seed template.
- **Verification**: A CLI command (`npm run generate-draft <intake-id>`) that prints the AI's generated content to the console.

### 2.3 Code Compilation & Validation (AI-04)
- **Task**: Write a "Dry-Run" script that places the generated code into the Seed template and runs `npm run build`.
- **Task**: Implement an "Auto-Repair" loop—if the build fails, the AI is prompted with the error message to fix the syntax.
- **Verification**: 100% success rate on 5 test build generations.

## Success Criteria
1. The system can generate a multi-page website from a single intake ID.
2. Every generated site passes a local build/compilation check.
3. The content (copy and colors) feels unique to each intake request.

## Definition of Done
- [ ] Generation service is integrated with the CRM.
- [ ] Build logs are visible for each generation.
- [ ] Local generation script is stable.
