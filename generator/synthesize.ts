import { generateSiteData } from "./engine.ts";
import { buildSite } from "./build.ts";
import { execSync } from "child_process";
import { supabase, supabaseAdmin, logEvent } from "../src/lib/supabase.ts";
import { resend } from "../src/lib/resend.ts";
import { createGitHubRepo, pushToGitHub, deployToVercel, slugify } from "./deploy.ts";
import fs from "fs";
import path from "path";

async function synthesize(intakeId: string, mode: 'full' | 'research' | 'design' = 'full') {
  const startTime = Date.now();
  
  // Fetch intake details using Admin client
  const { data: intake } = await supabaseAdmin
    .from("intakes")
    .select("*")
    .eq("id", intakeId)
    .single();

  if (!intake) {
    console.error("Intake not found for ID:", intakeId);
    return;
  }

  try {
    console.log(`--- [SYNTHESIZING VISION (${mode.toUpperCase()}): ${intakeId}] ---`);
    await logEvent({
      intakeId,
      category: 'AI_GEN',
      message: `Starting ${mode} synthesis for ${intake.business_name || 'unknown'}`
    });
    
    // Clean up local builds folder
    try {
      execSync(`rm -rf builds`, { stdio: "ignore" });
    } catch (e) {}

    // Reset status using Admin client to bypass RLS
    await supabaseAdmin.from("intakes").update({ 
      status: "ai_generating",
      staging_url: mode === 'full' ? null : intake.staging_url,
      build_time_ms: null
    }).eq("id", intakeId);

    // 1. Generate Site Data (LLM logic)
    // In 'research' mode, the engine could focus more on market data
    // In 'design' mode, it could focus on layout/aesthetics
    let siteData = await generateSiteData(intakeId); 
    await logEvent({
      intakeId,
      category: 'AI_GEN',
      message: `Vision Generated: ${siteData.siteTitle} (${mode} mode)`
    });

    if (mode === 'research' || mode === 'design') {
        // If we are just doing research or design rethink, we might just update the vision
        // and stop there, or continue to build. For now, let's assume 'full' is needed to deploy.
        // We'll mark it as done so the admin can see the vision in the logs.
        await logEvent({ intakeId, category: 'AI_GEN', message: `${mode.toUpperCase()} phase complete. Ready for full build.` });
        await supabaseAdmin.from("intakes").update({ status: "client_review" }).eq("id", intakeId);
        return;
    }

    // 2. Build the Next.js Project locally
    let buildDir = await buildSite(intakeId, siteData);
    await logEvent({
      intakeId,
      category: 'AI_GEN',
      message: `Project scaffolding built in ${buildDir}`
    });
    
    // Force isolation to prevent parent node_modules/lockfile interference
    await supabaseAdmin.from("intakes").update({ status: "ai_generating" }).eq("id", intakeId);
    fs.writeFileSync(path.join(buildDir, ".npmrc"), "install-links=false\nnode-linker=hoisted");

    // 3. Dry-Run Compilation Check
    console.log("Installing dependencies in build directory...");
    await logEvent({ intakeId, category: 'AI_GEN', message: 'Installing dependencies...' });
    try {
      execSync(`npm install --no-package-lock --legacy-peer-deps`, { 
        cwd: buildDir, 
        stdio: "inherit" 
      });
      
      console.log("Compilation Check...");
      await logEvent({ intakeId, category: 'AI_GEN', message: 'Running dry-run build check...' });
      execSync(`npm run build`, { 
        cwd: buildDir, 
        stdio: "inherit",
        env: {
          ...process.env,
          CI: "true",
          NODE_ENV: "production",
          NEXT_PRIVATE_LOCAL_SKIP_CHECK: "1",
          ESLINT_NO_DEV_ERRORS: "1",
          NODE_OPTIONS: ""
        }
      });
      await logEvent({ intakeId, category: 'AI_GEN', message: 'Compilation check passed.' });
    } catch (error: any) {
      console.error("Dry-run build failed. Aborting deployment.");
      await logEvent({ 
        intakeId, 
        level: 'ERROR', 
        category: 'AI_GEN', 
        message: 'Dry-run build failed',
        metadata: { error: error.message }
      });
      await supabaseAdmin.from("intakes").update({ status: "new" }).eq("id", intakeId);
      
      // Notify Admin of failure
      await resend.emails.send({
        from: "Flux System <system@fluxwebs.net>",
        to: ["jeremy@fluxlabs.net"],
        subject: `Build FAILED: ${intake.business_name || intake.email}`,
        html: `<p>Dry-run build failed for intake ${intakeId}. Check synthesis.log for details.</p>`
      });
      return;
    }

    // 4. Automated Deployment
    console.log("--- [STARTING AUTOMATED DEPLOYMENT] ---");
    await logEvent({ intakeId, category: 'DEPLOY', message: 'Provisioning GitHub repository...' });
    const businessSlug = slugify(siteData.siteTitle);
    const repoName = `flux-ai-build-${businessSlug}`;
    const { url: repoUrl, id: repoId } = await createGitHubRepo(repoName);
    
    await logEvent({ intakeId, category: 'DEPLOY', message: `Pushing code to ${repoUrl}` });
    await pushToGitHub(buildDir, repoUrl);
    
    await logEvent({ intakeId, category: 'DEPLOY', message: 'Triggering Vercel deployment...' });
    const { url: stagingUrl, deployHook } = await deployToVercel(repoName, siteData.siteTitle, repoId);

    const buildTime = Date.now() - startTime;

    // 5. Finalize CRM Status
    console.log("--- [SYNTHESIS COMPLETE] ---");
    await logEvent({ 
      intakeId, 
      category: 'DEPLOY', 
      message: `Synthesis complete and live at ${stagingUrl}`,
      metadata: { buildTimeMs: buildTime }
    });
    await supabaseAdmin.from("intakes").update({ 
      status: "client_review", 
      staging_url: stagingUrl,
      deploy_hook: deployHook,
      build_time_ms: buildTime
    }).eq("id", intakeId);

    console.log(`LIVE AT: ${stagingUrl} (Synthesized in ${buildTime}ms)`);

    // 6. Notify Client & Admin
    try {
      await resend.emails.send({
        from: "Flux <hello@fluxwebs.net>",
        to: [intake.email],
        subject: "Your Flux Vision is Live! 🚀",
        html: `
          <h1>Great news ${intake.name}!</h1>
          <p>Your visionary website for <strong>${siteData.siteTitle}</strong> has been synthesized and is ready for review.</p>
          <p style="font-size: 1.25rem; margin: 2rem 0;">
            <a href="${stagingUrl}" style="background: #000; color: #fff; padding: 1rem 2rem; border-radius: 8px; text-decoration: none;">View Your Staging Site →</a>
          </p>
          <p>Take a look and let us know what you think!</p>
          <p>Best,<br/>The Flux Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">Sent from Flux Webs</p>
        `
      });

      console.log("Success notification sent to client.");
    } catch (emailErr) {
      console.error("Failed to send success email:", emailErr);
    }

  } catch (error: any) {
    console.error("Synthesis Error:", error);
    await logEvent({
      intakeId,
      level: 'ERROR',
      category: 'AI_GEN',
      message: 'Unexpected synthesis error',
      metadata: { error: error.message || String(error) }
    });
    await supabase.from("intakes").update({ status: "new" }).eq("id", intakeId);
  }
}

// CLI entry point
const intakeId = process.argv[2];
const mode = process.argv[3] as any || 'full';
if (intakeId) {
  synthesize(intakeId, mode);
}

export { synthesize };
