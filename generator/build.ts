import fs from "fs-extra";
import path from "path";
import os from "os";
import { generateThemeCSS } from "./templates/seed-nextjs/src/lib/theme.ts";

interface PageSection {
  type: "features" | "testimonials" | "pricing" | "about" | "contact";
  data: any;
}

interface PageData {
  slug: string;
  title: string;
  hero: {
    headline: string;
    subtitle: string;
    cta: string;
  };
  sections: PageSection[];
}

interface GeneratedSiteData {
  siteTitle: string;
  brandColor: string;
  pages: PageData[];
}

export async function buildSite(intakeId: string, siteData: GeneratedSiteData) {
  const buildDir = path.join(os.tmpdir(), "flux-synthesis", intakeId);
  const templateDir = path.join(process.cwd(), "generator", "templates", "seed-nextjs");

  console.log(`Synthesizing build for ${siteData.siteTitle} in ${buildDir}...`);

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

  // 3. Inject Navbar Component (Simple for now)
  const navbarDir = path.join(buildDir, "src", "components", "Navbar");
  await fs.ensureDir(navbarDir);
  const navLinks = siteData.pages.map(p => ({
    label: p.title,
    href: p.slug === "index" ? "/" : `/${p.slug}`
  }));

  const navbarContent = `
    import Link from "next/link";

    export default function Navbar() {
      const links = ${JSON.stringify(navLinks)};
      return (
        <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>${siteData.siteTitle}</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {links.map(link => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      );
    }
  `;
  await fs.writeFile(path.join(navbarDir, "Navbar.tsx"), navbarContent);

  // 4. Inject Layout to include Navbar
  const layoutPath = path.join(buildDir, "src", "app", "layout.tsx");
  const layoutContent = `
    import type { Metadata } from "next";
    import "./globals.css";
    import Navbar from "@/components/Navbar/Navbar";
    import Footer from "@/components/Footer/Footer";

    export const metadata: Metadata = {
      title: "${siteData.siteTitle}",
      description: "Visionary experience synthesized by Flux.",
    };

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="en">
          <body>
            <Navbar />
            {children}
            <Footer siteTitle="${siteData.siteTitle}" />
          </body>
        </html>
      );
    }
  `;
  await fs.writeFile(layoutPath, layoutContent);

  // 5. Inject Pages
  for (const page of siteData.pages) {
    const pageDir = page.slug === "index" 
      ? path.join(buildDir, "src", "app")
      : path.join(buildDir, "src", "app", page.slug);
    
    await fs.ensureDir(pageDir);

    const pageContent = `
      import Hero from "@/components/Hero/Hero";
      import Features from "@/components/Features/Features";
      import Testimonials from "@/components/Testimonials/Testimonials";
      import ContactForm from "@/components/ContactForm/ContactForm";
      import Pricing from "@/components/Pricing/Pricing";

      export default function Page() {
        const pageData = ${JSON.stringify(page)};
        return (
          <main>
            <Hero 
              headline={pageData.hero.headline}
              subtitle={pageData.hero.subtitle}
              ctaText={pageData.hero.cta}
            />
            {pageData.sections.map((section: any, idx: number) => {
              switch (section.type) {
                case "features":
                case "about":
                  return <Features key={idx} features={section.data} />;
                case "testimonials":
                  return <Testimonials key={idx} testimonials={section.data} />;
                case "pricing":
                  return <Pricing key={idx} tiers={section.data} />;
                case "contact":
                  return <ContactForm key={idx} />;
                default:
                  return null;
              }
            })}
          </main>
        );
      }
    `;
    await fs.writeFile(path.join(pageDir, "page.tsx"), pageContent);
  }

  console.log(`Build synthesized successfully at ${buildDir}`);
  return buildDir;
}
