"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const MotionTypography = motion(Typography);

const faqs = [
  {
    question: "How does the 48-72 hour guarantee work?",
    answer: "Once you submit your intake form, our Flux AI engine immediately begins synthesizing your vision. Within 48-72 hours, you'll receive a staging link to review your custom-built Next.js site."
  },
  {
    question: "Is this just a template?",
    answer: "No. While we use advanced architectural patterns for reliability, every site is synthesized from scratch based on your specific business goals, brand voice, and industry niche."
  },
  {
    question: "Do I own the code?",
    answer: "Yes. Once you approve the build and the site goes live, we hand over the GitHub repository to you. You have full ownership of the source code and assets."
  },
  {
    question: "What if I need changes after the site is live?",
    answer: "We offer a 'Satisfaction Guarantee'—we'll tweak the AI draft until you're happy. Post-launch, you can manage the site via the provided repository or request a maintenance package from us."
  },
  {
    question: "Can I use my own domain?",
    answer: "Absolutely. We provide a step-by-step Launch Guide to help you point your domain (GoDaddy, Namecheap, etc.) to our high-performance Vercel hosting."
  }
];

export default function FAQPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 15 }}>
        <Box component="header" sx={{ textAlign: 'center', mb: 10 }}>
          <MotionTypography 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '3.5rem' }, 
              fontWeight: 800, 
              mb: 3,
              letterSpacing: '-0.1rem',
              background: 'linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Frequently Asked Questions
          </MotionTypography>
          <Typography variant="h6" sx={{ color: '#666', fontWeight: 400 }}>
            Everything you need to know about the future of web building.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{ 
                background: 'rgba(255,255,255,0.02)', 
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px !important',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<Plus size={20} color={expanded === `panel${index}` ? '#fff' : '#444'} />}
                sx={{ p: 3, '& .MuiAccordionSummary-content': { m: 0 } }}
              >
                <Typography sx={{ fontSize: '1.125rem', fontWeight: 700 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                <Typography sx={{ color: '#888', lineHeight: 1.6, fontSize: '1.125rem' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
