"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Link as MuiLink } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionTypography = motion(Typography);

const posts = [
  {
    title: "Why Website Speed Matters More Than Ever in 2026",
    category: "Tips",
    date: "Feb 24, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "How Our AI Understands Your Unique Brand",
    category: "Technology",
    date: "Feb 20, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Why You Shouldn't Wait Months for a New Website",
    category: "Business",
    date: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogPage() {
  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box component="header" sx={{ textAlign: 'center', mb: 10 }}>
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
            Articles.
          </MotionTypography>
          <Typography variant="h5" sx={{ color: '#888', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            Tips and stories about building great websites for your business.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {posts.map((post, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card sx={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: '24px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-10px)'
                  }
                }}>
                  <CardMedia
                    component="div"
                    sx={{ height: 250, backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#444' }}>{post.category}</Typography>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#444' }}>{post.date}</Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#fff', lineHeight: 1.4 }}>{post.title}</Typography>
                    <MuiLink component={Link} href="#" sx={{ color: '#d6c5a5', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>
                      Read Article →
                    </MuiLink>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
