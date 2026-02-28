"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./blog.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  {
    title: "Why Speed is the Only SEO Factor That Matters in 2026",
    category: "Insights",
    date: "Feb 24, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Synthesizing Brand Voice: How AI Understands Your Industry",
    category: "Technology",
    date: "Feb 20, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Death of the Multi-Month Web Project",
    category: "Business",
    date: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <header className={styles.hero}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            Insights.
          </motion.h1>
          <p className={styles.subtitle}>Thought leadership at the intersection of AI and digital architecture.</p>
        </header>

        <section className={styles.postGrid}>
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={styles.postCard}
            >
              <div className={styles.postImage} style={{ backgroundImage: `url(${post.image})` }} />
              <div className={styles.postInfo}>
                <div className={styles.postMeta}>
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <Link href="#" className={styles.readMore}>Read Article →</Link>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
