// Flux Website Builder — Admin Authentication Helper
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Verify the request is from an authenticated admin user.
 * Returns the user object if authenticated, or a NextResponse error if not.
 */
export async function requireAdmin(): Promise<
  { user: { id: string; email?: string } } | NextResponse
> {
  try {
    const cookieStore = await cookies();

    // Create a Supabase client that reads from request cookies
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          // Pass all sb- cookies as the auth token
          Authorization: `Bearer ${cookieStore.get("sb-access-token")?.value || cookieStore.get(`sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`)?.value || ""}`,
        },
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return { user: { id: user.id, email: user.email } };
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
