"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, Button, Stack } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Rocket, ShieldCheck } from "lucide-react";

const MotionTypography = motion(Typography);

export default function EcommerceService() {
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
            Sell your products <br/> online.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#888', maxWidth: 700, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
            We build fast, secure online stores that make it easy for your customers to find and buy what they need.
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
            { icon: <ShoppingBag size={40} />, title: "Beautiful product pages", desc: "Show off your items with high-quality layouts that make your products look their best." },
            { icon: <Rocket size={40} />, title: "Quick & easy checkout", desc: "A simple checkout process that helps your customers finish their purchase without any hassle." },
            { icon: <ShieldCheck size={40} />, title: "Safe & dependable", desc: "We use the best security practices to keep your store running and your customer data protected." }
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
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 8, letterSpacing: '-0.1rem' }}>Built for online sales.</Typography>
          <Grid container spacing={8}>
            {[
              { title: "Easy product management", desc: "Adding new items and changing prices is simple, even if you're not a tech expert." },
              { title: "Accept any payment", desc: "Make it easy for customers to pay with credit cards, Apple Pay, and more." },
              { title: "Get found on Google", desc: "We build your store with SEO in mind so more people can find your products online." }
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
