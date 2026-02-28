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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
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
        pt: { xs: 15, md: 20 },
        pb: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
        background: '#fafafa'
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, rgba(0, 85, 255, 0.03) 0%, transparent 60%)',
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
              fontSize: { xs: '3.5rem', md: '6rem' },
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.05,
              mb: 4,
              color: '#111'
            }}
          >
            The Digital Home <br/>
            <Box component="span" sx={{ color: '#888', fontWeight: 400 }}>your business </Box>
            deserves.
          </MotionTypography>
          
          <MotionTypography 
            variants={itemVariants} 
            sx={{ 
              fontSize: { xs: '1.125rem', md: '1.5rem' },
              color: '#555',
              maxWidth: '650px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.5,
              fontWeight: 400
            }}
          >
            Stop waiting weeks for a developer. Flux transforms your vision into a 
            high-performance digital reality through intelligent synthesis in just 48 hours.
          </MotionTypography>
          
          <MotionBox variants={itemVariants} sx={{ mb: 10 }}>
            <Magnetic intensity={0.1}>
              <Button 
                component={Link} 
                href="/intake" 
                variant="contained"
                disableElevation
                sx={{ 
                  backgroundColor: '#0055ff', 
                  color: '#fff', 
                  borderRadius: '100px', 
                  px: { xs: 4, md: 5 },
                  py: 1.8,
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#0044cc' },
                  boxShadow: '0 8px 24px rgba(0, 85, 255, 0.25)'
                }}
              >
                Start Your Build
              </Button>
            </Magnetic>
            <Typography sx={{ mt: 3, color: '#888', fontSize: '0.875rem', fontWeight: 500 }}>
              Join 50+ visionaries. No credit card required. Finalize after delivery.
            </Typography>
          </MotionBox>

          <MotionBox variants={itemVariants}>
            <Stack 
              direction="row" 
              spacing={5} 
              justifyContent="center" 
              divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />}
            >
              <Box>
                <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#111' }}>48h</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Delivery</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#111' }}>99+</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Perf Score</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#111' }}>24/7</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>AI Support</Typography>
              </Box>
            </Stack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
    <Box sx={{ pb: 8, position: 'relative', zIndex: 10, background: '#fafafa', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <InfiniteMarquee items={trustedBrands} speed="slow" />
    </Box>
    </>
  );
}
