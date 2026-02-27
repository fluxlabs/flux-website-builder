import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, phone, hasWebsite, currentUrl, businessName, 
      industry, location, employeeCount, links, colors, logoUrl, 
      goal, pages, brandVoice, targetAudience, heroMessage,
      vertical, layout, extractedColors,
      logoQuality, rebuildLogo
    } = body;

    console.log("Received intake request:", body);

    // 1. Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url") {
        const { data: supabaseData, error: supabaseError } = await supabase
        .from("intakes")
        .insert([
            {
            name,
            email,
            phone,
            has_website: hasWebsite,
            business_name: businessName,
            current_url: currentUrl,
            industry,
            location,
            employee_count: employeeCount,
            links,
            colors,
            logo_url: logoUrl,
            goal,
            pages,
            brand_voice: brandVoice,
            target_audience: targetAudience,
            hero_message: heroMessage,
            vertical,
            layout,
            extracted_colors: extractedColors,
            logo_quality: logoQuality,
            rebuild_logo: rebuildLogo,
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
                await resend.emails.send({
                    from: "Flux <hello@fluxwebs.net>",
                    to: [email],
                    subject: "We've received your build request!",
                    html: `
                        <h1>Hi ${name},</h1>
                        <p>Thanks for choosing Flux! We've received your request to build <strong>${businessName || currentUrl}</strong>.</p>
                        <p>Our team is reviewing your details and we'll get started right away.</p>
                        <p>You can expect your first draft in 48-72 hours.</p>
                        <p>Best,<br/>The Flux Team</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #666;">Sent from Flux Webs</p>
                    `,
                });
                
                // Send notification to admin
                await resend.emails.send({
                    from: "Flux System <system@fluxwebs.net>",
                    to: ["admin@flux.com"], // Placeholder admin email
                    subject: `New Intake: ${businessName || currentUrl}`,
                    html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
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

    const { data, error } = await supabase
      .from("intakes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
