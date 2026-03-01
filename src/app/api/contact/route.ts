// Flux Website Builder — Contact Form API
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "jeremy@fluxlabs.net";

    await resend.emails.send({
      from: "Flux <hello@fluxwebs.net>",
      to: [adminEmail],
      replyTo: email,
      subject: `Contact Form: ${subject || "General Inquiry"} — ${name}`,
      html: `
        <div style="background:#000;color:#fff;font-family:sans-serif;padding:40px;max-width:600px;margin:auto;border:1px solid #111;">
          <h1 style="color:#d6c5a5;font-size:18px;margin-bottom:24px;">[CONTACT FORM SUBMISSION]</h1>
          <table style="width:100%;border-collapse:collapse;color:#fff;font-size:14px;">
            <tr><td style="padding:8px 0;color:#444;">NAME</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;color:#444;">EMAIL</td><td>${email}</td></tr>
            <tr><td style="padding:8px 0;color:#444;">SUBJECT</td><td>${subject || "General Inquiry"}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#050505;border:1px solid #111;">
            <p style="margin:0;color:#888;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Message</p>
            <p style="margin:8px 0 0;color:#fff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
