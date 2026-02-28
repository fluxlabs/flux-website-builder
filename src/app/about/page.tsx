"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./about.module.css";
import { motion } from "framer-motion";

export default function AboutPage() {
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
            The End of the <br/> Web Agency.
          </motion.h1>
          <p className={styles.subtitle}>We didn't build a better agency. We built an engine to replace them.</p>
        </header>

        <section className={styles.content}>
          <div className={styles.story}>
            <h2>Our Origins</h2>
            <p>Flux was born in 2024 out of a simple observation: the traditional web development process was broken. It was too slow, too expensive, and too prone to human error. Founders were waiting months for sites that should have taken days.</p>
            <p>We spent two years developing our proprietary Synthesis Engine—an AI architecture that doesn't just "generate code," but understands brand identity, conversion psychology, and modern performance standards.</p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Speed as a Feature</h3>
              <p>In the digital age, being first matters more than being perfect. We deliver high-fidelity builds in 48-72 hours.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Full Ownership</h3>
              <p>We believe in an open web. You own your code, your repository, and your destiny. No vendor lock-in.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>AI-First, Human-Refined</h3>
              <p>Our engine handles the heavy lifting, allowing our team to focus on the unique creative flourishes that make your brand stand out.</p>
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <h2>The Founders</h2>
          <div className={styles.teamGrid}>
            <div className={styles.member}>
              <div className={styles.avatar}>JM</div>
              <h4>Jeremy McSpadden</h4>
              <p>Architect & CEO</p>
            </div>
            <div className={styles.member}>
              <div className={styles.avatar}>AI</div>
              <h4>Flux Core</h4>
              <p>Synthesis Engine v2.4</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
