"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./status.module.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const PIPELINE_STEPS = [
  { id: 1, name: "WAITING", label: "Getting started" },
  { id: 2, name: "RESEARCH", label: "Learning about your business" },
  { id: 3, name: "DESIGNING", label: "Building your custom site" },
  { id: 4, name: "LAUNCHING", label: "Putting it online" },
  { id: 5, name: "DONE", label: "Ready for you to see" }
];

export default function BuildStatusPage() {
  const params = useParams();
  const id = params.id as string;
  const [intake, setIntake] = useState<any>(null);
  const [logs, setLogs] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/intake?id=${id}`);
      const data = await res.json();
      setIntake(data);
      
      if (data.status === 'ai_generating') {
        const logRes = await fetch(`/api/admin/logs?intakeId=${id}`);
        const logData = await logRes.json();
        setLogs(logData.logs || "");
        
        // Update steps based on logs
        if (logData.logs.includes("SYNTHESIS COMPLETE")) setCurrentStep(5);
        else if (logData.logs.includes("STARTING AUTOMATED DEPLOYMENT")) setCurrentStep(4);
        else if (logData.logs.includes("Installing dependencies")) setCurrentStep(3);
        else if (logData.logs.includes("Initiating AI research")) setCurrentStep(2);
        else setCurrentStep(1);
      } else if (data.status === 'client_review' || data.status === 'approved' || data.status === 'live') {
        setCurrentStep(5);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div className={styles.loading}>Connecting...</div>;
  if (!intake) return <div className={styles.error}>Website not found.</div>;

  return (
    <div className={styles.container}>
      {/* Cinematic Grain Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        zIndex: 1
      }} />

      <header className={styles.header} style={{ position: 'relative', zIndex: 2 }}>
        <Link href="/" className={styles.logo}>
          Flux<span className={styles.logoHighlight}>.</span>
        </Link>
      </header>

      <main className={styles.main} style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.statusCard}>
          <div className={styles.headerInfo}>
            <h1>Building: {intake.business_name || intake.current_url}</h1>
            <p>Your professional website is being built right now.</p>
          </div>

          <div className={styles.pipeline}>
            {PIPELINE_STEPS.map((step) => (
              <div key={step.id} className={`${styles.step} ${currentStep >= step.id ? styles.active : ''}`}>
                <div className={styles.stepCircle}>
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                <div className={styles.stepLabel}>
                  <strong>{step.name}</strong>
                  <span>{step.label}</span>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {currentStep < 5 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={styles.logSection}
              >
                <div className={styles.logHeader}>
                  <div className={styles.pulse} />
                  <span>PROGRESS LOG</span>
                </div>
                <div className={styles.logBox}>
                  <pre>{logs || "Getting everything ready..."}</pre>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className={styles.readySection}
              >
                <div className={styles.readyIcon}>🚀</div>
                <h2>Your website is ready!</h2>
                <p>Our team and AI have finished your site. You can now review the first draft below.</p>
                <div className={styles.actionRow}>
                  <a href={intake.staging_url} target="_blank" className={styles.primaryBtn}>Review Your Site →</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
