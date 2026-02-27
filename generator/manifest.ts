import { generateSiteData } from "./engine.ts";
import { buildSite } from "./build.ts";
import { execSync } from "child_process";
import { supabase } from "../src/lib/supabase.ts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGitHubRepo, pushToGitHub, deployToVercel } from "./deploy.ts";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function manifest(intakeId: string) {
  const startTime = Date.now();
  try {
    console.log(`--- [MANIFESTING VISION: ${intakeId}] ---`);
    
    // Clean up local builds folder
    try {
      execSync(`rm -rf builds`, { stdio: "ignore" });
    } catch (e) {}

    await supabase.from("intakes").update({ status: "ai_generating" }).eq("id", intakeId);

    // 1. Generate Site Data (LLM logic)
    let siteData = await generateSiteData(intakeId);
    console.log("Vision Generated:", siteData.hero.headline);

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
      return;
    }

    // 4. Automated Deployment
    console.log("--- [STARTING AUTOMATED DEPLOYMENT] ---");
    const repoName = `flux-build-${intakeId.substring(0, 8)}`;
    const repoUrl = await createGitHubRepo(repoName);
    
    await pushToGitHub(buildDir, repoUrl);
    
    const stagingUrl = await deployToVercel(repoName, siteData.siteTitle);

    const buildTime = Date.now() - startTime;

    // 5. Finalize CRM Status
    console.log("--- [MANIFESTATION COMPLETE] ---");
    await supabase.from("intakes").update({ 
      status: "client_review", 
      staging_url: stagingUrl,
      build_time_ms: buildTime
    }).eq("id", intakeId);

    console.log(`LIVE AT: ${stagingUrl} (Manifested in ${buildTime}ms)`);

  } catch (error) {
    console.error("Manifest Error:", error);
  }
}

// CLI entry point
const intakeId = process.argv[2];
if (intakeId) {
  manifest(intakeId);
} else {
  console.log("Usage: npm run manifest <intakeId>");
}
