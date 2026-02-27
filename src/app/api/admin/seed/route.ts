import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  console.log("Seed API triggered");
  try {
    const testLead = {
      name: "Elon Musk",
      email: "elon@spacex.com",
      business_name: "Mars Colonization Corp",
      current_url: "https://spacex.com",
      links: "https://tesla.com, https://x.com",
      goal: "Sell Products",
      brand_voice: "Bold & Playful",
      target_audience: "Interplanetary Explorers",
      hero_message: "Making life multi-planetary, one rocket at a time.",
      colors: "#ff4500",
      logo_url: "",
      pages: ["Home", "About", "Rockets", "Contact"],
      status: "new"
    };

    console.log("Inserting test lead into Supabase...");
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy")) {
        console.error("CRITICAL: Supabase URL is not configured correctly.");
        return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("intakes")
      .insert([testLead])
      .select();

    if (error) {
      console.error("Supabase Seed Error:", error);
      throw error;
    }

    console.log("Seed successful, data created:", data);
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Failed to seed test data" }, { status: 500 });
  }
}
