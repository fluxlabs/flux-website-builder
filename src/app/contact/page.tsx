"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, TextField, Button, MenuItem, Stack } from "@mui/material";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const MotionTypography = motion(Typography);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 20 } }}>
        <Grid container spacing={10}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="header" sx={{ mb: 8 }}>
              <MotionTypography 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '3rem', md: '5rem' }, 
                  fontWeight: 800, 
                  mb: 3,
                  letterSpacing: '-0.2rem',
                  lineHeight: 1,
                  background: 'linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.5))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                We're here <br/> to help.
              </MotionTypography>
              <Typography variant="h5" sx={{ color: '#888', lineHeight: 1.6, maxWidth: 500 }}>
                Have questions? Need a custom quote? Send us a message and we'll get back to you quickly.
              </Typography>
            </Box>

            <Stack spacing={6}>
              <Box>
                <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, letterSpacing: '0.1rem', display: 'block', mb: 1 }}>Email Us</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>hello@fluxwebs.net</Typography>
              </Box>
              <Box>
                <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, letterSpacing: '0.1rem', display: 'block', mb: 1 }}>Operation Hours</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Always Building</Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>Support: Mon-Fri 9am-6pm CST</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              p: { xs: 4, md: 8 }, 
              borderRadius: '32px' 
            }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Message Received.</Typography>
                  <Typography sx={{ color: '#666', mb: 4 }}>We'll get back to you within 24 hours.</Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => setSubmitted(false)}
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', px: 3 }}
                  >
                    Send another
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {error && (
                    <Typography sx={{ color: '#ef4444', fontSize: '0.875rem', p: 2, background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>
                      {error}
                    </Typography>
                  )}
                  <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    variant="standard"
                    required
                    InputLabelProps={{ sx: { color: '#666', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' } }}
                    inputProps={{ sx: { color: '#fff', fontSize: '1.25rem', pt: 2 } }}
                  />
                  <TextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    variant="standard"
                    type="email"
                    required
                    InputLabelProps={{ sx: { color: '#666', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' } }}
                    inputProps={{ sx: { color: '#fff', fontSize: '1.25rem', pt: 2 } }}
                  />
                  <TextField
                    fullWidth
                    select
                    name="subject"
                    label="Subject"
                    variant="standard"
                    defaultValue="General Inquiry"
                    InputLabelProps={{ sx: { color: '#666', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' } }}
                    SelectProps={{ sx: { color: '#fff', fontSize: '1.25rem', pt: 2 } }}
                  >
                    <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                    <MenuItem value="Custom Build Request">Custom Build Request</MenuItem>
                    <MenuItem value="Partnership">Partnership</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    label="Message"
                    variant="standard"
                    required
                    InputLabelProps={{ sx: { color: '#666', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem' } }}
                    inputProps={{ sx: { color: '#fff', fontSize: '1.25rem', pt: 2 } }}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Magnetic intensity={0.1}>
                      <Button 
                        fullWidth 
                        type="submit" 
                        variant="contained" 
                        disabled={isSubmitting}
                        sx={{ 
                          backgroundColor: '#fff', 
                          color: '#000', 
                          borderRadius: '12px', 
                          py: 2, 
                          fontWeight: 800, 
                          fontSize: '1rem',
                          '&:hover': { backgroundColor: '#eee' }
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Magnetic>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
