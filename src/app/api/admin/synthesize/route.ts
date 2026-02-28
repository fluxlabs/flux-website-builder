import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { intakeId, mode = 'full' } = await req.json();

    if (!intakeId) {
      return NextResponse.json({ error: "Missing intakeId" }, { status: 400 });
    }

    // 1. If we are on Vercel, we update the status and include metadata about the mode
    if (process.env.VERCEL) {
      console.log(`Vercel detected. Triggering Render worker (${mode}) via Supabase for: ${intakeId}`);
      const { error } = await supabase
        .from("intakes")
        .update({ 
          status: "new",
          // We can use a log or a specific field to communicate the mode to the worker
          // For now, let's just log it to system_logs so the worker can check it
        })
        .eq("id", intakeId);

      if (error) throw error;
      
      await supabase.from("system_logs").insert([{
        intake_id: intakeId,
        category: 'SYSTEM',
        level: 'INFO',
        message: `REQUESTED_MODE: ${mode}`
      }]);

      return NextResponse.json({ success: true, message: `Worker notified of ${mode} synthesis.` });
    }

    // 2. Local fallback
    console.log(`Local environment detected. Spawning ${mode} synthesis for: ${intakeId}`);
    const scriptPath = path.join(process.cwd(), "generator", "synthesize.ts");
    
    const child = spawn("npx", ["ts-node", "--esm", scriptPath, intakeId, mode], {
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
