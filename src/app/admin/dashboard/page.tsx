"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STATUSES = ["new", "ai_generating", "staging_ready", "client_review", "approved", "live"];

type View = 'pipeline' | 'clients' | 'analytics' | 'client-detail';

export default function AdminDashboard() {
  const [intakes, setIntakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntake, setSelectedIntake] = useState<any>(null);
  const [selectedClientEmail, setSelectedClientEmail] = useState<string | null>(null);
  const [liveLogs, setLiveLogs] = useState<string>("");
  const [currentView, setCurrentView] = useState<View>('pipeline');

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

  const [currentStep, setCurrentStep] = useState<number>(0);

  const fetchLogs = async () => {
    if (!selectedIntake) return;
    try {
      const res = await fetch(`/api/admin/logs?intakeId=${selectedIntake.id}`);
      const data = await res.json();
      setLiveLogs(data.logs || "");
      
      // Update pipeline step based on log content
      if (data.logs.includes("MANIFESTATION COMPLETE")) setCurrentStep(4);
      else if (data.logs.includes("STARTING AUTOMATED DEPLOYMENT")) setCurrentStep(3);
      else if (data.logs.includes("Installing dependencies")) setCurrentStep(2);
      else if (data.logs.includes("Generating vision")) setCurrentStep(1);
      else setCurrentStep(0);
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
      setCurrentStep(0);
    }
    return () => clearInterval(logInterval);
  }, [selectedIntake]);

  const PIPELINE_STEPS = [
    { id: 1, name: "VISION", label: "LLM Manifestation" },
    { id: 2, name: "BUILD", label: "Project Generation" },
    { id: 3, name: "DEPLOY", label: "Vercel / GitHub" },
    { id: 4, name: "VERIFY", label: "Live Handshake" }
  ];

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

  const triggerDeployHook = async (hookUrl: string) => {
    try {
      const res = await fetch(hookUrl, { method: "POST" });
      if (res.ok) {
        alert("Vercel Deployment Triggered Successfully!");
      } else {
        alert("Failed to trigger deploy hook.");
      }
    } catch (err) {
      console.error(err);
      alert("Error triggering deploy hook.");
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

  // Grouping logic for Clients view
  const clients = intakes.reduce((acc, intake) => {
    const email = intake.email || "no-email";
    if (!acc[email]) {
      acc[email] = {
        email: email,
        name: intake.name,
        business_name: intake.business_name,
        projects: [],
        last_activity: intake.created_at,
        total_projects: 0,
        live_projects: 0
      };
    }
    acc[email].projects.push(intake);
    acc[email].total_projects++;
    if (intake.status === 'live') acc[email].live_projects++;
    if (new Date(intake.created_at) > new Date(acc[email].last_activity)) {
      acc[email].last_activity = intake.created_at;
    }
    return acc;
  }, {} as Record<string, any>);

  const clientList = Object.values(clients).sort((a: any, b: any) => 
    new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime()
  );

  const selectedClient = selectedClientEmail ? clients[selectedClientEmail] : null;

  // Global Stats
  const avgBuildTime = intakes.filter(i => i.build_time_ms).reduce((acc, i) => acc + i.build_time_ms, 0) / (intakes.filter(i => i.build_time_ms).length || 1);
  const liveCount = intakes.filter(i => i.status === 'live').length;
  const activeCount = intakes.filter(i => i.status !== 'live' && i.status !== 'approved').length;

  if (loading) return <div className={styles.loading}>Loading CRM...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <Link href="/" className={styles.logo}>
              Flux<span className={styles.logoHighlight}>Webs</span>
            </Link>
            <nav className={styles.nav}>
              <button 
                className={`${styles.navItem} ${(currentView === 'pipeline' || currentView === 'client-detail') ? styles.activeNav : ''}`}
                onClick={() => {
                  setCurrentView('pipeline');
                  setSelectedClientEmail(null);
                }}
              >
                Pipeline
              </button>
              <button 
                className={`${styles.navItem} ${currentView === 'clients' ? styles.activeNav : ''}`}
                onClick={() => {
                  setCurrentView('clients');
                  setSelectedClientEmail(null);
                }}
              >
                Clients
              </button>
              <button 
                className={`${styles.navItem} ${currentView === 'analytics' ? styles.activeNav : ''}`}
                onClick={() => {
                  setCurrentView('analytics');
                  setSelectedClientEmail(null);
                }}
              >
                Analytics
              </button>
            </nav>
          </div>
          <div className={styles.stats}>
            <button className={styles.seedBtn} onClick={seedTestLead}>+ Seed Vision</button>
            <div className={styles.liveIndicator}>
              <div className="statusDot" />
              <span>{intakes.length} BUILDS</span>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {currentView === 'analytics' && (
          <div className={styles.analyticsRow}>
            {/* ... same analytics cards ... */}
            <div className={styles.statCard}>
              <label>Average Build Time</label>
              <div className={styles.statValue}>{(avgBuildTime / 1000).toFixed(1)}s</div>
            </div>
            <div className={styles.statCard}>
              <label>Live Projects</label>
              <div className={styles.statValue}>{liveCount}</div>
            </div>
            <div className={styles.statCard}>
              <label>Active Pipeline</label>
              <div className={styles.statValue}>{activeCount}</div>
            </div>
            <div className={styles.statCard}>
              <label>Total Visionaries</label>
              <div className={styles.statValue}>{clientList.length}</div>
            </div>
          </div>
        )}

        {currentView === 'pipeline' && (
          <div className={styles.kanban}>
            {/* ... same kanban logic ... */}
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
                            <a href={intake.staging_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>View Staging →</a>
                          </div>
                        )}

                        <div className={styles.actions}>
                          {intake.status === "new" && (
                            <button 
                              className={styles.manifestBtn} 
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerManifest(intake.id);
                              }}
                            >
                              Manifest Vision 🚀
                            </button>
                          )}
                          <select 
                            value={intake.status} 
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStatus(intake.id, e.target.value);
                            }}
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
        )}

        {currentView === 'clients' && (
          <div className={styles.clientGrid}>
            <div className={styles.clientHeaderRow}>
              <span>Client</span>
              <span>Latest Business</span>
              <span>Projects</span>
              <span>Last Activity</span>
              <span>Actions</span>
            </div>
            {clientList.map((client: any) => (
              <div key={client.email} className={styles.clientRow}>
                <div className={styles.clientMain}>
                  <div className={styles.clientAvatar}>{client.name?.charAt(0) || "V"}</div>
                  <div>
                    <div className={styles.clientName}>{client.name}</div>
                    <div className={styles.clientEmail}>{client.email}</div>
                  </div>
                </div>
                <div className={styles.clientBusiness}>{client.business_name}</div>
                <div className={styles.clientProjectCount}>
                  <span className={styles.totalCount}>{client.total_projects} Total</span>
                  {client.live_projects > 0 && <span className={styles.liveCountBadge}>{client.live_projects} Live</span>}
                </div>
                <div className={styles.clientDate}>
                  {new Date(client.last_activity).toLocaleDateString()}
                </div>
                <div className={styles.clientActions}>
                   <button onClick={() => {
                     setSelectedClientEmail(client.email);
                     setCurrentView('client-detail');
                   }}>Full Profile →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'client-detail' && selectedClient && (
          <div className={styles.detailPage}>
            <header className={styles.detailHeader}>
              <div className={styles.detailHeaderMain}>
                <button className={styles.backBtn} onClick={() => setCurrentView('clients')}>← Back to Clients</button>
                <div className={styles.detailTitle}>
                  <h1>{selectedClient.name}</h1>
                  <span className={styles.detailEmail}>{selectedClient.email}</span>
                </div>
              </div>
              <div className={styles.detailActions}>
                <button className={styles.primaryBtn}>New Build Vision +</button>
                <button className={styles.secondaryBtn}>Export Data</button>
              </div>
            </header>

            <div className={styles.detailGrid}>
              <div className={styles.detailSidebar}>
                <section className={styles.detailCard}>
                  <label>Client Overview</label>
                  <div className={styles.overviewStats}>
                    <div className={styles.ovStat}>
                      <span>Total Work</span>
                      <strong>{selectedClient.total_projects} Projects</strong>
                    </div>
                    <div className={styles.ovStat}>
                      <span>Live Now</span>
                      <strong>{selectedClient.live_projects} Sites</strong>
                    </div>
                    <div className={styles.ovStat}>
                      <span>Since</span>
                      <strong>{new Date(selectedClient.projects[selectedClient.projects.length - 1].created_at).toLocaleDateString()}</strong>
                    </div>
                  </div>
                </section>

                <section className={styles.detailCard}>
                  <label>Comms History (Auto-Logged)</label>
                  <div className={styles.commsTimeline}>
                    <div className={styles.commsEntry}>
                      <span className={styles.commsDate}>Today, 2:45 PM</span>
                      <p>Email Sent: "Review Ready"</p>
                      <span className={styles.commsStatus}>Delivered ✓</span>
                    </div>
                    <div className={styles.commsEntry}>
                      <span className={styles.commsDate}>Feb 25, 10:12 AM</span>
                      <p>Email Sent: "Build Started"</p>
                      <span className={styles.commsStatus}>Opened 👁️</span>
                    </div>
                    <div className={styles.commsEntry}>
                      <span className={styles.commsDate}>Feb 25, 10:10 AM</span>
                      <p>Intake Received</p>
                      <span className={styles.commsStatus}>Processed</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className={styles.detailMainContent}>
                <label>Active & Past Work</label>
                <div className={styles.workList}>
                  {selectedClient.projects.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((project: any) => (
                    <div key={project.id} className={styles.workCard}>
                      <div className={styles.workCardHeader}>
                        <div className={styles.workCardTitle}>
                          <h3>{project.business_name}</h3>
                          <span className={`${styles.statusBadge} ${styles[project.status]}`}>{project.status.toUpperCase()}</span>
                        </div>
                        <span className={styles.workDate}>{new Date(project.created_at).toLocaleDateString()}</span>
                      </div>

                      <div className={styles.workGrid}>
                        <div className={styles.workInfoGroup}>
                          <label>Infrastructure</label>
                          <div className={styles.infraLinks}>
                             {project.staging_url ? (
                               <div className={styles.linkRow}>
                                 <span>Staging:</span>
                                 <a href={project.staging_url} target="_blank">{project.staging_url}</a>
                               </div>
                             ) : (
                               <div className={styles.linkRow}><span>Staging:</span> <em>Not deployed</em></div>
                             )}
                             <div className={styles.linkRow}>
                               <span>Repository:</span>
                               <a href={`https://github.com/fluxlabs/flux-ai-build-${project.business_name?.toLowerCase().replace(/\s+/g, '-')}`} target="_blank">View Repo ↗</a>
                             </div>
                             <div className={styles.linkRow}>
                               <span>Domain:</span>
                               {project.status === 'live' ? <strong>{project.business_name.toLowerCase().replace(/\s+/g, '')}.com</strong> : <em>Pending Handover</em>}
                             </div>
                          </div>
                        </div>

                        <div className={styles.workInfoGroup}>
                          <label>Manifestation Metrics</label>
                          <div className={styles.metricsList}>
                            <div className={styles.metricItem}>
                              <span>Vertical:</span>
                              <strong>{project.vertical || 'N/A'}</strong>
                            </div>
                            <div className={styles.metricItem}>
                              <span>Layout Style:</span>
                              <strong>{project.layout || 'N/A'}</strong>
                            </div>
                            <div className={styles.metricItem}>
                              <span>Build Time:</span>
                              <strong>{project.build_time_ms ? `${(project.build_time_ms / 1000).toFixed(1)}s` : 'N/A'}</strong>
                            </div>
                            <div className={styles.metricItem}>
                              <span>Tokens:</span>
                              <strong>~24k</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.workFooter}>
                        <div className={styles.inspirationGroup}>
                          <label>Inspiration Links</label>
                          <p>{project.links || "None provided"}</p>
                        </div>
                        <button className={styles.viewManifestoBtn} onClick={() => setSelectedIntake(project)}>Full Vision Blueprint →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
                {selectedIntake.status === 'ai_generating' && (
                  <section className={styles.pipelineSection}>
                    <label>Live Pipeline Operation</label>
                    <div className={styles.pipeline}>
                      {PIPELINE_STEPS.map((step) => (
                        <div key={step.id} className={`${styles.pipelineStep} ${currentStep >= step.id ? styles.active : ''}`}>
                          <div className={styles.stepCircle}>
                            {currentStep > step.id ? "✓" : step.id}
                          </div>
                          <div className={styles.stepInfo}>
                            <h4>{step.name}</h4>
                            <span>{step.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

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
                    <label>Vertical</label>
                    <p>{selectedIntake.vertical || "Not specified"}</p>
                  </section>
                  <section>
                    <label>Layout Style</label>
                    <p>{selectedIntake.layout || "Modern Clean"}</p>
                  </section>
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
                      {selectedIntake.deploy_hook && (
                        <button className={styles.secondaryAction} onClick={() => triggerDeployHook(selectedIntake.deploy_hook)}>Quick Re-Deploy ⚡</button>
                      )}
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

                <section className={styles.historySection}>
                  <label>Client History (All Work)</label>
                  <div className={styles.historyList}>
                    {intakes
                      .filter(i => i.email === selectedIntake.email)
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .map(i => (
                        <div key={i.id} className={`${styles.historyItem} ${i.id === selectedIntake.id ? styles.currentHistoryItem : ''}`} onClick={() => setSelectedIntake(i)}>
                          <div className={styles.historyMeta}>
                            <span className={styles.historyDate}>{new Date(i.created_at).toLocaleDateString()}</span>
                            <span className={`${styles.historyStatus} ${styles[i.status]}`}>{i.status.toUpperCase()}</span>
                          </div>
                          <div className={styles.historyBusiness}>{i.business_name}</div>
                          {i.staging_url && <div className={styles.historyLink}>View Staging →</div>}
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
