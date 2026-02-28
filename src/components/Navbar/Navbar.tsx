"use client";

import Link from "next/link";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <Box 
      component="nav"
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        px: { xs: 3, md: 6 },
        py: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        pointerEvents: 'none'
      }}
    >
      <Typography 
        variant="h6" 
        component={Link} 
        href="/" 
        sx={{ 
          fontWeight: 900, 
          color: '#fff', 
          textDecoration: 'none',
          letterSpacing: '0.2rem',
          textTransform: 'uppercase',
          fontSize: '1rem',
          pointerEvents: 'auto'
        }}
      >
        Flux<Box component="span" sx={{ color: '#d6c5a5' }}>.</Box>
      </Typography>

      <Stack 
        direction="row" 
        spacing={6} 
        alignItems="center"
        sx={{ 
          display: { xs: 'none', md: 'flex' },
          pointerEvents: 'auto'
        }}
      >
                {['Our Work', 'Technology', 'Blog', 'About'].map((item) => (
                  <Typography 
                    key={item}
                    component={Link} 
                    href={item === 'Our Work' ? '/#portfolio' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    sx={{ 
                      color: 'rgba(255,255,255,0.5)', 
                      textDecoration: 'none', 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      letterSpacing: '0.15rem',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: '#d6c5a5', letterSpacing: '0.25rem' } 
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
        
              <Box sx={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Typography 
                  component={Link} 
                  href="/intake"
                  sx={{ 
                    color: '#fff', 
                    textDecoration: 'none', 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1rem', 
                    borderBottom: '1px solid #d6c5a5',
                    pb: 0.5,
                    '&:hover': { color: '#d6c5a5' }
                  }}
                >
                  Get Started
                </Typography>        <IconButton sx={{ color: '#fff', p: 0 }}>
          <Menu size={20} />
        </IconButton>
      </Box>
    </Box>
  );
}
