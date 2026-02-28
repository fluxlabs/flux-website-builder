"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, Button, Stack } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { Server, Globe, Cpu } from "lucide-react";

const MotionTypography = motion(Typography);

export default function SaasService() {
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
            SaaS Infrastructure <br/> at Light Speed.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#666', maxWidth: 700, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
            Founders: Stop building your own boilerplate. Let Flux synthesize your core architecture in 72 hours.
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
            { icon: <Server size={40} />, title: "Core Boilerplate", desc: "Everything you need to launch: Auth, Database, API routes, and clean App Router architecture." },
            { icon: <Globe size={40} />, title: "Global Edge", desc: "Deployment-ready infrastructure optimized for sub-10ms latency across the globe." },
            { icon: <Cpu size={40} />, title: "AI-Augmented Code", desc: "High-performance TypeScript code synthesized by our engine, following strict modern patterns." }
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
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 8, letterSpacing: '-0.1rem' }}>Synthesize Your Scale.</Typography>
          <Grid container spacing={8}>
            {[
              { title: "Auth Architect", desc: "Automated setup of complex RBAC and multi-tenant authentication systems." },
              { title: "Database Schema", desc: "Optimized PostgreSQL migrations and types generated from your business requirements." },
              { title: "API Synthesis", desc: "REST or GraphQL architectures synthesized with full documentation and testing suites." }
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
