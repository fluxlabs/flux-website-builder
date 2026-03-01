// Flux Website Builder — Public Review API
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * GET /api/review?id=<uuid>
 * Public endpoint — returns only the fields needed for the review page.
 * Does NOT expose email, phone, or other PII.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("intakes")
      .select("id, business_name, status, staging_url")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/review
 * Public endpoint — allows approving a build by ID.
 * Only allows setting status to "approved" and only from "client_review" state.
 */
export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    // Only allow approving from client_review state
    const { data: intake } = await supabaseAdmin
      .from("intakes")
      .select("id, status")
      .eq("id", id)
      .single();

    if (!intake) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (intake.status !== "client_review") {
      return NextResponse.json({ error: "Build is not in review state" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("intakes")
      .update({ status: "approved" })
      .eq("id", id)
      .select("id, status");

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch {
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
