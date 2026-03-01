// Flux Website Builder — Intake API
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_LENGTH = 2000;
const MAX_URL_LENGTH = 500;

// Simple rate limiter — 5 requests per 15 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  return true;
}

// Cleanup stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((timestamps, ip) => {
    const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (recent.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, recent);
  });
}, 10 * 60 * 1000);

function sanitizeText(text: string | undefined | null, maxLen = MAX_TEXT_LENGTH): string {
  if (!text || typeof text !== "string") return "";
  return text.trim().slice(0, maxLen);
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const {
      name, email, phone, hasWebsite, currentUrl, businessName,
      industry, location, employeeCount, links, socialLinks, servicesList,
      colors, logoUrl, goal, pages, brandVoice, targetAudience, heroMessage,
      vertical, layout, extractedColors,
      logoQuality, rebuildLogo
    } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!goal || typeof goal !== "string") {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }
    if (!Array.isArray(pages) || pages.length === 0) {
      return NextResponse.json({ error: "At least one page is required" }, { status: 400 });
    }

    // 1. Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url") {
        const { data: supabaseData, error: supabaseError } = await supabase
        .from("intakes")
        .insert([
            {
            name: sanitizeText(name, 200),
            email: sanitizeText(email, 320),
            phone: sanitizeText(phone, 30),
            has_website: !!hasWebsite,
            business_name: sanitizeText(businessName, 200),
            current_url: sanitizeText(currentUrl, MAX_URL_LENGTH),
            industry: sanitizeText(industry, 200),
            location: sanitizeText(location, 200),
            employee_count: sanitizeText(employeeCount, 50),
            links: sanitizeText(links, MAX_TEXT_LENGTH),
            social_links: sanitizeText(socialLinks, MAX_TEXT_LENGTH),
            services_list: sanitizeText(servicesList, MAX_TEXT_LENGTH),
            colors: sanitizeText(colors, 50),
            logo_url: sanitizeText(logoUrl, MAX_URL_LENGTH),
            goal: sanitizeText(goal, 100),
            pages: Array.isArray(pages) ? pages.map((p: string) => sanitizeText(p, 50)).slice(0, 20) : [],
            brand_voice: sanitizeText(brandVoice, 100),
            target_audience: sanitizeText(targetAudience, MAX_TEXT_LENGTH),
            hero_message: sanitizeText(heroMessage, MAX_TEXT_LENGTH),
            vertical: sanitizeText(vertical, 100),
            layout: sanitizeText(layout, 100),
            extracted_colors: Array.isArray(extractedColors) ? extractedColors.slice(0, 10) : [],
            logo_quality: sanitizeText(logoQuality, 20),
            rebuild_logo: !!rebuildLogo,
            status: "new",
            },
        ])
        .select();

        if (supabaseError) {
            console.error("Supabase Error:", supabaseError);
            return NextResponse.json({ error: "Failed to save to database" }, { status: 500 });
        }

        const intakeId = supabaseData[0].id;

        // 2. Send Email via Resend
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your-resend-api-key") {
            try {
                // To Client
                await resend.emails.send({
                    from: "Flux <hello@fluxwebs.net>",
                    to: [email],
                    subject: "Vision Received: Your build has started",
                    html: `
                        <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #111;">
                            <h1 style="color: #fff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 40px; text-transform: uppercase;">
                                FLUX<span style="color: #d6c5a5;">.</span>
                            </h1>
                            
                            <h2 style="font-size: 32px; font-weight: 400; margin-bottom: 20px; line-height: 1.2;">Hi ${name}, your vision has been received.</h2>
                            
                            <p style="color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                We've successfully received your request to build <strong>${businessName || currentUrl}</strong>. 
                                Our AI synthesis engine and design team are already beginning the research phase.
                            </p>
                            
                            <div style="background: #050505; border: 1px solid #111; padding: 24px; margin-bottom: 30px;">
                                <p style="margin: 0; color: #d6c5a5; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Next Steps</p>
                                <p style="margin: 8px 0 0; color: #fff; font-size: 14px;">Your first draft will be ready in <strong>48-72 hours</strong>. You can track the live build progress at any time using the link below.</p>
                            </div>

                            <a href="https://fluxwebs.net/status/${intakeId}" style="display: inline-block; background-color: #fff; color: #000; padding: 16px 32px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                                Track Live Build →
                            </a>

                            <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                            
                            <p style="font-size: 12px; color: #444; text-transform: uppercase; letter-spacing: 1px;">
                                Synthesized by Flux Webs<br/>
                                <a href="https://fluxwebs.net" style="color: #444; text-decoration: none;">fluxwebs.net</a>
                            </p>
                        </div>
                    `,
                });
                
                // To Admin (Jeremy)
                await resend.emails.send({
                    from: "Flux System <system@fluxwebs.net>",
                    to: ["jeremy@fluxlabs.net"],
                    subject: `New Build Request: ${businessName || currentUrl}`,
                    html: `
                        <div style="background-color: #000; color: #fff; font-family: monospace; padding: 40px; border: 1px solid #111;">
                            <h1 style="color: #d6c5a5; font-size: 18px; margin-bottom: 24px;">[NEW INTAKE RECEIVED]</h1>
                            
                            <table style="width: 100%; border-collapse: collapse; color: #fff; font-size: 14px;">
                                <tr><td style="padding: 8px 0; color: #444;">CLIENT</td><td>${name}</td></tr>
                                <tr><td style="padding: 8px 0; color: #444;">EMAIL</td><td>${email}</td></tr>
                                <tr><td style="padding: 8px 0; color: #444;">PHONE</td><td>${phone || 'N/A'}</td></tr>
                                <tr><td style="padding: 8px 0; color: #444;">BUSINESS</td><td>${businessName || 'N/A'}</td></tr>
                                <tr><td style="padding: 8px 0; color: #444;">GOAL</td><td>${goal}</td></tr>
                                <tr><td style="padding: 8px 0; color: #444;">STYLE</td><td>${layout || 'Standard'}</td></tr>
                            </table>

                            <div style="margin-top: 32px; padding: 20px; background: #050505; border-left: 4px solid #d6c5a5;">
                                <a href="https://fluxwebs.net/admin/dashboard" style="color: #d6c5a5; text-decoration: none; font-weight: 800;">OPEN MISSION CONTROL →</a>
                            </div>

                            <pre style="margin-top: 40px; color: #333; font-size: 11px;">${JSON.stringify(body, null, 2)}</pre>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error("Email Error:", emailError);
                // Don't fail the whole request if email fails
            }
        } else {
            console.warn("Resend not configured, skipping email.");
        }

        return NextResponse.json({ success: true, id: intakeId });
    } else {
        return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("intakes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Fetch Intake Error:", error);
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
