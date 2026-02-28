"use client";

import Link from "next/link";
import { Box, Container, Typography, Stack, Button, Divider, Grid } from "@mui/material";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Pricing() {
  const plans = [
    {
      name: "Standard",
      price: "$1,499",
      features: ["3-Page Next.js Site", "48-Hour Delivery", "AI Content", "SSL & Hosting Setup"],
    },
    {
      name: "Growth",
      price: "$2,999",
      features: ["7-Page Custom Site", "72-Hour Promise", "Advanced SEO", "CMS Ready"],
      popular: true
    },
    {
      name: "Elite",
      price: "$4,999",
      features: ["Custom Page Count", "Full API Integration", "White-Labeling", "VIP Support"],
    },
  ];

  return (
    <Box id="pricing" component="section" sx={{ py: 25, background: '#050505' }}>
      <ScrollReveal>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 15 }}>
            <Typography variant="overline" sx={{ color: '#d6c5a5', fontWeight: 800, letterSpacing: '0.3rem' }}>INVESTMENT</Typography>
            <Typography variant="h2" sx={{ fontSize: '4rem', mt: 2 }}>Transparent Value.</Typography>
          </Box>

          <Grid container spacing={0} sx={{ border: '1px solid rgba(214, 197, 165, 0.1)' }}>
            {plans.map((plan, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={plan.name} sx={{ 
                p: 8, 
                borderRight: i < 2 ? { md: '1px solid rgba(214, 197, 165, 0.1)' } : 'none',
                borderBottom: { xs: i < 2 ? '1px solid rgba(214, 197, 165, 0.1)' : 'none', md: 'none' },
                background: plan.popular ? 'rgba(214, 197, 165, 0.02)' : 'transparent',
                transition: 'all 0.4s ease',
                '&:hover': { background: 'rgba(255,255,255,0.02)' }
              }}>
                <Typography variant="h4" sx={{ mb: 1, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>{plan.name}</Typography>
                <Typography variant="h3" sx={{ mb: 6, color: '#d6c5a5', fontWeight: 400 }}>{plan.price}</Typography>
                
                <Stack spacing={2} sx={{ mb: 8 }}>
                  {plan.features.map(f => (
                    <Typography key={f} variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>{f}</Typography>
                  ))}
                </Stack>

                <Button 
                  component={Link} 
                  href={`/intake?plan=${plan.name}`} 
                  variant={plan.popular ? "contained" : "outlined"}
                  fullWidth
                  sx={{ 
                    bgcolor: plan.popular ? '#d6c5a5' : 'transparent',
                    color: plan.popular ? '#000' : '#fff',
                    borderColor: 'rgba(214, 197, 165, 0.3)',
                    '&:hover': {
                      bgcolor: plan.popular ? '#fff' : 'rgba(214, 197, 165, 0.1)',
                      borderColor: '#d6c5a5'
                    }
                  }}
                >
                  Select Plan
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
