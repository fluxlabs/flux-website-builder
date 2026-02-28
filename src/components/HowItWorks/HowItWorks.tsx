"use client";

import styles from "./HowItWorks.module.css";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Submit Your Vision",
    description: "Fill out our quick intake form. Tell us about your business, target audience, and preferred aesthetic.",
  },
  {
    num: "02",
    title: "AI Manifestation",
    description: "Our agent researches your niche, writes the copy, and builds a complete Next.js architecture.",
  },
  {
    num: "03",
    title: "Review & Launch",
    description: "Within 48 hours, you receive a staging link. Approve the build, and we push it live to your domain.",
  }
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>The Process</h2>
          <p>From concept to code in under 48 hours.</p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className={styles.number}>{step.num}</div>
              <div className={styles.content}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
          <div className={styles.line} />
        </div>
      </div>
    </section>
  );
}
