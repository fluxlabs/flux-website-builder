import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("intakes")
      .select("*")
      .neq("status", "archived")
      .order("created_at", { ascending: false });

    console.log("Supabase call finished. Data:", data, "Error:", error);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json([]); // Return empty array on error
    }

    if (!Array.isArray(data)) {
        console.warn("Supabase returned non-array data:", data);
        return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json([]); // Return empty array on error
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    
    const { data, error } = await supabase
      .from("intakes")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update intake" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // 1. Fetch intake using Admin client to bypass RLS
    const { data: intake, error: fetchError } = await supabaseAdmin
      .from("intakes")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !intake) throw new Error("Intake not found");

    // 2. Derive repository/project name
    const slugify = (text: string) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    const repoName = `flux-ai-build-${slugify(intake.business_name || intake.current_url || "unknown")}`;

    // 3. Delete Vercel Project
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
    const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
    if (VERCEL_TOKEN) {
      const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
      await fetch(`https://api.vercel.com/v9/projects/${repoName}${teamParam}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      }).catch(e => console.error("Vercel delete error:", e));
      console.log(`Sent Vercel delete request for: ${repoName}`);
    }

    // 4. Delete GitHub Repo
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_ORG = process.env.GITHUB_ORG || "fluxlabs";
    if (GITHUB_TOKEN) {
      await fetch(`https://api.github.com/repos/${GITHUB_ORG}/${repoName}`, {
        method: "DELETE",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }).catch(e => console.error("GitHub delete error:", e));
      console.log(`Sent GitHub delete request for: ${GITHUB_ORG}/${repoName}`);
    }

    // 5. Soft Delete in Supabase (Backup Routine)
    // We update the status to 'archived' instead of hard deleting so you can restore the data later.
    const { error } = await supabase
      .from("intakes")
      .update({ status: "archived" })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Infrastructure destroyed, data archived." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete intake" }, { status: 500 });
  }
}
