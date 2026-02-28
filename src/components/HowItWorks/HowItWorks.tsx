"use client";

import { motion } from "framer-motion";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";

const MotionBox = motion(Box);

const steps = [
  {
    num: "01",
    title: "Submit Your Vision",
    description: "Fill out our quick intake form. Tell us about your business, target audience, and preferred aesthetic.",
  },
  {
    num: "02",
    title: "AI Synthesis",
    description: "Our agent researches your niche, writes the copy, and builds a complete high-performance architecture.",
  },
  {
    num: "03",
    title: "Review & Launch",
    description: "Within 48 hours, you receive a staging link. Approve the build, and we push it live to your domain.",
  }
];

export default function HowItWorks() {
  return (
    <Box component="section" sx={{ py: 15, background: '#000' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 800, 
              mb: 2,
              letterSpacing: '-0.1rem'
            }}
          >
            The Process
          </Typography>
          <Typography variant="body1" sx={{ color: '#888', fontSize: '1.25rem' }}>
            From concept to code in under 48 hours.
          </Typography>
        </Box>

        <Grid container spacing={6} sx={{ position: 'relative' }}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={i}>
              <MotionBox 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                sx={{ position: 'relative', zIndex: 1 }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '4rem', 
                    fontWeight: 900, 
                    color: 'rgba(255,255,255,0.05)',
                    lineHeight: 1,
                    mb: -2
                  }}
                >
                  {step.num}
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: '#666', lineHeight: 1.7 }}>
                    {step.description}
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
