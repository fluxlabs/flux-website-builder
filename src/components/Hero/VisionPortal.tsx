"use client";

import { useState, useEffect } from "react";
import styles from "./VisionPortal.module.css";
import { motion, AnimatePresence } from "framer-motion";

const VISION_STATEMENTS = [
  "Your brand. Refined.",
  "Your store. Global.",
  "Your story. Told.",
  "Your vision. Delivered.",
  "Your business. Unleashed."
];

export default function VisionPortal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % VISION_STATEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.portal}>
      <div className={styles.internalGlow} />
      <div className={styles.shimmerLayer} />
      
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className={styles.visionText}
          >
            {VISION_STATEMENTS[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
    </div>
  );
}
