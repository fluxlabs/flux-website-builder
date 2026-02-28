"use client";

import { motion } from "framer-motion";
import { Box, Container, Typography, Grid } from "@mui/material";

const MotionBox = motion(Box);

const steps = [
  {
    num: "01",
    title: "Tell Us Your Story",
    description: "Fill out our easy form. Tell us about your business, who your customers are, and the look you want.",
  },
  {
    num: "02",
    title: "We Build It For You",
    description: "Our team and AI get to work immediately. We research your industry, write the text, and design your site.",
  },
  {
    num: "03",
    title: "Review & Go Live",
    description: "In less than 48 hours, you'll see a preview. Once you approve, we'll launch your site on your domain.",
  }
];

export default function HowItWorks() {
  return (
    <Box component="section" sx={{ py: 15, background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
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
            How it Works
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', fontSize: '1.25rem' }}>
            Get from idea to live website in under 48 hours.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {steps.map((step, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <MotionBox 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                sx={{ 
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '24px',
                  p: 5,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '6rem', 
                    fontWeight: 900, 
                    color: 'rgba(0,0,0,0.03)',
                    lineHeight: 0.8,
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    letterSpacing: '-0.05em'
                  }}
                >
                  {step.num}
                </Typography>
                <Box sx={{ position: 'relative', zIndex: 1, mt: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#111' }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: '#666', lineHeight: 1.6, fontSize: '1.05rem' }}>
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
