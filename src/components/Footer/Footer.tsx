"use client";

import { Box, Container, Typography, Grid, Link as MuiLink, Stack } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 10, 
        background: '#fafafa', 
        borderTop: '1px solid rgba(0,0,0,0.06)' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 900, 
                color: '#111', 
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '-0.05em'
              }}
            >
              Flux<Box component="span" sx={{ color: '#888', ml: '2px' }}>Webs</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', maxWidth: 300, lineHeight: 1.6 }}>
              © 2026 Flux Webs. All rights reserved. <br/>
              High-quality custom websites, built fast.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Services</Typography>
                <Stack spacing={2}>
                  <MuiLink component={Link} href="/services/landing-pages" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>Landing Pages</MuiLink>
                  <MuiLink component={Link} href="/services/ecommerce" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>E-commerce</MuiLink>
                  <MuiLink component={Link} href="/services/saas" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>SaaS</MuiLink>
                </Stack>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Company</Typography>
                <Stack spacing={2}>
                  <MuiLink component={Link} href="/about" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>About Us</MuiLink>
                  <MuiLink component={Link} href="/technology" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>Technology</MuiLink>
                  <MuiLink component={Link} href="/blog" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>Blog</MuiLink>
                </Stack>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Support</Typography>
                <Stack spacing={2}>
                  <MuiLink component={Link} href="/faq" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>FAQ</MuiLink>
                  <MuiLink component={Link} href="/contact" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>Contact Us</MuiLink>
                  <MuiLink component={Link} href="/legal" sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, '&:hover': { color: '#0055ff' } }}>Legal</MuiLink>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
