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
            Pages that get <br/> you customers.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#888', maxWidth: 700, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
            Stop losing potential business. We build simple, beautiful pages designed to get people to call or email you.
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
            { icon: <Target size={40} />, title: "Built for your audience", desc: "We study your customers to write text that makes them want to work with you." },
            { icon: <Zap size={40} />, title: "Ready in 2 days", desc: "From start to finish in just 48 hours. We move as fast as your business does." },
            { icon: <MousePointer2 size={40} />, title: "Proven designs", desc: "We use layouts that are already proven to work for successful businesses." }
          ].map((v, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Box sx={{ p: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', height: '100%', transition: 'all 0.3s ease', '&:hover': { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', transform: 'translateY(-10px)' } }}>
                <Box sx={{ color: '#fff', mb: 3 }}>{v.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{v.title}</Typography>
                <Typography sx={{ color: '#888', lineHeight: 1.7 }}>{v.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 8, letterSpacing: '-0.1rem' }}>Built to grow your business.</Typography>
          <Grid container spacing={8}>
            {[
              { title: "Smart messaging", desc: "We use words that speak directly to what your customers are looking for." },
              { title: "Super fast loading", desc: "No one likes waiting. Your pages will load almost instantly on any device." },
              { title: "Easy contact forms", desc: "We make it incredibly simple for people to reach out and ask about your services." }
            ].map((v, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i} sx={{ textAlign: 'left' }}>
                <Box sx={{ borderLeft: '1px solid rgba(255,255,255,0.1)', pl: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>{v.title}</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.6 }}>{v.desc}</Typography>
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
