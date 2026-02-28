"use client";

import Link from "next/link";
import { Box, Container, Typography, Grid2 as Grid, Button, Stack } from "@mui/material";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for single landing pages.",
      price: "$1,499",
      features: [
        "3-Page Next.js Site", 
        "48-Hour Rapid Delivery", 
        "AI Content Synthesis", 
        "Interactive Launch Guide",
        "SSL & Hosting Setup",
        "Responsive Mobile Design"
      ],
    },
    {
      name: "Growth",
      description: "Scale your business with speed.",
      price: "$2,999",
      features: [
        "7-Page Custom Site", 
        "72-Hour Delivery Promise", 
        "Advanced SEO Strategy", 
        "Analytics Dashboard", 
        "Custom Contact Flows",
        "Priority AI Build Track",
        "CMS Integration Ready"
      ],
      isPopular: true,
    },
    {
      name: "Pro",
      description: "Custom solutions for innovators.",
      price: "$4,999",
      features: [
        "Custom Page Count", 
        "Full API Integrations", 
        "E-commerce Readiness", 
        "White-Labeling Options",
        "Premium Asset Generation",
        "VIP Implementation Support",
        "Custom Domain Management"
      ],
    },
  ];

  return (
    <Box id="pricing" component="section" sx={{ py: 15, background: '#000' }}>
      <ScrollReveal>
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
              Simple, No-Guess Pricing
            </Typography>
            <Typography variant="body1" sx={{ color: '#888', fontSize: '1.25rem' }}>
              Pay once, own forever. No hidden monthly fees for building.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {plans.map((plan) => (
              <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
                <SpotlightCard sx={{ 
                  height: '100%', 
                  border: plan.isPopular ? '1px solid #0070f3' : '1px solid rgba(255,255,255,0.05)',
                  background: plan.isPopular ? 'rgba(0, 112, 243, 0.05)' : 'rgba(255,255,255,0.02)'
                }}>
                  <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {plan.isPopular && (
                      <Typography 
                        sx={{ 
                          fontSize: '0.6rem', 
                          fontWeight: 900, 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1rem',
                          background: '#0070f3',
                          color: '#fff',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '4px',
                          width: 'fit-content',
                          mb: 3
                        }}
                      >
                        Most Popular
                      </Typography>
                    )}
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{plan.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>{plan.description}</Typography>
                      <Typography variant="h3" sx={{ fontWeight: 800 }}>
                        {plan.price}
                        <Box component="span" sx={{ fontSize: '1rem', color: '#444', ml: 1 }}>/build</Box>
                      </Typography>
                    </Box>

                    <Stack spacing={2} sx={{ mb: 6, flexGrow: 1 }}>
                      {plan.features.map((feature) => (
                        <Box key={feature} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                          <Typography sx={{ color: '#0070f3', fontWeight: 900 }}>✓</Typography>
                          <Typography variant="body2" sx={{ color: '#888', fontWeight: 500 }}>{feature}</Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Magnetic intensity={0.1}>
                      <Button 
                        component={Link} 
                        href="/intake" 
                        variant="outlined"
                        fullWidth
                        sx={{ 
                          borderRadius: '12px', 
                          py: 1.5, 
                          fontWeight: 800, 
                          color: '#fff', 
                          borderColor: 'rgba(255,255,255,0.1)',
                          textTransform: 'none',
                          '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.05)' }
                        }}
                      >
                        Choose {plan.name} →
                      </Button>
                    </Magnetic>
                  </Box>
                </SpotlightCard>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography sx={{ color: '#444', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
              <Box component="span" sx={{ fontSize: '1.25rem' }}>🛡️</Box>
              100% Satisfaction Guarantee. We build until you love it.
            </Typography>
          </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
