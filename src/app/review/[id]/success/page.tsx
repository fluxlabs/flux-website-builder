"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./success.module.css";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

export default function LaunchGuidePage() {
  const { id } = useParams();
  const [intake, setIntake] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntake = async () => {
      try {
        const res = await fetch(`/api/admin/intakes`);
        const data = await res.json();
        const item = data.find((i: any) => i.id === id);
        setIntake(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIntake();
  }, [id]);

  if (loading) return <div className={styles.loading}>Finalizing Launch Sequence...</div>;
  if (!intake) return <div className={styles.error}>Vision not found.</div>;

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
        <div className={styles.logo}>
          Flux<span className={styles.logoHighlight}>.</span> Success
        </div>
      </header>

      <main className={styles.main} style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.card}>
          <div className={styles.icon}>🌌</div>
          <h1>Mission Accomplished.</h1>
          <p className={styles.subtitle}>
            Your visionary website for <strong>{intake.business_name}</strong> is ready for the world.
          </p>

          <div className={styles.dnsSection}>
            <h2>The Launch Sequence</h2>
            <p className={styles.dnsDesc}>
              To take your site live on your custom domain, update your DNS settings with these values:
            </p>

            <div className={styles.dnsGrid}>
              <div className={styles.dnsRow}>
                <div className={styles.dnsCol}>
                  <label>Type</label>
                  <span>A Record</span>
                </div>
                <div className={styles.dnsCol}>
                  <label>Name</label>
                  <span>@</span>
                </div>
                <div className={styles.dnsCol}>
                  <label>Value</label>
                  <code>76.76.21.21</code>
                </div>
              </div>
              <div className={styles.dnsRow}>
                <div className={styles.dnsCol}>
                  <label>Type</label>
                  <span>CNAME</span>
                </div>
                <div className={styles.dnsCol}>
                  <label>Name</label>
                  <span>www</span>
                </div>
                <div className={styles.dnsCol}>
                  <label>Value</label>
                  <code>nodes.fluxwebs.net</code>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <p>Once updated, your site will be live within 2-24 hours.</p>
            <Magnetic intensity={0.2}>
              <a href={intake.staging_url} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                Visit Your Digital Home
              </a>
            </Magnetic>
          </div>
        </div>
      </main>
    </div>
  );
}
