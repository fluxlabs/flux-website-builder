// Flux Website Builder — Route Protection Middleware
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      // API routes get 401, page routes redirect to login
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect /api/admin/* routes
  if (pathname.startsWith("/api/admin")) {
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return response;
}

async function checkAuth(request: NextRequest): Promise<boolean> {
  try {
    // Look for the Supabase auth token in cookies
    // Supabase stores auth in sb-<project-ref>-auth-token
    const allCookies = request.cookies.getAll();
    const authCookie = allCookies.find(
      (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
    );

    if (!authCookie?.value) return false;

    // Parse the cookie — Supabase stores it as a JSON array [access_token, refresh_token]
    // or as a base64-encoded JSON object depending on version
    let accessToken: string | null = null;
    try {
      const parsed = JSON.parse(authCookie.value);
      if (Array.isArray(parsed)) {
        accessToken = parsed[0];
      } else if (parsed.access_token) {
        accessToken = parsed.access_token;
      }
    } catch {
      // Might be the raw token
      accessToken = authCookie.value;
    }

    if (!accessToken) return false;

    // Verify the token with Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser();
    return !error && !!user;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
