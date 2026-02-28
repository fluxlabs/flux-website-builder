"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, Button, Stack } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Zap, MousePointer2 } from "lucide-react";

const MotionTypography = motion(Typography);

export default function LandingPagesService() {
  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ textAlign: 'center', mb: 15 }}>
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
            High-Conversion <br/> Landing Pages.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#666', maxWidth: 700, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
            Stop losing leads. Our AI synthesizes landing pages designed for one thing: Results.
          </Typography>
          <Button 
            component={Link} 
            href="/intake" 
            variant="contained"
            sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              borderRadius: '60px', 
              px: 6, 
              py: 2, 
              fontWeight: 800,
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#eee' }
            }}
          >
            Start Your Build
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ mb: 20 }}>
          {[
            { icon: <Target size={40} />, title: "Precision Targeting", desc: "Our engine analyzes your target audience to generate copy that resonates and converts." },
            { icon: <Zap size={40} />, title: "48-Hour Delivery", desc: "From intake to live URL in under two days. Speed is your competitive advantage." },
            { icon: <MousePointer2 size={40} />, title: "A/B Ready", desc: "Architectures built on proven conversion patterns used by the world's top startups." }
          ].map((v, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{ p: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', height: '100%', transition: 'all 0.3s ease', '&:hover': { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', transform: 'translateY(-10px)' } }}>
                <Box sx={{ color: '#0070f3', mb: 3 }}>{v.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{v.title}</Typography>
                <Typography sx={{ color: '#888', lineHeight: 1.7 }}>{v.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 8, letterSpacing: '-0.1rem' }}>Engineered for Inbound.</Typography>
          <Grid container spacing={8}>
            {[
              { title: "Dynamic Content", desc: "Personalize headings and CTAs based on visitor source or behavior automatically." },
              { title: "Sub-100ms Load", desc: "Serialized assets and edge caching ensure your leads never wait for a page load." },
              { title: "Smart Forms", desc: "Integrated validation and enrichment to ensure every lead is a quality lead." }
            ].map((v, i) => (
              <Grid item xs={12} md={4} key={i} sx={{ textAlign: 'left' }}>
                <Box sx={{ borderLeft: '1px solid rgba(255,255,255,0.1)', pl: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0070f3' }}>{v.title}</Typography>
                  <Typography sx={{ color: '#666', lineHeight: 1.6 }}>{v.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
