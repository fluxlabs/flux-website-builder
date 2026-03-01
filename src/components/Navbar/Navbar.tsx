// Flux Website Builder — Navigation Bar
// Copyright (c) 2026 Jeremy McSpadden <jeremy@fluxlabs.net>

"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Typography, Stack, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: 'Our Work', href: '/#portfolio' },
  { label: 'Technology', href: '/technology' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

      {/* Desktop nav links */}
      <Stack
        direction="row"
        spacing={6}
        alignItems="center"
        sx={{
          display: { xs: 'none', md: 'flex' },
          pointerEvents: 'auto'
        }}
      >
        {NAV_LINKS.map((item) => (
          <Typography
            key={item.label}
            component={Link}
            href={item.href}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15rem',
              transition: 'all 0.3s ease',
              '&:hover': { color: '#d6c5a5', letterSpacing: '0.25rem' }
            }}
          >
            {item.label}
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
        </Typography>
        <IconButton
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
          sx={{ color: '#fff', p: 0, display: { xs: 'flex', md: 'none' } }}
        >
          <Menu size={20} />
        </IconButton>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#0a0a0a',
            color: '#fff',
            width: 280,
            borderLeft: '1px solid rgba(255,255,255,0.05)',
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.2rem', textTransform: 'uppercase', fontSize: '1rem' }}>
            Flux<Box component="span" sx={{ color: '#d6c5a5' }}>.</Box>
          </Typography>
          <IconButton aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} sx={{ color: '#fff' }}>
            <X size={20} />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        <List>
          {NAV_LINKS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{ py: 2, px: 3, '&:hover': { backgroundColor: 'rgba(214,197,165,0.05)' } }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/intake"
              onClick={() => setMobileOpen(false)}
              sx={{ py: 2, px: 3, '&:hover': { backgroundColor: 'rgba(214,197,165,0.1)' } }}
            >
              <ListItemText
                primary="Get Started"
                primaryTypographyProps={{
                  sx: { fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#d6c5a5' }
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
