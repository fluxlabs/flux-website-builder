"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./faq.module.css";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about the future of web building.</p>
        </header>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className={styles.question}>
                <h3>{faq.question}</h3>
                <span className={styles.icon}>{activeIndex === index ? "−" : "+"}</span>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.answer}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
