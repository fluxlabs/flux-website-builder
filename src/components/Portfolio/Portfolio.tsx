"use client";

import { Box, Container, Typography, Link as MuiLink, Grid } from "@mui/material";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

export default function Portfolio() {
  const items = [
    { name: "Pulse Medical", link: "/templates/medical", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80", size: 8 },
    { name: "Valente Luxury", link: "/templates/luxury", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", size: 4 },
    { name: "Forge Industrial", link: "/templates/bold", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", size: 4 },
    { name: "Aura Dining", link: "/templates/restaurant", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80", size: 8 },
  ];

  return (
    <Box id="portfolio" component="section" sx={{ py: 25, background: '#000' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 15 }}>
          <Typography variant="overline" sx={{ color: '#d6c5a5', fontWeight: 800, letterSpacing: '0.3rem' }}>CURATED</Typography>
          <Typography variant="h2" sx={{ fontSize: '4rem', mt: 2 }}>Reference Architectures.</Typography>
        </Box>
        
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid size={{ xs: 12, md: item.size }} key={item.name}>
              <ScrollReveal>
                <MuiLink 
                  component={Link} 
                  href={item.link} 
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit', 
                    display: 'block',
                    position: 'relative',
                    height: 500,
                    overflow: 'hidden',
                    '&:hover img': { transform: 'scale(1.05)' },
                    '&:hover .overlay': { background: 'rgba(0,0,0,0.2)' },
                    '&:hover .title': { color: '#d6c5a5', letterSpacing: '0.2rem' }
                  }}
                >
                  <Box 
                    component="img"
                    src={item.image}
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)'
                    }}
                  />
                  <Box 
                    className="overlay"
                    sx={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'rgba(0,0,0,0.5)', 
                      transition: 'all 0.6s ease' 
                    }} 
                  />
                  <Box sx={{ position: 'absolute', bottom: 40, left: 40 }}>
                    <Typography className="title" sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1rem', transition: 'all 0.4s ease', fontFamily: 'serif' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', fontWeight: 800, mt: 1, letterSpacing: '0.1rem' }}>
                      VIEW ARCHITECTURE →
                    </Typography>
                  </Box>
                </MuiLink>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
