"use client";

import { Bot, Zap, Key } from "lucide-react";
import { Box, Container, Typography, Stack, Divider, Grid } from "@mui/material";

const features = [
  {
    title: "Built by Experts & AI",
    description: "We combine the speed of AI with the eye of professional designers to create a site that truly represents your business.",
    icon: <Bot size={20} />
  },
  {
    title: "Super Fast Loading",
    description: "Every site we build is optimized for speed, ensuring your customers never have to wait for a page to load.",
    icon: <Zap size={20} />
  },
  {
    title: "You Own Everything",
    description: "Your site is yours forever. We give you the full code and files with no monthly fees or vendor lock-in.",
    icon: <Key size={20} />
  }
];

export default function Features() {
  return (
    <Box component="section" sx={{ py: 25, background: '#000' }}>
      <Container maxWidth="lg">
        <Grid container spacing={15}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="overline" sx={{ color: '#d6c5a5', fontWeight: 800, letterSpacing: '0.3rem' }}>
              THE FLUX ADVANTAGE
            </Typography>
            <Typography variant="h2" sx={{ fontSize: '4rem', mt: 3, mb: 4, lineHeight: 1.1 }}>
              Better than <br/> 
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)' }}>an Agency.</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: '#888', fontSize: '1.25rem', lineHeight: 1.8, maxWidth: 400 }}>
              Skip the long meetings and high costs. We deliver agency-quality websites in a fraction of the time.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={8}>
              {features.map((feature, i) => (
                <Box key={i}>
                  <Stack direction="row" spacing={4} alignItems="flex-start">
                    <Box sx={{ color: '#d6c5a5', mt: 1 }}>{feature.icon}</Box>
                    <Box>
                      <Typography variant="h4" sx={{ mb: 2, fontSize: '1.75rem', fontWeight: 400 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#777', lineHeight: 1.7, maxWidth: 500 }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Stack>
                  {i < features.length - 1 && (
                    <Divider sx={{ mt: 8, borderColor: 'rgba(214, 197, 165, 0.1)' }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
