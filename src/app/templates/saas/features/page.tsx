"use client";

import styles from "../saas.module.css";
import Link from "next/link";
import { Server, Globe, Cpu, Shield, Database, Zap } from "lucide-react";

export default function SaasFeaturesPage() {
  const features = [
    { title: "Edge Caching", desc: "Responses served from the closest point to your users automatically.", icon: <Globe size={32} /> },
    { title: "Zero-Downtime Deploys", desc: "Rollouts happen seamlessly without interrupting active user sessions.", icon: <Server size={32} /> },
    { title: "Automated Rollbacks", desc: "If a build fails health checks, traffic is instantly routed to the previous stable version.", icon: <Cpu size={32} /> },
    { title: "DDoS Protection", desc: "Enterprise-grade mitigation active by default on all endpoints.", icon: <Shield size={32} /> },
    { title: "Connection Pooling", desc: "Smart database routing to prevent exhaustion under heavy spikes.", icon: <Database size={32} /> },
    { title: "Instant Invalidations", desc: "Purge cache globally in under 100ms when content changes.", icon: <Zap size={32} /> }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/saas" className={styles.logo} style={{ textDecoration: 'none' }}>NovaSaaS</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/saas/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/saas/features" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 700 }}>Features</Link>
          <Link href="/templates/saas/services" style={{ color: '#fff', textDecoration: 'none' }}>Platform</Link>
          <Link href="/templates/saas/pricing" style={{ color: '#fff', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/templates/saas/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Get Started</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '8rem 5%', textAlign: 'center' }}>
          <h1>Engineered <br/> for Scale.</h1>
          <p style={{ margin: '0 auto' }}>Every layer of our stack is optimized to handle massive concurrency without breaking a sweat.</p>
        </section>

        <section style={{ padding: '5rem 5% 15rem 5%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
            {features.map((feat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '3rem', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ color: '#0070f3', marginBottom: '1.5rem' }}>{feat.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feat.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div>© 2026 NovaSaaS. Built with Flux.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
            <span style={{ cursor: 'pointer' }}>Docs</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
