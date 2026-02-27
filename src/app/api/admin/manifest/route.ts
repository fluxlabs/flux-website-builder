import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const { intakeId } = await req.json();

    if (!intakeId) {
      return NextResponse.json({ error: "Missing intakeId" }, { status: 400 });
    }

    console.log(`Triggering background manifestation for: ${intakeId}`);

    // Trigger the manifest script as a background process
    const scriptPath = path.join(process.cwd(), "generator", "manifest.ts");
    const logPath = path.join(process.cwd(), "manifest.log");
    const buildLogPath = path.join(process.cwd(), `manifest-${intakeId}.log`);

    console.log(`Script path: ${scriptPath}`);

    const child = spawn("npx", ["ts-node-esm", scriptPath, intakeId], {
      detached: true,
      stdio: 'pipe',
      env: { 
        ...process.env,
        GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        GITHUB_ORG: process.env.GITHUB_ORG,
        ESLINT_NO_DEV_ERRORS: "1"
      }
    });

    const logStream = fs.createWriteStream(logPath, { flags: 'a' });
    const buildLogStream = fs.createWriteStream(buildLogPath, { flags: 'w' });
    
    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);
    
    child.stdout.pipe(buildLogStream);
    child.stderr.pipe(buildLogStream);

    child.unref();

    return NextResponse.json({ success: true, message: "Manifestation started in background." });
  } catch (error) {
    console.error("Manifest API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
