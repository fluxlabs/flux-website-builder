"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STATUSES = ["new", "ai_generating", "staging_ready", "client_review", "approved", "live"];

export default function AdminDashboard() {
  const [intakes, setIntakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntake, setSelectedIntake] = useState<any>(null);
  const [liveLogs, setLiveLogs] = useState<string>("");

  const fetchIntakes = async () => {
    try {
      const res = await fetch("/api/admin/intakes");
      const rawData = await res.json();
      const data = Array.isArray(rawData) ? rawData : [];
      setIntakes(data);
      
      // Keep selected intake in sync if it exists
      if (selectedIntake) {
        const updated = data.find(i => i.id === selectedIntake.id);
        if (updated) setSelectedIntake(updated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      setLiveLogs(data.logs || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIntakes();
    const interval = setInterval(fetchIntakes, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let logInterval: any;
    if (selectedIntake && selectedIntake.status === 'ai_generating') {
      fetchLogs();
      logInterval = setInterval(fetchLogs, 2000);
    } else {
      setLiveLogs("");
    }
    return () => clearInterval(logInterval);
  }, [selectedIntake]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/intakes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchIntakes();
    } catch (err) {
      console.error(err);
    }
  };

  const triggerManifest = async (id: string) => {
    try {
      alert(`Triggering AI Manifestation for build: ${id}. This will take 60-90 seconds.`);
      const res = await fetch("/api/admin/manifest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intakeId: id }),
      });
      if (res.ok) {
        fetchIntakes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const seedTestLead = async () => {
    console.log("Seed button clicked");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      console.log("Seed API response status:", res.status);
      if (res.ok) {
        console.log("Seed successful, refreshing intakes...");
        fetchIntakes();
      } else {
        const errData = await res.json();
        console.error("Seed API error data:", errData);
      }
    } catch (err) {
      console.error("Seed fetch catch:", err);
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };

  if (loading) return <div className={styles.loading}>Loading CRM...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/" className={styles.logo}>
              Flux<span className={styles.logoHighlight}>Webs</span>
            </Link>
            <div className={styles.liveIndicator}>
              <div className="statusDot" />
              <span>LIVE REFRESH</span>
            </div>
          </div>
          <div className={styles.stats}>
            <button className={styles.seedBtn} onClick={seedTestLead}>+ Seed Vision</button>
            <span>{intakes.length} Total Builds</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.analyticsRow}>
          {/* ... analytics content ... */}
        </div>

        <div className={styles.kanban}>
          {STATUSES.map((status) => (
            <div key={status} className={styles.column}>
              <div className={styles.columnHeader}>
                {getStatusLabel(status)}
                <span className={styles.count}>
                  {intakes.filter((i) => i.status === status).length}
                </span>
              </div>
              
              <div className={styles.cards}>
                {intakes.filter((i) => i.status === status).length === 0 && (
                  <div className={styles.emptyColumn}>No visions yet</div>
                )}
                {intakes
                  .filter((i) => i.status === status)
                  .map((intake) => (
                    <motion.div 
                      key={intake.id} 
                      className={styles.card}
                      layoutId={intake.id}
                      onClick={() => setSelectedIntake(intake)}
                    >
                      <div className={styles.cardHeader}>
                        <h3>{intake.business_name}</h3>
                        <span className={styles.date}>
                          {new Date(intake.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className={styles.clientInfo}>
                        <p>{intake.name}</p>
                        <p className={styles.email}>{intake.email}</p>
                      </div>

                      <div className={styles.badgeRow}>
                         {intake.brand_voice && <span className={styles.voiceBadge}>{intake.brand_voice}</span>}
                         <span className={styles.goalBadge}>{intake.goal}</span>
                      </div>

                      {intake.build_time_ms && (
                        <div className={styles.buildMetric}>
                          Manifested in {(intake.build_time_ms / 1000).toFixed(1)}s
                        </div>
                      )}

                      {intake.staging_url && (
                        <div className={styles.stagingLink}>
                          <a href={intake.staging_url} target="_blank" rel="noopener noreferrer">View Staging →</a>
                        </div>
                      )}

                      <div className={styles.actions}>
                        {intake.status === "new" && (
                          <button 
                            className={styles.manifestBtn} 
                            onClick={() => triggerManifest(intake.id)}
                          >
                            Manifest Vision 🚀
                          </button>
                        )}
                        <select 
                          value={intake.status} 
                          onChange={(e) => updateStatus(intake.id, e.target.value)}
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{getStatusLabel(s)}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedIntake && (
          <>
            <motion.div 
              className={styles.overlay} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntake(null)}
            />
            <motion.div 
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className={styles.drawerHeader}>
                <h2>Visionary Profile</h2>
                <button onClick={() => setSelectedIntake(null)}>Close</button>
              </div>
              
              <div className={styles.drawerContent}>
                {liveLogs && (
                  <section>
                    <label>Manifestation Stream {selectedIntake.status === 'ai_generating' ? '(Live)' : '(Latest)'}</label>
                    <div className={styles.logViewer}>
                      <pre>{liveLogs}</pre>
                    </div>
                  </section>
                )}

                <section>
                  <label>Business</label>
                  <p>{selectedIntake.business_name}</p>
                </section>
                
                <section>
                  <label>Client</label>
                  <p>{selectedIntake.name} ({selectedIntake.email})</p>
                </section>

                <section>
                  <label>The Manifesto</label>
                  <p className={styles.manifesto}>"{selectedIntake.hero_message}"</p>
                </section>

                <div className={styles.drawerGrid}>
                  <section>
                    <label>Brand Voice</label>
                    <p>{selectedIntake.brand_voice}</p>
                  </section>
                  <section>
                    <label>Target Audience</label>
                    <p>{selectedIntake.target_audience}</p>
                  </section>
                  <section>
                    <label>Goal</label>
                    <p>{selectedIntake.goal}</p>
                  </section>
                  <section>
                    <label>Primary Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className={styles.colorIndicator} style={{ backgroundColor: selectedIntake.colors }} />
                      <span>{selectedIntake.colors}</span>
                    </div>
                  </section>
                </div>

                <section>
                  <label>Inspiration Links</label>
                  <p>{selectedIntake.links || "None provided"}</p>
                </section>

                <section>
                  <label>Architecture</label>
                  <div className={styles.badgeRow}>
                    {selectedIntake.pages?.map((p: string) => (
                      <span key={p} className={styles.voiceBadge}>{p}</span>
                    ))}
                  </div>
                </section>

                {selectedIntake.staging_url && (
                  <section className={styles.drawerAction}>
                    <label>Staging Operations</label>
                    <div className={styles.actionGrid}>
                      <a href={selectedIntake.staging_url} target="_blank" className={styles.primaryAction}>Open Site →</a>
                      <button className={styles.secondaryAction} onClick={() => triggerManifest(selectedIntake.id)}>Rework AI Draft 🔄</button>
                    </div>
                  </section>
                )}

                <section className={styles.drawerAction}>
                  <label>Client Communication</label>
                  <div className={styles.commsGrid}>
                    <button className={styles.commsBtn}>Send "Build Started" 📧</button>
                    <button className={styles.commsBtn}>Send "Review Ready" 📧</button>
                    <button className={styles.commsBtn}>Send "Final Handover" 📧</button>
                  </div>
                </section>

                <section>
                  <label>Internal Operations Journal</label>
                  <textarea 
                    className={styles.notesArea} 
                    placeholder="Enter build notes, specific AI tweaks, or client requests..."
                  />
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
