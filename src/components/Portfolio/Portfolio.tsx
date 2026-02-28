"use client";

import { Box, Container, Typography, Grid, Link as MuiLink } from "@mui/material";
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
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Valente Luxury", 
      category: "High-end Real Estate", 
      style: "Luxury & Minimal", 
      time: "41 Hours",
      link: "/templates/luxury",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Forge Industrial", 
      category: "Industrial Services", 
      style: "Bold & Brutalist", 
      time: "45 Hours",
      link: "/templates/bold",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Nova SaaS", 
      category: "B2B Software", 
      style: "Clean & Professional", 
      time: "38 Hours",
      link: "/templates/saas",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Aura Dining", 
      category: "Hospitality", 
      style: "Moody & Visual", 
      time: "44 Hours",
      link: "/templates/restaurant",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Justice & Co", 
      category: "Legal Services", 
      style: "Authoritative", 
      time: "50 Hours",
      link: "/templates/legal",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <Box id="portfolio" component="section" sx={{ py: 15, background: '#fff', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
      <ScrollReveal>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                fontWeight: 800, 
                mb: 2,
                letterSpacing: '-0.04em',
                color: '#111'
              }}
            >
              Reference Architectures
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: '1.25rem' }}>
              Explore the high-fidelity frameworks our AI engine uses to synthesize your vision.
            </Typography>
          </Box>
          
          <Grid container spacing={6}>
            {items.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.name}>
                <Box sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', background: '#fafafa', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' } }}>
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
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': { opacity: 1 }
                      }}>
                        <Typography sx={{ color: '#111', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem', border: '2px solid #111', px: 3, py: 1.5, borderRadius: '50px' }}>
                          View Live Demo
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111' }}>{item.name}</Typography>
                        <Typography 
                          sx={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 800, 
                            background: 'rgba(0, 85, 255, 0.1)', 
                            color: '#0055ff', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {item.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                        {item.category} • {item.style}
                      </Typography>
                    </Box>
                  </MuiLink>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
