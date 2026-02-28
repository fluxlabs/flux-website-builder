"use client";

import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Key, MonitorSmartphone, Palette } from "lucide-react";
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";

const MotionCard = motion(Card);

const features = [
  {
    title: "Autonomous Agent",
    description: "Our proprietary AI analyzes your brand, writes copy, and generates a bespoke digital architecture from scratch.",
    icon: <Bot size={24} />
  },
  {
    title: "Global Distribution",
    description: "Your site is instantly deployed to our high-speed global network for record-breaking performance.",
    icon: <Zap size={24} />
  },
  {
    title: "SEO Optimized",
    description: "Built-in technical SEO, structured data, and performance optimizations to rank higher from day one.",
    icon: <BarChart3 size={24} />
  },
  {
    title: "Full Ownership",
    description: "You own the code. Get the full high-performance source code to host anywhere or modify forever.",
    icon: <Key size={24} />
  },
  {
    title: "Responsive by Default",
    description: "Flawless rendering across mobile, tablet, and desktop devices without any extra effort.",
    icon: <MonitorSmartphone size={24} />
  },
  {
    title: "Custom Aesthetic",
    description: "Not a generic template. The engine generates unique styling based on your brand palette and vibe.",
    icon: <Palette size={24} />
  }
];

export default function Features() {
  return (
    <Box component="section" sx={{ py: 15, background: '#fff', position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 800, 
              mb: 2,
              color: '#111',
              letterSpacing: '-0.04em'
            }}
          >
            Why Flux Wins
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              fontSize: '1.25rem',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            We replaced the slow agency model with an intelligent engine.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <MotionCard 
                elevation={0}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                sx={{ 
                  height: '100%',
                  background: '#fafafa',
                  borderRadius: '24px',
                  border: '1px solid rgba(0,0,0,0.04)',
                  p: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.04)',
                    borderColor: 'rgba(0,0,0,0.08)'
                  }
                }}
              >
                <CardContent>
                  <Box 
                    sx={{ 
                      mb: 3, 
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      background: 'rgba(0, 85, 255, 0.08)',
                      color: '#0055ff', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1.5, 
                      color: '#111',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666', 
                      lineHeight: 1.6,
                      fontSize: '1rem'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
