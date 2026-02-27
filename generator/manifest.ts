import { generateSiteData } from "./engine.ts";
import { buildSite } from "./build.ts";
import { execSync } from "child_process";
import { supabase } from "../src/lib/supabase.ts";
import { resend } from "../src/lib/resend.ts";
import { createGitHubRepo, pushToGitHub, deployToVercel, slugify } from "./deploy.ts";
import fs from "fs";
import path from "path";

async function manifest(intakeId: string) {
  const startTime = Date.now();
  
  // Fetch intake details early for notifications
  const { data: intake } = await supabase
    .from("intakes")
    .select("*")
    .eq("id", intakeId)
    .single();

  if (!intake) {
    console.error("Intake not found for ID:", intakeId);
    return;
  }

  try {
    console.log(`--- [MANIFESTING VISION: ${intakeId}] ---`);
    console.log(`Client: ${intake.name} (${intake.email})`);
    
    // Clean up local builds folder
    try {
      execSync(`rm -rf builds`, { stdio: "ignore" });
    } catch (e) {}

    // Reset status and clear old metrics immediately
    await supabase.from("intakes").update({ 
      status: "ai_generating",
      staging_url: null,
      build_time_ms: null
    }).eq("id", intakeId);

    // 1. Generate Site Data (LLM logic)
    let siteData = await generateSiteData(intakeId);
    console.log("Vision Generated:", siteData.pages?.[0]?.hero?.headline || siteData.siteTitle);

    // 2. Build the Next.js Project locally
    let buildDir = await buildSite(intakeId, siteData);
    
    // Force isolation to prevent parent node_modules/lockfile interference
    await supabase.from("intakes").update({ status: "ai_generating" }).eq("id", intakeId);
    fs.writeFileSync(path.join(buildDir, ".npmrc"), "install-links=false\nnode-linker=hoisted");

    // 3. Dry-Run Compilation Check
    console.log("Installing dependencies in build directory...");
    try {
      execSync(`npm install --no-package-lock --legacy-peer-deps`, { 
        cwd: buildDir, 
        stdio: "inherit" 
      });
      
      console.log("Compilation Check...");
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
    } catch (error: any) {
      console.error("Dry-run build failed. Aborting deployment.");
      await supabase.from("intakes").update({ status: "new" }).eq("id", intakeId);
      
      // Notify Admin of failure
      await resend.emails.send({
        from: "Flux System <system@fluxwebs.net>",
        to: ["admin@flux.com"],
        subject: `Build FAILED: ${intake.business_name || intake.email}`,
        html: `<p>Dry-run build failed for intake ${intakeId}. Check manifest.log for details.</p>`
      });
      return;
    }

    // 4. Automated Deployment
    console.log("--- [STARTING AUTOMATED DEPLOYMENT] ---");
    const businessSlug = slugify(siteData.siteTitle);
    const repoName = `flux-ai-build-${businessSlug}`;
    const { url: repoUrl, id: repoId } = await createGitHubRepo(repoName);
    
    await pushToGitHub(buildDir, repoUrl);
    
    const { url: stagingUrl, deployHook } = await deployToVercel(repoName, siteData.siteTitle, repoId);

    const buildTime = Date.now() - startTime;

    // 5. Finalize CRM Status
    console.log("--- [MANIFESTATION COMPLETE] ---");
    await supabase.from("intakes").update({ 
      status: "client_review", 
      staging_url: stagingUrl,
      deploy_hook: deployHook,
      build_time_ms: buildTime
    }).eq("id", intakeId);

    console.log(`LIVE AT: ${stagingUrl} (Manifested in ${buildTime}ms)`);

    // 6. Notify Client & Admin
    try {
      await resend.emails.send({
        from: "Flux <hello@fluxwebs.net>",
        to: [intake.email],
        subject: "Your Flux Vision is Live! 🚀",
        html: `
          <h1>Great news ${intake.name}!</h1>
          <p>Your visionary website for <strong>${siteData.siteTitle}</strong> has been manifested and is ready for review.</p>
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

  } catch (error) {
    console.error("Manifest Error:", error);
    await supabase.from("intakes").update({ status: "new" }).eq("id", intakeId);
  }
}

// CLI entry point
const intakeId = process.argv[2];
if (intakeId) {
  manifest(intakeId);
}

export { manifest };
