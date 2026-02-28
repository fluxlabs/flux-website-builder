"use client";

import styles from "./Features.module.css";
import { motion } from "framer-motion";

const features = [
  {
    title: "Autonomous Agent",
    description: "Our proprietary AI analyzes your brand, writes copy, and codes a complete Next.js website from scratch.",
    icon: "🧠"
  },
  {
    title: "Automated Deployment",
    description: "Your site is instantly deployed to Vercel's Edge Network for global, blazing-fast performance.",
    icon: "🚀"
  },
  {
    title: "SEO Optimized",
    description: "Built-in technical SEO, structured data, and performance optimizations to rank higher from day one.",
    icon: "📈"
  },
  {
    title: "No Vendor Lock-in",
    description: "You own the code. Get the full Next.js/React repository to host anywhere or modify forever.",
    icon: "🔓"
  },
  {
    title: "Responsive by Default",
    description: "Flawless rendering across mobile, tablet, and desktop devices without any extra effort.",
    icon: "📱"
  },
  {
    title: "Custom Aesthetic",
    description: "Not a generic template. The AI generates unique styling based on your brand palette and vibe.",
    icon: "✨"
  }
];

export default function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Why Flux Wins</h2>
          <p>We replaced the slow agency model with an intelligent engine.</p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
