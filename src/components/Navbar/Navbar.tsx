"use client";

import Link from "next/link";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function Navbar() {
  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: { xs: 0, md: 24 }, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Box 
        sx={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: { xs: 0, md: '50px' },
          width: '100%',
          maxWidth: 1000,
          px: { xs: 2, md: 3 },
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
        }}
      >
        <Typography 
          variant="h6" 
          component={Link} 
          href="/" 
          sx={{ 
            fontWeight: 900, 
            color: '#111', 
            textDecoration: 'none',
            letterSpacing: '-0.05rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Flux<Box component="span" sx={{ 
            color: '#888',
            ml: '2px'
          }}>Webs</Box>
        </Typography>

        <Stack 
          direction="row" 
          spacing={4} 
          alignItems="center"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Typography component={Link} href="/#pricing" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s', '&:hover': { color: '#0055ff' } }}>Pricing</Typography>
          <Typography component={Link} href="/#portfolio" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s', '&:hover': { color: '#0055ff' } }}>Architectures</Typography>
          <Typography component={Link} href="/technology" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s', '&:hover': { color: '#0055ff' } }}>Engine</Typography>
          <Typography component={Link} href="/about" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s', '&:hover': { color: '#0055ff' } }}>About</Typography>
        </Stack>

        <Button 
          component={Link} 
          href="/intake" 
          variant="contained" 
          disableElevation
          sx={{ 
            backgroundColor: '#111', 
            color: '#fff', 
            borderRadius: '50px', 
            px: 3,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': { backgroundColor: '#333' }
          }}
        >
          Start Your Build
        </Button>
      </Box>
    </Box>
  );
}
