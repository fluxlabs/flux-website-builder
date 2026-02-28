"use client";

import { Box, Container, Typography, Grid, Link as MuiLink } from "@mui/material";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

export default function Portfolio() {
  const items = [
    { 
      name: "Pulse Medical", 
      category: "Healthcare", 
      style: "Clean & Trustworthy", 
      time: "48 Hours",
      link: "/templates/medical",
      color: "#0070f3",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Valente Luxury", 
      category: "High-end Real Estate", 
      style: "Luxury & Minimal", 
      time: "41 Hours",
      link: "/templates/luxury",
      color: "#1c1917",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Forge Industrial", 
      category: "Industrial Services", 
      style: "Bold & Brutalist", 
      time: "45 Hours",
      link: "/templates/bold",
      color: "#ffcc00",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Nova SaaS", 
      category: "B2B Software", 
      style: "Clean & Professional", 
      time: "38 Hours",
      link: "/templates/saas",
      color: "#0070f3",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Aura Dining", 
      category: "Hospitality", 
      style: "Moody & Visual", 
      time: "44 Hours",
      link: "/templates/restaurant",
      color: "#eab308",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Justice & Co", 
      category: "Legal Services", 
      style: "Authoritative", 
      time: "50 Hours",
      link: "/templates/legal",
      color: "#1e293b",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <Box id="portfolio" component="section" sx={{ py: 15, background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <ScrollReveal>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                fontWeight: 800, 
                mb: 2,
                letterSpacing: '-0.05rem',
                background: 'linear-gradient(to right, #fff, #a1a1a1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Reference Architectures
            </Typography>
            <Typography variant="body1" sx={{ color: '#888', fontSize: '1.25rem' }}>
              Explore the high-fidelity frameworks our AI engine uses to synthesize your vision.
            </Typography>
          </Box>
          
          <Grid container spacing={6}>
            {items.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.name}>
                <SpotlightCard sx={{ borderRadius: '20px', overflow: 'hidden' }}>
                  <MuiLink 
                    component={Link} 
                    href={item.link} 
                    sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <Box sx={{ 
                      aspectRatio: '16/10', 
                      backgroundImage: `url(${item.image})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}>
                      <Box sx={{ 
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        transition: 'background 0.3s ease',
                        '&:hover': { background: 'rgba(0, 0, 0, 0.6)' }
                      }}>
                        <Box sx={{ 
                          width: 48, 
                          height: 48, 
                          backgroundColor: item.color,
                          borderRadius: '12px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 900,
                          color: '#fff'
                        }}>
                          {item.name.charAt(0)}
                        </Box>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                          View Live Demo →
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>{item.name}</Typography>
                        <Typography 
                          sx={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 800, 
                            background: 'rgba(0, 112, 243, 0.1)', 
                            color: '#0070f3', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {item.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#a1a1a1', fontWeight: 500 }}>
                        {item.category} • {item.style}
                      </Typography>
                    </Box>
                  </MuiLink>
                </SpotlightCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
