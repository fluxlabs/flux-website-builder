"use client";

import styles from "./Features.module.css";
import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Key, MonitorSmartphone, Palette } from "lucide-react";

const features = [
  {
    title: "Autonomous Agent",
    description: "Our proprietary AI analyzes your brand, writes copy, and generates a bespoke digital architecture from scratch.",
    icon: <Bot size={24} />
  },
  {
    title: "Global Distribution",
    description: "Your site is instantly deployed to our high-speed global network for record-breaking performance.",
    icon: <Zap size={24} />
  },
  {
    title: "SEO Optimized",
    description: "Built-in technical SEO, structured data, and performance optimizations to rank higher from day one.",
    icon: <BarChart3 size={24} />
  },
  {
    title: "Full Ownership",
    description: "You own the code. Get the full high-performance source code to host anywhere or modify forever.",
    icon: <Key size={24} />
  },
  {
    title: "Responsive by Default",
    description: "Flawless rendering across mobile, tablet, and desktop devices without any extra effort.",
    icon: <MonitorSmartphone size={24} />
  },
  {
    title: "Custom Aesthetic",
    description: "Not a generic template. The engine generates unique styling based on your brand palette and vibe.",
    icon: <Palette size={24} />
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
