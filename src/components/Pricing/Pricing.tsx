"use client";

import Link from "next/link";
import { Box, Container, Typography, Grid, Button, Stack } from "@mui/material";
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
    <Box id="pricing" component="section" sx={{ py: 15, background: '#fff' }}>
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
              Simple, No-Guess Pricing
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: '1.25rem' }}>
              Pay once, own forever. No hidden monthly fees for building.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {plans.map((plan) => (
              <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
                <Box sx={{ 
                  height: '100%', 
                  border: plan.isPopular ? '2px solid #0055ff' : '1px solid rgba(0,0,0,0.08)',
                  background: plan.isPopular ? '#fff' : '#fafafa',
                  borderRadius: '24px',
                  boxShadow: plan.isPopular ? '0 24px 48px rgba(0, 85, 255, 0.08)' : 'none',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}>
                  <Box sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {plan.isPopular && (
                      <Typography 
                        sx={{ 
                          fontSize: '0.7rem', 
                          fontWeight: 800, 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1rem',
                          background: '#0055ff',
                          color: '#fff',
                          px: 2,
                          py: 0.5,
                          borderRadius: '50px',
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        Most Popular
                      </Typography>
                    )}
                    
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#111' }}>{plan.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>{plan.description}</Typography>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.05em' }}>
                        {plan.price}
                        <Box component="span" sx={{ fontSize: '1rem', color: '#888', ml: 1, fontWeight: 500, letterSpacing: 0 }}>/build</Box>
                      </Typography>
                    </Box>

                    <Stack spacing={2} sx={{ mb: 6, flexGrow: 1 }}>
                      {plan.features.map((feature) => (
                        <Box key={feature} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Typography sx={{ color: '#0055ff', fontWeight: 900, fontSize: '1.2rem' }}>✓</Typography>
                          <Typography variant="body2" sx={{ color: '#555', fontWeight: 500, fontSize: '0.95rem' }}>{feature}</Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Magnetic intensity={0.1}>
                      <Button 
                        component={Link} 
                        href="/intake" 
                        variant={plan.isPopular ? "contained" : "outlined"}
                        disableElevation
                        fullWidth
                        sx={{ 
                          borderRadius: '50px', 
                          py: 1.5, 
                          fontWeight: 700, 
                          fontSize: '1rem',
                          textTransform: 'none',
                          color: plan.isPopular ? '#fff' : '#111',
                          borderColor: plan.isPopular ? 'transparent' : 'rgba(0,0,0,0.1)',
                          backgroundColor: plan.isPopular ? '#0055ff' : 'transparent',
                          '&:hover': { 
                            backgroundColor: plan.isPopular ? '#0044cc' : 'rgba(0,0,0,0.03)',
                            borderColor: plan.isPopular ? 'transparent' : 'rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        Choose {plan.name}
                      </Button>
                    </Magnetic>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography sx={{ color: '#666', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
              <Box component="span" sx={{ fontSize: '1.25rem' }}>🛡️</Box>
              100% Satisfaction Guarantee. We build until you love it.
            </Typography>
          </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
