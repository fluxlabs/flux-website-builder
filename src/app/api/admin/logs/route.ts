import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const intakeId = searchParams.get("intakeId");
    
    let logPath = path.join(process.cwd(), "manifest.log");
    if (intakeId) {
      logPath = path.join(process.cwd(), `manifest-${intakeId}.log`);
    }

    if (!fs.existsSync(logPath)) {
      return NextResponse.json({ logs: "No logs found yet." });
    }

    const content = fs.readFileSync(logPath, "utf-8");
    // Get last 100 lines for more context
    const lines = content.split("\n").slice(-100).join("\n");

    return NextResponse.json({ logs: lines });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read logs" }, { status: 500 });
  }
}
