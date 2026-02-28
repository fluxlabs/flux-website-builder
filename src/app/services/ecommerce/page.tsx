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
            Scale Your Sales <br/> with E-Commerce.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#666', maxWidth: 700, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
            Modern storefronts synthesized for speed, security, and seamless customer journeys.
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
            { icon: <ShoppingBag size={40} />, title: "Storefront Synthesis", desc: "Custom catalogs and product pages designed to showcase your inventory with premium aesthetics." },
            { icon: <Rocket size={40} />, title: "Lightning Fast Checkout", desc: "Optimized checkout flows that reduce abandonment and maximize your average order value." },
            { icon: <ShieldCheck size={40} />, title: "Secure & Reliable", desc: "Built-in security best practices and high-performance hosting to keep your business running 24/7." }
          ].map((v, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Box sx={{ p: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', height: '100%', transition: 'all 0.3s ease', '&:hover': { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', transform: 'translateY(-10px)' } }}>
                <Box sx={{ color: '#0070f3', mb: 3 }}>{v.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{v.title}</Typography>
                <Typography sx={{ color: '#888', lineHeight: 1.7 }}>{v.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 8, letterSpacing: '-0.1rem' }}>The Commerce Engine.</Typography>
          <Grid container spacing={8}>
            {[
              { title: "Inventory Sync", desc: "Connect your existing POS or ERP and let Flux handle the data architecture automatically." },
              { title: "Global Payments", desc: "Support for 135+ currencies and local payment methods via automated Stripe/Adyen integration." },
              { title: "SEO for Products", desc: "Structured data and rich snippets synthesized into every product page for maximum visibility." }
            ].map((v, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i} sx={{ textAlign: 'left' }}>
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
