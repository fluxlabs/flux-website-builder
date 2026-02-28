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
    <Box component="section" sx={{ py: 15, background: '#000', position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 300, 
              mb: 2,
              fontFamily: 'serif',
              background: 'linear-gradient(135deg, #fff 0%, #d6c5a5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Why Flux Wins
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#888', 
              letterSpacing: '0.1rem', 
              textTransform: 'uppercase',
              fontSize: '0.875rem'
            }}
          >
            We replaced the slow agency model with an intelligent engine.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <MotionCard 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                sx={{ 
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderTop: '1px solid rgba(214, 197, 165, 0.1)',
                  borderRadius: 0,
                  pt: 4,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '1px',
                    background: '#d6c5a5',
                    transition: 'width 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
                  },
                  '&:hover::after': {
                    width: '100%'
                  },
                  '&:hover .icon-box': {
                    color: '#fff',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box 
                    className="icon-box"
                    sx={{ 
                      mb: 3, 
                      color: '#d6c5a5', 
                      transition: 'all 0.5s ease',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 400, 
                      mb: 2, 
                      color: '#fff',
                      letterSpacing: '0.05rem'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#888', 
                      lineHeight: 1.8,
                      fontWeight: 300
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
