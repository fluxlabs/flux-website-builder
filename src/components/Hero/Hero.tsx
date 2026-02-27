"use client";

import styles from "./Hero.module.css";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import VisionPortal from "./VisionPortal";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    },
  };

  const trustedBrands = [
    "Acme Corp", "GlobalTech", "Nexus Industries", "Stark Enterprises", 
    "Waynea Corp", "Umbrella Corp", "Cyberdyne", "Massive Dynamic"
  ];

  return (
    <>
    <section className={styles.hero}>
      <div className={styles.backgroundOrb} />
      <div className={styles.backgroundOrb2} />
      
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <VisionPortal />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className={styles.title}>
          <span className={styles.line1}>The Digital Home</span>
          <span className={styles.line2}>your business <span className={styles.highlight}>deserves.</span></span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className={styles.subtitle}>
          Stop waiting weeks for a developer. Flux transforms your vision into a 
          high-performance digital reality in just 48 hours.
        </motion.p>
        
        <motion.div variants={itemVariants} className={styles.ctaWrapper}>
          <Magnetic intensity={0.2}>
            <Link href="/intake" className={styles.cta}>
              Start Your Build
              <div className={styles.shine} />
            </Link>
          </Magnetic>
          <p className={styles.ctaSubtext}>No credit card required. Finalize after delivery.</p>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>48h</span>
            <span className={styles.statLabel}>Delivery</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>99+</span>
            <span className={styles.statLabel}>Perf Score</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>24/7</span>
            <span className={styles.statLabel}>AI Support</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
    <div style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
      <InfiniteMarquee items={trustedBrands} speed="slow" />
    </div>
    </>
  );
}
