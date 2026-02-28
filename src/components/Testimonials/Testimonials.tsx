"use client";

import { Box, Container, Typography, Avatar, Stack, Grid } from "@mui/material";
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
    <Box id="testimonials" component="section" sx={{ py: 25, background: '#000' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 15, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#d6c5a5', fontWeight: 800, letterSpacing: '0.3rem' }}>TESTIMONIALS</Typography>
          <Typography variant="h2" sx={{ fontSize: '4rem', mt: 2 }}>Voices of Success.</Typography>
        </Box>

        <Grid container spacing={10}>
          {reviews.map((review, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={review.name}>
              <ScrollReveal>
                <Box sx={{ borderLeft: '1px solid rgba(214, 197, 165, 0.2)', pl: 4 }}>
                  <Typography sx={{ color: '#d6c5a5', fontSize: '1.5rem', mb: 4 }}>
                    "
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: '1.125rem', 
                      lineHeight: 1.8, 
                      color: '#ccc', 
                      fontStyle: 'italic',
                      mb: 6
                    }}
                  >
                    {review.content}
                  </Typography>
                  
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar sx={{ 
                      width: 56, 
                      height: 56, 
                      background: 'rgba(214, 197, 165, 0.1)', 
                      color: '#d6c5a5',
                      fontWeight: 800,
                      fontSize: '1rem',
                      border: '1px solid rgba(214, 197, 165, 0.2)'
                    }}>
                      {review.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', letterSpacing: '0.05rem' }}>{review.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#444', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1rem' }}>{review.role}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
