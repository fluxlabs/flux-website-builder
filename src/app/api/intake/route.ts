import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, businessName, currentUrl, links, colors, logoUrl, goal, pages, brandVoice, targetAudience, heroMessage } = body;

    console.log("Received intake request:", body);

    // 1. Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url") {
        const { error: supabaseError } = await supabase
        .from("intakes")
        .insert([
            {
            name,
            email,
            business_name: businessName,
            current_url: currentUrl,
            links,
            colors,
            logo_url: logoUrl,
            goal,
            pages,
            brand_voice: brandVoice,
            target_audience: targetAudience,
            hero_message: heroMessage,
            status: "new",
            },
        ]);

        if (supabaseError) {
            console.error("Supabase Error:", supabaseError);
            return NextResponse.json({ error: "Failed to save to database" }, { status: 500 });
        }
    } else {
        console.warn("Supabase not configured, skipping database insert.");
    }

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your-resend-api-key") {
        try {
            await resend.emails.send({
                from: "Flux <onboarding@resend.dev>",
                to: [email],
                subject: "We've received your build request!",
                html: `
                    <h1>Hi ${name},</h1>
                    <p>Thanks for choosing Flux! We've received your request to build <strong>${businessName}</strong>.</p>
                    <p>Our team is reviewing your details and we'll get started right away.</p>
                    <p>You can expect your first draft in 48-72 hours.</p>
                    <p>Best,<br/>The Flux Team</p>
                `,
            });
            
            // Send notification to admin
            await resend.emails.send({
                from: "Flux System <onboarding@resend.dev>",
                to: ["admin@flux.com"], // Placeholder admin email
                subject: `New Intake: ${businessName}`,
                html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
            });
        } catch (emailError) {
            console.error("Email Error:", emailError);
            // Don't fail the whole request if email fails
        }
    } else {
        console.warn("Resend not configured, skipping email.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
