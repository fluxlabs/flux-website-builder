"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'none'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Typography 
            variant="h6" 
            component={Link} 
            href="/" 
            sx={{ 
              fontWeight: 900, 
              color: '#fff', 
              textDecoration: 'none',
              letterSpacing: '-0.05rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Flux<Box component="span" sx={{ 
              background: 'linear-gradient(45deg, #0070f3 0%, #ff0080 50%, #0070f3 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              ml: '2px'
            }}>Webs</Box>
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Button component={Link} href="/technology" sx={{ color: '#aaa', '&:hover': { color: '#fff' }, fontWeight: 700, textTransform: 'none' }}>Technology</Button>
            <Button component={Link} href="/blog" sx={{ color: '#aaa', '&:hover': { color: '#fff' }, fontWeight: 700, textTransform: 'none' }}>Blog</Button>
            <Button component={Link} href="/faq" sx={{ color: '#aaa', '&:hover': { color: '#fff' }, fontWeight: 700, textTransform: 'none' }}>FAQ</Button>
            <Button 
              component={Link} 
              href="/intake" 
              variant="contained" 
              sx={{ 
                backgroundColor: '#fff', 
                color: '#000', 
                borderRadius: '50px', 
                px: 3,
                fontWeight: 800,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#eee' }
              }}
            >
              Start Your Build
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
