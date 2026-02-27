import { supabase } from "../src/lib/supabase.ts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

interface IntakeData {
  id: string;
  business_name: string;
  name: string;
  email: string;
  phone?: string;
  has_website?: boolean;
  current_url?: string;
  industry?: string;
  location?: string;
  employee_count?: string;
  vertical?: string;
  layout?: string;
  goal: string;
  brand_voice: string;
  target_audience: string;
  hero_message: string;
  colors: string;
  pages: string[];
}

interface PageContent {
  slug: string;
  title: string;
  hero: {
    headline: string;
    subtitle: string;
    cta: string;
  };
  sections: Array<{
    type: "features" | "testimonials" | "pricing" | "about" | "contact";
    data: any;
  }>;
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
  const requestedPages = typedIntake.pages || ["Home"];

  const bizName = typedIntake.business_name || typedIntake.current_url || "The Business";
  
  // 2. AI Research Phase
  console.log(`Initiating AI research phase for ${bizName}...`);
  let researchContext = "";
  
  try {
    const researchPrompt = `
      You are an expert market researcher and web strategist.
      Analyze the following business profile:
      - Name: ${bizName}
      - Industry/Vertical: ${typedIntake.industry || typedIntake.vertical || 'General Business'}
      - Macro-Vertical: ${typedIntake.vertical || 'Services'}
      - Location: ${typedIntake.location || 'Global/Online'}
      - Size: ${typedIntake.employee_count || 'Unknown'} employees
      - Target Audience: ${typedIntake.target_audience}
      - Primary Goal: ${typedIntake.goal}
      
      Provide a brief (2-3 paragraphs) deep-dive competitive analysis and content strategy.
      What are the specific pain points of customers in this specific industry and location?
      What tone and messaging works best to convert them?
    `;
    const researchResult = await model.generateContent(researchPrompt);
    researchContext = (await researchResult.response).text();
    console.log("Research complete.");
  } catch (err) {
    console.warn("AI Research phase failed, proceeding with basic context.", err);
    researchContext = "Standard industry best practices apply.";
  }

  // 3. Construct the Prompt for the LLM
  const prompt = `
    You are an elite, award-winning web designer and creative strategist. 
    Your mission is to manifest a visionary digital experience for:
    
    BUSINESS: ${bizName}
    INDUSTRY: ${typedIntake.industry || "N/A"}
    VERTICAL CATEGORY: ${typedIntake.vertical || "N/A"}
    DESIGN LAYOUT STYLE: ${typedIntake.layout || "Modern Clean"}
    LOCATION: ${typedIntake.location || "N/A"}
    VISIONARY GOAL: ${typedIntake.goal}
    TARGET AUDIENCE: ${typedIntake.target_audience}
    BRAND PERSONALITY: ${typedIntake.brand_voice}
    THE CORE MANIFESTO: ${typedIntake.hero_message}
    BRAND COLOR: ${typedIntake.colors}

    --- STRATEGIC RESEARCH CONTEXT ---
    ${researchContext}
    ----------------------------------

    --- DESIGN DIRECTIVE ---
    The client has explicitly requested a "${typedIntake.layout}" aesthetic.
    - If "Clean & Corporate": Use high-trust elements, structured grids, and clear hierarchy.
    - If "Bold & Brutalist": Use oversized typography, raw layouts, high contrast, and unconventional elements.
    - If "Luxury & Minimal": Use massive whitespace, sophisticated serif/sans-serif pairings, and subtle transitions.
    - If "Playful & Vibrant": Use rounded shapes, friendly copy, and energetic color applications.
    
    CRITICAL: Ensure this website is entirely unique. Avoid all clichés. The architecture must feel custom-built for ${bizName}.
    ------------------------

    REQUESTED PAGES: ${requestedPages.join(", ")}

    Your output must be sophisticated, evocative, and high-conversion. 
    Incorporate local flavor if a location is provided, and speak directly to industry pain points based on the research context.
    Avoid generic SaaS copy. Use punchy, memorable language that "WOWs" the visitor.

    Return a JSON object with this exact structure:
    {
      "siteTitle": "${bizName}",
      "brandColor": "${typedIntake.colors}",
      "pages": [
        {
          "slug": "index", // use "index" for the home page, and kebap-case for others
          "title": "Page Title",
          "hero": {
            "headline": "An evocative, punchy headline",
            "subtitle": "A sophisticated subheadline",
            "cta": "A unique CTA"
          },
          "sections": [
            { 
              "type": "features", 
              "data": [
                { "title": "Visionary benefit", "description": "Sophisticated description" },
                { "title": "Visionary benefit", "description": "Sophisticated description" },
                { "title": "Visionary benefit", "description": "Sophisticated description" }
              ] 
            },
            {
              "type": "testimonials",
              "data": [
                { "name": "Name", "role": "Role", "quote": "Evocative quote" }
              ]
            }
          ]
        }
      ]
    }
    
    Generate content for ALL requested pages: ${requestedPages.join(", ")}.
    The "Home" page should be slug "index".
    "About" page should have sections describing the mission.
    "Services" should have features/pricing.
    "Contact" should have a contact form section.

    CRITICAL: ONLY RETURN THE JSON OBJECT. NO MARKDOWN. NO PREAMBLE.
  `;

  console.log("Generating vision for:", bizName);
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonString);
  } catch (err) {
    console.warn("Gemini API error, falling back to placeholder:", err);
    return {
      siteTitle: bizName,
      brandColor: typedIntake.colors,
      pages: requestedPages.map(page => ({
        slug: page.toLowerCase() === "home" ? "index" : page.toLowerCase().replace(/ /g, "-"),
        title: page,
        hero: {
          headline: `${typedIntake.hero_message || bizName}`,
          subtitle: `Revolutionizing ${typedIntake.target_audience || "the industry"} with ${typedIntake.brand_voice} excellence.`,
          cta: "Discover the Vision"
        },
        sections: [
          {
            type: "features",
            data: [
              { title: "Precision Crafted", description: `Built specifically to achieve your goal of ${typedIntake.goal}.` },
              { title: "Visionary Design", description: `A ${typedIntake.brand_voice} aesthetic that resonates with ${typedIntake.target_audience}.` },
              { title: "Rapid Manifestation", description: "Your digital presence brought to life in record time." }
            ]
          }
        ]
      }))
    };
  }
}
