"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";

type TabValue = 0 | 1;

export default function LegalPage() {
  const [value, setValue] = useState<TabValue>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 15 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.05)', mb: 8 }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            textColor="inherit"
            TabIndicatorProps={{ sx: { bgcolor: '#fff' } }}
            sx={{ 
              '& .MuiTab-root': { 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                textTransform: 'none',
                color: '#444',
                '&.Mui-selected': { color: '#fff' }
              } 
            }}
          >
            <Tab label="Privacy Policy" />
            <Tab label="Terms of Service" />
          </Tabs>
        </Box>

        <Box component="article" sx={{ minHeight: 400 }}>
          {value === 0 ? (
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>Privacy Policy</Typography>
              <Typography variant="body2" sx={{ color: '#444', mb: 6 }}>Last Updated: February 27, 2026</Typography>
              
              <Stack spacing={6}>
                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Information We Collect</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    We collect information you provide to us when you fill out our form, including your name, email address, phone number, and business details. This data is used only to build and launch your website.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. How We Use Your Data</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    Your data is processed by our AI technology to create the text and designs for your project. We do not sell your personal information to others.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Cookies & Tracking</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    We use basic cookies to keep you logged in and improve our website experience. We do not use invasive tracking tools for advertising.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>Terms of Service</Typography>
              <Typography variant="body2" sx={{ color: '#444', mb: 6 }}>Last Updated: February 27, 2026</Typography>

              <Stack spacing={6}>
                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Service Delivery</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    Flux provides an AI website building service. Our 48-72 hour guarantee applies to when you receive your first preview link after submitting your form.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Ownership</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    Once you approve and pay for your site, you own the website files created for you. Flux keeps ownership of our underlying AI systems and designs.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Hosting & Domains</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    While we help you launch your site, you are responsible for keeping your domain name active and pointing it to our hosting service.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

import { Stack } from "@mui/material";
