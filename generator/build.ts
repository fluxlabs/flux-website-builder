import fs from "fs-extra";
import path from "path";
import os from "os";
import { generateThemeCSS } from "./templates/seed-nextjs/src/lib/theme.ts";

interface GeneratedSiteData {
  hero: {
    headline: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{ title: string; description: string }>;
  testimonials: Array<{ name: string; role: string; quote: string }>;
  brandColor: string;
  siteTitle: string;
}

export async function buildSite(intakeId: string, siteData: GeneratedSiteData) {
  const buildDir = path.join(os.tmpdir(), "flux-manifests", intakeId);
  const templateDir = path.join(process.cwd(), "generator", "templates", "seed-nextjs");

  console.log(`Manifesting build for ${siteData.siteTitle} in ${buildDir}...`);

  // 1. Clean and Copy template to build directory
  await fs.remove(buildDir);
  await fs.ensureDir(buildDir);
  await fs.copy(templateDir, buildDir, {
    filter: (src) => !src.includes('.git') && !src.includes('node_modules')
  });

  // 2. Inject Theme CSS
  const globalsPath = path.join(buildDir, "src", "app", "globals.css");
  const themeCSS = generateThemeCSS(siteData.brandColor);
  await fs.writeFile(globalsPath, themeCSS);

  // 3. Inject Page Content
  const pagePath = path.join(buildDir, "src", "app", "page.tsx");
  const pageContent = `
    import Hero from "@/components/Hero/Hero";
    import Features from "@/components/Features/Features";
    import Testimonials from "@/components/Testimonials/Testimonials";
    import ContactForm from "@/components/ContactForm/ContactForm";

    export default function GeneratedPage() {
      const data = ${JSON.stringify(siteData)};
      return (
        <main>
          <Hero 
            headline={data.hero.headline}
            subtitle={data.hero.subtitle}
            ctaText={data.hero.cta}
          />
          <Features features={data.features} />
          {data.testimonials && <Testimonials testimonials={data.testimonials} />}
          <ContactForm />
        </main>
      );
    }
  `;
  await fs.writeFile(pagePath, pageContent);

  console.log(`Build manifested successfully at ${buildDir}`);
  return buildDir;
}
