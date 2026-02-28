import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { intakeId } = await req.json();

    if (!intakeId) {
      return NextResponse.json({ error: "Missing intakeId" }, { status: 400 });
    }

    // 1. If we are on Vercel (or any serverless environment), we simply update the status to 'new'
    // The Render Background Worker will see this via Realtime and start the build.
    if (process.env.VERCEL) {
      console.log(`Vercel detected. Triggering Render worker via Supabase for: ${intakeId}`);
      const { error } = await supabase
        .from("intakes")
        .update({ status: "new" })
        .eq("id", intakeId);

      if (error) throw error;
      return NextResponse.json({ success: true, message: "Worker notified via Supabase." });
    }

    // 2. Local fallback: Run the background process locally (useful for dev)
    console.log(`Local environment detected. Spawning background process for: ${intakeId}`);
    const scriptPath = path.join(process.cwd(), "generator", "synthesize.ts");
    const logPath = path.join(process.cwd(), "synthesis.log");
    
    const child = spawn("npx", ["ts-node", "--esm", scriptPath, intakeId], {
      detached: true,
      stdio: 'ignore',
      env: { ...process.env }
    });

    child.unref();

    return NextResponse.json({ success: true, message: "Local synthesis started." });
  } catch (error) {
    console.error("Synthesis API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
