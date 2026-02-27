"use client";

import { useState, useEffect } from "react";
import styles from "./BuildConsole.module.css";
import { motion, AnimatePresence } from "framer-motion";

const BUILD_STEPS = [
  "INITIALIZING FLUX ENGINE...",
  "INGESTING INTAKE DATA...",
  "GENERATING CORE ARCHITECTURE...",
  "OPTIMIZING FOR VERCEL EDGE...",
  "PROVISIONING CLOUDINARY ASSETS...",
  "CONFIGURING NEXT.js SERVER COMPONENTS...",
  "CALIBRATING LIGHTHOUSE PARAMETERS...",
  "SYSTEM STATUS: 100/100 READY."
];

export default function BuildConsole() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((s) => (s + 1) % BUILD_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.console}>
      <div className={styles.topBar}>
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
        <div className={styles.title}>FLUX_BUILD_LOG.sh</div>
      </div>
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className={styles.logLine}
          >
            <span className={styles.symbol}>$</span> {BUILD_STEPS[currentStep]}
            <span className="cursor" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
