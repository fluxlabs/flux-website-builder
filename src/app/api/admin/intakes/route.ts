import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("intakes")
      .select("*")
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
