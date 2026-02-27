import { supabase } from "../src/lib/supabase.ts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface IntakeData {
  id: string;
  business_name: string;
  name: string;
  email: string;
  goal: string;
  brand_voice: string;
  target_audience: string;
  hero_message: string;
  colors: string;
  pages: string[];
}

export async function generateSiteData(intakeId: string) {
  // 1. Fetch data from Supabase
  const { data: intake, error } = await supabase
    .from("intakes")
    .select("*")
    .eq("id", intakeId)
    .single();

  if (error || !intake) {
    throw new Error("Failed to fetch intake data");
  }

  const typedIntake = intake as IntakeData;

  // 2. Construct the Prompt for the LLM
  const prompt = `
    You are an elite, award-winning web designer and creative strategist. 
    Your mission is to manifest a visionary digital experience for:
    
    BUSINESS: ${typedIntake.business_name}
    VISIONARY GOAL: ${typedIntake.goal}
    TARGET AUDIENCE: ${typedIntake.target_audience}
    BRAND PERSONALITY: ${typedIntake.brand_voice}
    THE CORE MANIFESTO: ${typedIntake.hero_message}
    BRAND COLOR: ${typedIntake.colors}

    Your output must be sophisticated, evocative, and high-conversion. 
    Avoid generic SaaS copy. Use punchy, memorable language that "WOWs" the visitor.

    Return a JSON object with this exact structure:
    {
      "hero": {
        "headline": "An evocative, punchy headline that manifests the core vision",
        "subtitle": "A sophisticated subheadline that speaks directly to the soul of the target audience",
        "cta": "A unique, action-oriented CTA that isn't just 'Get Started'"
      },
      "features": [
        { "title": "A visionary benefit title", "description": "A sophisticated description of why this matters" },
        { "title": "A visionary benefit title", "description": "A sophisticated description of why this matters" },
        { "title": "A visionary benefit title", "description": "A sophisticated description of why this matters" }
      ],
      "testimonials": [
        { "name": "A prestigious customer name", "role": "Their high-end role", "quote": "An evocative and glowing review of the experience" },
        { "name": "A prestigious customer name", "role": "Their high-end role", "quote": "An evocative and glowing review of the experience" }
      ],
      "brandColor": "${typedIntake.colors}",
      "siteTitle": "${typedIntake.business_name}"
    }
    
    CRITICAL: ONLY RETURN THE JSON OBJECT. NO MARKDOWN. NO PREAMBLE.
  `;

  console.log("Generating vision for:", typedIntake.business_name);
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON if needed (Gemini sometimes adds ```json ... ```)
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonString);
  } catch (err) {
    console.warn("Gemini API error, falling back to placeholder:", err);
    return {
      hero: {
        headline: `${typedIntake.hero_message || "Elevate your digital presence"}`,
        subtitle: `The ultimate solution for ${typedIntake.target_audience || "your business"} built by Flux.`,
        cta: "Get Started Now"
      },
      features: [
        { title: "Rapid Turnaround", description: "Your custom vision delivered in 48-72 hours." },
        { title: "AI-Powered Precision", description: "Meticulously crafted for your specific goals." },
        { title: "Modern Design", description: `A ${typedIntake.brand_voice} aesthetic that wows your customers.` }
      ],
      testimonials: [
        { name: "John Smith", role: "CEO, Acme Inc", quote: "The speed and quality are unmatched." },
        { name: "Jane Doe", role: "Founder, Growth Co", quote: "Flux transformed our digital presence overnight." }
      ],
      brandColor: typedIntake.colors,
      siteTitle: typedIntake.business_name
    };
  }
}
