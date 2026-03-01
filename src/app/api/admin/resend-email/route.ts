import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { intakeId, type } = await req.json();

    if (!intakeId || !type) {
      return NextResponse.json({ error: "Missing intakeId or type" }, { status: 400 });
    }

    const { data: intake, error: fetchError } = await supabaseAdmin
      .from("intakes")
      .select("*")
      .eq("id", intakeId)
      .single();

    if (fetchError || !intake) {
      return NextResponse.json({ error: "Intake not found" }, { status: 404 });
    }

    let emailOptions: any = null;

    if (type === "welcome") {
      emailOptions = {
        from: "Flux <hello@fluxwebs.net>",
        to: [intake.email],
        subject: "Vision Received: Your build has started",
        html: `
            <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #111;">
                <h1 style="color: #fff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 40px; text-transform: uppercase;">
                    FLUX<span style="color: #d6c5a5;">.</span>
                </h1>
                
                <h2 style="font-size: 32px; font-weight: 400; margin-bottom: 20px; line-height: 1.2;">Hi ${intake.name}, your vision has been received.</h2>
                
                <p style="color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    We've successfully received your request to build <strong>${intake.business_name || intake.current_url}</strong>. 
                    Our AI synthesis engine and design team are already beginning the research phase.
                </p>
                
                <div style="background: #050505; border: 1px solid #111; padding: 24px; margin-bottom: 30px;">
                    <p style="margin: 0; color: #d6c5a5; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Next Steps</p>
                    <p style="margin: 8px 0 0; color: #fff; font-size: 14px;">Your first draft will be ready in <strong>48-72 hours</strong>. You can track the live build progress at any time using the link below.</p>
                </div>

                <a href="https://fluxwebs.net/status/${intake.id}" style="display: inline-block; background-color: #fff; color: #000; padding: 16px 32px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                    Track Live Build →
                </a>

                <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                
                <p style="font-size: 12px; color: #444; text-transform: uppercase; letter-spacing: 1px;">
                    Synthesized by Flux Webs<br/>
                    <a href="https://fluxwebs.net" style="color: #444; text-decoration: none;">fluxwebs.net</a>
                </p>
            </div>
        `,
      };
    } else if (type === "review") {
      if (!intake.staging_url) {
        return NextResponse.json({ error: "No staging URL found for this intake" }, { status: 400 });
      }
      emailOptions = {
        from: "Flux <hello@fluxwebs.net>",
        to: [intake.email],
        subject: "Synthesis Complete: Your Vision is Live 🚀",
        html: `
            <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #111;">
                <h1 style="color: #fff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 40px; text-transform: uppercase;">
                    FLUX<span style="color: #d6c5a5;">.</span>
                </h1>
                
                <h2 style="font-size: 32px; font-weight: 400; margin-bottom: 20px; line-height: 1.2;">Your website is ready for review.</h2>
                
                <p style="color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    Our synthesis engine has successfully built <strong>${intake.business_name || intake.current_url || 'your project'}</strong>. Your professional, custom-synthesized digital presence is now live in a staging environment.
                </p>
                
                <div style="background: #050505; border: 1px solid #d6c5a5; padding: 32px; margin-bottom: 40px; text-align: center;">
                    <a href="${intake.staging_url}" style="display: inline-block; background-color: #fff; color: #000; padding: 16px 40px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                        View Staging Site →
                    </a>
                </div>

                <p style="color: #888; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
                    Take a look and let us know what you think. If everything looks correct, you can approve the build from your dashboard to proceed with launching on your own domain.
                </p>

                <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                
                <p style="font-size: 12px; color: #444; text-transform: uppercase; letter-spacing: 1px;">
                    Synthesized by Flux Webs<br/>
                    <a href="https://fluxwebs.net" style="color: #444; text-decoration: none;">fluxwebs.net</a>
                </p>
            </div>
        `
      };
    } else if (type === "approved") {
        emailOptions = {
            from: "Flux <hello@fluxwebs.net>",
            to: [intake.email],
            subject: "Build Approved: Preparing for Launch 🏁",
            html: `
                <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #111;">
                    <h1 style="color: #fff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 40px; text-transform: uppercase;">
                        FLUX<span style="color: #d6c5a5;">.</span>
                    </h1>
                    
                    <h2 style="font-size: 32px; font-weight: 400; margin-bottom: 20px; line-height: 1.2;">Vision Approved.</h2>
                    
                    <p style="color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        We're thrilled to hear you're happy with the build for <strong>${intake.business_name || intake.current_url || 'your project'}</strong>. Our team is now finalizing the production environment and preparing for deployment to your custom domain.
                    </p>
                    
                    <div style="background: #050505; border: 1px solid #111; padding: 24px; margin-bottom: 30px;">
                        <p style="margin: 0; color: #d6c5a5; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">What's Next?</p>
                        <p style="margin: 8px 0 0; color: #fff; font-size: 14px;">We'll reach out shortly with DNS instructions to point your domain to our production edge servers.</p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                    
                    <p style="font-size: 12px; color: #444; text-transform: uppercase; letter-spacing: 1px;">
                        Synthesized by Flux Webs<br/>
                        <a href="https://fluxwebs.net" style="color: #444; text-decoration: none;">fluxwebs.net</a>
                    </p>
                </div>
            `
        };
    } else if (type === "live") {
        emailOptions = {
            from: "Flux <hello@fluxwebs.net>",
            to: [intake.email],
            subject: "Congratulations: Your Vision is Live 🌍",
            html: `
                <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #111;">
                    <h1 style="color: #fff; font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 40px; text-transform: uppercase;">
                        FLUX<span style="color: #d6c5a5;">.</span>
                    </h1>
                    
                    <h2 style="font-size: 32px; font-weight: 400; margin-bottom: 20px; line-height: 1.2;">You are officially live.</h2>
                    
                    <p style="color: #888; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        The synthesis of <strong>${intake.business_name || intake.current_url || 'your project'}</strong> is complete and now live for the world to see. Your digital presence is officially part of the Flux network.
                    </p>
                    
                    <div style="background: #050505; border: 1px solid #d6c5a5; padding: 32px; margin-bottom: 40px; text-align: center;">
                        <a href="${intake.staging_url || '#'}" style="display: inline-block; background-color: #fff; color: #000; padding: 16px 40px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                            Visit Your Site →
                        </a>
                    </div>

                    <hr style="border: none; border-top: 1px solid #111; margin: 40px 0;" />
                    
                    <p style="font-size: 12px; color: #444; text-transform: uppercase; letter-spacing: 1px;">
                        Synthesized by Flux Webs<br/>
                        <a href="https://fluxwebs.net" style="color: #444; text-decoration: none;">fluxwebs.net</a>
                    </p>
                </div>
            `
        };
    }

    if (!emailOptions) {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    await resend.emails.send(emailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend Email Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
