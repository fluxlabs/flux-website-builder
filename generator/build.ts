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
    "use client";
    import Link from "next/link";
    import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

    export default function Navbar() {
      const links = ${JSON.stringify(navLinks)};
      return (
        <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" component={Link} href="/" sx={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
                ${siteData.siteTitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {links.map(link => (
                  <Button key={link.href} component={Link} href={link.href} sx={{ color: '#333', textTransform: 'none', fontWeight: 500 }}>
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
    }
  `;
  await fs.writeFile(path.join(navbarDir, "Navbar.tsx"), navbarContent);

  // 4. Inject Layout to include Navbar and MUI Theme
  const layoutPath = path.join(buildDir, "src", "app", "layout.tsx");
  const layoutContent = `
    import type { Metadata } from "next";
    import "./globals.css";
    import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
    import { ThemeProvider, createTheme } from '@mui/material/styles';
    import CssBaseline from '@mui/material/CssBaseline';
    import Navbar from "@/components/Navbar/Navbar";
    import Footer from "@/components/Footer/Footer";

    const theme = createTheme({
      palette: {
        primary: { main: '${siteData.brandColor}' },
      },
    });

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
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                {children}
                <Footer siteTitle="${siteData.siteTitle}" />
              </ThemeProvider>
            </AppRouterCacheProvider>
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
      import { Box } from "@mui/material";

      export default function Page() {
        const pageData = ${JSON.stringify(page)};
        return (
          <Box component="main">
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
          </Box>
        );
      }
    `;
    await fs.writeFile(path.join(pageDir, "page.tsx"), pageContent);
  }

  console.log(`Build synthesized successfully at ${buildDir}`);
  return buildDir;
}
