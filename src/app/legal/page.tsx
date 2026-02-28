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
                    We collect information you provide directly to us via our intake form, including your name, email address, phone number, and business details. This data is used solely to synthesize and deploy your website.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. How We Use Your Data</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    Your data is processed by our AI synthesis engine to generate source code and assets for your project. We do not sell your personal information to third parties.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Cookies & Tracking</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    We use essential cookies to maintain your session and improve our intake experience. We do not use invasive tracking pixels for advertising.
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
                    Flux provides an AI-driven website generation service. The 48-72 hour delivery guarantee applies to the initial staging link after a successful intake submission.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Intellectual Property</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    Upon final approval and delivery, you own the generated code for your specific instance. Flux retains ownership of its underlying AI models, internal tooling, and template logic.
                  </Typography>
                </Box>

                <Box component="section">
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Hosting & DNS</Typography>
                  <Typography sx={{ color: '#888', lineHeight: 1.8, fontSize: '1.125rem' }}>
                    While we provide a Launch Guide, the responsibility for pointing DNS records and maintaining domain ownership lies with the client.
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
