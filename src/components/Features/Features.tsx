"use client";

import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Key, MonitorSmartphone, Palette } from "lucide-react";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";

const features = [
  {
    title: "Autonomous Intelligence",
    description: "Our proprietary AI doesn't just generate code—it understands the soul of your brand architecture.",
    icon: <Bot size={20} />
  },
  {
    title: "Elite Performance",
    description: "Every build achieves a near-perfect scores on the core vitals, outperforming traditional agency work.",
    icon: <Zap size={20} />
  },
  {
    title: "Absolute Ownership",
    description: "Your vision, your code. Full GitHub repository handover with no vendor lock-in, forever.",
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
              WHY WE WIN
            </Typography>
            <Typography variant="h2" sx={{ fontSize: '4rem', mt: 3, mb: 4, lineHeight: 1.1 }}>
              Rejecting the <br/> 
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.1)' }}>Ordinary.</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.25rem', lineHeight: 1.8, maxWidth: 400 }}>
              The traditional agency model is dead. We've replaced it with a synthesis engine that moves at the speed of thought.
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
                      <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7, maxWidth: 500 }}>
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

import { Grid2 as Grid } from "@mui/material";
