// Flux Website Builder — Synthesis Pipeline
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { generateSiteData } from "./engine.ts";
import { buildSite } from "./build.ts";
import { execSync } from "child_process";
import { supabaseAdmin, logEvent } from "../src/lib/supabase.ts";
import { resend } from "../src/lib/resend.ts";
import { createGitHubRepo, pushToGitHub, deployToVercel, slugify } from "./deploy.ts";
import fs from "fs-extra";
import path from "path";
import os from "os";

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
      message: `Starting ${mode} synthesis for ${intake.business_name || 'unknown'} (Starting synthesis - Initiating AI research)`
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
        subject: `[SYSTEM ERROR] Build FAILED: ${intake.business_name || intake.email}`,
        html: `
            <div style="background-color: #000; color: #fff; font-family: monospace; padding: 40px; border: 1px solid #111;">
                <h1 style="color: #ef4444; font-size: 18px; margin-bottom: 24px;">[BUILD ERROR DETECTED]</h1>
                <p style="color: #fff;">Synthesis for <strong>${intake.business_name || 'unknown'}</strong> was aborted due to a compilation failure.</p>
                
                <div style="margin-top: 32px; padding: 20px; background: #1a0000; border-left: 4px solid #ef4444;">
                    <p style="margin: 0; color: #ef4444; font-size: 14px; font-weight: 800;">ERROR MESSAGE</p>
                    <p style="margin: 8px 0 0; color: #fff; font-size: 13px;">${error.message}</p>
                </div>

                <div style="margin-top: 32px;">
                    <a href="https://fluxwebs.net/admin/dashboard" style="color: #d6c5a5; text-decoration: none; font-weight: 800; font-size: 14px; letter-spacing: 2px;">OPEN MISSION CONTROL →</a>
                </div>

                <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                <p style="color: #333; font-size: 12px;">Flux Internal Monitoring System</p>
            </div>
        `
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
      message: `SYNTHESIS COMPLETE: Live at ${stagingUrl}`,
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
        subject: "Synthesis Complete: Your Vision is Live 🚀",
        html: `
            <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #111;">
                <h1 style="color: #fff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 40px; text-transform: uppercase;">
                    FLUX<span style="color: #d6c5a5;">.</span>
                </h1>
                
                <h2 style="font-size: 32px; font-weight: 400; margin-bottom: 20px; line-height: 1.2;">Your website is ready for review.</h2>
                
                <p style="color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    Our synthesis engine has successfully built <strong>${siteData.siteTitle}</strong>. Your professional, custom-synthesized digital presence is now live in a staging environment.
                </p>
                
                <div style="background: #050505; border: 1px solid #d6c5a5; padding: 32px; margin-bottom: 40px; text-align: center;">
                    <a href="${stagingUrl}" style="display: inline-block; background-color: #fff; color: #000; padding: 16px 40px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                        View Staging Site →
                    </a>
                </div>

                <p style="color: #888; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
                    Take a look and let us know what you think. If everything looks correct, you can approve the build from your dashboard to proceed with launching on your own domain.
                </p>

                <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                
                <p style="font-size: 12px; color: #444; text-transform: uppercase; letter-spacing: 1px;">
                    Synthesized by Flux Webs<br/>
                    <a href="https://fluxwebs.net" style="color: #444; text-decoration: none;">fluxwebs.net</a>
                </p>
            </div>
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
    // BUG FIX: Use supabaseAdmin (not supabase) to bypass RLS in worker context
    await supabaseAdmin.from("intakes").update({ status: "new" }).eq("id", intakeId);
  } finally {
    // Always clean up temp build directory to prevent disk fill
    const buildDir = path.join(os.tmpdir(), "flux-synthesis", intakeId);
    try {
      await fs.remove(buildDir);
      console.log(`Cleaned up temp dir: ${buildDir}`);
    } catch (cleanupErr) {
      console.error(`Failed to clean up ${buildDir}:`, cleanupErr);
    }
  }
}

// CLI entry point
const intakeId = process.argv[2];
const mode = process.argv[3] as any || 'full';
if (intakeId) {
  synthesize(intakeId, mode);
}

export { synthesize };
