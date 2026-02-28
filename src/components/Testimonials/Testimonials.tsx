"use client";

import { Box, Container, Typography, Grid2 as Grid, Avatar, Stack } from "@mui/material";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Boutique Owner",
      content: "I went from a rough idea to a live, beautiful site in under 48 hours. The AI captured my brand voice perfectly.",
      avatar: "SJ"
    },
    {
      name: "Mark Thompson",
      role: "Tech Startup Founder",
      content: "The speed is unmatched. We needed a landing page for our seed round and Flux delivered a pro-level site overnight.",
      avatar: "MT"
    },
    {
      name: "Elena Rodriguez",
      role: "Real Estate Agent",
      content: "I've worked with agencies before that took months. Flux did better work in 3 days. Simply incredible.",
      avatar: "ER"
    }
  ];

  return (
    <Box id="testimonials" component="section" sx={{ py: 15, background: '#000' }}>
      <ScrollReveal>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                fontWeight: 800, 
                mb: 2,
                letterSpacing: '-0.1rem',
                background: 'linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              What Visionaries Say
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.25rem', maxWidth: '600px', mx: 'auto' }}>
              Join the hundreds of businesses launched with Flux speed.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {reviews.map((review) => (
              <Grid size={{ xs: 12, md: 4 }} key={review.name}>
                <SpotlightCard sx={{ height: '100%' }}>
                  <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: '#eab308', fontSize: '0.75rem', letterSpacing: '0.2rem', mb: 3 }}>
                      ★★★★★
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1.125rem', 
                        lineHeight: 1.7, 
                        color: '#ccc', 
                        fontStyle: 'italic',
                        mb: 4,
                        flexGrow: 1
                      }}
                    >
                      "{review.content}"
                    </Typography>
                    
                    <Stack direction="row" spacing={2} sx={{ pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <Avatar sx={{ 
                        width: 48, 
                        height: 48, 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontWeight: 800,
                        fontSize: '0.875rem'
                      }}>
                        {review.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>{review.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>{review.role}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </SpotlightCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
