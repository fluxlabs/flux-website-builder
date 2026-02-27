import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const logPath = path.join(process.cwd(), "manifest.log");
    if (!fs.existsSync(logPath)) {
      return NextResponse.json({ logs: "No logs found yet." });
    }

    const content = fs.readFileSync(logPath, "utf-8");
    // Get last 50 lines
    const lines = content.split("\n").slice(-50).join("\n");

    return NextResponse.json({ logs: lines });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read logs" }, { status: 500 });
  }
}
