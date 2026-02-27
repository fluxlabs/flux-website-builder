import { Octokit } from "octokit";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const GITHUB_ORG = process.env.GITHUB_ORG || "";

export async function createGitHubRepo(repoName: string) {
  console.log(`Creating GitHub repository: ${repoName}...`);
  try {
    const { data } = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      private: true,
      auto_init: false,
    });
    console.log(`Repo created: ${data.html_url} (ID: ${data.id})`);
    return { url: data.html_url, id: data.id };
  } catch (error: any) {
    if (error.status === 422) {
      console.log("Repo already exists, fetching details...");
      const { data } = await octokit.rest.repos.get({
        owner: GITHUB_ORG,
        repo: repoName,
      });
      return { url: data.html_url, id: data.id };
    }
    throw error;
  }
}

export async function pushToGitHub(buildDir: string, repoUrl: string) {
  console.log(`Pushing code to ${repoUrl}...`);
  try {
    // 1. Create a bulletproof .gitignore in the temporary directory
    const gitignoreContent = `node_modules/\n.next/\nout/\nbuild/\n.env\n.env.local\n.DS_Store\n*.log\n`;
    fs.writeFileSync(path.join(buildDir, ".gitignore"), gitignoreContent);

    // 2. Add GitHub token to URL for auth
    const authRepoUrl = repoUrl.replace("https://", `https://${process.env.GITHUB_TOKEN}@`);
    
    // 3. Start with a clean git state
    try {
      execSync(`cd ${buildDir} && rm -rf .git`, { stdio: "ignore" });
    } catch (e) {}

    execSync(`cd ${buildDir} && git init && git branch -M main && git remote add origin ${authRepoUrl}`, { stdio: "ignore" });

    // 4. Track and push
    execSync(`cd ${buildDir} && git add .`, { stdio: "inherit" });
    try {
      execSync(`cd ${buildDir} && git commit -m "Manifested by Flux AI"`, { stdio: "ignore" });
    } catch (e) {
      console.log("No new changes to commit.");
    }
    
    execSync(`cd ${buildDir} && git push -u origin main -f`, { stdio: "inherit" });
    console.log("Push successful.");
  } catch (error) {
    console.error("Failed to push to GitHub:", error);
    throw error;
  }
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');   // Replace multiple - with single -
}

export async function deployToVercel(repoName: string, businessName: string, repoId: number) {
  console.log(`Triggering Vercel deployment for ${businessName}...`);
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  const GITHUB_ORG = process.env.GITHUB_ORG;

  if (!VERCEL_TOKEN) {
    console.warn("VERCEL_TOKEN missing, falling back to predicted URL.");
    return { url: `https://${repoName}.vercel.app`, deployHook: null };
  }

  const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";

  try {
    // 1. Create the project on Vercel and link to GitHub
    const createRes = await fetch(`https://api.vercel.com/v9/projects${teamParam}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName,
        framework: "nextjs",
        gitRepository: {
          type: "github",
          repo: `${GITHUB_ORG}/${repoName}`,
          repoId: repoId,
        },
      }),
    });

    const projectData: any = await createRes.json();
    if (projectData.error && projectData.error.code !== "name_already_exists" && projectData.error.code !== "conflict") {
        throw new Error(`Vercel Project Creation Failed: ${JSON.stringify(projectData.error)}`);
    }

    const projectId = projectData.id || (await getProjectId(repoName, VERCEL_TOKEN, VERCEL_TEAM_ID));

    console.log("Vercel project linked. Waiting for registration (10s)...");
    await new Promise(resolve => setTimeout(resolve, 10000)); 

    console.log("Triggering initial deployment...");

    // 2. Trigger an explicit deployment to force the first build
    // Attempt with retry if GitHub sync is lagging
    let deployData: any;
    for (let attempt = 1; attempt <= 5; attempt++) {
      const deployRes = await fetch(`https://api.vercel.com/v13/deployments${teamParam}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: repoName,
          project: projectId, // Use project ID
          gitSource: {
            type: "github",
            ref: "main",
            repoId: repoId,
          },
        }),
      });

      deployData = await deployRes.json();
      if (!deployData.error) {
          console.log(`Deployment triggered successfully on attempt ${attempt}.`);
          break;
      }
      
      console.warn(`Deployment attempt ${attempt} failed: ${deployData.error.message}. Retrying in 15s...`);
      await new Promise(resolve => setTimeout(resolve, 15000));
    }

    if (deployData.error) {
        console.error("Manual Deployment Trigger finally failed after 5 attempts:", deployData.error);
    }

    const vercelUrl = `https://${deployData.alias?.[0] || repoName + '.vercel.app'}`;
    
    // 3. Create a Deploy Hook for future re-builds
    const deployHook = await createDeployHook(projectId, VERCEL_TOKEN, VERCEL_TEAM_ID);
    
    // 4. Assign Whitelabel Domain using Business Name
    const clientSlug = slugify(businessName);
    const whitelabelUrl = await assignCustomDomain(repoName, clientSlug, VERCEL_TOKEN, VERCEL_TEAM_ID);
    
    const finalUrl = whitelabelUrl || vercelUrl;
    console.log(`Live Vision at: ${finalUrl}`);
    return { url: finalUrl, deployHook };
  } catch (error) {
    console.error("Vercel Deployment Error:", error);
    return { url: `https://${repoName}.vercel.app`, deployHook: null };
  }
}

async function createDeployHook(projectId: string, token: string, teamId?: string) {
  console.log("Creating Vercel Deploy Hook...");
  const teamParam = teamId ? `?teamId=${teamId}` : "";
  try {
    const res = await fetch(`https://api.vercel.com/v1/projects/${projectId}/deploy-hooks${teamParam}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Flux AI Auto-Build",
        ref: "main"
      }),
    });
    const data: any = await res.json();
    return data.url || null;
  } catch (e) {
    console.error("Failed to create deploy hook:", e);
    return null;
  }
}

async function assignCustomDomain(repoName: string, subdomainSlug: string, token: string, teamId?: string) {
  const ROOT_DOMAIN = process.env.WHITELABEL_DOMAIN;
  if (!ROOT_DOMAIN) return null;

  const teamParam = teamId ? `?teamId=${teamId}` : "";
  const customSubdomain = `${subdomainSlug}.${ROOT_DOMAIN}`;
  console.log(`Assigning whitelabel domain: ${customSubdomain}...`);

  try {
    const res = await fetch(`https://api.vercel.com/v9/projects/${repoName}/domains${teamParam}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: customSubdomain }),
    });

    const data: any = await res.json();
    
    if (data.error && data.error.code === "name_already_exists") {
        console.log("Domain already assigned.");
        return `https://${customSubdomain}`;
    }

    if (data.error) {
        console.error("Vercel Domain Error:", data.error);
        return null;
    }

    // Optional: Trigger verification
    await fetch(`https://api.vercel.com/v9/projects/${repoName}/domains/${customSubdomain}/verify${teamParam}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log(`Whitelabel domain assigned: https://${customSubdomain}`);
    return `https://${customSubdomain}`;
  } catch (e) {
    console.error("Failed to assign custom domain:", e);
    return null;
  }
}

async function getProjectId(name: string, token: string, teamId?: string) {
    const teamParam = teamId ? `?teamId=${teamId}` : "";
    const res = await fetch(`https://api.vercel.com/v9/projects/${name}${teamParam}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data: any = await res.json();
    return data.id;
}
