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
            How we <br/> build.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#888', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            Our smart system takes your ideas and turns them into a professional, high-speed website.
          </Typography>
        </Box>

        <Stack spacing={12} sx={{ mb: 20 }}>
          {[
            { 
              icon: <Cpu size={32} />, 
              num: "01",
              title: "Learning your brand", 
              desc: "First, our system looks at your colors, logo, and business type. It learns the 'look and feel' that works best for your specific industry." 
            },
            { 
              icon: <Layers size={32} />, 
              num: "02",
              title: "Designing your site", 
              desc: "Using advanced AI, we create a custom layout just for you. This isn't a basic template—it's a site built from scratch to help your business stand out." 
            },
            { 
              icon: <GitBranch size={32} />, 
              num: "03",
              title: "Setting everything up", 
              desc: "We handle all the technical parts of setting up your site's files and folders. Everything is organized and ready for the modern web." 
            },
            { 
              icon: <Shield size={32} />, 
              num: "04",
              title: "The Quality Check", 
              desc: "Before you ever see the site, we run it through dozens of automatic tests. We check for errors, make sure it's fast, and ensure it works on every device." 
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
                color: '#fff',
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
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 8 }}>Built for Speed</Typography>
          <Grid container spacing={3}>
            {["High-Speed Hosting", "Secure Code", "Mobile Ready", "Custom Design", "SEO Built-In", "Full Ownership"].map((item) => (
              <Grid size={{ xs: 12, sm: 4 }} key={item}>
                <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', fontSize: '1.25rem', fontWeight: 700, color: '#666', transition: 'all 0.3s', '&:hover': { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.05)' } }}>
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
