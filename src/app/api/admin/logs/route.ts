// Flux Website Builder — Admin Logs API
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const intakeId = searchParams.get("intakeId");
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500);

    let query = supabaseAdmin
      .from("system_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (intakeId) {
      query = query.eq("intake_id", intakeId);
    }

    const { data: logs, error } = await query;

    if (error) throw error;

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
