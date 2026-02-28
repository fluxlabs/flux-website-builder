"use client";

import { Box, Container, Typography, Grid, Avatar, Stack } from "@mui/material";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
    <Box id="testimonials" component="section" sx={{ py: 15, background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
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
              What Visionaries Say
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: '1.25rem', maxWidth: '600px', mx: 'auto' }}>
              Join the hundreds of businesses launched with Flux speed.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {reviews.map((review) => (
              <Grid size={{ xs: 12, md: 4 }} key={review.name}>
                <Box sx={{ 
                  height: '100%', 
                  background: '#fff', 
                  borderRadius: '24px', 
                  p: 5, 
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}>
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: '#0055ff', fontSize: '1.2rem', letterSpacing: '0.2rem', mb: 3 }}>
                      ★★★★★
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1.125rem', 
                        lineHeight: 1.7, 
                        color: '#333', 
                        mb: 4,
                        flexGrow: 1
                      }}
                    >
                      "{review.content}"
                    </Typography>
                    
                    <Stack direction="row" spacing={2} sx={{ pt: 3, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <Avatar sx={{ 
                        width: 48, 
                        height: 48, 
                        background: '#f0f0f0', 
                        color: '#111',
                        fontWeight: 800,
                        fontSize: '0.875rem'
                      }}>
                        {review.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111' }}>{review.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>{review.role}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
