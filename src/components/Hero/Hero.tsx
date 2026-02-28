"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import Magnetic from "@/components/ui/Magnetic";
import VisionPortal from "./VisionPortal";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } 
    },
  };

  return (
    <Box 
      component="section" 
      sx={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      {/* Cinematic Grain/Texture Overlay */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        zIndex: 1
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <MotionBox 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Stack spacing={4}>
            <MotionBox variants={itemVariants}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#d6c5a5', 
                  fontWeight: 800, 
                  letterSpacing: '0.4rem',
                  display: 'block',
                  mb: 2
                }}
              >
                FUTURE OF SYNTHESIS
              </Typography>
            </MotionBox>

            <MotionTypography 
              variants={itemVariants} 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3.5rem', md: '7.5rem' },
                lineHeight: 0.9,
                color: '#fff',
                maxWidth: '900px'
              }}
            >
              Digital <br/> Mastery <br/> 
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.1)', fontStyle: 'italic' }}>Synthesized.</Box>
            </MotionTypography>
            
            <MotionBox variants={itemVariants} sx={{ maxWidth: '500px', pt: 4 }}>
              <Typography 
                sx={{ 
                  fontSize: '1.125rem',
                  color: '#666',
                  lineHeight: 1.8,
                  mb: 6,
                  fontWeight: 300
                }}
              >
                We build elite digital experiences for visionaries who refuse to wait. 
                Your brand, architected and live in 48 hours.
              </Typography>
              
              <Stack direction="row" spacing={4} alignItems="center">
                <Magnetic intensity={0.1}>
                  <Button 
                    component={Link} 
                    href="/intake" 
                    variant="contained"
                    sx={{ 
                      backgroundColor: '#d6c5a5', 
                      color: '#000', 
                      px: 5,
                      py: 2,
                      fontSize: '0.8rem',
                      fontWeight: 900
                    }}
                  >
                    Initiate Build
                  </Button>
                </Magnetic>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 40, height: 1, bgcolor: 'rgba(214, 197, 165, 0.3)' }} />
                  <Typography variant="caption" sx={{ color: '#444', fontWeight: 800, letterSpacing: '0.1rem' }}>
                    EST. 2026
                  </Typography>
                </Box>
              </Stack>
            </MotionBox>
          </Stack>
        </MotionBox>
      </Container>

      {/* Side Vision Portal */}
      <Box sx={{ 
        position: 'absolute', 
        right: '-10%', 
        top: '50%', 
        transform: 'translateY(-50%)',
        width: '40vw',
        height: '40vw',
        opacity: 0.4,
        display: { xs: 'none', md: 'block' }
      }}>
        <VisionPortal />
      </Box>
    </Box>
  );
}
