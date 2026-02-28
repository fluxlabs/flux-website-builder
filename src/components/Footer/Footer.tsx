"use client";

import { Box, Container, Typography, Grid, Link as MuiLink, Stack } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 10, 
        background: '#000', 
        borderTop: '1px solid rgba(255,255,255,0.05)' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 900, 
                color: '#fff', 
                mb: 3,
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
            <Typography variant="body2" sx={{ color: '#666', maxWidth: 300, lineHeight: 1.6 }}>
              © 2026 Flux Webs. All rights reserved. <br/>
              Synthesizing the future of digital architecture.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Services</Typography>
                <Stack spacing={1.5}>
                  <MuiLink component={Link} href="/services/landing-pages" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>Landing Pages</MuiLink>
                  <MuiLink component={Link} href="/services/ecommerce" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>E-commerce</MuiLink>
                  <MuiLink component={Link} href="/services/saas" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>SaaS</MuiLink>
                </Stack>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Company</Typography>
                <Stack spacing={1.5}>
                  <MuiLink component={Link} href="/about" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>About Us</MuiLink>
                  <MuiLink component={Link} href="/technology" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>Technology</MuiLink>
                  <MuiLink component={Link} href="/blog" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>Blog</MuiLink>
                </Stack>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Support</Typography>
                <Stack spacing={1.5}>
                  <MuiLink component={Link} href="/faq" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>FAQ</MuiLink>
                  <MuiLink component={Link} href="/contact" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>Contact Us</MuiLink>
                  <MuiLink component={Link} href="/legal" sx={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#d6c5a5' } }}>Legal</MuiLink>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
