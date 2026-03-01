// Flux Website Builder — Public Status API
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * GET /api/status?id=<uuid>
 * Public endpoint — returns intake status + safe log messages for the build tracker.
 * Only returns message and timestamp from logs, no metadata.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !UUID_REGEX.test(id)) {
      return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
    }

    // Fetch intake — only safe fields
    const { data: intake, error: intakeError } = await supabaseAdmin
      .from("intakes")
      .select("id, business_name, status, staging_url")
      .eq("id", id)
      .single();

    if (intakeError || !intake) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Fetch logs — only message and timestamp, capped at 50
    const { data: logs } = await supabaseAdmin
      .from("system_logs")
      .select("message, created_at, level, category")
      .eq("intake_id", id)
      .order("created_at", { ascending: false })
      .limit(50);

    return NextResponse.json({
      intake,
      logs: logs || [],
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
