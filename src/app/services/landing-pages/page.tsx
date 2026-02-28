"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../services.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Zap, MousePointer2 } from "lucide-react";

export default function LandingPagesService() {
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
            High-Conversion <br/> Landing Pages.
          </motion.h1>
          <p className={styles.subtitle}>Stop losing leads. Our AI synthesizes landing pages designed for one thing: Results.</p>
          <Link href="/intake" className={styles.cta}>Start Your Build</Link>
        </header>

        <section className={styles.details}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <Target className={styles.icon} size={40} />
              <h3>Precision Targeting</h3>
              <p>Our engine analyzes your target audience to generate copy that resonates and converts.</p>
            </div>
            <div className={styles.card}>
              <Zap className={styles.icon} size={40} />
              <h3>48-Hour Delivery</h3>
              <p>From intake to live URL in under two days. Speed is your competitive advantage.</p>
            </div>
            <div className={styles.card}>
              <MousePointer2 className={styles.icon} size={40} />
              <h3>A/B Ready</h3>
              <p>Architectures built on proven conversion patterns used by the world's top startups.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
