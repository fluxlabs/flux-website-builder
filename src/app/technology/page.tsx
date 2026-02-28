"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Cpu, Layers, GitBranch, Shield } from "lucide-react";

const MotionTypography = motion(Typography);

export default function TechnologyPage() {
  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box component="header" sx={{ textAlign: 'center', mb: 15 }}>
          <MotionTypography 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '5rem' }, 
              fontWeight: 800, 
              mb: 3,
              letterSpacing: '-0.2rem',
              lineHeight: 1,
              background: 'linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            The Synthesis <br/> Stack.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#666', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            Our proprietary engine transforms abstract brand concepts into optimized production code.
          </Typography>
        </Box>

        <Stack spacing={12} sx={{ mb: 20 }}>
          {[
            { 
              icon: <Cpu size={32} />, 
              num: "01",
              title: "Identity Ingestion", 
              desc: "The engine begins by analyzing your intake data—colors, layout preferences, and brand voice. It doesn't just copy inputs; it understands the 'vibe' of your industry." 
            },
            { 
              icon: <Layers size={32} />, 
              num: "02",
              title: "Neural Layout Generation", 
              desc: "We use a specialized LLM pipeline to synthesize a bespoke digital architecture. This isn't a template selection—it's a custom-built Next.js App Router structure generated in real-time." 
            },
            { 
              icon: <GitBranch size={32} />, 
              num: "03",
              title: "Automated Provisioning", 
              desc: "Flux programmatically creates a GitHub repository, pushes the generated code, and triggers a Vercel deployment hook. Everything is version-controlled from the first second." 
            },
            { 
              icon: <Shield size={32} />, 
              num: "04",
              title: "Compilation Guardrails", 
              desc: "Before a site ever reaches your eyes, it must pass an automated 'Synthesis Audit.' We run full build checks, linting, and accessibility scans to ensure zero-error delivery." 
            }
          ].map((step, i) => (
            <Box key={i} sx={{ display: 'flex', gap: { xs: 4, md: 8 }, alignItems: 'flex-start', maxWidth: 900, mx: 'auto', flexDirection: { xs: 'column', md: 'row' }, textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.05)', 
                borderRadius: '20px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                color: '#0070f3',
                flexShrink: 0,
                mx: { xs: 'auto', md: 0 }
              }}>
                {step.icon}
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#fff' }}>
                  <Box component="span" sx={{ color: '#444', mr: 2 }}>{step.num}.</Box>
                  {step.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#888' }}>
                  {step.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Box component="section" sx={{ textAlign: 'center', p: { xs: 5, md: 10 }, background: 'rgba(255, 255, 255, 0.01)', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 8 }}>Built on the Edge</Typography>
          <Grid container spacing={3}>
            {["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "Octokit"].map((item) => (
              <Grid item xs={12} sm={4} key={item}>
                <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', fontSize: '1.25rem', fontWeight: 700, color: '#444', transition: 'all 0.3s', '&:hover': { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.05)' } }}>
                  {item}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
