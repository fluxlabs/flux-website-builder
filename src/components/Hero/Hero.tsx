"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Box, Typography, Button, Container, Stack, Divider } from "@mui/material";
import Magnetic from "@/components/ui/Magnetic";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import VisionPortal from "./VisionPortal";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    },
  };

  const trustedBrands = [
    "Acme Corp", "GlobalTech", "Nexus Industries", "Stark Enterprises", 
    "Waynea Corp", "Umbrella Corp", "Cyberdyne", "Massive Dynamic"
  ];

  return (
    <>
    <Box 
      component="section" 
      sx={{ 
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 15, md: 20 },
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      {/* Background Orbs */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(0, 112, 243, 0.05) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ textAlign: 'center' }}
        >
          <MotionBox variants={itemVariants} sx={{ mb: 6 }}>
            <VisionPortal />
          </MotionBox>
          
          <MotionTypography 
            variants={itemVariants} 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 800,
              letterSpacing: '-0.15rem',
              lineHeight: 1.1,
              mb: 4
            }}
          >
            The Digital Home <br/>
            <Box component="span" sx={{ color: '#888' }}>your business </Box>
            <Box component="span" sx={{ 
              background: 'linear-gradient(to right, #fff, #888)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>deserves.</Box>
          </MotionTypography>
          
          <MotionTypography 
            variants={itemVariants} 
            sx={{ 
              fontSize: { xs: '1.125rem', md: '1.5rem' },
              color: '#888',
              maxWidth: '750px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6
            }}
          >
            Stop waiting weeks for a developer. Flux transforms your vision into a 
            high-performance digital reality through intelligent synthesis in just 48 hours.
          </MotionTypography>
          
          <MotionBox variants={itemVariants} sx={{ mb: 10 }}>
            <Magnetic intensity={0.2}>
              <Button 
                component={Link} 
                href="/intake" 
                variant="contained"
                sx={{ 
                  backgroundColor: '#fff', 
                  color: '#000', 
                  borderRadius: '100px', 
                  px: { xs: 4, md: 6 },
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#eee' },
                  boxShadow: '0 20px 40px rgba(255,255,255,0.1)'
                }}
              >
                Start Your Build
              </Button>
            </Magnetic>
            <Typography sx={{ mt: 3, color: '#444', fontSize: '0.875rem', fontWeight: 600 }}>
              Join 50+ visionaries. No credit card required. Finalize after delivery.
            </Typography>
          </MotionBox>

          <MotionBox variants={itemVariants}>
            <Stack 
              direction="row" 
              spacing={4} 
              justifyContent="center" 
              divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />}
            >
              <Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>48h</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Delivery</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>99+</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Perf Score</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>24/7</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>AI Support</Typography>
              </Box>
            </Stack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
    <Box sx={{ mt: -8, position: 'relative', zIndex: 10 }}>
      <InfiniteMarquee items={trustedBrands} speed="slow" />
    </Box>
    </>
  );
}
