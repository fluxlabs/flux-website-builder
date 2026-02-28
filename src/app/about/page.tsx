"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid2 as Grid, Avatar, Stack } from "@mui/material";
import { motion } from "framer-motion";

const MotionTypography = motion(Typography);

export default function AboutPage() {
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
            The End of the <br/> Web Agency.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#666', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            We didn't build a better agency. We built an engine to replace them.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 15 }}>
          <Box sx={{ maxWidth: 800, mx: 'auto', mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.1rem' }}>Our Origins</Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#888', mb: 3, lineHeight: 1.8 }}>
              Flux was born in 2024 out of a simple observation: the traditional web development process was broken. It was too slow, too expensive, and too prone to human error. Founders were waiting months for sites that should have taken days.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#888', lineHeight: 1.8 }}>
              We spent two years developing our proprietary Synthesis Engine—an AI architecture that doesn't just "generate code," but understands brand identity, conversion psychology, and modern performance standards.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Speed as a Feature", desc: "In the digital age, being first matters more than being perfect. We deliver high-fidelity builds in 48-72 hours." },
              { title: "Full Ownership", desc: "We believe in an open web. You own your code, your repository, and your destiny. No vendor lock-in." },
              { title: "AI-First, Human-Refined", desc: "Our engine handles the heavy lifting, allowing our team to focus on the unique creative flourishes that make your brand stand out." }
            ].map((v, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Box sx={{ p: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', height: '100%' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{v.title}</Typography>
                  <Typography sx={{ color: '#666', lineHeight: 1.7 }}>{v.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box component="section" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 8 }}>The Founders</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={10} justifyContent="center">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 120, height: 120, mb: 3, background: 'linear-gradient(135deg, #333, #111)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '2rem', fontWeight: 800 }}>JM</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Jeremy McSpadden</Typography>
              <Typography sx={{ color: '#0070f3', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1rem' }}>Architect & CEO</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 120, height: 120, mb: 3, background: 'linear-gradient(135deg, #333, #111)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '2rem', fontWeight: 800 }}>AI</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Flux Core</Typography>
              <Typography sx={{ color: '#0070f3', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1rem' }}>Synthesis Engine v2.4</Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
