"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, Avatar, Stack } from "@mui/material";
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
            Websites without <br/> the wait.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#888', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            Skip the long meetings and high costs. We build high-quality websites in days, not months.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 15 }}>
          <Box sx={{ maxWidth: 800, mx: 'auto', mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.1rem' }}>Why we started</Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#aaa', mb: 3, lineHeight: 1.8 }}>
              Building a website used to be a headache. It was too slow, too expensive, and often confusing. Business owners were waiting months for sites that should have taken days.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#aaa', lineHeight: 1.8 }}>
              We built Flux to fix that. Our technology handles the hard work of coding and designing, so you can focus on running your business. We don't just "make a page"—we build a site that looks great and helps you grow.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Ready in 48 Hours", desc: "Speed is our superpower. Most sites are ready for you to review in just two days." },
              { title: "You Own Everything", desc: "It's your site. You get all the files and the code. No hidden fees or monthly lock-ins." },
              { title: "Smart & Simple", desc: "Our system writes the text and picks the best layout for your industry, so you don't have to." }
            ].map((v, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Box sx={{ p: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', height: '100%' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{v.title}</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.7 }}>{v.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box component="section" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 8 }}>The Team</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={10} justifyContent="center">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 120, height: 120, mb: 3, background: 'linear-gradient(135deg, #333, #111)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '2rem', fontWeight: 800 }}>JM</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Jeremy McSpadden</Typography>
              <Typography sx={{ color: '#0070f3', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1rem' }}>Founder</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 120, height: 120, mb: 3, background: 'linear-gradient(135deg, #333, #111)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '2rem', fontWeight: 800 }}>AI</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Flux AI</Typography>
              <Typography sx={{ color: '#0070f3', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1rem' }}>Smart Builder</Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
